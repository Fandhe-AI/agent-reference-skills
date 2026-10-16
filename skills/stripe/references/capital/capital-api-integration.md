# Custom Capital Program (API Integration)

Build a custom Capital program with the Capital API: retrieve prequalified financing offers for connected accounts, expose the financing application, and provide reporting for in-progress financing.

## Signature / Usage

```bash
# List financing offers for all connected accounts
curl https://api.stripe.com/v1/capital/financing_offers \
  -u <<YOUR_SECRET_KEY>>:

# Mark an offer as delivered after sending the offer email
curl https://api.stripe.com/v1/capital/financing_offers/financingoffer_abc123/mark_delivered \
  -u <<YOUR_SECRET_KEY>>:

# Create an application link (use capital_financing_reporting for reporting)
curl https://api.stripe.com/v1/account_links \
  -u <<YOUR_SECRET_KEY>>: \
  -d account=acct_123 \
  -d refresh_url="https://example.com/reauth" \
  -d return_url="https://example.com/thanks" \
  -d type=capital_financing_offer

# Financing summary for a connected account
curl https://api.stripe.com/v1/capital/financing_summary \
  -u <<YOUR_SECRET_KEY>>: \
  -H "Stripe-Account: acct_123"
```

## Options / Props

### Implementation phases

1. Before you begin: confirm Connect branding settings; create a test offer in the sandbox Capital Dashboard.
2. Build the offer-delivery flow: retrieve offers, send offer emails, create or refresh Account Links, mark offers delivered.
3. Handle financing lifecycle updates: webhooks, application review, payout, payment, reporting, repayment.
4. Validate and launch: review the test flow, enable automatic offers, then add refills and reporting.

### Capital webhooks

| Webhook identifier | Trigger |
|--------------------|---------|
| `capital.financing_offer.created` | Financing offer is created |
| `capital.financing_offer.accepted` | Connected account submits their offer application |
| `capital.financing_offer.paid_out` | Stripe approves the application and funds are paid out |
| `capital.financing_offer.fully_repaid` | Connected account fully pays the financing balance |
| `capital.financing_offer.canceled` | Connected account cancels the financing offer |
| `capital.financing_offer.rejected` | Connected account's application isn't approved |
| `capital.financing_offer.expired` | Financing offer expires |
| `capital.financing_offer.replacement_created` | Offer is replaced with a new offer |
| `capital.financing_offer.accepted_other_offer` | Connected account accepts a different offer |
| `capital.financing_summary.line_of_credit_update` | Line-of-credit terms are updated |
| `capital.financing_transaction.created` | Financing transaction is created |

### Offer status segments

| Segment | Meaning for the platform |
|---------|--------------------------|
| Undelivered | Created by Stripe, not yet communicated through an approved delivery channel. All offers start here. |
| Delivered | Sent or shown to the connected account (not necessarily opened or accepted). |
| Accepted | Account accepted and progressed into application/financing; not necessarily funded. |
| Paid out | Financing disbursed; used for platform origination volume and revenue share reporting. |
| Fully repaid | Full financing amount including fee repaid. |

Transitions: Undelivered to Delivered; Delivered to Accepted; Accepted to Paid out; Paid out to Fully repaid; Undelivered/Delivered to Expired or Replaced; Accepted to Canceled or Rejected; Paid out to Canceled.

## Notes

- When sending offer emails you must BCC `capital-offers@stripe.com` on all of them, and mark each offer as delivered.
- Configure Capital webhooks on your platform account (no `connect` parameter), not as Connect webhooks, because Stripe creates and manages offers on the platform account.
- Do not put an Account Link URL directly in an offer email (it expires quickly). Link to a stable platform URL that authenticates the account, generates a new Account Link via the API, and redirects.
- Offer email content must comply with Stripe's marketing guidance; submit changes to user-facing materials through the Change Request Form.
- A financing offer in `accepted` status is pending review. Show the application tracker with the Capital Financing embedded component or an Account Link of type `capital_financing_reporting`. Stripe may request more information (for example identity verification or bank statements) and emails the connected account directly.
- Past-due requirements may appear on the `loans` or `cash_advances` capabilities; they do not affect other capabilities such as `card_payments` or `transfers`. `account.updated` is informational; retrieve capability requirements with `GET /v1/accounts/{id}/capabilities/loans`.
- Test mode: simulate offer expiry, approval and disbursal, and repayment from the sandbox Capital Dashboard. All webhooks except `capital.financing_offer.canceled` can be simulated. The **Make payment** button can take up to 15 minutes to enable for test offers.
- Before enabling automatic offers in live mode (Stripe then creates offers daily), confirm connected account email addresses (Comms Center) if using Stripe co-branded no-code offer emails, and contact Stripe to enable live mode access to the financing offers API.
- Refills and reporting/reconciliation are covered by separate Stripe guides.
- Source: https://docs.stripe.com/capital/api-integration

## Related

- [Capital and Connect Integration](./capital-connect-integration.md)
- [Capital Customer Support (Servicing)](./capital-servicing.md)
- [Financing Offers](./financing-offers.md)
- [Financing Summary](./financing-summary.md)
- [Financing Transactions](./financing-transactions.md)
