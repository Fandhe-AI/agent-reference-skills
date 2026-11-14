---
source: https://developers.cloudflare.com/ai-gateway/reference/limits/
---

# Limits

Limits for gateways, logs, Logpush, and DLP.

## Signature / Usage

Exceeding the Unified Billing rate limit returns HTTP `429` with error code `2018` (see [reference-troubleshooting.md](./reference-troubleshooting.md)); a client can back off and retry. Example of per-request retry settings:

Snippet taken from https://developers.cloudflare.com/ai-gateway/usage/universal/

```ts
config:{
	maxAttempts?: number;
	retryDelay?: number;
	backoff?: "constant" | "linear" | "exponential";
}
```

## Options / Props

### Gateway limits

| Feature | Limit |
|---------|-------|
| Cacheable request size | 25 MB per request |
| Cache TTL | 1 month |
| Custom metadata | 5 entries per request |
| Gateways, free plan | 10 per account |
| Gateways, paid plan | 20 per account |
| Gateway name length | 64 characters |
| Unified Billing request rate | 200 requests per 60 seconds per gateway (applies to Cloudflare-managed credentials only; not BYOK) |

### Log limits

| Customers | Limit |
|-----------|-------|
| New (first gateway on or after September 24, 2026) | Workers Logs limits and pricing (https://developers.cloudflare.com/workers/observability/logs/workers-logs/#limits) |
| Existing (Legacy Logs): storage rate | 500 logs per second per gateway |
| Existing: logs stored, paid | 10 million per gateway |
| Existing: logs stored, free | 100,000 per account (across all gateways) |
| Existing: stored log size | 10 MB per log |

### Logpush limits

| Feature | Limit |
|---------|-------|
| Logpush jobs | 4 per account |
| Logpush log size | 1 MB per log |

### DLP limits (account-level, shared Cloudflare One profiles)

| Feature | Limit |
|---------|-------|
| Custom entries | 25 |
| Exact Data Match cells per spreadsheet | 100,000 |
| Custom Wordlist keywords per spreadsheet | 200 |
| Custom Wordlist keywords per account | 1,000 |
| Dataset cells per account | 1,000,000 |

## Notes

- Source: https://developers.cloudflare.com/ai-gateway/reference/limits/ (pin 34d908a / fetched 2026-11-14).
- No separate limit on the number of DLP policies per gateway; profiles can be reused across gateways.
- Limit increases are requested through a form linked from the official page; Cloudflare contacts you if one can be granted.

## Related

- [observability-legacy-logs.md](./observability-legacy-logs.md)
- [observability-logpush.md](./observability-logpush.md)
- [features-dlp.md](./features-dlp.md)
- [features-unified-billing.md](./features-unified-billing.md)
