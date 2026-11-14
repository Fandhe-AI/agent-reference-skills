<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-data-retention / last verified: 2026-11-14 -->

# CMEK, data retention, and ZDR

Why a Claude Platform workspace with a customer-managed key retains data, what that means for zero data retention (ZDR), and what Anthropic can preserve outside your key.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (the error shown when attaching a key to a workspace that does not retain data):

```text
CMEK keys can only be attached to workspaces in this organization that have inference data retention enabled.
```

## Options / Props

| Topic | Rule |
| --- | --- |
| Claude Platform: CMEK and ZDR | can't share a workspace; a key attaches only to a workspace with Standard data retention (30 days) |
| After attaching | data retention can't be turned off for that workspace; to return to ZDR create a new workspace and move traffic |
| ZDR organization on Claude Platform | can use CMEK: switch one workspace to Standard data retention, accept the data retention terms, attach the key; the switched workspace can't be the default workspace (its retention follows the organization's); other workspaces keep ZDR |
| Claude Enterprise | CMEK and ZDR can be used together, but artifacts can't be turned on |

## Notes

- Preservation outside your key, under Anthropic-managed encryption, in three narrow cases: records Anthropic is required by law to retain (for example material reported to NCMEC under 18 U.S.C. § 2258A); exigent risk of serious harm (for example CBRNE weapons development, offensive cyberattacks, imminent threats of violence); violations of Section D.4 of Anthropic's Commercial Terms of Service or equivalent terms in a customer's other applicable agreement.
- Outside CSAM screening, preservation requires a human reviewer's explicit decision and follows Anthropic's retention policy for commercial data. Each preservation generates a Compliance API Activity Feed event with a reason code; see CMEK content preservation on the Access Transparency page.
- Safety screening metadata (records derived from automated safety scans, such as pattern identifiers and match indicators, not conversation content) is retained under Anthropic-managed encryption and remains readable after key revocation.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-data-retention (retrieved 2026-11-14)
- Source (snippet): https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-coverage-claude-platform.md](./cmek-coverage-claude-platform.md)
- [cmek-coverage-claude-enterprise.md](./cmek-coverage-claude-enterprise.md)
- [access-transparency.md](./access-transparency.md)
- [api-and-data-retention.md](./api-and-data-retention.md)
