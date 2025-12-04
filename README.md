# Kensano — Frontend scaffold

## Install
Copy files into repository:
- index.html
- product.html
- admin.html
- contact.html
- css/root.css
- js/motion.js
- js/app.js
- assets/* (images, favicon)

## Local test
Open `index.html` in browser. For API integration use a local server (e.g. `npx http-server`).

## Deploy (GitHub Pages)
1. Push to `main`.
2. GitHub > Settings > Pages > Source: main / (root). Add custom domain `kensano.in`.
3. Add `CNAME` file with `kensano.in` (single line).
4. Ensure DNS A/CNAME records point to GitHub Pages as previously done.

## Integrations (next steps)
- **Orders & Auth**: Create a small API (Cloudflare Worker, Vercel Functions, or Node/Express) with endpoints: `/api/orders`, `/api/products`, `/api/admin`.
- **Payments**:
  - Stripe: use Checkout or PaymentIntent; server-side secret key required.
  - Razorpay: server-side order creation + client checkout.
  - UPI: integrate via Razorpay or local provider.
  - Crypto: on-chain payment gateway (optional).
- **Admin**: protect admin endpoints with OAuth / JWT. Implement 2FA using TOTP.
- **Storage**: products/media in S3 / Cloudflare R2 / object storage.
- **Security**: enable HTTPS, CSP header, Rate limiting, WAF, and sign webhooks.

## Files that need backend
- contact form (POST to /api/contact)
- checkout (create order on backend, return payment URL)
- admin actions (protected API)
