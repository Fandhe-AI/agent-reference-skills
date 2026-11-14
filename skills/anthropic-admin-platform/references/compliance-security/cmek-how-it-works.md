<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-how-it-works / last verified: 2026-11-14 -->

# How CMEK works

With customer-managed encryption keys (CMEK), your key wraps (envelope encryption) the data keys Anthropic uses to encrypt your stored data. Covers what one key protects, where it lives, when it takes effect and what you can see.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms (an AWS key policy statement; the condition ties the key to your Anthropic organization ID):

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
    }
  }
}
```

## Options / Props

| Aspect | Claude Platform / Claude Platform on AWS | Claude Enterprise |
| --- | --- | --- |
| What one key protects | a workspace (one key can serve several) | the whole organization (only one key) |
| Key location | AWS KMS, Google Cloud KMS or Azure Key Vault; provider may charge | same |
| Encryption operations (Claude Platform and Claude Enterprise) | processed in US regions; key can be outside the US at some latency cost | same |

## Notes

- Your key never leaves your KMS and your data never goes to it; data keys cross between Anthropic and your cloud. Anthropic keeps no copy of your key, so without it Claude can't read the data it protects.
- On Claude Platform and Claude Enterprise your key carries your Anthropic organization ID, which ties the key to your organization; depending on your KMS the ID goes in a key policy condition, a label, or a tag. A key without the ID fails verification; a key shared between organizations carries each ID.
- An AWS KMS key policy can name workspaces by compartment ID: the UUID Anthropic gives each workspace for encryption, not the `wrkspc_` workspace ID.
- Effect: the key protects only data written after it takes effect; existing data (chats, files, sessions) stays under Anthropic's key and isn't re-encrypted. On Claude Platform and Claude Platform on AWS a key attached before a workspace's first request takes effect with that request; in a workspace in use it can take up to a day, and data written meanwhile stays under Anthropic's key, hence a new workspace is recommended.
- Visibility: your cloud's audit log can record every operation Anthropic performs with your key (where logging must be turned on, the setup page lists it as a prerequisite); in AWS CloudTrail some entries are expected errors. Changes to your CMEK configuration appear in the Compliance API Activity Feed; key operations don't.
- Each wrap or unwrap is a round trip to your KMS and can add a little latency. For cryptographic standards such as FIPS, see the CMEK whitepaper in the Trust Center (https://trust.anthropic.com/resources).
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-how-it-works (retrieved 2026-11-14)
- Source (snippet): https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-key-lifecycle.md](./cmek-key-lifecycle.md)
- [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
