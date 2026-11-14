<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms / last verified: 2026-11-14 -->

# Set up CMEK with AWS KMS

Create an AWS KMS key, give Anthropic's IAM role access to it, and put it to use in Claude Platform or Claude Enterprise. If your Claude Console sidebar shows Account managed by AWS, follow the Claude Platform on AWS setup page instead.

## Signature / Usage

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AccountRootAdmin",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<AWS_ACCOUNT_ID>:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
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
        }
      }
    },
    {
      "Sid": "AllowAnthropicCMEKDescribe",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::915198916910:role/anthropic-cmek-client-us"
      },
      "Action": "kms:DescribeKey",
      "Resource": "*"
    }
  ]
}
```

```bash
aws kms create-key \
  --region <REGION> \
  --description "Anthropic CMEK" \
  --key-usage ENCRYPT_DECRYPT \
  --policy file://key-policy.json
```

## Options / Props

| Item | Value |
| --- | --- |
| Anthropic IAM role | `arn:aws:iam::915198916910:role/anthropic-cmek-client-us` (use only the ARN published on the page, never one sent by email or chat) |
| `<AWS_ACCOUNT_ID>` | your AWS account ID |
| `<ORGANIZATION_UUID>` | your Anthropic organization ID, the UUID without the `org_` prefix (Claude Console Organization page, or claude.ai Organization settings > Organization and access) |
| Key options | Key type Symmetric; Key usage Encrypt and decrypt; Key material origin KMS; Regionality Single-Region key |
| Region | any AWS commercial region; lowest latency `us-east-2` |
| AWS permissions | `kms:CreateKey` and `kms:PutKeyPolicy` |
| Claude role | Organization Admin (Claude Platform); Owner or Primary Owner (Claude Enterprise) |

## Notes

- Keep the `kms:EncryptionContext:anthropic:org_uuid` condition, or verification fails. You can also limit the key to specific workspaces by listing compartment IDs (see the workspaces page). If you replace the policy on a key that already protects Claude data, add one more statement (see the troubleshooting page).
- Any IP restriction on AWS KMS access must allow Anthropic's outbound IP addresses. To use a key you already have, replace its key policy.
- Console wizard: Create key; leave key administrators and key users empty and add nothing under Other AWS accounts (the key policy already grants access); Edit and replace the whole policy; Finish; copy the key ARN.
- Each check of the key adds four expected access-denied errors to CloudTrail; the troubleshooting page shows how to filter them.
- In Claude on Claude Platform: Encryption keys on the Data retention page > Add key, Display name, select AWS KMS, Continue; paste the KMS key ARN after checking your policy contains the Organization ID for the key policy shown; Verify (Connected, or Connection failed); select the workspace, under Encryption key select the key, Save, confirm the checkbox and Confirm (Workspace settings updated). In a ZDR organization select Standard data retention first and Accept the data retention terms after Save.
- In Claude on Claude Enterprise: CMEK applies to the whole organization and you can add only one key. Go to claude.ai > Organization settings > Data and privacy, Encryption keys > Add key, Display name, select AWS KMS, tick the checkbox, Continue, paste the key ARN, Add. The check can take up to 30 seconds; Encryption key configured. then Done. Adding the key turns off or changes some features for every user; to try CMEK first use a separate organization.
- Adding or attaching can't be undone; the key can't be removed or replaced, and if it is deleted Anthropic can't recover the data. To script this on Claude Platform use the Admin API (the Claude Platform on AWS endpoints are described on its own setup page).
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md)
- [cmek-claude-platform-on-aws.md](./cmek-claude-platform-on-aws.md)
- [cmek-admin-api.md](./cmek-admin-api.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-azure-key-vault.md](./cmek-azure-key-vault.md)
- [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md)
