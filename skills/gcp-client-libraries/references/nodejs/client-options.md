---
source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md
---

# Constructor and service options

Options object accepted by gax-based client constructors: authentication options (from `google-auth-library`), service options (endpoint, port, `clientConfig`), transport (`fallback`) and telemetry flags.

## Signature / Usage

```ts
const options = {};
// set options
const client = new library.SampleClient(options);
```

The `ClientOptions` type in `google-gax` 6.17.0 (`clientInterface.d.ts`):

```ts
export interface ClientOptions extends GrpcClientOptions, GoogleAuthOptions, ClientStubOptions {
    libName?: string;
    libVersion?: string;
    clientConfig?: gax.ClientConfig;
    fallback?: boolean | 'rest' | 'proto';
    apiEndpoint?: string;
    gaxServerStreamingRetries?: boolean;
    universeDomain?: string;
    universe_domain?: string;
    /**
     * Whether to enable telemetry tracing for the client.
     *
     * Tracing is only enabled via the `GOOGLE_SDK_NODE_ENABLE_TRACING` environment
     * variable or when a user passes `enableTelemetryTracing: true` in their client
     * options. The `GOOGLE_SDK_NODE_ENABLE_TRACING` environment variable overrides
     * this option whenever it is set.
     */
    enableTelemetryTracing?: boolean;
    /**
     * Whether to enable telemetry logging for the client.
     *
     * Logging is only enabled when `enableTelemetryLogging: true` is passed here
     * or, when unset, the `GOOGLE_SDK_NODE_LOGGING` environment variable matches
     * the client service namespace. Explicitly setting
     * `enableTelemetryLogging: false` disables logging for this client even when
     * `GOOGLE_SDK_NODE_LOGGING` matches.
     */
    enableTelemetryLogging?: boolean;
}
```

## Options / Props

Authentication options (HOWTO; full list is `GoogleAuthOptions` in `google-auth-library`):

| Name | Type | Description |
|------|------|-------------|
| `credentials` | object | Credentials object with `client_email` and `private_key`. `@deprecated` in google-auth-library 11.3.4 (no validation of the credential configuration). |
| `keyFilename` | string | Path to a key file. With a JSON file, `projectId` is not necessary. `@deprecated` in google-auth-library 11.3.4 (no validation of the credential configuration). |
| `keyFile` | string | Not in the HOWTO list; declared in `GoogleAuthOptions`. `@deprecated` in google-auth-library 11.3.4 (no validation of the credential configuration). |
| `projectId` | string | Project ID, for example `grape-spaceship-123`. The `GCLOUD_PROJECT` environment variable is also checked; under ADC the project ID is detected automatically. |

Service and transport options:

| Name | Type | Description |
|------|------|-------------|
| `apiEndpoint` | string | Domain name of the API remote host (to connect to a non-default endpoint). |
| `port` | number \| string | Port on which to connect to the remote host. |
| `clientConfig` | `gax.ClientConfig` | Overrides client configuration such as timeouts. Defaults live in `src/v*/*_client_config.json`; pass any subset of that JSON. |
| `fallback` | `boolean \| 'rest' \| 'proto'` | HTTP/1.1 fallback transport. See `rest-fallback.md`. |
| `universeDomain` / `universe_domain` | string | Declared in `ClientOptions` (no docstring in gax); `GoogleAuthOptions.universeDomain` documents it as the default service domain for a given Cloud universe (see the `nodejs-auth` category). |
| `servicePath`, `protocol`, `sslCreds`, `cert`, `key` | various | Declared in `GrpcClientOptions` / `ClientStubOptions` (`grpc.d.ts`); no docstring. |
| `libName`, `libVersion` | string | Declared in `ClientOptions`; no docstring. |
| `gaxServerStreamingRetries` | boolean | Declared in `ClientOptions`; no docstring. |
| `enableTelemetryTracing` | boolean | See `nodejs-observability.md`. The env var `GOOGLE_SDK_NODE_ENABLE_TRACING` overrides it when set. |
| `enableTelemetryLogging` | boolean | `false` disables logging for this client even if `GOOGLE_SDK_NODE_LOGGING` matches. See `logging.md`. |

## Notes

- Service account key files (`keyFilename`, `credentials`) are documented here but are a security risk; prefer ADC with attached service accounts, impersonation or Workload Identity Federation (see `gcp-foundation`).
- Do not hard-code private keys in source.
- `keyFilename`, `keyFile` and `credentials` are marked `@deprecated` in google-auth-library 11.3.4 (`googleauth.d.ts`: "This option is being deprecated because of a potential security risk"); the JSDoc recommends creating an `auth` object with `google-auth-library` and passing it to the client constructor as `{ auth }`. See the `nodejs-auth` category.
- Source inconsistency: the HOWTO lists `options.email` and `.pem` / `.p12` key files ("Required when using a `.pem` or .`p12` `keyFilename`"); `GoogleAuthOptions` in google-auth-library 11.3.4 (`googleauth.d.ts`) has no `email` option and does not document `.pem` / `.p12` for `keyFilename`. Not reproduced.
- Option names confirmed from `clientInterface.d.ts` and `grpc.d.ts` in the `google-gax` 6.17.0 package (TypeScript source `src/clientInterface.ts`, `src/grpc.ts`).
- `ClientOptions` extends `GrpcClientOptions`, which also declares `auth`, `grpc`, `minifyJson`, `protoJson`, `httpRules`, `numericEnums` (no docstrings).
- Applies to `google-gax` 6.17.0 (npm). Distinct from `googleapis` and the `google-genai` SDK (`google-gemini-api` skill).
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/client-libraries.md (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/clientInterface.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-gax-v6.17.0/core/packages/gax/src/grpc.ts (retrieved 2026-11-16; pinned at tag google-gax-v6.17.0, Apache 2.0)
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/googleauth.ts (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)

## Related

- [client-instance.md](./client-instance.md)
- [rest-fallback.md](./rest-fallback.md)
- [retry-timeout.md](./retry-timeout.md)
