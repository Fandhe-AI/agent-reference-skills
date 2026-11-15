---
source: https://github.com/googleapis/google-cloud-node/blob/gaxios-v8.3.3/core/packages/gaxios/README.md
---

# gaxios HTTP client and proxy settings

`gaxios` is an HTTP request client with an `axios`-like interface over `fetch`, used by Google's Node.js auth and REST-based libraries. It carries the proxy (`proxy`, `noProxy`, `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`), timeout and retry options.

## Signature / Usage

```js
import {request} from 'gaxios';
const res = await request({url: 'https://google.com/'});
```

`fetch`-compatible API:

```js
import {instance} from 'gaxios';
const res = await instance.fetch('https://google.com/');
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string \| URL` | required | Target URL. |
| `method` | string | `GET` | HTTP method. |
| `baseURL` | `string \| URL` | — | Resolved as `new URL(url, baseURL)`. |
| `headers` | `Headers` | — | Request headers. |
| `data` | various | — | Body. Objects are serialized as JSON except `ArrayBuffer`, `Blob`, `Buffer`, `DataView`, `File`, `FormData`, `ReadableStream`, `stream.Readable`, strings, `TypedArray`, `URLSearchParams`, and objects sent with `Content-Type: application/x-www-form-urlencoded`. |
| `params` | object | — | Query parameters encoded with `URLSearchParams`. |
| `timeout` | number (ms) | none | Timeout of the HTTP request in milliseconds; no timeout by default. |
| `maxContentLength` | number | `0` (unset) | Max response size in bytes. |
| `responseType` | `'json' \| 'stream' \| 'blob' \| 'arraybuffer' \| 'text' \| 'unknown'` | `unknown` | Expected return type. `stream` does not consume `Response#body`. |
| `agent` | http agent | — | Node.js http agent. Overrides `proxy`. |
| `proxy` | `string \| URL` | — | Proxy for requests. Also read from `process.env.HTTP_PROXY` / `HTTPS_PROXY`; the option has preference over the env vars. |
| `noProxy` | `(string \| URL \| RegExp)[]` | — | Excludes traffic from the proxy; also from `process.env.NO_PROXY` (comma-separated, merged with local rules). Strings support `.example.com` / `*.example.com`; a `URL` matches by `.origin`; a `RegExp` matches the stringified URL. |
| `validateStatus` | `(status: number) => boolean` | 200 to 299 | Decides if a response is valid. |
| `retry` | boolean | — | Enables the default retry configuration. |
| `retryConfig.retry` | number | `3` | Number of retries. |
| `retryConfig.noResponseRetries` | number | `2` | Retries when there is no response. |
| `retryConfig.retryDelay` | number (ms) | `100` | Initial retry delay. |
| `retryConfig.httpMethodsToRetry` | string[] | `['GET','PUT','HEAD','OPTIONS','DELETE']` | Methods retried automatically. |
| `retryConfig.statusCodesToRetry` | number[][] | `[[100, 199], [408, 408], [429, 429], [500, 599]]` | Status ranges retried. |
| `retryConfig.shouldRetry`, `onRetryAttempt`, `currentRetryAttempt` | function / number | — | Custom decision, per-retry hook, attempts already made. |
| `signal` | `AbortSignal` | — | Abort via `AbortController`. |
| `adapter` | function | — | Overrides the actual request (tests, instrumentation). |
| `fetchImplementation` | function | native `fetch` | `fetch` implementation to use. |
| `multipart` | `GaxiosMultipartOptions` | — | Parts for a `multipart/related` request. |
| `errorRedactor` | function \| `false` | — | Experimental error redactor; `false` disables. Not a replacement for a DLP provider. |

## Notes

- The proxy options are documented for gaxios requests only. The sources in this category do not say whether gRPC-based client calls honor them.
- `GaxiosResponse` extends the `fetch` `Response` with `config` (request configuration) and `data` (transformed body).
- To disable auto-processing of the body in `res.data`, set `{responseType: 'stream'}` or `.adapter`.
- Default values set on a `Gaxios` instance take precedence over other authentication methods, including ADC. The README's "Setting Defaults" example is not reproduced: it is missing a comma and puts a literal `Authorization` token in the defaults.
- Retries default to idempotent HTTP methods only; adding `POST` to `httpMethodsToRetry` can duplicate side effects.
- The README's options block is pseudo-TypeScript (not valid as a type); it is shown here as a table. Proxy configuration for `google-auth-library` is in the `nodejs-auth` category.
- Applies to `gaxios` 8.3.3 (npm). Snippets are fragments.
- Source inconsistency: the README tagline says "over top of `node-fetch`", while its `fetchImplementation` option says native `fetch` is used by default ("Will use `fetch` by default").
- Source: https://github.com/googleapis/google-cloud-node/blob/gaxios-v8.3.3/core/packages/gaxios/README.md (retrieved 2026-11-16; pinned at tag gaxios-v8.3.3, Apache 2.0)

## Related

- [client-options.md](./client-options.md)
- [retry-timeout.md](./retry-timeout.md)
