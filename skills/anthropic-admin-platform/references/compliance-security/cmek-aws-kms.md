<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms / last verified: 2026-08-07 -->

# Configure AWS KMS for CMEK

Configure an AWS KMS key as a customer-managed encryption key (CMEK) for your Anthropic organization. Requires `kms:CreateKey`/`kms:PutKeyPolicy` permissions, an Anthropic Admin API key, and the AWS CLI.

## Signature / Usage

```bash
# Register the external key (Claude Platform)
curl -sS https://api.anthropic.com/v1/organizations/external_keys \
  -H "x-api-key: <anthropic-admin-api-key>" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "display_name": "<friendly-name>",
    "geo": "us",
    "provider_config": {
      "type": "aws",
      "kms_arn": "<key-arn>",
      "role_arn": "arn:aws:iam::915198916910:role/anthropic-cmek-client-us"
    }
  }'

# Validate, then attach to a workspace
curl -sS -X POST https://api.anthropic.com/v1/organizations/external_keys/ekey_<id>/validate ...
curl -sS -X POST https://api.anthropic.com/v1/organizations/workspaces/<workspace-id> \
  -d '{"external_key_id": "ekey_<id>"}' ...
```

## Options / Props

| Field | Value |
| --- | --- |
| Anthropic IAM role ARN | `arn:aws:iam::915198916910:role/anthropic-cmek-client-us` |
| Key policy statements | Account root admin; Anthropic `kms:Encrypt`/`kms:Decrypt` (scoped by `EncryptionContext:anthropic:compartment_uuid`); Anthropic `kms:DescribeKey` (no `EncryptionContext` condition possible) |

## Notes

- Use only the published ARN; never trust an identifier from email/chat/onboarding channels.
- The AWS Console "Create key" wizard's usage-permissions step produces an over-permissive policy if you add Anthropic's account ID there; finish with admin-only permissions and replace the key policy JSON manually with the role-scoped statements.
- `EncryptionContext` condition is optional (defense-in-depth); ciphertext is bound to your compartment ID regardless. On Claude Platform, validation always sends the all-zeros compartment UUID (`00000000-0000-0000-0000-000000000000`), so any condition must allow both the all-zeros value and each attached workspace's compartment ID.
- Claude Platform: find compartment ID under Workspace > Security > Encryption keys or via `GET` Workspace. Claude Enterprise: CMEK applies org-wide (one key, no per-workspace attach step); compartment ID shown in the Add-key flow.
- Claude Platform on AWS: external key endpoints not yet available; register/validate/attach in Claude Console instead.
- Validation failure causes: encryption-context mismatch, AWS Resource Control Policies (RCPs) blocking the cross-account role, access granted via IAM instead of the key policy, region mismatch.

## Related

- [cmek.md](./cmek.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
