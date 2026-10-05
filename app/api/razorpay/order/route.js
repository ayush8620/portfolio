import { getRazorpayKeys, json, MIN_AMOUNT_INR, MAX_AMOUNT_INR } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (value, max) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "";

// POST /api/razorpay/order  body: { amount: <rupees>, name?, message? }
// Creates a Razorpay order server-side with Live_API_Key + Live_Key_Secret.
export async function POST(req) {
  const { keyId, keySecret } = getRazorpayKeys();
  if (!keyId || !keySecret) {
    return json({ error: "Payments are not configured yet." }, 503);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const amount = Number(body?.amount);
  if (!Number.isInteger(amount) || amount < MIN_AMOUNT_INR || amount > MAX_AMOUNT_INR) {
    return json(
      { error: `Amount must be a whole number between ₹${MIN_AMOUNT_INR} and ₹${MAX_AMOUNT_INR}.` },
      400
    );
  }

  const name = clean(body?.name, 60);
  const message = clean(body?.message, 200);

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
      body: JSON.stringify({
        amount: amount * 100, // paise
        currency: "INR",
        receipt: `coffee_${Date.now()}`,
        notes: {
          purpose: "Buy Me a Coffee",
          ...(name && { name }),
          ...(message && { message }),
        },
      }),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Razorpay order error:", data?.error || data);
      return json({ error: "Could not start the payment. Please try again." }, 502);
    }

    return json({ orderId: data.id, amount: data.amount, currency: data.currency });
  } catch (error) {
    console.error("Razorpay order request failed:", error);
    return json({ error: "Could not reach the payment server." }, 502);
  }
}
