---
source: https://docs.cloud.google.com/billing/docs/how-to/create-billing-account
---

# Create, Close, and Reopen a Cloud Billing Account

Create a self-serve Cloud Billing account, understand authorization holds and India identity verification, and close or reopen an account.

## Signature / Usage

Create (console): Billing > Manage billing accounts > Create account.

1. Enter Name (do not include PII or security data). Select Organization if the drop-down appears, and Country if prompted (country sets currency and available payment methods).
2. Continue; choose an existing Google payments profile (a "Business profile for Cloud") or create a new one.
3. Submit and enable billing.

Close (self-serve): Billing > Account management > choose account > Close billing account.
Reopen (self-serve): Manage billing accounts > clear the `Status: Active` filter > open the Closed account > Account Management > Reopen billing account.

To confirm account status afterwards, use (command from https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled):

```text
gcloud beta billing accounts describe ACCOUNT_ID
```

## Options / Props

### Permissions

| Task | Permission | Predefined role |
|------|------------|-----------------|
| Create account in an Organization | `billing.accounts.create` on the Organization | Billing Account Creator |
| Create account without an Organization | none required | n/a |
| Use an existing payments profile | Sign-up and purchase on the payments profile | Google payments role |
| Close account | `billing.accounts.close` | Billing Account Administrator |
| Reopen account | `billing.accounts.reopen` | Billing Account Administrator |

### Which billing account pays for what

| Product | Billing account needed |
|---------|-----------------------|
| Google Cloud | Cloud Billing account |
| Google Maps Platform | Cloud Billing account |
| Google Cloud + Google Maps Platform | 1 Cloud Billing account |
| Google Workspace | Google Workspace billing account (separate) |

## Notes

- Country and currency cannot be changed later; to change the country you must create a new billing account. Google restricts services in some countries or regions (for example China, Crimea, Cuba, Iran, North Korea, Syria).
- Payments profile Account type (Individual vs Business) is permanent and may be used for tax and identity verification. Choosing Business without being an organization can bring administrative overhead and charges for managing or closing multiple billing accounts.
- A temporary pre-authorization hold may appear on the card statement; it is not a charge, drops automatically (typically within a week, up to 7 business days after adding a method), and Google cannot expedite removal; contact the card issuer if it persists.
- India only: complete identity verification within 30 days of creating the account (Billing account overview > Verify now) or the account and Google Cloud access might be suspended. Organizations provide a mobile number, executive contacts, and a registration or proof-of-address document; individuals provide proof of identity (passport, driver's license, PAN card, Election Commission ID) and proof of address; e-Aadhaar via DigiLocker is supported.
- Warning: closing an account stops all billable services in all linked projects, and linked projects cannot use even free services while the account is not billable; some resources may be deleted. Before closing, view linked projects and either link them to another active billing account or disable billing on each. Prepay credits for Gemini API in AI Studio are forfeited on close (consider upgrading to Postpay first for a refund of unused credits).
- You cannot close an account that has outstanding charges or outdated payment information (pay the balance or fix payment methods first). Invoiced accounts cannot be closed or reopened in the console; contact your Google Cloud sales specialist or Cloud Billing Support.
- After closing, usage accrued before closure is still billed as the last bill unless the account is reopened. Reopening makes all linked projects incur charges again; payments issues or suspensions must be resolved first.
- Changing and closing accounts are sensitive actions and may require reauthentication.
- Source: https://docs.cloud.google.com/billing/docs/how-to/create-billing-account
- Source: https://docs.cloud.google.com/billing/docs/how-to/close-or-reopen-billing-account
- Source: https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [billing-concepts.md](./billing-concepts.md)
- [project-billing-link.md](./project-billing-link.md)
- [../access/iam-roles.md](../access/iam-roles.md)
