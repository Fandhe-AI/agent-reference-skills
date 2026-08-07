<!-- source: https://platform.claude.com/docs/en/manage-claude/inference-hooks-configuration / last verified: 2026-08-07 -->

# Configure Inference hooks

Allow Inference hooks for your Claude Enterprise organization, connect your AI security server, and control enforcement, failure handling, and rollout.

## Signature / Usage

```text
claude.ai > Organization settings > Data and privacy > Inference hooks
1. Allow for your organization
2. Configure endpoint (https:// URL, up to 16 custom headers)
3. Test connection
4. Save (reveals signing secret once)
5. Choose failure handling (Block / Allow / Shadow mode) + verdict timeout (1-10000ms, default 5000ms)
6. Choose rollout percentage (0-100)
7. Turn on Enforce verdicts
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Endpoint URL | string | `https://` URL only, receives verdict requests |
| Custom request headers | up to 16 | Static headers for authenticating the caller; values write-only after save |
| Block the request | failure mode | Fail closed while AI security server unreachable |
| Allow the request | failure mode | Fail open (default: `Allow the request`, 5000ms) |
| Shadow mode | failure mode | Runs hook against live traffic without blocking anything |
| Requests inspected (%) | rollout | 0-100, each request rolls once per conversation turn |
| Exclusions | roles | Custom roles only (not built-in); excluded members' prompts never sent to the AI security server |
| Custom blocked prompt message | string | Up to 500 characters appended after `deny_reason` |

## Notes

- Requires `organization:manage` permission (Admin, Owner, Primary owner, or a custom role granted it)
- Turning on "Allow for your organization" always forces "Enforce verdicts" off
- Signing secret is generated and revealed once on first save; cannot be retrieved later, only rotated
- Circuit breaker trips on sustained webhook failures and stops enforcement until an admin turns Enforce verdicts back on
- Rotating the signing secret is an immediate cutover; requests signed with the previous secret may still arrive briefly afterward
- Toggling "Enforce verdicts" takes about a minute to propagate across Anthropic servers

## Related

- [inference-hooks](./inference-hooks.md)
- [inference-hooks-endpoint](./inference-hooks-endpoint.md)
