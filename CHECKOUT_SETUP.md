# Checkout Setup Instructions

The checkout system has been successfully implemented! Follow these steps to get it running.

## What Was Built

✅ **Backend (Express + PostgreSQL + Prisma)**

- Express server on port 3002
- PostgreSQL database running in Docker (port 5433)
- Order management with Prisma ORM
- Stripe payment integration
- Resend email service with React Email templates

✅ **Frontend (React + TanStack)**

- Checkout page with form validation
- Order summary sidebar
- Success/cancel pages
- Integration with existing cart

✅ **Payment Flow**

- Credit card payments via Stripe Checkout
- PayPal support (automatic via Stripe)
- Webhook handling for payment confirmation
- Email receipts on successful orders

## Prerequisites

1. **PostgreSQL Docker Container** ✅ Already running on port 5433
2. **Node.js** - Already installed
3. **Stripe Account** - Need to create
4. **Resend Account** - Need to create

## Setup Steps

### 1. Get Stripe API Keys

1. Go to https://dashboard.stripe.com/register
2. Create an account (use test mode)
3. Navigate to **Developers → API keys**
4. Copy your **Secret key** (starts with `sk_test_`)
5. Add to `server/.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_key_here
   ```

### 2. Setup Stripe CLI (for webhook testing)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Start webhook forwarding (keep this running in a terminal)
stripe listen --forward-to http://localhost:3002/api/webhook

# Copy the webhook signing secret (starts with whsec_) to server/.env
STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

### 3. Get Resend API Key

1. Go to https://resend.com/signup
2. Create an account
3. Go to **API Keys**
4. Create a new API key
5. Add to `server/.env`:
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```

**Note:** For testing, Resend sandbox email is already configured (`onboarding@resend.dev`). To send to real emails, you'll need to verify a domain.

### 4. Verify Environment Variables

Check that `server/.env` contains:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5433/react_restaurant
PORT=3002
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Add your actual keys here:
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

Check that `.env` (root) contains:

```env
VITE_API_URL=http://localhost:3001
VITE_SERVER_URL=http://localhost:3002
```

## Running the Application

You need **4 terminals** running simultaneously:

### Terminal 1: Frontend + JSON Server

```bash
npm start
```

This starts:

- React app on http://localhost:3000
- JSON Server (foods API) on http://localhost:3001

### Terminal 2: Express Server

```bash
cd server
npm run dev
```

Express server on http://localhost:3002

### Terminal 3: Stripe Webhook Forwarding

```bash
stripe listen --forward-to http://localhost:3002/api/webhook
```

Forwards Stripe webhooks to local server

### Terminal 4: PostgreSQL (Already Running)

Your PostgreSQL Docker container is already running on port 5433.
To check: `docker ps | grep postgres-restaurant`

## Testing the Checkout Flow

### 1. Add Items to Cart

1. Go to http://localhost:3000
2. Browse the menu
3. Click "Add to Cart" on some items
4. Click the cart icon (shows item count)

### 2. Go to Checkout

1. In cart page, click "Proceed to Checkout"
2. Fill in the checkout form:
   - **Name:** Your Name
   - **Email:** your@email.com (you'll receive receipt here if Resend is configured)
   - **Phone:** Optional
   - **Address:** 123 Main St
   - **City:** New York
   - **State:** NY (must be 2 letters, uppercase)
   - **ZIP:** 10001

### 3. Complete Payment

1. Click "Continue to Payment"
2. You'll be redirected to Stripe Checkout
3. Use Stripe test card: **4242 4242 4242 4242**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 10001)
4. Click "Pay"

### 4. Verify Success

1. You should be redirected to the success page
2. Cart should be cleared
3. Check Terminal 3 for webhook event
4. Check Terminal 2 for order processing logs
5. Check your email for receipt (if Resend is configured with real email)

### 5. View Order in Database

```bash
cd server
npx prisma studio
```

Opens Prisma Studio at http://localhost:5555 where you can see:

- Orders table with your order
- OrderItems table with the items

## Stripe Test Cards

| Card Number         | Scenario                |
| ------------------- | ----------------------- |
| 4242 4242 4242 4242 | Success                 |
| 4000 0000 0000 0002 | Card declined           |
| 4000 0025 0000 3155 | Requires authentication |

## Troubleshooting

### Backend Server Won't Start

```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker ps | grep postgres-restaurant

# If not running, start it
docker start postgres-restaurant

# If it doesn't exist, recreate it
docker run --name postgres-restaurant \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=react_restaurant \
  -p 5433:5432 -d postgres:16
```

### Stripe Webhook Not Firing

1. Make sure Stripe CLI is running: `stripe listen --forward-to http://localhost:3002/api/webhook`
2. Copy the webhook secret to `server/.env`
3. Restart the Express server

### Email Not Sending

- Check that `RESEND_API_KEY` is set in `server/.env`
- For testing, emails go to `onboarding@resend.dev` (Resend sandbox)
- To send real emails, verify a domain in Resend dashboard

### Frontend Build Errors

```bash
# Regenerate route tree
npm run dev
# Then restart

# Or clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Project Structure

```
react-restaurant/
├── server/                          # Express backend
│   ├── .env                         # Backend env vars (Stripe, Resend, DB)
│   ├── src/
│   │   ├── index.ts                 # Express server entry
│   │   ├── routes/
│   │   │   ├── checkout.ts          # POST /api/checkout
│   │   │   ├── webhook.ts           # POST /api/webhook
│   │   │   └── orders.ts            # GET /api/orders/:id
│   │   ├── services/
│   │   │   ├── stripe.service.ts    # Stripe integration
│   │   │   ├── email.service.ts     # Resend email
│   │   │   └── order.service.ts     # Order CRUD
│   │   └── templates/
│   │       └── receipt-email.tsx    # Email template
│   └── prisma/
│       └── schema.prisma            # Database schema
│
├── src/
│   ├── routes/
│   │   ├── checkout.tsx             # Checkout page
│   │   ├── checkout.success.tsx     # Success page
│   │   ├── checkout.cancel.tsx      # Cancel page
│   │   └── cart.tsx                 # Updated with checkout link
│   ├── components/checkout/
│   │   ├── CheckoutForm.tsx         # Main form
│   │   ├── CustomerInfoSection.tsx  # Contact fields
│   │   ├── ShippingAddressSection.tsx # Address fields
│   │   └── OrderSummary.tsx         # Cart summary
│   ├── query-factories/
│   │   └── orders.ts                # Order API queries
│   └── types/
│       ├── order.types.ts           # Order types
│       └── checkout.types.ts        # Checkout types
│
└── .env                             # Frontend env vars (server URL)
```

## API Endpoints

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | /api/checkout   | Create Stripe session & order |
| POST   | /api/webhook    | Handle Stripe events          |
| GET    | /api/orders/:id | Get order details             |
| GET    | /api/health     | Health check                  |

## Database Schema

### Orders Table

- id (UUID)
- orderNumber (ORD-2024-000001)
- Customer info (name, email, phone)
- Shipping address
- Order totals (subtotal, tax, total)
- Payment status (PENDING, PAID, FAILED, etc.)
- Stripe session/payment IDs
- Timestamps

### OrderItems Table

- id (UUID)
- orderId (FK to orders)
- Food snapshot (id, name, image, price)
- Quantity

## Next Steps

1. **Test the full flow** - Add items, checkout, complete payment
2. **Verify webhook** - Check Terminal 3 for Stripe events
3. **Check database** - Use Prisma Studio to see orders
4. **Test email** - If Resend is configured, check inbox

## Production Deployment

Before deploying to production:

1. **Switch Stripe to live mode**
   - Get live API keys from Stripe dashboard
   - Update `server/.env` with live keys

2. **Configure Stripe webhook in dashboard**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhook`
   - Select events: `checkout.session.completed`, `checkout.session.expired`
   - Copy webhook secret to production env

3. **Verify Resend domain**
   - Add your domain in Resend dashboard
   - Update `from` email in `server/src/services/email.service.ts`

4. **Deploy database**
   - Use managed PostgreSQL (Supabase, Railway, Neon)
   - Run migrations: `npx prisma migrate deploy`

5. **Update environment variables**
   - Set all production values
   - Update `FRONTEND_URL` and `CORS` settings

## Support

If you encounter issues:

1. Check all 4 terminals are running
2. Verify all environment variables are set
3. Check Stripe CLI is forwarding webhooks
4. Review server logs for errors
5. Check browser console for frontend errors

---

**Implementation Complete!** 🎉

The checkout system is fully functional and ready for testing. Follow the steps above to get started.
