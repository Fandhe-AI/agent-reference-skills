# Terraform: Service Accounts

An OpenAI service account is a nonhuman, project-owned identity. Terraform creates the account and assigns a least-privilege role through a group; the API key itself is created outside Terraform state.

## Signature / Usage

```terraform
resource "openai_project_service_account" "application" {
  project_id = "proj_123"
  name       = "example-application-development-service-account"
}

resource "openai_project_role" "application" {
  project_id  = openai_project_service_account.application.project_id
  role_name   = "Application response writer"
  permissions = ["api.responses.write"]
}

resource "openai_group" "application_access" {
  name = "example-application-development-access"
}

resource "openai_group_user" "application" {
  group_id = openai_group.application_access.group_id
  user_id  = openai_project_service_account.application.id
}

resource "openai_project_group_role" "application_access" {
  project_id = openai_project_service_account.application.project_id
  group_id   = openai_group.application_access.group_id
  role_id    = openai_project_role.application.role_id
}
```

Create the API key outside Terraform via the Administration API:

```bash
umask 077

curl -X POST \
  "https://api.openai.com/v1/organization/projects/$PROJECT_ID/service_accounts/$SERVICE_ACCOUNT_ID/api_keys" \
  -H "Authorization: Bearer $OPENAI_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Production App", "scopes": ["api.responses.write"]}' \
  --output service-account-api-key.json
```

Move the key `value` into a secrets manager immediately, then delete the response file (`rm service-account-api-key.json`) — never commit it or store it in Terraform state/output.

## Notes

- The full API-key value is returned only once, in the create response — later retrieval is redacted, so a lost key can't be recovered; only replaced.
- Don't assign the built-in `member` or `owner` role when a custom role covers the workload's needs.
- API-key scopes can further restrict a service account's permissions but can't grant permissions outside its assigned project role.
- Workloads that support workload identity federation can use the same service account and role without ever creating an API key.
- To adopt an existing service account, import it (`terraform import openai_project_service_account.application "$PROJECT_ID/$SERVICE_ACCOUNT_ID"`) before applying — applying first creates a duplicate instead of adopting it. Import does not recover the API key or import group membership/role.
- Credential rotation: create a new service account resource, add it to the same group, create a new API key, deploy, verify, then remove the old service-account resource (this deletes the remote identity).

## Related

- [Terraform: Projects and Access](./terraform-projects-and-access.md)
- [Admin API Keys](./admin-api-keys.md)
- [Workload Identity Federation](./workload-identity-federation.md)
