<!-- source: https://platform.claude.com/docs/en/manage-claude/cmek-key-lifecycle / last verified: 2026-11-14 -->

# What happens when you rotate, disable, or delete your encryption key

With CMEK your key lives in your KMS and Claude keeps a record that points to it; deleting the key and deleting the record are different actions. Covers what each action does, disabling and restoring, unreachable keys, and changing keys.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (the 400 returned while the key is disabled, code `cmek_key_disabled`):

```text
Customer-managed encryption key is disabled or revoked. Re-enable the key to restore access.
```

## Options / Props

| Action | What happens | Can you undo it? |
| --- | --- | --- |
| Attach the key to a workspace (Claude Enterprise: add it to the organization) | Protects data written after it takes effect; on Claude Platform also locks the workspace's data retention setting | No; the key can't be removed or replaced |
| Rotate the key material within the same key | Done in your KMS on your schedule; needs no action in Claude | Nothing to undo; keep earlier key versions enabled |
| Disable the key, or remove (revoke) Anthropic's access | Can take up to 1 hour to apply; in-flight requests in that hour might still succeed; then Claude can't read or write the data and requests fail | Re-enable the key or restore Anthropic's access (two limits apply) |
| Delete the key in your KMS, schedule it for deletion, or destroy its key material | Anthropic can't recover the data the key protects | Not by Anthropic; it keeps no copy of your key |
| Delete the key's record in Claude (Delete encryption key in the Claude Console) | Possible only while no workspace, including an archived one, uses the key | No |

## Notes

- While the key is disabled, Messages API requests in a workspace that uses it return a 400 error with the code `cmek_key_disabled`.
- Re-enabling the key or restoring access brings back access to the data. Two limits: requests that failed while the key was disabled aren't retried, and disabling doesn't pause retention periods.
- Unreachable key (for example a KMS outage): requests that store data under your key might still succeed for up to 1 hour, then fail until Anthropic can reach the key again; on Claude Enterprise this includes messages in chat and voice mode. On the Messages API such requests return a 503 error with code `cmek_key_unreachable` and can be retried; the Message Batches API retries them until the key is available or the batch expires.
- A workspace or organization can't switch to a different key or go back to none. On Claude Platform create a new workspace with a different key or no key and move traffic; on Claude Enterprise there is no way to change keys or stop using CMEK within the organization.
- Source: https://platform.claude.com/docs/en/manage-claude/cmek-key-lifecycle (retrieved 2026-11-14)
- Source (snippet): https://platform.claude.com/docs/en/manage-claude/cmek-troubleshooting (retrieved 2026-11-14)

## Related

- [cmek.md](./cmek.md)
- [cmek-how-it-works.md](./cmek-how-it-works.md)
- [cmek-troubleshooting.md](./cmek-troubleshooting.md)
- [cmek-data-retention.md](./cmek-data-retention.md)
