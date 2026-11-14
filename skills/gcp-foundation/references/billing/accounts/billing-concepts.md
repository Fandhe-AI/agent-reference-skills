---
source: https://docs.cloud.google.com/billing/docs/concepts
---

# Cloud Billing Concepts and Charging Cycles

Cloud Billing accounts, Google payments profiles and accounts, account types, charging cycles (invoiced, Postpay monthly or threshold, Prepay), subaccounts, and how resource hierarchy relates to billing.

## Signature / Usage

A Cloud Billing account accrues and calculates costs for usage in Google Cloud, Google Maps Platform, Firebase, and Google AI Studio, then routes the costs to a linked Google payments account. The billing account ID is an 18-character alphanumeric value, for example:

```text
010101-F0FFF0-10XX01
```

(Snippet taken from https://docs.cloud.google.com/billing/docs/how-to/find-billing-account-id.)

Finding the billing account ID in the console:

- With `billing.accounts.get`: Billing > Account management (ID near top of page), or Billing > My Billing Accounts (list with name, ID, status, account type, organization; downloadable as CSV; clear the `Status: Active` filter to see closed accounts).
- With project-level permissions only: Billing > My Projects shows the billing account name and ID for each project you can access.
- The "Last 30 days' spend" column needs `billing.accounts.getSpendingInformation` (not granted by Billing Account User).

Charging cycle lookup: Billing > Payment overview shows charging cycle, outstanding balance, last payment date and amount.

## Options / Props

### Cloud Billing account vs Google payments

| Aspect | Cloud Billing account | Google payments profile / account |
|--------|----------------------|-----------------------------------|
| Managed in | Google Cloud console (cloud-level resource) | Google payments center (Google-level resource) |
| Role | Tracks costs of all linked projects; defines who pays; single currency | Stores legal entity, country/region, payment instruments; processes payments for all Google services; document center |
| Access control | IAM billing roles | Google payments users and permissions |
| Statements | One monthly statement per account (self-serve) or one invoice (invoiced), unless split charging cycles / split invoicing apply | Charging cycle assigned per payments account |

### Account types

| Type | Billable status | Payment instrument | Notes |
|------|-----------------|--------------------|-------|
| Self-serve (online) | Free trial account or Paid account | Credit/debit card or ACH direct debit (by country) | Sign up online; documents (statements, receipts, tax invoices) in console; Postpay cycle auto-assigned |
| Invoiced (offline) | Paid account | Check or wire transfer | Must be eligible; invoices by mail or email, also in console |

### Charging cycles

| Cycle | When you pay |
|-------|--------------|
| Invoicing | Per agreement (for example Net 30); invoice available by the fifth business day of the following month |
| Postpay, automatic monthly payments | Payment instrument charged on the second day of every month for previous-month charges |
| Postpay, threshold billing | Charged on the 1st of each month and whenever accrued costs reach an automatically assigned threshold (for example an initial $100); threshold rises automatically for accounts in good standing |
| Prepay | Credits purchased before use, limited to Gemini API in AI Studio; optional auto-reload |

### Google payments profile types

| Type | Characteristics |
|------|-----------------|
| Individual | Only you manage the profile; cannot add users; one Individual profile per Google user account |
| Organization (Business) | Multiple users, all can see payment info; multiple profiles allowed |

### Resource hierarchy for billing

| Level | Notes |
|-------|-------|
| Domain | Primary identity; linked to Google Workspace or Cloud Identity; exactly one Organization |
| Organization | Root node; owns IAM/org policies for projects, folders, billing accounts |
| Folders | Group projects; require an organization; exactly one parent |
| Projects | Required for service-level resources; basis for enabling APIs and IAM |
| Labels | Key-value pairs forwarded to billing; new labels can take up to a day to appear in Cloud Billing |

## Notes

- Payments profile type (Individual vs Organization) cannot be changed after creation.
- A project not linked to an active, valid billing account cannot use Google Cloud or Google Maps Platform services, even free-tier ones. For Firebase and Google AI Studio, a project without billing reverts to the Free tier.
- Ownership (IAM inheritance) and payment linkage are separate: a billing account can pay for projects in another organization, but is owned by one organization only. Projects do not inherit permissions from the billing account they are linked to.
- Self-serve accounts: you cannot choose or edit the Postpay charging cycle type. Free trial accounts are not charged and are paid by the Welcome credit until upgraded.
- Subaccounts are for resellers: a billing subaccount is owned by the reseller's parent account (which must be on invoiced billing), groups project charges in a separate invoice section, can have projects, exports, and IAM; created and managed via the Cloud Billing Account API.
- Billing contacts live on the Google payments profile/account and receive billing information about the payment instrument.
- Enable BigQuery export as early as possible so the data reflects usage from the beginning.
- Source: https://docs.cloud.google.com/billing/docs/concepts
- Source: https://docs.cloud.google.com/billing/docs/how-to/billing-cycle
- Source: https://docs.cloud.google.com/billing/docs/how-to/find-billing-account-id
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [account-lifecycle.md](./account-lifecycle.md)
- [project-billing-link.md](./project-billing-link.md)
- [../access/iam-roles.md](../access/iam-roles.md)
- [../export-bigquery/export-setup.md](../export-bigquery/export-setup.md)
