// Server-only helpers for Razorpay. Never import this from a client component.
// Env vars (set on Vercel): Live_API_Key = Razorpay Key ID, Live_Key_Secret = Razorpay Key Secret.

export function getRazorpayKeys() {
  const keyId = (process.env.Live_API_Key || "").trim();
  const keySecret = (process.env.Live_Key_Secret || "").trim();
  return { keyId, keySecret };
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

// Coffee amount limits in rupees (whole numbers only).
export const MIN_AMOUNT_INR = 1;
export const MAX_AMOUNT_INR = 50000;
