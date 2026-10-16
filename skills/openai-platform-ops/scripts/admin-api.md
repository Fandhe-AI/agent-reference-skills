# admin-api

`curl` calls and SDK snippets for the Administration API (organization/project management, spend limits, service accounts, usage, costs, and Private Safety Processing external storage). All calls require an Admin API key. See `openai-api-core`'s `scripts/auth.md` for how to export `OPENAI_API_KEY`; `OPENAI_ADMIN_KEY` is set separately below.

## Set the Admin API key

Admin API keys are separate from regular API keys and only work with administration endpoints. Create one from the organization admin-keys settings page, then export it.

```bash
export OPENAI_ADMIN_KEY="sk-admin-..."
```

## Set an organization spend limit

Creates or replaces the organization's monthly hard spend limit. `threshold_amount` is in cents (the example below sets a $100 monthly limit). Once reached, affected API requests return a `429` error.

```bash
curl -X POST https://api.openai.com/v1/organization/spend_limit \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "threshold_amount": 10000,
    "currency": "USD",
    "interval": "month"
  }'
```

> **Warning**: A hard spend limit interrupts production traffic once reached (requests fail with `organization_spend_limit_exceeded`). Enforcement is not instantaneous, so recorded spend can slightly exceed the configured amount.

## Create a project service-account API key

Creates a scoped API key for an existing project service account. Export `PROJECT_ID` and `SERVICE_ACCOUNT_ID` first (e.g. from `terraform output -raw service_account_id` if the service account was created with Terraform — see `terraform.md`). The full key value is returned only once in this response.

```bash
export PROJECT_ID="proj_123"
export SERVICE_ACCOUNT_ID="svc_acct_123"
umask 077

curl -X POST \
  "https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID/api_keys" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production App",
    "scopes": ["api.responses.write"]
  }' \
  --output service-account-api-key.json
```

> **Warning**: The key `value` in the response is shown only once and cannot be recovered later. Move it into a secrets manager immediately, then delete the response file (`rm service-account-api-key.json`). Never commit it or store it in Terraform state/output.

## Retrieve usage data

Queries bucketed completions usage for the organization. `start_time` (Unix seconds) is required; `bucket_width` and `limit` are optional.

No official `curl` example is published for this endpoint. The command below is a `curl` translation of the official OpenAI Cookbook's Python `requests` example — the endpoint path, header names, and query-parameter names (`start_time`, `bucket_width`, `limit`, and the `page` cursor) are verbatim from that source; the `curl` syntax and the `start_time` calculation are not from the docs. `start_time` is computed at run time (last 30 days) with POSIX arithmetic so it works on both macOS and Linux and never falls outside the retention window.

```bash
start_time=$(($(date +%s) - 30*24*3600))

curl -G "https://api.openai.com/v1/organization/usage/completions" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  --data-urlencode "start_time=$start_time" \
  --data-urlencode "bucket_width=1d" \
  --data-urlencode "limit=7"
```

Pagination: if the response includes `next_page`, pass it back as the `page` query parameter to fetch the next bucket.

## Retrieve cost data

Same endpoint family as usage above. Only `start_time` (Unix seconds, required) is documented for this endpoint in official sources — no verified parameter list or `curl`/SDK example beyond the endpoint path itself.

```bash
curl -G "https://api.openai.com/v1/organization/costs" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  --data-urlencode "start_time=1730419200"
```

## Regional base URLs for Private Safety Processing

Private Safety Processing (PSP) commands use `OPENAI_API_BASE`, set to the endpoint confirmed for your project: `https://api.openai.com` for global, `https://us.api.openai.com` for US, or `https://eu.api.openai.com` for Europe. Load the organization Admin API key securely into `OPENAI_ADMIN_KEY` and run the remaining PSP commands in the same shell session.

```bash
OPENAI_API_BASE='<OPENAI_API_BASE>'
OPENAI_ORG_ID='<OPENAI_ORG_ID>'
OPENAI_STORAGE_URL="$OPENAI_API_BASE/v1/organization/external_storage"
```

## Register external storage (PSP, AWS S3)

Registers a customer-managed bucket for a project. Replace every `CUSTOMER_...` placeholder with your IDs and the resources you created. The response contains an `id` beginning with `extstorage_` and `status: "pending"`; keep the ID for validation. Registration alone does not change the project's retention policy.

```bash
curl --fail-with-body -sS -X POST "$OPENAI_STORAGE_URL" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID" \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "project_id": "CUSTOMER_PROJECT_ID",
    "provider": {
      "type": "aws",
      "bucket": "CUSTOMER_BUCKET_ARN",
      "role_arn": "CUSTOMER_ROLE_ARN"
    }
  }'
```

The Azure (`"type": "azure"`) and GCP (`"type": "gcp"`) payloads use different `provider` fields. See the Private Safety Processing guide for those request bodies.

## Validate external storage (PSP)

Replace `EXTERNAL_STORAGE_ID` with the ID returned by registration. A successful response has `status: "validated"`.

```bash
EXTERNAL_STORAGE_ID='<EXTERNAL_STORAGE_ID>'
curl --fail-with-body -sS -X POST \
  "$OPENAI_STORAGE_URL/$EXTERNAL_STORAGE_ID/validate" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID"
```

> **Warning**: Validation activates customer-managed retention (Zero Data Retention with Private Safety Processing) for that project. Disconnecting the last storage connection later resets the policy to the organization default, and models that require ZDR with PSP may become unavailable.

## Retrieve a saved external storage registration (PSP)

```bash
curl --fail-with-body -sS \
  "$OPENAI_STORAGE_URL/$EXTERNAL_STORAGE_ID" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "OpenAI-Organization: $OPENAI_ORG_ID"
```

"Validated" records a successful check, not continuous storage health.

## Endpoints with SDK-only examples in official docs

The following Administration API operations have no published `curl` example on developers.openai.com — only Python/JS/Go/Java/Ruby SDK snippets. Use the SDK, or construct the call from the [Administration API reference](https://developers.openai.com/api/reference/administration/overview) once official request bodies are published.

Invite a user by email (Python SDK):

```python
invite = client.admin.organization.invites.create(
    email="user@example.com",
    role="reader",
)

print(invite.id)
```

Retrieve audit logs (Python SDK):

```python
audit_logs = client.admin.organization.audit_logs.list(limit=10)

for audit_log in audit_logs.data:
    print(audit_log.id)
```

Restrict model access for a project (Python SDK):

```python
model_permissions = client.admin.organization.projects.model_permissions.update(
    "proj_abc",
    mode="allow_list",
    model_ids=["gpt-4.1", "o3"],
)

print(model_permissions.mode)
```

## Notes

- Regular API key setup (`OPENAI_API_KEY`) and SDK installation are covered by the `openai-api-core` skill's `scripts/` — not duplicated here.
- The Administration API's per-endpoint reference pages under `developers.openai.com/api/reference/resources/**` are auto-generated and currently carry no rendered `curl` examples; the commands above come from the Admin APIs guide, the Terraform service-accounts guide, the Private Safety Processing guide, and the OpenAI Cookbook usage-API notebook.
- Safety alert and safety case lookups use a restricted API key, not an Admin key — see `safety.md`.
- Not covered in this file because no official `curl` or complete SDK request example could be located: list/create/delete users, list/create/archive projects, list/delete project API keys, list/create/delete service accounts (service-account creation is documented only via the Terraform provider — see `terraform.md`). Consult the [Administration API reference](https://developers.openai.com/api/reference/administration/overview) directly for these.
