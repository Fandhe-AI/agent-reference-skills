---
source: https://opencode.ai/docs/console/api/
---

# Service Account API Key

Create a restricted service account key for CI, then authenticate Console API requests with it.

```bash
export SERVICE_API_KEY="oc_sk_..."
```

```bash
curl --fail-with-body "https://opencode.ai/inference/v1/models" \
  --header "Authorization: Bearer oc_sk_..."
```

A key that only calls models needs:

```text
Permissions: Restricted
Models:      Request
```

## Notes

- Owners and admins create service accounts in **Settings › Service accounts**, then **Add API Key**; the full key is shown only once. Store it in a secrets manager, not in the repository.
- Optional **Expiration**: Never, 1 day, 7 days, 30 days, or Custom (1 to 365 days). Expired keys cannot be renewed.
- Requests outside a key's permissions return HTTP `403`; revoked or expired keys return HTTP `401`.
- Service account keys cannot invite members, change roles, manage billing, change workspace settings, or manage models, even with **All**.
- Personal keys (**Account › Personal API keys**) act as the member who created them; service account usage counts to the service account's budget.
