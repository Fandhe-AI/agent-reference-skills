<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek / last verified: 2026-11-14 -->

# Customer-managed encryption keys (CMEK)

Use a key you hold in your own AWS KMS, Google Cloud KMS, or Azure Key Vault to encrypt certain data Claude stores at rest. The key stays under your control: you can rotate it, audit its use, and remove Anthropic's access. CMEK is optional; contact your Anthropic account team to turn it on for an eligible organization.

## Signature / Usage

```text
/claude-api tell me about customer-managed encryption keys
```

## Options / Props

| Setup page | For |
| --- | --- |
| [cmek-aws-kms.md](./cmek-aws-kms.md) | Claude Platform and Claude Enterprise |
| [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md) | Claude Platform and Claude Enterprise |
| [cmek-azure-key-vault.md](./cmek-azure-key-vault.md) | Claude Platform and Claude Enterprise |
| [cmek-claude-platform-on-aws.md](./cmek-claude-platform-on-aws.md) | organizations whose Claude Console sidebar shows Account managed by AWS |

| Product | Role needed for setup |
| --- | --- |
| Claude Platform | Organization Admin |
| Claude Platform on AWS | Admin |
| Claude Enterprise | Owner or Primary Owner |

## Notes

- On Claude Platform you can also add and attach your key with the Admin API ([cmek-admin-api.md](./cmek-admin-api.md)).
- What you commit to: once you attach a key you can't remove or replace it; the key protects only data written after it takes effect; if the key is deleted Anthropic can't recover the data it protects (while it is disabled Claude can't read that data, and re-enabling restores access); on Claude Platform a workspace with a key must retain data.
- What the key encrypts, what stays under Anthropic's key and which features turn off or change depends on the product; see the coverage pages. Compliance API local session transcripts are covered on Claude Enterprise (the messages endpoint returns 503 instead of transcript content if the key can't be used).
- Limited preservation outside your key can occur in three narrow cases (legal requirement, exigent risk of serious harm, Commercial Terms Section D.4 violations); each generates a Compliance API Activity Feed `cmek_preserve` event (see the access-transparency page for the reason codes).
- Disabling the key or removing Anthropic's access can take up to 1 hour to apply; in-flight requests during that hour might still succeed.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek (retrieved 2026-11-14)

## Related

- [cmek-how-it-works.md](./cmek-how-it-works.md)
- [cmek-data-retention.md](./cmek-data-retention.md)
- [cmek-coverage-claude-platform.md](./cmek-coverage-claude-platform.md)
- [cmek-coverage-claude-enterprise.md](./cmek-coverage-claude-enterprise.md)
- [cmek-key-lifecycle.md](./cmek-key-lifecycle.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-admin-api.md](./cmek-admin-api.md)
- [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md)
- [access-transparency.md](./access-transparency.md)
- [api-and-data-retention.md](./api-and-data-retention.md)
