<!-- source: https://platform.claude.com/docs/en/api/overview / last verified: 2026-08-07 -->

# API overview

The Claude API is a RESTful API at `https://api.anthropic.com` for programmatic access to Claude models and Claude Managed Agents.

## Signature / Usage

Required headers on every request:

```
x-api-key: <api-key>        # or Authorization: Bearer <token> (WIF)
anthropic-version: 2023-06-01
content-type: application/json
```

## Options / Props

**Available APIs (General Availability):**

| API | Method / Path |
|---|---|
| Messages API | `POST /v1/messages` |
| Message Batches API | `POST /v1/messages/batches` (50% cost reduction, async) |
| Token Counting API | `POST /v1/messages/count_tokens` |
| Models API | `GET /v1/models` |

**Available APIs (Beta):**

| API | Method / Path |
|---|---|
| Files API | `POST /v1/files`, `GET /v1/files` |
| Skills API | `POST /v1/skills`, `GET /v1/skills` |
| Agents API | `POST /v1/agents`, `GET /v1/agents` |
| Sessions API | `POST /v1/sessions`, `GET /v1/sessions/{id}/events/stream` |
| Environments API | `POST /v1/environments`, `GET /v1/environments` |

**Request size limits:**

| Endpoint | Maximum request size |
|---|---|
| Messages, Token Counting | 32 MB |
| Message Batches API | 256 MB |
| Files API | 500 MB |
| Sessions, Agents, Environments | 32 MB |

**Response headers (every response):** `request-id` (globally unique request identifier), `anthropic-organization-id`.

**Pagination:** most list endpoints use `page` / `next_page` cursors (`limit`, `page`, `order` query params; `next_page`, `prev_page` response fields). Some endpoints (Message Batches, Files, Models, several Admin API) use `after_id` / `before_id` with `has_more`, `first_id`, `last_id` instead. `GET /v1/sessions` is the only endpoint supporting backward pagination (`prev_page`).

## Notes

- Cloud platform access: Claude Platform on AWS and Microsoft Foundry are Anthropic-operated; Amazon Bedrock and Google Cloud (Agent Platform / Vertex AI) are partner-operated. Feature availability varies by platform.
- Claude Managed Agents is available on the direct Claude API and on Claude Platform on AWS only.
- Exceeding request size limits returns 413 `request_too_large`.
- Client SDKs handle header management, retries, streaming, and type-safe requests automatically.

## Related

- [beta-headers](./beta-headers.md)
- [errors](./errors.md)
- [rate-limits](./rate-limits.md)
- [versioning](./versioning.md)
