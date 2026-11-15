---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/gax.ts
---

# Retry and timeout settings

Retry, backoff and timeout in gax are configured per method in the client configuration JSON (`clientConfig`) and can be overridden per call with `CallOptions.retry` / `CallOptions.timeout`. This page is taken from the `gax.d.ts` docstrings; the HOWTO itself only says that retry settings and timeouts can be overridden in the `CallOptions` argument.

## Signature / Usage

### Client configuration JSON

The `constructSettings` docstring describes the shape of a client configuration file (`src/v*/*_client_config.json`); `clientConfig` accepts any subset:

```json
{
  "interfaces": {
    "google.fake.v1.ServiceName": {
      "retry_codes": {
        "idempotent": ["UNAVAILABLE", "DEADLINE_EXCEEDED"],
        "non_idempotent": []
      },
      "retry_params": {
        "default": {
          "initial_retry_delay_millis": 100,
          "retry_delay_multiplier": 1.2,
          "max_retry_delay_millis": 1000,
          "initial_rpc_timeout_millis": 2000,
          "rpc_timeout_multiplier": 1.5,
          "max_rpc_timeout_millis": 30000,
          "total_timeout_millis": 45000
        }
      },
      "methods": {
        "CreateFoo": {
          "retry_codes_name": "idempotent",
          "retry_params_name": "default"
        },
        "Publish": {
          "retry_codes_name": "non_idempotent",
          "retry_params_name": "default",
          "bundling": {
            "element_count_threshold": 40,
            "element_count_limit": 200,
            "request_byte_threshold": 90000,
            "request_byte_limit": 100000,
            "delay_threshold_millis": 100
          }
        }
      }
    }
  }
}
```

### Types

`RetryOptions` (`gax.d.ts`):

```ts
export declare class RetryOptions {
    retryCodes: number[];
    backoffSettings: BackoffSettings;
    shouldRetryFn?: (error: GoogleError) => boolean;
    getResumptionRequestFn?: (request: RequestType) => RequestType;
    constructor(retryCodes: number[], backoffSettings: BackoffSettings, shouldRetryFn?: (error: GoogleError) => boolean, getResumptionRequestFn?: (request: RequestType) => RequestType);
}
```

`BackoffSettings` (`gax.d.ts`):

```ts
export interface BackoffSettings {
    maxRetries?: number;
    initialRetryDelayMillis: number;
    retryDelayMultiplier: number;
    maxRetryDelayMillis: number;
    initialRpcTimeoutMillis?: number | null;
    maxRpcTimeoutMillis?: number | null;
    totalTimeoutMillis?: number | null;
    rpcTimeoutMultiplier?: number | null;
}
```

## Options / Props

`BackoffSettings` (docstring in `gax.d.ts`):

| Name | Description |
|------|-------------|
| `initialRetryDelayMillis` | Initial delay, in milliseconds, between the completion of the first failed request and the first retry. |
| `retryDelayMultiplier` | Multiplier applied to the delay between failed requests. |
| `maxRetryDelayMillis` | Maximum delay in milliseconds between requests; the multiplier stops increasing the delay at this value. |
| `initialRpcTimeoutMillis` | Initial timeout parameter of the request. |
| `rpcTimeoutMultiplier` | Multiplier applied to the timeout between failed requests. |
| `maxRpcTimeoutMillis` | Maximum timeout in milliseconds for a request. |
| `totalTimeoutMillis` | Total time in milliseconds from the initial request after which an error is returned regardless of retries. |
| `maxRetries` | Declared; `createMaxRetriesBackoffSettings` documents it as the maximum number of retrying attempts. |

`RetryOptions`:

| Name | Description |
|------|-------------|
| `retryCodes` | Google API canonical error codes (`Status` enum, `status.d.ts`: `OK` = 0 ... `UNAUTHENTICATED` = 16) upon which a retry is attempted. |
| `shouldRetryFn` | Decides whether a call retries. If defined, `retryCodes` must be empty. |
| `getResumptionRequestFn` | Resumption strategy, only used with server streaming retries. |

## Notes

- In `CallSettings`, `timeout` is "ignored for retrying calls"; `retry: null` disables retry for that call.
- Retrying non-idempotent calls can duplicate side effects. The docstring maps `non_idempotent` methods to an empty retry-code list and `idempotent` ones to `UNAVAILABLE` / `DEADLINE_EXCEEDED`; keep that split when overriding `clientConfig`, and use request IDs where the API supports them. In the docstring, `CreateFoo` is a placeholder mapped to the `idempotent` codes; map a real create or write method to retry codes only if the API documents it as idempotent (for example via a request ID).
- Builders documented in `gax.d.ts`: `createRetryOptions`, `createBackoffSettings`, `createDefaultBackoffSettings`, `createMaxRetriesBackoffSettings` (the last marked "unsupported, and intended for internal use only").
- `retryRequestOptions` (`RetryRequestOptions`) "Will be deprecated in a future release" and is only relevant to server streaming calls.
- The JSON is the `constructSettings` docstring with the leading ` * ` comment markers removed; `fake.v1.ServiceName` is a placeholder name.
- Applies to `google-gax` 6.17.0 (npm). Snippets are fragments (no imports).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/gax.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/status.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)

## Related

- [call-options.md](./call-options.md)
- [client-options.md](./client-options.md)
