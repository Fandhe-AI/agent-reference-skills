<!-- source: https://platform.claude.com/docs/en/about-claude/models/model-ids-and-versions / last verified: 2026-08-07 -->

# Model IDs and versioning

How Claude model IDs are structured and versioned, including the dateless format introduced with the Claude 4.6 generation and what it means for stability.

## Signature / Usage

Each Claude model ID identifies a pinned version of the model. When a model ID is used in an API request, the underlying model remains constant for the lifetime of that ID. This guarantee covers model IDs, not the convenience aliases that the Claude API accepts for some earlier models.

### The 4.6 generation and later

Starting with the Claude 4.6 generation, model IDs use a dateless format:

```text
claude-{name}-{major}[-{minor}]
```

Major-version releases such as Claude Sonnet 5 and Claude Opus 5 omit the minor segment. Examples: `claude-sonnet-4-6`, `claude-sonnet-5`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-opus-5`.

On Amazon Bedrock: `anthropic.claude-{name}-{major}[-{minor}]` (e.g. `anthropic.claude-sonnet-4-6`, `anthropic.claude-opus-5`). Claude Opus 4.6 is the last Bedrock model ID to include the `-v1` suffix (`anthropic.claude-opus-4-6-v1`); the suffix was dropped starting with Claude Sonnet 4.6. On Google Cloud, the format matches the Claude API.

### Before the 4.6 generation

Models before the 4.6 generation include a snapshot date in the ID:

```text
claude-{name}-{major}-{minor}-{YYYYMMDD}
```

Examples: `claude-sonnet-4-5-20250929`, `claude-haiku-4-5-20251001`.

On Amazon Bedrock: `anthropic.claude-{name}-{major}-{minor}-{YYYYMMDD}-v1:0` (e.g. `anthropic.claude-sonnet-4-5-20250929-v1:0`). On Google Cloud, the date is separated with `@`: `claude-{name}-{major}-{minor}@{YYYYMMDD}` (e.g. `claude-haiku-4-5@20251001`).

On the Claude API, these models also have shorter aliases (e.g. `claude-sonnet-4-5`) that point to the most recent dated snapshot for that minor version.

## Notes

- A common misconception is that dateless model IDs such as `claude-sonnet-4-6` behave as evergreen pointers that route to the latest or best-performing version. This is not the case: for the 4.6 generation and later, the dateless ID is the canonical model ID for that release and maps to a single, fixed model snapshot. Anthropic does not update the weights or configuration of an existing model ID; updated versions ship under a new model ID.
- This differs from dateless aliases on the Claude API for earlier models: an alias such as `claude-sonnet-4-5` is a convenience pointer resolving to the most recent dated snapshot for that minor version, whereas a 4.6-generation ID such as `claude-sonnet-4-6` is not an alias — it is the snapshot itself.
- Every model ID, whether dated or dateless, has its own distinct deprecation and retirement schedule.
- Model weights are fixed for a given ID, but the serving infrastructure around the model (request router, safety classifiers, sampling logic) can change over time. Infrastructure updates can occasionally produce minor observable behavior differences even when the model ID and weights have not changed.

## Related

- [Models overview](./overview.md)
- [Model deprecations](../pricing-lifecycle/model-deprecations.md)
