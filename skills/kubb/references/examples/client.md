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
export type SuccessOf<TResponses> = TResponses[Extract<keyof TResponses, '200' | '201' | '202' | '204'>]

type DataOf<T> = T extends { contentType: string; data: infer TData } ? TData : T

type DataShape = { body?: unknown; headers?: unknown; path?: unknown; query?: unknown }

type ErrorBody = NonNullable<unknown>

export type RequestConfig = {
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'
  url: string
  baseURL?: string
  headers?: object
  path?: object
  query?: object
  body?: unknown
  styles?: unknown
  signal?: AbortSignal
  throwOnError?: boolean
  security?: Array<{ type: string; name?: string; in?: string }>
  client?: typeof client
}

export type Options<TData extends DataShape, ThrowOnError extends boolean = true> = Omit<RequestConfig, keyof DataShape | 'url' | 'method'> &
  TData & { throwOnError?: ThrowOnError }

export type RequestResult<TResponses, ThrowOnError extends boolean = true> = ThrowOnError extends true
  ? { data: DataOf<SuccessOf<TResponses>>; error: undefined; response: Response }
  : { data: DataOf<SuccessOf<TResponses>>; error: undefined; response: Response } | { data: undefined; error: ErrorBody; response: Response }

export type EventStreamResult<TData = unknown> = { stream: AsyncGenerator<TData>; response: Response }

export type ResponseErrorConfig<TError = unknown> = ResponseError & { body: TError }

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

export function setBaseURL(url: string) {
  baseURL = url
}

export function setAuth(resolve: GetToken) {
  getToken = resolve
}

export async function client(config: RequestConfig): Promise<{ data: unknown; error: unknown; response: Response }> {
  const path: Record<string, unknown> = { ...config.path }
  const url = new URL((config.baseURL ?? baseURL) + config.url.replace(/\{(\w+)\}/g, (_, key) => encodeURIComponent(String(path[key]))))
  for (const [key, value] of Object.entries(config.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  const token = config.security?.length ? await getToken?.() : undefined

  const response = await fetch(url, {
    method: config.method,
    headers: {
      ...(config.body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(config.headers as Record<string, string>),
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

export async function toEventStream<TData = unknown>(_result: Promise<{ data: unknown; response: Response }>): Promise<EventStreamResult<TData>> {
  throw new Error('toEventStream is not implemented in this client')
}
```

（原文の JSDoc コメントは省略。`toEventStream` と `EventStreamResult` / `SuccessOf` は spec に server-sent event operation がある場合にクライアントモジュールが export する必要がある。この骨組みはストリームを解析せず throw する）

## Notes

- Source: `examples/client` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `src/client.ts`). The previous page titled "Axios Client Example" used the v3/v4 shape (`@kubb/core`, `pluginOas`, `pluginClient({ client: 'axios' })`); that content moved to the Axios example ([axios.md](./axios.md))
- In v5, `@kubb/plugin-client` is a typed function generator for a client module you write (`importPath` is required). For a ready-made client use `@kubb/plugin-axios` or `@kubb/plugin-fetch`
- `importPath` is written into every generated import as given, so it must resolve from the generated file

## Related

- [axios.md](./axios.md)
- [fetch.md](./fetch.md)
- [../plugins/plugin-client.md](../plugins/plugin-client.md)
