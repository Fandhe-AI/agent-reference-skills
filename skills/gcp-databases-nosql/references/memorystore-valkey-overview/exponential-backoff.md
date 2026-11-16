---
source: https://docs.cloud.google.com/memorystore/docs/valkey/exponential-backoff
---

# Exponential backoff

Retry strategy for failed requests: wait with exponentially increasing delays. Clients should use exponential backoff for all requests to Memorystore for Valkey that return HTTP `5xx` and `429` errors. It matters when calling the REST API directly; the Google Cloud console handles backoff itself.

## Signature / Usage

### Example algorithm

Adapted (not in the official docs): `random_number_milliseconds` is converted to seconds (`/ 1000`) before it is added to the whole-second backoff.

```text
1. Make a request to Memorystore for Valkey.
2. If the request fails, wait 1 + random_number_milliseconds / 1000 seconds and retry the request.
3. If the request fails, wait 2 + random_number_milliseconds / 1000 seconds and retry the request.
4. If the request fails, wait 4 + random_number_milliseconds / 1000 seconds and retry the request.
5. And so on, up to a maximum_backoff time.
6. Continue waiting and retrying up to some maximum number of retries, but do not increase the wait period between retries.
```

Wait time (seconds) = min(((2^n)+random_number_milliseconds / 1000), maximum_backoff), with n incremented by 1 for each request.

## Options / Props

| Name | Description |
|------|-------------|
| `random_number_milliseconds` | Random number of milliseconds less than or equal to 1000; avoids synchronized retry waves. Recalculate after each retry. |
| `maximum_backoff` | Typically 32 or 64 seconds; depends on the use case. |
| maximum retries | Depends on use case and network conditions (mobile clients may need more retries and longer intervals than desktop). |

## Notes

- Once `maximum_backoff` is reached, retries can continue at that interval (for example every 64 seconds); prevent infinite retries at some point.
- After exceeding the maximum retries, report or log an error using the methods on the Get support page.
- Instance endpoint failovers also expect clients to retry connections with exponential backoff.
- The source contains no code; the block above is the source's numbered algorithm in a text fence.
- Corrected from the official docs: the source writes "wait 1 + random_number_milliseconds seconds" and `min(((2^n)+random_number_milliseconds), maximum_backoff)`, adding a value of up to 1000 milliseconds to a backoff in seconds without converting units; read literally, a random value of 500 would make the first wait exceed `maximum_backoff`. The jitter is now divided by 1000 so that it adds up to 1 second.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/exponential-backoff (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [quotas.md](./quotas.md)
- [instance-node-specification.md](./instance-node-specification.md)
