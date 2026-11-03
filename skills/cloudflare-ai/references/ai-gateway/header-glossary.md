---
source: https://developers.cloudflare.com/ai-gateway/glossary/
---

# Header Glossary

Complete list of `cf-aig-*` headers that configure, customize, and manage AI Gateway requests.

## Signature / Usage

Request-level headers override gateway-level settings. Example setting a cache TTL on a request:

Snippet taken from https://developers.cloudflare.com/ai-gateway/usage/universal/

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id} \
  --header 'Content-Type: application/json' \
  --header 'cf-aig-cache-ttl: 3600' \
  --data '[ ... ]'
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-backoff | request | — | Backoff type for request retries |
| cf-aig-cache-key | request | — | Overrides the default cache key |
| cf-aig-cache-status | response | — | Whether the request was served from cache |
| cf-aig-cache-ttl | request | — | Cache time-to-live for responses |
| cf-aig-collect-log | request | — | Bypasses the gateway's default log setting |
| cf-aig-custom-cost | request | — | Customizes request cost |
| cf-aig-dlp | response | — | Returned when a DLP policy matches; JSON with action (Flag or Block), matched policy IDs, profile IDs, detection entry IDs |
| cf-aig-event-id | response | — | Unique event identifier for tracing |
| cf-aig-log-id | response | — | Unique log entry identifier (opaque string) used to add feedback |
| cf-aig-max-attempts | request | — | Max attempts for request retries |
| cf-aig-metadata | request | — | Custom metadata tags (user IDs etc.) |
| cf-aig-no-wholesale | request | — | When `true`, prevents Unified Billing fallback for a third-party provider request |
| cf-aig-request-id | response | — | Identifies the request; same value as `cf-aig-log-id` for a single-step request |
| cf-aig-request-timeout | request | — | Request timeout in milliseconds |
| cf-aig-retry-delay | request | — | Retry delay for request retries |
| cf-aig-skip-cache | request | — | Bypasses caching for the request |
| cf-aig-step | response | — | Which step in a request flow processed the request |
| cf-cache-ttl | request | — | Deprecated; replaced by `cf-aig-cache-ttl` |
| cf-skip-cache | request | — | Deprecated; replaced by `cf-aig-skip-cache` |

## Notes

- Configuration hierarchy: request-level headers take precedence over gateway-level settings, which act as defaults.
- Some restrictive settings are additive: `cf-aig-no-wholesale` can require provider credentials but cannot turn off the gateway setting **Require provider credentials** when it is on.
- Request / Type column above states direction (request or response header); the source does not give value types.

## Related

- [configuration-request-handling.md](./configuration-request-handling.md)
- [features-caching.md](./features-caching.md)
- [observability-logging.md](./observability-logging.md)
- [configuration-custom-costs.md](./configuration-custom-costs.md)
- [observability-custom-metadata.md](./observability-custom-metadata.md)
- [features-dlp.md](./features-dlp.md)
- [features-unified-billing.md](./features-unified-billing.md)
