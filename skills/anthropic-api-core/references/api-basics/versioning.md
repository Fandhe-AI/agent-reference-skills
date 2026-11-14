<!-- source: https://platform.claude.com/docs/en/api/versioning / last verified: 2026-11-14 -->

# Versions

Every API request must send an `anthropic-version` header (e.g. `anthropic-version: 2026-10-21`); client SDKs set this automatically.

## Signature / Usage

```
anthropic-version: 2026-10-21
```

## Options / Props

| Version | Notes |
|---|---|
| `2026-10-21` | Messages API: a `document` block directly in an `assistant` message returns 400; a `text` block with non-empty `citations` in a `user` message (directly or inside `search_result`) returns 400; `temperature`, `top_p`, `top_k` removed (400 on every model). Admin API renames: RBAC groups `roles` → `role_ids`; RBAC group members `group_id` → `rbac_group_id`; RBAC roles `name` → `display_name`; rate-limit entries `group_type` → `group.type`; API keys `workspace_id` → `scope.workspace_id` (all-workspaces key has no `scope.workspace_id`). Claude Enterprise Analytics API: per-user usage/cost reports `actor.email` → `actor.email_address`; activity summaries `summaries` → `data` |
| `2023-06-01` | New incremental SSE streaming format (deltas, not cumulative text); all events are named SSE events; removed `data: [DONE]`; removed legacy `exception`/`truncated` response values |
| `2023-01-01` | Initial release |

## Notes

- Within a given version, Anthropic preserves existing input and output parameters.
- Anthropic may still add optional inputs, add output values, change error conditions, or add new enum-like output variants (e.g. streaming event types) without a version bump — following documented usage will not break.
- Anthropic recommends using the latest API version whenever possible.
- `2026-10-21` is available on the Claude API, Claude Platform on AWS, Claude Models on Google Cloud (Anthropic managed and Google managed), and Microsoft Foundry. On Amazon Bedrock it is available only for Claude 4.7 and later models; for earlier models on Bedrock, keep the API version (and SDK version) you use today.
- The Migration notes below are sourced from https://platform.claude.com/docs/en/api/migration-2026-10-21 (verified 2026-11-14); the frontmatter source covers only `/api/versioning`.
- Migration (2023-06-01 → 2026-10-21): SDKs send the API version that was current when their major version was released. First SDK versions sending `2026-10-21`: Python `anthropic` 2.0.0, TypeScript `@anthropic-ai/sdk` 1.0.0, C# `Anthropic` 13.0.0, Go `github.com/anthropics/anthropic-sdk-go/v2` 2.0.0, Java `com.anthropic:anthropic-java` 3.0.0, PHP `anthropic-ai/sdk` 1.0.0, Ruby `anthropic` gem 2.0.0, CLI `ant` 2.0.0 (Go module path `github.com/anthropics/anthropic-cli/v2`). Without an SDK, set `anthropic-version: 2026-10-21` yourself.
- Migration (2023-06-01 → 2026-10-21): the new SDKs and CLI send the API key as `Authorization: Bearer <key>` instead of `X-Api-Key`; the Claude API accepts either header. The Text Completions API is removed from the TypeScript, Go, Java, and Ruby SDKs and the CLI.
- Migration (2023-06-01 → 2026-10-21): if a request relies on a non-default `temperature` / `top_p` / `top_k`, either stop sending the parameter or keep that request on `2023-06-01`.

## Related

- [overview](./overview.md)
- [errors](./errors.md)
