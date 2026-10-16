# Capital and Connect Integration

How Capital offers, applications, financing payouts, and payments affect connected accounts. Stripe manages the financing lifecycle for accounts that use the Stripe Dashboard or Express Dashboard; changes to a Connect integration are usually needed only for custom reporting or accounting, payout logic, or a platform-provided Capital interface.

## Signature / Usage

Show an offer or reporting page to a connected account without a Stripe-hosted Dashboard by creating an Account Link with a Capital `type`:

```bash
curl https://api.stripe.com/v1/account_links \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d account=acct_123 \
  -d refresh_url="https://example.com/reauth" \
  -d return_url="https://example.com/thanks" \
  -d type=capital_financing_offer
```

Use `type=capital_financing_reporting` for financing balance, transaction history, and payment progress.

## Options / Props

### Dashboard access

| Dashboard | Capital behavior |
|-----------|------------------|
| Stripe Dashboard (full) | Stripe hosts discovery, application, reporting, and servicing. |
| Express Dashboard | Stripe hosts them under **Financing**. |
| Custom dashboard (none) | Use Stripe-hosted flows or embedded components; requires setting up Capital first. |

### Connect charge type and withholding

| Charge type | Where Stripe withholds from |
|-------------|-----------------------------|
| Direct charges | The connected account's eligible charge amount, including any application fee. |
| Destination charges | The amount transferred to the connected account, not the platform charge (with or without `on_behalf_of`). |
| Separate charges and transfers | Each eligible transfer to the connected account, not the platform charge. |

## Notes

- Offers: if your platform manages offer emails, handle `capital.financing_offer.created`, notify the connected account, and mark the offer as delivered. Verify webhook signatures before processing events. Show the offer with the Capital promotion embedded component or an Account Link with `type` set to `capital_financing_offer`.
- Application review usually follows submission quickly but can take up to 30 days.
- Starting or restarting an application requests or resets the `loans` or `cash_advances` capability (depending on product and jurisdiction), which can add requirements and emit `account.updated`.
- A Capital-specific requirement can make the account appear restricted but does not disable payments or payouts. Use `charges_enabled` and `payouts_enabled` to decide whether the account can accept payments and receive payouts.
- During the application the connected account can update Account and Person information; if your platform manages it, monitor `account.updated` and `person.updated` and reconcile. Some changes (for example a TIN update) can trigger new requirements for other capabilities.
- When Stripe disburses financing, funds are credited as a positive balance transaction with `type` and `reporting_category` set to `financing_payout`, held in a separate financing source balance until Stripe initiates a Capital-specific payout. These funds are not available for platform-initiated payouts. The credit and bank payout are separate records and can occur at different times.
- When a financial partner disburses financing directly, funds do not appear in the connected account's Stripe balance or payout activity.
- Stripe automatically applies a percentage of eligible payments to the financing balance; for products with a minimum or fixed periodic payment, Stripe might debit the bank account to cover a shortfall.
- Embedded components: the Capital financing component (or Account Link `capital_financing_reporting`) shows balance, transaction history, payment progress, and manual-payment controls. The Balance and Payouts components cover balance/payout timing and history; no separate Capital payout component is needed.
- You can disable Capital for connected accounts using the Express Dashboard, but existing offers remain available until they expire and active financing continues through completion.
- Source: https://docs.stripe.com/capital/connect-integration

## Related

- [Custom Capital Program (API Integration)](./capital-api-integration.md)
- [Capital Customer Support (Servicing)](./capital-servicing.md)
- [Financing Offers](./financing-offers.md)
- [Financing Transactions](./financing-transactions.md)
