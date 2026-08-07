# Production Notes on GPT Actions

Operational constraints and best practices for deploying GPT Actions (ChatGPT custom actions) to production.

## Rate limits

- Implement rate limiting on exposed endpoints; ChatGPT respects 429s and dynamically backs off after repeated 429/500 responses.

## Timeouts

- 45 seconds round trip max per API call.

## Transport

- All action traffic must use TLS 1.2+ on port 443 with a valid public certificate.
- ChatGPT calls actions from [published IP ranges](https://developers.openai.com/api/docs/guides/ip-addresses) — allowlist explicitly if desired.

## Authentication

- A single action can mix one authentication type (OAuth or API key) with unauthenticated endpoints. See [actions authentication](https://developers.openai.com/api/docs/actions/authentication).

## OpenAPI specification limits

| Field | Limit |
|-------|-------|
| Endpoint description/summary | 300 characters max |
| Parameter description | 700 characters max |

## Additional limitations

- Custom headers not supported.
- OAuth domains must match the primary endpoint domain, except Google/Microsoft/Adobe.
- Request/response payloads: < 100,000 characters each.
- Requests time out after 45 seconds; text only (no images/video).

## `x-openai-isConsequential` flag

```yaml
paths:
  /todo:
    post:
      operationId: updateTODOs
      description: Mutates the TODO list.
      x-openai-isConsequential: true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `x-openai-isConsequential: true` | boolean | ChatGPT always prompts for confirmation before running; no "always allow" button |
| `x-openai-isConsequential: false` | boolean | ChatGPT shows an "always allow" button |
| (field absent) | — | Defaults to `false` for GET operations, `true` for all other methods |

## Best practices

- Don't write descriptions that encourage using the action outside its intended category, or that prescribe specific trigger phrases — ChatGPT invokes actions automatically when appropriate.
- Return raw structured data from the API (e.g. `{"todos": [...]}`) instead of natural-language responses; let the model generate the user-facing text.

## Notes

- GPT Actions may send parts of the user's conversation to the action's endpoint when invoked.

## Related

- [Production best practices](./production-best-practices.md)
