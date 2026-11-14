<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-admin-api / last verified: 2026-11-14 -->

# Add and attach an encryption key with the Admin API

Create, validate, and attach a customer-managed encryption key with three Admin API calls. These calls work on Claude Platform only; on Claude Enterprise or Claude Platform on AWS follow the setup page for your product. Creating an external key is what Add key does in the Claude Console, and validating is what Verify does.

## Signature / Usage

```bash
curl -sS "https://api.anthropic.com/v1/organizations/external_keys" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{
    "display_name": "<friendly-name>",
    "geo": "us",
    "provider_config": {
      "type": "aws",
      "kms_arn": "<key-arn-from-create-key-step>"
    }
  }'
```

```bash
curl -sS -X POST "https://api.anthropic.com/v1/organizations/external_keys/ekey_<id>/validate" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21"
```

```bash
curl -sS -X POST "https://api.anthropic.com/v1/organizations/workspaces/<workspace-id>" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{
    "external_key_id": "ekey_<id>"
  }'
```

## Options / Props

| Field | Provider | Value |
| --- | --- | --- |
| `display_name` | all | friendly name |
| `geo` | all | `us` (in every example) |
| `provider_config.type` | all | `aws`, `gcp` or `azure` |
| `provider_config.kms_arn` | `aws` | key ARN |
| `provider_config.key_name` | `gcp` | full key resource name `projects/<your-project-id>/locations/<region>/keyRings/<your-keyring-name>/cryptoKeys/<your-key-name>` |
| `provider_config.vault_uri` | `azure` | `https://<your-vault-name>.vault.azure.net/` |
| `provider_config.key_name` | `azure` | the key name |
| `provider_config.tenant_id` | `azure` | the vault's tenant ID |
| `external_key_id` (workspace update) | all | `ekey_<id>`; workspace ID starts with `wrkspc_` |

| Call | Response |
| --- | --- |
| create | `{"type": "external_key", "id": "ekey_<id>", "display_name": "<friendly-name>"}` (copy `id` for the next two steps) |
| validate | `{ "type": "external_key_validation", "status": "success", "error": null }` |
| workspace update | shows the attached key's ID in `external_key_id` |

## Notes

- Before you start: CMEK is turned on for your organization; you have an Admin API key (samples read it from `ANTHROPIC_API_KEY`); the key exists in AWS KMS, Google Cloud KMS or Azure Key Vault with the values the setup steps tell you to copy; you have a workspace that retains data, ideally a new one, because existing data stays under Anthropic's key.
- The docs show the same calls in CLI (`ant organization:external-keys create`, `ant organization:external-keys validate --external-key-id "ekey_<id>"`, `ant organization:workspaces update --workspace-id "<workspace-id>" --external-key-id "ekey_<id>"`) and in Python, TypeScript, C#, Go, Java, PHP and Ruby SDKs.
- If validate returns `status` of `failure`, `error` says why; see the troubleshooting page.
- Attaching a key can't be undone; if the key is deleted, Anthropic can't recover the data it protects. A refused attach is looked up in the troubleshooting page.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-admin-api (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-key-lifecycle.md](./cmek-key-lifecycle.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
