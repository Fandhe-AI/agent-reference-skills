---
source: https://docs.cloud.google.com/sdk/gcloud/reference/billing
---

# Billing

Copy-paste commands for checking billing status, creating budgets, granting billing account access, and calling the Budget API.

## Signature / Usage

### Check whether billing is enabled for a project

```bash
gcloud beta billing projects describe PROJECT_ID
```

Billing is enabled when `billingAccountName` is set and `billingEnabled: true`.

### Check a billing account

```bash
gcloud beta billing accounts describe ACCOUNT_ID
```

`open: true` means the account is active; `masterBillingAccount` set means it is a subaccount.

### Enable the APIs used for budgets

```bash
gcloud services enable billingbudgets.googleapis.com \
    cloudbilling.googleapis.com \
    --project="${PROJECT_ID}"
```

### Create a budget with a Pub/Sub notification

Adapted (not in the official docs): `--threshold-rule=percent=1.0` replaces `percent=100`, because `percent` is a 0.0-1.0 ratio per `gcloud billing budgets create --help`.

```bash
gcloud billing budgets create \
    --billing-account="${BILLING_ACCOUNT_ID}" \
    --display-name="Budget for ${PROJECT_ID}" \
    --budget-amount="${BUDGET_AMOUNT}" \
    --threshold-rule=percent=1.0 \
    --notifications-rule-pubsub-topic="projects/${PROJECT_ID}/topics/${TOPIC_ID}"
```

Create the Pub/Sub topic first:

```bash
gcloud pubsub topics create "${TOPIC_ID}" --project="${PROJECT_ID}"
```

### Grant billing account access to a service account

```bash
gcloud billing accounts add-iam-policy-binding "${BILLING_ACCOUNT_ID}" \
    --member="serviceAccount:${SERVICE_ACCOUNT}" \
    --role="roles/billing.admin"
```

This is the grant the official cost-control function needs to change project billing; prefer a narrower billing role where it is enough.

### Get a service account email for a deployed function

```bash
SERVICE_ACCOUNT=$(gcloud functions describe stop-billing-function --region="${REGION}" --format="value(serviceConfig.serviceAccountEmail)" --project="${PROJECT_ID}")
```

### Authenticate for the Budget API and Cloud Billing API

```bash
gcloud init
gcloud auth print-access-token
```

### List budgets (REST)

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets"
```

### Create a budget (REST)

Save the request body to `request.json` (see the Budget API reference page), then:

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: api-user-project-id" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets"
```

### Update a budget (REST)

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: api-user-project-id" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets/budget-id"
```

### Delete a budget (REST)

```bash
curl -X DELETE \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: project-id" \
     "https://billingbudgets.googleapis.com/v1/billingAccounts/billing-account-id/budgets/budget-id"
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--billing-account` | `billing budgets create` | Billing account that owns the budget |
| `--budget-amount` | `billing budgets create` | Budget amount |
| `--threshold-rule` | `billing budgets create` | Alert threshold, for example `percent=1.0` (a 0.0-1.0 ratio; 1.0 = 100% of the budget) |
| `--notifications-rule-pubsub-topic` | `billing budgets create` | Pub/Sub topic for budget notifications |

## Notes

- Warning: use a disposable billing account or test project for the budget `DELETE` call and for `add-iam-policy-binding` on a billing account; always name the exact `budget-id` and account, and never omit the target.
- Disabling or changing the billing link of a project has no gcloud command in the fetched sources (the console, `projects.updateBillingInfo`, or the official Cloud Run function do it); disabling billing stops all services and some resources may be unrecoverable, so it is not included here.
- Adapted from the official docs: `--threshold-rule` `percent` is a ratio between 0.0 and 1.0 per `gcloud billing budgets create --help`; `percent=100` would mean 10,000% of the budget.
- The Budget API request needs `x-goog-user-project` set to the project where the API is enabled.
- Source: https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/budget-api (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/modify-project (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/create-billing-account (retrieved 2026-11-14)

## Related

- [project-billing-link.md](../references/billing/accounts/project-billing-link.md)
- [account-lifecycle.md](../references/billing/accounts/account-lifecycle.md)
- [budget-api.md](../references/billing/budgets-alerts/budget-api.md)
- [automated-cost-control.md](../references/billing/budgets-alerts/automated-cost-control.md)
- [billing-apis.md](../references/billing/api/billing-apis.md)
