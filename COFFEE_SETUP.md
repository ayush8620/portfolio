# Buy Me a Coffee (Razorpay) setup

The navbar has a **Coffee** button (gradient pill on desktop, round coffee icon on mobile).
Clicking it opens a small popover with ₹49 / ₹99 / ₹199 / ₹499 presets (₹99 is the default),
an "Other amount" field and an optional name. **Pay** opens Razorpay Checkout.
There is no separate page and no leaderboard.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name              | Value                                   | Used by                                   |
|-------------------|-----------------------------------------|-------------------------------------------|
| `Live_API_Key`    | Razorpay **Key ID** (`rzp_live_…` or `rzp_test_…`) | `GET /api/razorpay/key`, `POST /api/razorpay/order` |
| `Live_Key_Secret` | Razorpay **Key Secret**                 | `POST /api/razorpay/order`, `POST /api/razorpay/verify` (server only) |

- The names are case-sensitive and must match exactly.
- Enable them for **Production** (and Preview if you want to test on preview URLs).
- **Redeploy** after adding or changing them. Vercel only applies env vars to new deployments.
- Test-mode keys (`rzp_test_…`) work the same way, but no real money moves. Switch to live keys when Razorpay activates your account.
- The secret is never sent to the browser. Only the Key ID is returned by `/api/razorpay/key`.

## How it works

1. Browser → `GET /api/razorpay/key` → `{ keyId }` (from `Live_API_Key`).
2. Browser → `POST /api/razorpay/order` with `{ amount: 99, name? }` (amount in rupees, whole number, ₹1 to ₹50,000).
   The server creates a Razorpay order (`https://api.razorpay.com/v1/orders`) with `Live_API_Key` + `Live_Key_Secret`
   and returns `{ orderId, amount, currency }`.
3. Browser loads `https://checkout.razorpay.com/v1/checkout.js` and opens Checkout with that order.
4. After payment → `POST /api/razorpay/verify` checks the signature
   (`HMAC_SHA256(order_id|payment_id, Live_Key_Secret)`). A thank-you message is shown either way;
   a failed check is only logged in the browser console. All payments show up in the Razorpay Dashboard → Payments.

## Change amounts / text

- Presets and default: `components/CoffeeButton.js` → `PRESETS`, `DEFAULT_AMOUNT`, `MIN_AMOUNT`, `MAX_AMOUNT`.
- Server limits: `lib/razorpay.js` → `MIN_AMOUNT_INR`, `MAX_AMOUNT_INR` (keep them in sync with the client).

## Troubleshooting

- "Payments are not configured yet." → env vars missing or the deployment is older than the env change. Redeploy.
- "Could not start the payment." → Razorpay rejected the keys (wrong Key ID/Secret pair, or test/live mismatch).
  Check the Vercel function logs for `Razorpay order error`.
