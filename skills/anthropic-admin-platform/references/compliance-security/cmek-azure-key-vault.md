<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-azure-key-vault / last verified: 2026-08-07 -->

# Configure Azure Key Vault for CMEK

Configure an Azure Key Vault key as a customer-managed encryption key (CMEK) for your Anthropic organization. Requires RBAC-authorized vault with public network access and purge protection enabled, permissions to create keys/assign RBAC roles and Entra service principals, an Anthropic Admin API key, and the `az` CLI.

## Signature / Usage

```bash
# Consent to Anthropic's multitenant app (creates a service principal in your tenant)
az ad sp create --id 8635ae1a-3e5d-44e8-a4ed-e0f614466f87

# Create an RSA key (3072-bit+, wrapKey/unwrapKey only)
az keyvault key create --vault-name <vault> --name <key> --kty RSA --size 3072 --ops wrapKey unwrapKey

# Grant Key Vault Crypto User scoped to the key
az role assignment create --role "Key Vault Crypto User" \
  --assignee-object-id <sp-object-id> --assignee-principal-type ServicePrincipal \
  --scope "${VAULT_ID}/keys/<key>"
```

## Options / Props

| Field | Value |
| --- | --- |
| Multitenant app client ID (US) | `8635ae1a-3e5d-44e8-a4ed-e0f614466f87` |
| App display name | `anthropic-cmek-client-us` |
| Key type | RSA (or RSA-HSM on Premium-SKU vault), 3072-bit or larger |
| Role | `Key Vault Crypto User`, scoped to the individual key (or vault if dedicated) |

## Notes

- Azure Key Vault does not support symmetric key wrapping; the key must be RSA with `wrapKey`/`unwrapKey` in allowed operations.
- Vault must have `enableRbacAuthorization: true`, `enablePurgeProtection: true` (cannot be disabled once enabled — without it a soft-deleted key can be purged, causing irreversible data loss), and public network access allowed (Anthropic uses the public data-plane endpoint; private endpoints unsupported).
- Configure Diagnostic Settings routing the `AuditEvent` log category, since Key Vault does not emit data-plane audit logs by default.
- Registration (Claude Platform) needs `vault_uri`, `key_name`, and `tenant_id` — use the vault's own `tenantId`, not the currently-active subscription's tenant, in cross-tenant setups.
- Validation failure causes: RBAC propagation delay (wait and retry), network ACLs blocking Anthropic, conditional access policies targeting service principals.
- Claude Enterprise: CMEK applies org-wide, one key, no per-workspace attach step.

## Related

- [cmek.md](./cmek.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
