# Customer Portal

A hosted, Stripe-managed UI that lets customers self-service their subscriptions and billing details — updating payment methods, changing plans, downloading invoices, and canceling subscriptions — with no custom UI required.

## Signature / Usage

```bash
# Create a portal session and redirect the customer to the returned URL
curl https://api.stripe.com/v1/billing_portal/sessions \
  -u "sk_test_...:" \
  -d "customer=cus_xxx" \
  -d "return_url=https://example.com/account"
```

## Options / Props

### Session Create Parameters (`POST /v1/billing_portal/sessions`)

| Name | Type | Description |
|------|------|-------------|
| `customer` | string | Customer ID. Required |
| `return_url` | string | URL to redirect the customer after they leave the portal |
| `configuration` | string | Portal Configuration ID to use; falls back to the default configuration |
| `flow_data` | object | Pre-configure the portal to open at a specific flow (e.g., payment method update, subscription cancellation) |

### Session Response Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Session identifier |
| `url` | string | Short-lived URL to redirect the customer to |
| `expires_at` | timestamp | Expiry; idle sessions expire after 5 minutes; active sessions extend to 1 hour from last activity |
| `customer` | string | Customer ID the session belongs to |
| `return_url` | string | The return URL |

### Portal Configuration Options (`POST /v1/billing_portal/configurations`)

| Option | Description |
|--------|-------------|
| `business_profile` | Business name, privacy URL, terms of service URL |
| `features.customer_update` | Allow updating email, tax ID, shipping/billing address |
| `features.payment_method_update` | Allow adding / removing payment methods |
| `features.subscription_update` | Allow plan changes; configure up to 10 products as options |
| `features.subscription_cancel` | Allow cancellation; configure churn-prevention coupon offers and reason collection |
| `features.invoice_history` | Allow viewing and downloading past invoices |
| `default_return_url` | Default return URL when none is provided at session creation |

### Customer-Accessible Actions

| Action | Notes |
|--------|-------|
| Update billing info, tax IDs, payment methods | Always available if configured |
| View / download / pay invoices | Requires `invoice_history` enabled |
| Change subscription plan | Requires `subscription_update`; not available for subscriptions with multiple products, usage-based billing, active schedules, or unsupported payment methods |
| Cancel subscription | Requires `subscription_cancel`; can cancel immediately or at period end |

## Notes

- Session URLs are sensitive — treat them like authentication tokens. Generate them server-side and redirect immediately; never expose them to untrusted clients.
- Branding (logo, icon, brand color) is configured in the Dashboard under **Settings → Branding** and is shared with Checkout.
- The portal supports 30+ languages and auto-detects the customer's locale.
- Use `flow_data` to deep-link directly to a specific action (e.g., cancellation flow) instead of the portal home screen.
- The portal cannot modify subscriptions that have active subscription schedules, multiple products, or usage-based pricing items.

### Webhook Events

| Event | When |
|-------|------|
| `billing_portal.session.created` | A portal session is created |
| `customer.subscription.updated` | Customer changes plan in portal |
| `customer.subscription.deleted` | Customer cancels in portal |
| `payment_method.attached` | Customer adds a payment method |

## Related

- [Subscriptions](./subscriptions.md)
- [Invoices](./invoices.md)
- [Products & Prices](./products-prices.md)
