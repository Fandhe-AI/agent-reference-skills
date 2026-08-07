<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek / last verified: 2026-08-07 -->

# Customer-managed encryption keys (CMEK)

Encrypt Claude workspace data at rest with a key you control, provisioned in AWS KMS, Google Cloud KMS, or Azure Key Vault. Optional opt-in; contact your Anthropic account team to activate. Only Organization Admins (Claude Platform) or Owners/Primary Owner (Claude Enterprise) can configure it.

## Signature / Usage

CMEK is configured per workspace (Claude Platform, via Admin API) or per organization (Claude Enterprise, via claude.ai > Organization settings > Data and privacy). It protects only data written after the key is enabled; existing data stays under Anthropic-managed keys.

## Options / Props

| Aspect | Claude Platform | Claude Enterprise |
| --- | --- | --- |
| Scope | Per workspace | Per organization |
| Configuration | Admin API (`external_keys`) | claude.ai Organization settings > Data and privacy |
| Regions | US only (`us-east-2`, `us-central1`/`us-east5`, `northcentralus`/`eastus2`) | US only |

## Notes

- Enabling CMEK is **permanent and irreversible**: once attached, a key cannot be detached or swapped; a new workspace is required to change key or return to zero data retention. Revoking/disabling the key makes all CMEK-protected data permanently inaccessible.
- Encrypted: message content, files/attachments, MCP/tool config (Claude Platform); chat content including skills/plugins/artifacts, attachments, Claude Code CLI, Cowork in Claude Desktop, Office agents, Claude in Chrome (Claude Enterprise). Backups/snapshots inherit the key.
- Disabled/modified under CMEK: Workbench, raw-content Compliance API endpoints, some beta features (Claude Platform); conversation search, audit log export, signed URLs, personal preferences (Claude Enterprise).
- Not encrypted regardless: Activity Feed, audit logs, OTEL telemetry (so compliance is maintained even if key is revoked); account data (names, emails, profile pictures).
- CMEK is allowed with Zero Data Retention (ZDR) on both products.
- Limited preservation outside your key can occur for legal requirements, exigent risk of harm, or Commercial Terms Section D.4 violations; each generates a `cmek_preserve` Activity Feed event.
- Key revocation can take up to 1 hour (cache TTL); in-flight requests may still succeed during that window.

## Related

- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
- [access-transparency.md](./access-transparency.md)
- [api-and-data-retention.md](./api-and-data-retention.md)
