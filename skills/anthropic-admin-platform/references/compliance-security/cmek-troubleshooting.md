<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting / last verified: 2026-11-14 -->

# Troubleshoot CMEK

Cause and fix for a CMEK error message, a failed verification, or an unexpected log entry. Verify in the Claude Console, Add on claude.ai, and the Admin API validate call all run the same check.

## Signature / Usage

```bash
aws kms get-key-policy \
  --region <REGION> \
  --key-id <KEY_ARN> \
  --policy-name default
```

## Options / Props

Request errors after setup:

| Code | Status | Cause / fix |
| --- | --- | --- |
| `cmek_key_disabled` | 400 | Your KMS refused Anthropic's call. Check in order: key disabled; Anthropic's access removed; on AWS KMS the key policy lists workspaces but not this one; on AWS KMS an IP condition blocks Anthropic's outbound IP addresses |
| `cmek_key_network_blocked` | 400 | Blocked by the KMS's network access controls; the key itself might be healthy. Allow Anthropic's published IP addresses |
| `cmek_key_unreachable` | 503 | Anthropic couldn't reach your key; retry |

Verification failures:

| Provider | Cause | Fix |
| --- | --- | --- |
| AWS KMS | Wrong organization ID | `org_uuid` condition must list your Anthropic organization ID, the UUID without the `org_` prefix |
| AWS KMS | Workspace missing from policy | a `compartment_uuid` condition must list the compartment ID of each attached workspace |
| AWS KMS | Access granted through IAM instead of key policy | Anthropic's role needs access in the key policy itself |
| Google Cloud KMS | Wrong organization label | key needs the organization label with your organization ID in lowercase |
| Google Cloud KMS | Domain restricted sharing | blocks the grant to Anthropic's service account; add an exception |
| Google Cloud KMS | Disabled or destroyed key version | the key's primary version must be enabled |
| Azure Key Vault | Wrong organization tag | the key's current version needs the organization tag |
| Azure Key Vault | Role assignment not yet in effect | can take a few minutes; wait, retry |
| Azure Key Vault | Vault network rules block Anthropic | check against the vault settings Anthropic needs |

Claude Platform on AWS (no Verify step; problems show when you attach): key policy mismatch (compare `get-key-policy` output with the setup page policy); condition mismatch (any `EncryptionContext` or `aws:SourceArn` condition must include this workspace); key state or location (enabled, single-Region, same AWS account and region as the workspace); missing permissions (`kms:DescribeKey`, `kms:Encrypt`, `kms:Decrypt` on the key). If it still fails, find the denied `kms:` event in CloudTrail in the key's account, fix, and click Save again.

Refusals when attaching or adding a key:

| Situation | Fix |
| --- | --- |
| Workspace doesn't retain data (message: `CMEK keys can only be attached to workspaces in this organization that have inference data retention enabled.`) | ZDR organization; switch the workspace to Standard data retention first (a ZDR organization's default workspace can't be switched; use another) |
| Workspace has no Encryption key setting | Only a workspace that retains data has it |
| No Encryption keys section | In the Claude Console select Organization from the top dropdown on the Data retention page; otherwise your role lacks it or CMEK isn't on (your Anthropic account team turns it on) |
| `This workspace already has a different external key attached.` | A workspace's key can't be replaced; create a new workspace |
| claude.ai: `The encryption key couldn’t be added.` | The key check failed; find the cause, click Add key again (dialog reopens with earlier details), select the checkbox, Continue, Add |

## Notes

- A feature that stopped working might be one CMEK turns off; check the Claude Platform or Claude Enterprise coverage list. If nothing fits, contact your Anthropic account team.
- For a key that already protects data, when replacing its policy add a statement so Anthropic can still decrypt; list the compartment ID of every workspace the key is or was attached to:

```json
{
  "Sid": "AllowAnthropicCMEKDecryptExistingData",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::915198916910:role/anthropic-cmek-client-us"
  },
  "Action": "kms:Decrypt",
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:EncryptionContext:anthropic:compartment_uuid": ["<COMPARTMENT_UUID>"]
    }
  }
}
```

- Google Cloud check of the grant: `gcloud kms keys get-iam-policy <your-key-name> --project=<your-project-id> --location=<region> --keyring=<your-keyring-name>`.
- Expected CloudTrail errors: on Claude Platform and Claude Enterprise each check (verify, attach, view on claude.ai) adds four expected access-denied errors. To filter, match all three values: `requestParameters.encryptionContext.associatedData` = `Y21lay12YWxpZGF0aW9u`, `userIdentity.accountId` = `915198916910`, `resources.ARN` = `arn:aws:kms:<REGION>:<AWS_ACCOUNT_ID>:key/<KEY_ID>`. The first value alone isn't enough because any caller can set it.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-key-lifecycle.md](./cmek-key-lifecycle.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
- [cmek-claude-platform-on-aws.md](./cmek-claude-platform-on-aws.md)
- [cmek-admin-api.md](./cmek-admin-api.md)
