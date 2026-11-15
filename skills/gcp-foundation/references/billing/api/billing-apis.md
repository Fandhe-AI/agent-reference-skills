---
source: https://docs.cloud.google.com/billing/docs/apis
---

# Cloud Billing APIs, Authentication, and IAM

Overview of the Cloud Billing APIs (Account API, Catalog API, Budget API, Pricing API), how to authenticate, and the IAM permissions each method needs.

## Signature / Usage

APIs:

| API | Endpoint | Purpose |
|-----|----------|---------|
| Cloud Billing Account API | `cloudbilling.googleapis.com` (v1) | List/get/patch billing accounts, create subaccounts, link projects (`projects.getBillingInfo`, `projects.updateBillingInfo`), IAM policy |
| Cloud Billing Catalog API | `cloudbilling.googleapis.com` (v1) | Public Services and SKUs list; no permissions required, all data is public |
| Cloud Billing Budget API | `billingbudgets.googleapis.com` (v1) | Budgets (see budget-api.md) |
| Google Cloud Pricing API (Preview) | `cloudbilling.googleapis.com` (v2beta, v1beta) | Public list prices and custom contract prices |

Authentication: client libraries use Application Default Credentials (ADC); gcloud and REST use `gcloud auth print-access-token`. Local development setup:

```bash
gcloud init
gcloud auth application-default login
```

REST pattern (the official example lists service accounts; use the same pattern for any REST request):

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

Service account impersonation for local development:

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

Pricing API requests (public data needs an API key and no IAM permission):

```text
GET https://cloudbilling.googleapis.com/v2beta/services?key=API_KEY&pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
GET https://cloudbilling.googleapis.com/v2beta/skus?key=API_KEY&pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN&filter=FILTER
GET https://cloudbilling.googleapis.com/v1beta/skus/SKU_ID/prices?key=API_KEY&pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
GET https://cloudbilling.googleapis.com/v1beta/skus/SKU_ID/price?key=API_KEY&currencyCode=CURRENCY
```

Custom contract prices (need billing-account permissions and a bearer token):

```text
GET https://cloudbilling.googleapis.com/v1beta/billingAccounts/BILLING_ACCOUNT_ID/skuGroups?pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
GET https://cloudbilling.googleapis.com/v1beta/billingAccounts/BILLING_ACCOUNT_ID/skuGroups/SKU_GROUP_ID/skus?pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
GET https://cloudbilling.googleapis.com/v1beta/billingAccounts/BILLING_ACCOUNT_ID/skus/SKU_ID/prices?pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN
GET https://cloudbilling.googleapis.com/v1beta/billingAccounts/BILLING_ACCOUNT_ID/skus/SKU_ID/price?currencyCode=CURRENCY
```

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://cloudbilling.googleapis.com/v1beta/billingAccounts/BILLING_ACCOUNT_ID/skuGroups?pageSize=PAGE_SIZE&pageToken=PAGE_TOKEN"
```

## Options / Props

### Cloud Billing Account API permissions

| Method | Required permission | Roles |
|--------|---------------------|-------|
| `billingAccounts.create` (subaccounts) | `billing.accounts.update` on the parent account | Billing Account Administrator |
| `billingAccounts.get` | `billing.accounts.get` | Administrator, Costs Manager, Viewer, or User |
| `billingAccounts.list` | none; returns accounts the caller can access | Any billing role on accounts, or Project Billing Manager on projects |
| `billingAccounts.getIamPolicy` | `billing.accounts.getIamPolicy` | Administrator, Costs Manager, Viewer, or User |
| `billingAccounts.setIamPolicy` | `billing.accounts.setIamPolicy` | Billing Account Administrator |
| `billingAccounts.testIamPermissions` | none | n/a |
| `billingAccounts.patch` | `billing.accounts.update` | Billing Account Administrator |
| `billingAccounts.projects.list` | `billing.resourceAssociations.list` | Administrator, Costs Manager, or Viewer |
| `projects.getBillingInfo` | `resourcemanager.projects.get` on the project | Project Owner, Editor, Viewer, or Browser |
| `projects.updateBillingInfo` | `billing.resourceAssociations.create` on the account AND `resourcemanager.projects.createBillingAssignment` on the project | Billing Account Administrator or User, AND Project Billing Manager |

### Pricing API paging and limits

| Parameter | Notes |
|-----------|-------|
| `pageSize` | Default 50; SKU list maximum 5000; SKU-group SKU list default 5000 |
| `pageToken` | From `nextPageToken`; absent when all items are listed |
| `filter` | For example `service="services/6F81-5844-456A"` (Compute Engine) |
| SKU ID `-` | In `skus/-/prices`, returns prices for all SKUs |
| Custom price permissions | for example `billing.billingAccountSkuGroupSkus.list` |

## Notes

- Billing API access is granted through a service account with roles assigned to it; the Catalog API needs no permission.
- Enable the Cloud Billing API (`cloudbilling.googleapis.com`) via `serviceusage.services.enable` (for example Service Usage Admin). Use a dedicated FinOps / billing administration project for billing-related APIs.
- If gcloud warns that your account lacks `serviceusage.services.use`, ask for Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`) and run `gcloud auth application-default set-quota-project PROJECT_ID`.
- Impersonation needs `iam.serviceAccounts.getAccessToken` (Service Account Token Creator); the ADC impersonation form is supported only for Go, Java, Node.js, and Python client libraries.
- On Google Cloud, use the service account attached to the compute resource; for most services it must be attached at creation (Compute Engine can attach later). In production do not grant Owner, Editor, or Viewer roles to service accounts. Outside Google Cloud prefer workload identity federation.
- The Pricing API is Preview (Pre-GA terms apply). Dropping the Authorization header for public data requires an API key.
- Billing sample requests are shown for curl; the official page also gives PowerShell equivalents.
- Source: https://docs.cloud.google.com/billing/docs/apis
- Source: https://docs.cloud.google.com/billing/docs/authentication
- Source: https://docs.cloud.google.com/billing/docs/access-control
- Source: https://docs.cloud.google.com/billing/docs/how-to/get-pricing-information-api
- Fetched 2026-11-14. Content is CC BY 4.0; code samples are Apache 2.0.

## Related

- [../budgets-alerts/budget-api.md](../budgets-alerts/budget-api.md)
- [../access/iam-roles.md](../access/iam-roles.md)
- gcp-cli (gcloud commands in general)
