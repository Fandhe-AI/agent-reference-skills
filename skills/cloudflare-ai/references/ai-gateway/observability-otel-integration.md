---
source: https://developers.cloudflare.com/ai-gateway/observability/otel-integration/
---

# OpenTelemetry

Export AI Gateway trace spans (model, provider, tokens, prompts/completions, cost, metadata) to OTLP-compatible backends.

## Signature / Usage

Adapted (not in the official docs): the official trace-ID header example uses characters outside hexadecimal (`g` to `p`); valid hex values are used here.

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'cf-aig-otel-trace-id: a1b2c3d4e5f60718293a4b5c6d7e8f90' \
  --header 'cf-aig-otel-parent-span-id: a1b2c3d4e5f60718' \
  --header 'Authorization: Bearer {api_token}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Options / Props

### Exporter settings (gateway Settings tab)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| URL | string (required) | — | OTEL collector endpoint |
| Headers | key-value (optional) | — | Extra export headers, e.g. `Authorization: Bearer <token>` |
| Authorization | Secrets Store reference (optional) | — | Secret holding the collector authorization value, resolved at runtime and sent as `Authorization` |
| Content type | `json` or `protobuf` | `json` | OTLP export format |

### Span attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| gen_ai.request.model | string | Model used |
| gen_ai.model.provider | string | Provider, e.g. `openai`, `anthropic` |
| gen_ai.usage.input_tokens | int | Input tokens |
| gen_ai.usage.output_tokens | int | Output tokens |
| gen_ai.prompt_json | string | JSON-encoded prompt/messages |
| gen_ai.completion_json | string | JSON-encoded completion |
| gen_ai.usage.cost | double | Estimated cost |

### Trace context headers

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-otel-trace-id | 32-char hex | generated | Trace ID to link spans |
| cf-aig-otel-parent-span-id | 16-char hex | — | Parent span ID |

## Notes

- Corrected from the official docs: the sample IDs were not valid hex.
- Custom metadata from `cf-aig-metadata` becomes span attributes; keys beginning with `gen_ai.` are reserved and not added.
- Spans carry prompts and completions, so use a trusted collector and put collector credentials in Headers/Secrets Store rather than in code.
- Works with Honeycomb, Braintrust, Langfuse, Datadog, New Relic and other OTLP backends; see each platform's documentation for endpoint and auth.
- Follows the OpenTelemetry Gen AI semantic conventions (https://opentelemetry.io/docs/specs/semconv/gen-ai/).

## Related

- [observability-custom-metadata.md](./observability-custom-metadata.md)
- [observability-logging.md](./observability-logging.md)
