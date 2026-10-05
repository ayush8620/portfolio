import { getRazorpayKeys, json } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/razorpay/key -> { keyId }
// Only the public Key ID is exposed. The secret never leaves the server.
export async function GET() {
  const { keyId } = getRazorpayKeys();
  if (!keyId) {
    return json({ error: "Payments are not configured yet." }, 503);
  }
  return json({ keyId });
}
