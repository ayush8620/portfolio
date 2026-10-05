import crypto from "crypto";
import { getRazorpayKeys, json } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/razorpay/verify
// body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Checks the Checkout signature: HMAC_SHA256(order_id + "|" + payment_id, Live_Key_Secret).
export async function POST(req) {
  const { keySecret } = getRazorpayKeys();
  if (!keySecret) {
    return json({ verified: false, error: "Payments are not configured yet." }, 503);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ verified: false, error: "Invalid request." }, 400);
  }

  const orderId = body?.razorpay_order_id;
  const paymentId = body?.razorpay_payment_id;
  const signature = body?.razorpay_signature;

  if (![orderId, paymentId, signature].every((v) => typeof v === "string" && v.length > 0 && v.length < 200)) {
    return json({ verified: false, error: "Missing payment details." }, 400);
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  const verified = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!verified) {
    return json({ verified: false, error: "Payment signature mismatch." }, 400);
  }
  return json({ verified: true, paymentId });
}
