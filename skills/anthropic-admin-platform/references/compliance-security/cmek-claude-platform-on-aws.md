<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-claude-platform-on-aws / last verified: 2026-11-14 -->

# Set up CMEK on Claude Platform on AWS

Create an AWS KMS key in your AWS account and attach it to a workspace on Claude Platform on AWS. Use this page if your Claude Console sidebar shows Account managed by AWS; otherwise use the AWS KMS setup page. The key policy gives access to the AWS service principal `aws-external-anthropic.amazonaws.com`.

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
      "Sid": "AllowClaudePlatformOnAWSCrypto",
      "Effect": "Allow",
      "Principal": {
        "Service": "aws-external-anthropic.amazonaws.com"
      },
      "Action": ["kms:Encrypt", "kms:Decrypt", "kms:GenerateDataKey"],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "kms:EncryptionContext:anthropic:compartment_uuid": ["<COMPARTMENT_UUID>"]
        }
      }
    },
    {
      "Sid": "AllowClaudePlatformOnAWSDescribe",
      "Effect": "Allow",
      "Principal": {
        "Service": "aws-external-anthropic.amazonaws.com"
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
| Service principal | `aws-external-anthropic.amazonaws.com` (use only the name published on the page, never one sent by email or chat) |
| Key type / usage / origin / regionality | Symmetric / Encrypt and decrypt / KMS / Single-Region key; Anthropic rejects alias ARNs and multi-Region keys |
| Key location | the AWS account that hosts your organization, same region as the workspace |
| Console role | Admin role in the Claude Console |
| IAM: sign in | `aws-external-anthropic:AssumeConsole` |
| IAM: add a key | `aws-external-anthropic:RegisterKey` |
| IAM: view keys | `aws-external-anthropic:ListKeys` and `aws-external-anthropic:GetKey` |
| IAM: attach a key | `aws-external-anthropic:UpdateWorkspace` or `aws-external-anthropic:CreateWorkspace`, plus `kms:DescribeKey`, `kms:Encrypt`, `kms:Decrypt` on the key |
| IAM: pick key from list (optional) | `kms:ListKeys` and `kms:DescribeKey` |
| Your AWS permissions | `kms:CreateKey` and `kms:PutKeyPolicy` |

## Notes

- Prerequisites also: CMEK turned on for your organization; a workspace with no key attached, ideally new, since existing data stays under Anthropic's key. Compartment ID: Claude Console Data retention page > select the workspace > Compartment ID under Encryption key (Get Workspace returns `compartment_id`). To script the Claude part use the endpoints in the Claude Platform on AWS IAM actions page (Encryption keys section).
- The `EncryptionContext` condition is optional and limits the key to listed workspaces; before attaching to another workspace add its compartment ID and replace the key policy. To drop it delete the `Condition` block of `AllowClaudePlatformOnAWSCrypto`; if you add it later list every workspace the key is already attached to.
- To narrow access use the key policy, not IP-based restrictions: add an `aws:SourceArn` condition to both service principal statements. All workspaces in your account: `"ArnLike": {"aws:SourceArn": "arn:aws:aws-external-anthropic:*:<AWS_ACCOUNT_ID>:workspace/*"}`; specific workspaces: `arn:aws:aws-external-anthropic:<REGION>:<AWS_ACCOUNT_ID>:workspace/<WORKSPACE_ID>`.
- Console wizard: select Symmetric, Encrypt and decrypt, Advanced options > Key material origin KMS, Regionality Single-Region key; alias such as `anthropic-cmek`; select no key administrators or key users and nothing under Other AWS accounts; Edit and replace the whole policy; Finish; copy the key ARN.
- In Claude (sign in to the Claude Console through AWS): Encryption keys on the Data retention page (select Organization from the top dropdown if missing) > Add key, enter Display name > in KMS key ARN select the key or Enter ARN manually > Add. Then select the workspace, under Encryption key select the key, Save, tick the confirmation checkbox and Confirm; you see Workspace settings updated. Attaching can't be undone (can't remove or replace; deleted key means unrecoverable data) and checks the key with one encrypt and one decrypt call, so key policy problems show up here; see the troubleshooting page. Once the key takes effect CloudTrail records calls to your key.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-claude-platform-on-aws (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-aws-kms.md](./cmek-aws-kms.md)
- [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-how-it-works.md](./cmek-how-it-works.md)
