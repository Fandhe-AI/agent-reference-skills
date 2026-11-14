<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-azure-key-vault / last verified: 2026-11-14 -->

# Set up CMEK with Azure Key Vault

Create an Azure Key Vault key, give Anthropic's multitenant application access to it, and put it to use in Claude Platform or Claude Enterprise.

## Signature / Usage

```bash
az ad sp create --id 8635ae1a-3e5d-44e8-a4ed-e0f614466f87
```

```bash
az keyvault key create \
  --vault-name <your-vault-name> \
  --name <your-key-name> \
  --kty RSA --size 3072 \
  --ops wrapKey unwrapKey \
  --tags anthropic-org-<ORGANIZATION_UUID>=true
```

```bash
VAULT_ID=$(az keyvault show --name <your-vault-name> --query id -o tsv)

az role assignment create \
  --role "Key Vault Crypto User" \
  --assignee-object-id <sp-object-id> \
  --assignee-principal-type ServicePrincipal \
  --scope "${VAULT_ID}/keys/<your-key-name>"
```

## Options / Props

| Item | Value |
| --- | --- |
| Application name | `anthropic-cmek-client-us` (use only this name and client ID, never ones sent by email or chat; requests no Microsoft Graph permissions) |
| Client ID | `8635ae1a-3e5d-44e8-a4ed-e0f614466f87` |
| Key | RSA, 3072 or larger; permitted operations only `wrapKey` / `unwrapKey` (Wrap Key, Unwrap Key); `--kty RSA-HSM` for an HSM-backed key |
| Organization tag | tag name `anthropic-org-<ORGANIZATION_UUID>`, value `true`; `<ORGANIZATION_UUID>` is your Anthropic organization ID in lowercase |
| Role | `Key Vault Crypto User`, assigned on the key itself (not the vault) to the `anthropic-cmek-client-us` service principal |
| Vault `rbac` | must be `true` |
| Vault `purge` | must be `true`; if `false` or `null` turn on purge protection first (can't be turned off again) |
| Vault `pub` | `"Enabled"`; private endpoints aren't supported |
| Vault `net` | `"Allow"`, or `"Deny"` with Anthropic's outbound IP addresses in `ipRules` |
| Region | lowest latency `northcentralus` or `eastus2` |
| Values Claude needs | vault URI, key name, tenant ID (leave Client ID empty) |

## Notes

- Check the vault first:

```bash
az keyvault show --name <your-vault-name> \
  --query "{rbac:properties.enableRbacAuthorization, purge:properties.enablePurgeProtection, pub:properties.publicNetworkAccess, net:properties.networkAcls.defaultAction, ipRules:properties.networkAcls.ipRules, uri:properties.vaultUri, tenantId:properties.tenantId}"
```

- Prerequisites: you can create keys and assign RBAC roles on the vault; you can create service principals in your Entra tenant (Application Administrator, Cloud Application Administrator, or equivalent custom role); the vault has a diagnostic setting for the `AuditEvent` log category, otherwise Anthropic's key operations leave no audit trail.
- If `az ad sp create` reports the service principal already exists, get its object ID with `az ad sp show --id 8635ae1a-3e5d-44e8-a4ed-e0f614466f87 --query id -o tsv`. In the portal, search Microsoft Entra ID > Enterprise applications (clear the default application-type filter) for `anthropic-cmek-client-us`.
- Existing key: verification fails without the organization tag. The key must be RSA, 3072-bit or larger. Run `az keyvault key set-attributes --vault-name <your-vault-name> --name <your-key-name> --ops wrapKey unwrapKey --tags anthropic-org-<ORGANIZATION_UUID>=true`; it replaces the current version's tags, so list any to keep in `--tags` as `name=value`. You still need the service principal and role assignment.
- In Claude on Claude Platform: Encryption keys on the Data retention page > Add key, Display name, select Azure Key Vault, Continue; check the key has the Organization tag; enter Vault URI, Key name, Tenant ID, leave Client ID empty, Add; Verify (Connected or Connection failed); select the workspace, under Encryption key select the key, Save, confirm and Confirm. In a ZDR organization select Standard data retention first and Accept the terms after Save.
- In Claude on Claude Enterprise: one key for the whole organization; claude.ai > Organization settings > Data and privacy > Encryption keys > Add key, select Azure Key Vault, tick the checkbox, Continue, enter the same details, Add; the check can take up to 30 seconds (Encryption key configured. then Done). Adding turns off or changes some features for every user.
- Adding or attaching can't be undone. To script this on Claude Platform use the Admin API.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-azure-key-vault (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-admin-api.md](./cmek-admin-api.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
