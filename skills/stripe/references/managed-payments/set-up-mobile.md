# Accept Mobile App Payments with Managed Payments

Sell in-app digital products or subscriptions on iOS by opening Stripe Checkout with Managed Payments in a browser (app-to-web), with Stripe as merchant of record.

## Signature / Usage

Server-side Checkout Session for a one-time payment (use `mode: 'subscription'` and a recurring price for subscriptions):

```javascript
const session = await stripe.checkout.sessions.create({
  line_items: [{price: priceId, quantity: 1}],
  mode: 'payment',
  managed_payments: {enabled: true},
  origin_context: 'mobile_app',
  customer: customerId,
  success_url: 'https://example.com/checkout_redirect/success',
});

res.json({url: session.url});
```

Client opens the returned URL in Safari:

```swift
UIApplication.shared.open(url, options: [:], completionHandler: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `managed_payments[enabled]` | boolean | `true` to use Managed Payments |
| `origin_context` | string | `mobile_app` opts in to a UI optimized for app-to-web purchases |
| `customer` | string | Stripe Customer ID; create one per user if none exists and store the association on your server |
| `success_url` | string | Universal link that returns the customer to your app |
| `mode` | string | `payment` or `subscription` |

## Notes

- Flow: user taps Buy, client requests a Checkout URL from your server, server creates the Checkout Session, client opens the URL in the browser, customer pays, Stripe sends the `checkout.session.completed` webhook, server fulfills the order once the payment is paid, Stripe redirects to `success_url`.
- Available only in some countries where iOS App Store guidelines permit linking to an external website for payments.
- Not covered: user authentication (for example Sign in with Apple or Firebase Authentication) and native StoreKit in-app purchases. Products that do not meet the Managed Payments eligibility criteria need the separate digital goods guide; physical products use Stripe in-app payments.
- Prerequisites: eligible products (all products in the purchase must be eligible), Managed Payments activated in the Dashboard with terms accepted, and API version `2025-03-31.basil` or later.
- Choose a tax code eligible for Managed Payments when creating the product (example used: `txcd_10201000`). Create with the CLI: `stripe products create --name="100 coins" --description="Bundle of 100 in-app coins" --tax-code="txcd_10201000"`, then `stripe prices create -d product=prod_H94k5odtwJXMtQ -d unit_amount=1000 -d currency=usd`.
- Universal links: serve `.well-known/apple-app-site-association` as `application/json` (check with `curl -I`), add an `applinks:example.com` Associated Domains entitlement, and provide a fallback page at `success_url` (for example a custom URL scheme).
- Checkout Sessions expire 24 hours after creation. If the webhook is not acknowledged, Checkout redirects to `success_url` 10 seconds after a successful payment.
- Verify webhook signatures with `stripe.webhooks.constructEvent` using the raw body. The official example fulfills on `checkout.session.completed`; check the session `payment_status` (`paid`) before fulfilling, and for delayed payment methods wait for `checkout.session.async_payment_succeeded` (handle `checkout.session.async_payment_failed`), as in set-up-checkout.md.
- Test cards: `4242 4242 4242 4242` (succeeds), `4000 0000 0000 3220` (3D Secure 2), `4000 0000 0000 9995` (`insufficient_funds` decline). Debug universal links with `applinks:example.com?mode=developer` and a sysdiagnose.
- A subscription purchase only authorizes Managed Payments to charge the payment method; obtain consent for charges outside Managed Payments.
- Optional: configure yearly-price display in monthly terms and tax display in Checkout and Payment Links settings.
- Source: https://docs.stripe.com/payments/managed-payments/set-up-mobile

## Related

- [Set up with Checkout](./set-up-checkout.md)
- [Eligibility](./eligibility.md)
- [How Managed Payments Works](./how-it-works.md)
- [Update Checkout Integration](./update-checkout.md)
