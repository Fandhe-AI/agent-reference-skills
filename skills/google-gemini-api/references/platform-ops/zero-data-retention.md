---
source: https://ai.google.dev/gemini-api/docs/zdr
---

# Zero data retention

Describes what is commonly called "zero data retention" in the Gemini Developer API: the training restriction for Paid Services and the data-retention scenarios you must avoid or configure.

## Signature / Usage

Interactions API stores state by default; opt out per request (from the logs page snippet):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input="Explain quantum entanglement in simple terms.",
    store=False
)
```

## Options / Props

| Area | Behavior and action |
|------|---------------------|
| Prompt logging for abuse monitoring | For Paid Services Google logs prompts and responses for a limited period solely to detect Prohibited Use Policy violations. For guaranteed zero data retention or enterprise data processing agreements, use Vertex AI |
| Grounding with Google Search | Prompts, contextual information, and output stored for 30 days; no way to disable storage when using it |
| Grounding with Google Maps | Stored for 30 days (reliability engineering only); no way to disable storage when using it |
| Interactions API | State storage is enabled by default; set `store` to `false` to opt out |
| Live API | Do not configure `SessionResumptionConfig`; if a session handle is generated, conversation state (text, audio, video) is retained up to 24 hours |
| File API storage | Files stored at rest until deleted or expired; delete files manually |
| Explicit context caching | The `cached_content` context is stored with a user-defined `ttl` or `expire_time`; do not use it for an absolute zero-data footprint |
| Implicit in-memory caching | In RAM only, project-isolated, 24-hour TTL; does not violate zero data retention |

## Notes

- Training restriction: under Paid Services, Google does not use prompts (including system instructions, cached content, and files) or responses to improve its products.
- Enterprise-grade, self-serve ZDR controls are described in the Gemini Enterprise Agent Platform zero data retention guide (Google Cloud side, out of scope for this skill).
- The `store=False` snippet is taken from the logs-datasets page (Interactions API example); the ZDR page itself contains no code.
- Docs fetched 2026-10-16.

## Related

- [logs-datasets](./logs-datasets.md)
- [billing](./billing.md)
