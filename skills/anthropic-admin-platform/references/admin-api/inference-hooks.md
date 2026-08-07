<!-- source: https://platform.claude.com/docs/en/manage-claude/inference-hooks / last verified: 2026-08-07 -->

# Inference hooks

Send each governed prompt to your organization's AI security server for an allow or deny verdict before inference proceeds.

## Signature / Usage

```json
// Verdict shape
{"action": "allow"}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` | hook event | The only event today; fires once per governed inference request, before inference begins |
| allow | verdict | Inference proceeds normally |
| deny | verdict | Request rejected; user sees `deny_reason` plus a standing message |
| shadow mode | rollout tool | Observes verdicts on live traffic without blocking |
| rollout percentage | rollout tool | Inspects a chosen fraction of requests |
| exclusions | rollout tool | Exempts members of chosen roles entirely |

## Notes

- Beta, available to Claude Enterprise organizations only; configuring requires the `organization:manage` permission (Admin, Owner, Primary owner roles)
- Your AI security server sees transcript text, tool calls/results, and text extracted from attachments; never raw file/image bytes, system prompts, or Anthropic-internal context
- Default verdict timeout is 5 seconds; unreachable/erroring/timed-out servers fall back to the organization's failure handling setting (block or allow)
- Governs conversations across claude.ai, Cowork, and Claude Code sessions; not available on Amazon Bedrock or Google Cloud; not available to Platform organizations (API access via Claude Platform); voice mode not covered
- Verdicts are allow/deny only; rewriting or redacting a prompt is not supported
- Differs from the Compliance API by acting inline before inference (vs. after the fact)

## Related

- [inference-hooks-configuration](./inference-hooks-configuration.md)
- [inference-hooks-endpoint](./inference-hooks-endpoint.md)
