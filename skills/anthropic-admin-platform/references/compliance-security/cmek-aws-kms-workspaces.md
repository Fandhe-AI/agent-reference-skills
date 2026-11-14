<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms-workspaces / last verified: 2026-11-14 -->

# Limit an AWS KMS key to specific workspaces

Add an optional key policy condition that names the workspaces allowed to use your AWS KMS key. The setup key policy lets every workspace in your organization use the key; with this condition a workspace that isn't listed can't.

## Signature / Usage

Replace the `AllowAnthropicCMEKCrypto` statement with this one:

```json
{
  "Sid": "AllowAnthropicCMEKCrypto",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::915198916910:role/anthropic-cmek-client-us"
  },
  "Action": ["kms:Encrypt", "kms:Decrypt"],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:EncryptionContext:anthropic:org_uuid": ["<ORGANIZATION_UUID>"]
    },
    "StringEqualsIfExists": {
      "kms:EncryptionContext:anthropic:compartment_uuid": ["<COMPARTMENT_UUID>"]
    }
  }
}
```

## Options / Props

| Placeholder | Value |
| --- | --- |
| `<ORGANIZATION_UUID>` | your Anthropic organization ID |
| `<COMPARTMENT_UUID>` | compartment ID of every workspace that uses the key |

## Notes

- Add a workspace's compartment ID to the policy before you attach the key to that workspace; for a new workspace, create it without the key first.
- Copy the compartment ID: in the Claude Console open the Data retention page, select the workspace from the top dropdown, copy the Compartment ID under Encryption key; the Get Workspace endpoint returns it as `compartment_id`. A Claude Enterprise organization has one compartment ID; copy it from your key under Encryption keys in claude.ai > Organization settings > Data and privacy.
- A key that already protects data needs one more statement (see the troubleshooting page, `AllowAnthropicCMEKDecryptExistingData`).
- Replace the policy on an existing key: in the AWS KMS console open the key and the Key policy tab; if you see Switch to policy view click it; click Edit; replace the JSON with your key policy; click Save changes.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms-workspaces (retrieved 2026-11-14)

## Related

- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-how-it-works.md](./cmek-how-it-works.md)
- [cmek-claude-platform-on-aws.md](./cmek-claude-platform-on-aws.md)
