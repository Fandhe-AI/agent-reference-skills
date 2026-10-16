# How Managed Payments Works

Managed Payments is the Stripe merchant of record solution for selling digital products (SaaS, software, digital content or downloads) with Stripe Checkout or Payment Links, without operating local business entities in each country. Stripe handles indirect tax, checkout optimizations, emails, customer support, fraud, and disputes.

## Signature / Usage

Reports include optional columns that separate withheld tax from fees (the default `fee` column includes both):

```text
withheld_tax
fee_net_of_withheld_tax
```

## Options / Props

What Managed Payments handles for you:

| Area | Behavior |
|------|----------|
| Sales tax, VAT, GST | Indirect tax compliance on sales to customers in more than 80 countries; calculates, collects, files, and remits. In countries not handled, you remain responsible (Stripe Tax can calculate at no additional charge) |
| Checkout optimizations | Uses Link; Adaptive Pricing enabled by default (local currency and local payment methods) |
| Transaction emails | Receipts, invoices, refunds, and certain subscription emails are sent from Link |
| Customer order and transaction support | Customers manage orders through Link; you keep product-level support, refunds, and subscription updates (Dashboard or API) |
| Fraud prevention | Stripe configures rules and blocklists (Radar) |
| Dispute management | Stripe handles disputes and submits evidence on your behalf |

Payment method availability (selected rows):

| Payment method | Customer countries | One-time | Recurring | Requires local currency presentment | Adaptive Pricing |
|----------------|--------------------|----------|-----------|-------------------------------------|------------------|
| Cards, Apple Pay, Google Pay, Link | Global | Yes | Yes | No | Yes |
| Klarna | US | Yes | No | Yes | No |
| Cash App Pay | US | Yes | Yes | Yes | No |
| Afterpay | US | Yes | No | Yes | No |
| Korean cards, Kakao Pay, Naver Pay | South Korea | Yes | Yes | Yes | Yes |
| Samsung Pay, PAYCO | South Korea | Yes | No | Yes | Yes |
| UPI | India | Yes | Yes | Yes | No |
| Pix | Brazil | Yes | Yes (no daily subscriptions) | Yes | No |
| Bancontact | Belgium | Yes | No | Yes | Yes |

## Notes

- The customer sees Link as the merchant of record ("Sold through Link"); the statement descriptor displays `LINK.COM* [Your statement descriptor]`.
- Custom domains are not supported on Managed Payments checkouts.
- Emails come from Link; your Dashboard receipt settings do not affect them. Trial start email and trial ending reminder (trials longer than 7 days) are always sent. Upcoming-renewal emails are controlled in subscriptions and email settings; if disabled, anniversary emails are still sent (6-month and 12-month for Australia and the United Kingdom, 12-month elsewhere), by default 15 days before and at least 7 days before.
- For subscriptions created by Managed Payments Checkout Sessions, `subscription.default_payment_method` cannot be updated directly through the API; customers update it through the Customer Portal.
- Customers can manage orders on the Link website: order history, cancel or update subscriptions, payment methods, billing address. Guests are prompted to create a Link account.
- If you do not respond to a Stripe request for product-specific input within 48 hours, Stripe might issue a refund without your approval. Keep your support email up to date in Dashboard business details.
- Stripe can issue refunds within 60 days of the original transaction in certain cases. Refunds include the sales tax paid; in certain jurisdictions Stripe retains and remits the original tax, so your account balance is reduced by that amount.
- Disputes: a dispute received fee applies; Stripe covers the evidence submission fee when it submits evidence, but an evidence submission fee applies if you counter a dispute yourself. Dispute prevention tools can be enabled and are charged to your account.
- Klarna supports only one-time payments with Managed Payments (recurring Klarna is possible on Checkout Sessions that do not use Managed Payments). Adaptive Pricing handles local currency presentment where it supports the payment method.
- Data deletion requests: Stripe cancels subscriptions sold through Managed Payments and deletes data from related objects (v2 Account, Customer, PaymentMethod, Invoice, PaymentIntent, Subscription, Charge) and emails you.
- Transactions are processed by a Stripe acquiring affiliate (Stripe Payments Company, Stripe Technology Europe, Limited, Stripe Payments Canada, Ltd., Stripe Payments Singapore Pte. Ltd., or Stripe Payments Australia Pty Ltd.).
- Source: https://docs.stripe.com/payments/managed-payments/how-it-works

## Related

- [Overview](./overview.md)
- [Tax Compliance](./tax-compliance.md)
- [Eligibility](./eligibility.md)
- [Update Checkout Integration](./update-checkout.md)
