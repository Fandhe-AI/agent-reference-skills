# Client Example (@kubb/plugin-client)

`@kubb/plugin-client` で、ユーザーが書いたクライアントモジュール（`importPath`）を呼ぶ型付き関数を生成する設定例。生成コードは Fetch・axios・Kubb ランタイムに依存せず、`src/client.ts` の `client` と型を import する。Axios クライアントは [axios.md](./axios.md)、Fetch クライアントは [fetch.md](./fetch.md) を参照。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginClient } from '@kubb/plugin-client'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig(() => {
  return {
    root: '.',
    input: './petStore.yaml',
    output: {
      path: './src/gen',
      postGenerate: ['npm run typecheck'],
      clean: true,
      barrel: { type: 'named' },
      format: false,
      lint: false,
    },
    adapter: adapterOas({ unknownType: 'unknown', server: { index: 0 } }),
    plugins: [
      pluginTs({
        output: { path: 'models', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
        // deletePet's path/header params cover issue #875 (interface params reaching the
        // client's RequestConfig). Everything else keeps the default `type` alias.
        override: [{ type: 'operationId', pattern: 'deletePet', options: { syntaxType: 'interface' } }],
      }),
      pluginClient({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
        // resolved from each generated operation file (src/gen/clients/<tag>/), so it points at src/client.ts
        importPath: '../../../client',
      }),
    ],
  }
})
```

## src/client.ts（クライアントモジュールの骨組み）

Kubb は型付き operation を生成し、`importPath` のこのファイルから `client` と各型を import する。それ以外はユーザーの責務（`fetch` を自前のトランスポートに差し替え、認証・リトライ・interceptor・検証・シリアライザーを追加する）。

```typescript
/**
 * A minimal client skeleton for `@kubb/plugin-client`.
 *
 * Kubb generates the typed operations and imports the names below from this file (`importPath`).
 * Everything else is yours: swap `fetch` for your own transport, then add auth, retries,
 * interceptors, validation, or serializers where you need them.
 */

/**
 * The success body of a responses record, picked by status code.
 */
export type SuccessOf<TResponses> = TResponses[Extract<keyof TResponses, '200' | '201' | '202' | '204'>]

/**
 * Operations with several content types describe a body as `{ contentType, data }`. This keeps just the data.
 */
type DataOf<T> = T extends { contentType: string; data: infer TData } ? TData : T

type DataShape = { body?: unknown; cookies?: unknown; headers?: unknown; path?: unknown; query?: unknown }

type ErrorBody = NonNullable<unknown>

/**
 * One security scheme of an operation. A nested array in `security` lists schemes that are all needed together.
 */
export type Auth = {
  type: string
  scheme?: string
  name?: string
  in?: string
  scopes?: Array<string>
  flows?: Record<string, Record<string, string>>
  metadataUrl?: string
  url?: string
}

/**
 * The request a generated operation hands to `client`.
 */
export type RequestConfig = {
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'
  url: string
  baseURL?: string
  headers?: object
  path?: object
  query?: object
  cookies?: object
  body?: unknown
  /**
   * Media type hints from the operation. This skeleton assumes JSON.
   */
  contentType?: string | { request?: string; response?: string }
  /**
   * Serialization hints for query and header values, generated for reference. This skeleton ignores them.
   */
  styles?: unknown
  /**
   * How to read a success body, set for binary downloads (`'blob'`). This skeleton reads JSON.
   */
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream'
  /**
   * What a Server-Sent Events call's validator checks per event. Generated for reference on stream calls.
   */
  eventShape?: 'event' | 'data'
  signal?: AbortSignal
  throwOnError?: boolean
  /**
   * The security schemes of the operation. Generated for reference. This skeleton ignores them, use them to add auth.
   */
  security?: Array<Auth | Array<Auth>>
  client?: typeof client
}

/**
 * The grouped options object each generated operation accepts.
 */
export type Options<TData extends DataShape, ThrowOnError extends boolean = true> = Omit<RequestConfig, keyof DataShape | 'url' | 'method'> &
  TData & { throwOnError?: ThrowOnError }

/**
 * Every operation returns this shape. Extend it with the fields your app needs (status, headers, ...).
 */
export type RequestResult<TResponses, ThrowOnError extends boolean = true> = ThrowOnError extends true
  ? { data: DataOf<SuccessOf<TResponses>>; error: undefined; response: Response }
  : { data: DataOf<SuccessOf<TResponses>>; error: undefined; response: Response } | { data: undefined; error: ErrorBody; response: Response }

/**
 * One event of a payload-only stream: the payload as `data`, under the event name the server sent.
 */
export type ServerSentEvent<TData = unknown> = { data: TData; event: string; id?: string; retry?: number }

/**
 * An event typed by name, for a stream whose document types each event with its own `event` and `data`.
 */
export type TypedEvent<TEvent> = TEvent & { id?: string; retry?: number }

/**
 * What `client.stream` resolves to: the parsed events and the native response. `TEvent` is the full event type.
 */
export type StreamResult<TResponses, _ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>> = {
  stream: AsyncGenerator<TEvent>
  response: Response
}

/**
 * What a failed query hook rejects with. Only the query plugins import it.
 */
export type ResponseErrorConfig<TError = unknown> = ResponseError & { body: TError }

/**
 * Thrown by `client` for a non-2xx status when `throwOnError` is true.
 */
export class ResponseError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
  ) {
    super(`Request failed with status ${status}`)
  }
}

let baseURL = ''

type GetToken = () => Promise<string | undefined>

let getToken: GetToken | undefined

/**
 * Sets the API host that `client` prepends to every request.
 */
export function setBaseURL(url: string) {
  baseURL = url
}

/**
 * Registers an async credential source. It runs before each request that the spec marks as secured,
 * so it can read a secrets store or refresh an expired token. Replace it with signing or any other scheme.
 */
export function setAuth(resolve: GetToken) {
  getToken = resolve
}

/**
 * The default transport: a plain `fetch` call. Replace this function to change how requests are sent.
 */
async function send(config: RequestConfig): Promise<{ data: unknown; error: unknown; response: Response }> {
  const path: Record<string, unknown> = { ...config.path }
  const url = new URL((config.baseURL ?? baseURL) + config.url.replace(/\{(\w+)\}/g, (_, key) => encodeURIComponent(String(path[key]))))
  for (const [key, value] of Object.entries(config.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  const token = config.security?.length ? await getToken?.() : undefined
  const cookie = Object.entries(config.cookies ?? {})
    .filter(([, value]) => value != null)
    .map(([name, value]) => `${name}=${encodeURIComponent(String(value))}`)
    .join('; ')

  const response = await fetch(url, {
    method: config.method,
    headers: {
      ...(config.body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(config.headers as Record<string, string>),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: config.body === undefined ? undefined : JSON.stringify(config.body, (_, value) => (typeof value === 'bigint' ? value.toString() : value)),
    signal: config.signal,
  })

  const text = await response.text()
  const body = text ? JSON.parse(text) : undefined

  if (response.ok) return { data: body, error: undefined, response }
  if (config.throwOnError ?? true) throw new ResponseError(response.status, body)
  return { data: undefined, error: body, response }
}

/**
 * What every generated operation calls. Each operation passes its responses record and `ThrowOnError` as type
 * arguments, so the result is typed per operation. `stream` backs server-sent event operations; this skeleton does
 * not parse streams, so it throws. Implement it if you use SSE.
 */
export function client<TResponses, ThrowOnError extends boolean = true>(config: RequestConfig): Promise<RequestResult<TResponses, ThrowOnError>> {
  // The skeleton trusts the server to answer with the documented body; validate here if you need to.
  return send(config) as Promise<RequestResult<TResponses, ThrowOnError>>
}

client.stream = async <TResponses, ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>>(
  _config: RequestConfig,
): Promise<StreamResult<TResponses, ThrowOnError, TEvent>> => {
  throw new Error('client.stream is not implemented in this client')
}
```

（`client.stream` と `StreamResult` / `ServerSentEvent` / `SuccessOf` は spec に server-sent event operation がある場合にクライアントモジュールが export する必要がある。この骨組みはストリームを解析せず throw する）

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/client — `examples/client` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.ts`, `src/client.ts`). The previous page titled "Axios Client Example" used the v3/v4 shape (`@kubb/core`, `pluginOas`, `pluginClient({ client: 'axios' })`); that content moved to the Axios example ([axios.md](./axios.md))
- Migration (5.11 → 5.20): `@kubb/plugin-client` 6.0.0 replaces `toEventStream(call, { shape })` with `client.stream({ ...config, eventShape })`, names its result `StreamResult` with the event type (`EventStreamResult` is gone), and requires a custom client (`importPath`) to be generic and to add a `stream` method; the skeleton above follows this shape (`client` is generic, `client.stream` throws). Its `RequestConfig` also gains `cookies`, `contentType`, `parseAs`, `eventShape`, and `security` takes `Auth` objects. See [../plugins/plugin-client.md](../plugins/plugin-client.md)
- In v5, `@kubb/plugin-client` is a typed function generator for a client module you write (`importPath` is required). For a ready-made client use `@kubb/plugin-axios` or `@kubb/plugin-fetch`
- `importPath` is written into every generated import as given, so it must resolve from the generated file
- `SuccessOf` only extracts `'200' | '201' | '202' | '204'`, so an operation that declares only another 2xx (e.g. `206`) gets `data: never` although the client treats every `response.ok` as success. Widen the key union to cover your API's 2xx codes

## Related

- [axios.md](./axios.md)
- [fetch.md](./fetch.md)
- [../plugins/plugin-client.md](../plugins/plugin-client.md)
