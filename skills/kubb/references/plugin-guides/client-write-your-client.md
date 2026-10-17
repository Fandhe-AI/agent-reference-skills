# plugin-client: Write your client

生成関数は `importPath` 経由で自前モジュールを import する。そのモジュールが生成関数の呼ぶ唯一の runtime コードで、自分で所有する。

## Signature / Usage

必須 export:

| Export | Kind | Purpose |
| --- | --- | --- |
| `client` | function | リクエストを送る。呼び出しが独自の `client` を渡さない限り、全生成関数が呼ぶ |
| `Options` | type | 生成関数が受け取るグループ化オプションオブジェクト |
| `RequestResult` | type | 生成関数が resolve する型 |

spec に server-sent event の operation がある場合は、`toEventStream` と型 `EventStreamResult` / `SuccessOf` も export する。

クエリ系プラグイン（`@kubb/plugin-react-query` / `@kubb/plugin-vue-query` / `@kubb/plugin-swr`）と `@kubb/plugin-mcp` は生成関数を `throwOnError: true` で呼び、result から `data` を読む。クエリ系プラグインは追加で次の 2 型も import する:

| Export | Kind | Purpose |
| --- | --- | --- |
| `RequestConfig` | type | フックが受け取る呼び出し単位の `client` オプション（リクエストフィールド除く） |
| `ResponseErrorConfig` | type | spec のエラー型を受けた、失敗したフックのエラー型 |

生成関数の形:

```typescript
import type { Options, RequestResult } from '../../../client'
import type { GetPetByIdOptions, GetPetByIdResponses } from '../../models/pet/GetPetById'
import { client } from '../../../client'

export function getPetById<ThrowOnError extends boolean = true>(
  options: Options<GetPetByIdOptions, ThrowOnError>,
): Promise<RequestResult<GetPetByIdResponses, ThrowOnError>> {
  const { client: request = client, ...config } = options

  return request({
    method: 'GET',
    url: '/pet/{petId}',
    security: [{ type: 'apiKey', name: 'api_key', in: 'header' }, { type: 'oauth2' }],
    ...config,
    throwOnError: config.throwOnError ?? true,
  }) as Promise<RequestResult<GetPetByIdResponses, ThrowOnError>>
}
```

最小の client（`fetch` 使用。transport は使う HTTP ライブラリに置き換える）:

```typescript
// src/client.ts
export type RequestConfig = {
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'
  url: string
  baseURL?: string
  headers?: object
  path?: object
  query?: object
  body?: unknown
  signal?: AbortSignal
  throwOnError?: boolean
  security?: Array<{ type: string; name?: string; in?: string }>
  client?: typeof client
}

type DataShape = { body?: unknown; headers?: unknown; path?: unknown; query?: unknown }

export type Options<TData extends DataShape, ThrowOnError extends boolean = true> = Omit<RequestConfig, keyof DataShape | 'url' | 'method'> &
  TData & { throwOnError?: ThrowOnError }

export type RequestResult<TResponses, ThrowOnError extends boolean = true> = ThrowOnError extends true
  ? { data: TResponses[keyof TResponses]; error: undefined; response: Response }
  : { data: TResponses[keyof TResponses]; error: undefined; response: Response } | { data: undefined; error: {}; response: Response }

// Only needed by the query plugins: what a failed hook rejects with.
export type ResponseErrorConfig<TError = unknown> = Error & { body?: TError }

// Set this to your API host. `new URL()` needs an absolute URL.
export const settings = { baseURL: 'https://petstore3.swagger.io/api/v3' }

export async function client(config: RequestConfig) {
  const path: Record<string, unknown> = { ...config.path }
  const url = new URL((config.baseURL ?? settings.baseURL) + config.url.replace(/\{(\w+)\}/g, (_, key) => encodeURIComponent(String(path[key]))))

  const response = await fetch(url, {
    method: config.method,
    headers: config.headers as Record<string, string>,
    body: config.body === undefined ? undefined : JSON.stringify(config.body),
    signal: config.signal,
  })
  const body = await response.json().catch(() => undefined)

  if (response.ok) return { data: body, error: undefined, response }
  if (config.throwOnError ?? true) throw new Error(`Request failed with status ${response.status}`)
  return { data: undefined, error: body ?? { status: response.status }, response }
}
```

## Notes

- 相対 `importPath` の場合、フックは生成 operation ファイルから解決するため、1 つのパスで両方に通用する
- client は `method`・`{param}` プレースホルダー付きの `url` テンプレート・`security`・グループ化された `path` / `query` / `headers` / `body`・`throwOnError` を受け取り、promise を返す
- 上記の型は最小のスケッチ。status 対応のレスポンス型が必要なら追加する。base URL setter・query 処理・async auth hook を備えた完全版は公式 example project（`https://github.com/kubb-labs/plugins/tree/main/examples/client`）にある
- The sketch's `RequestResult` types `data` as `TResponses[keyof TResponses]`, which includes error responses and the raw `{ contentType, data }` definitions, while the client returns only the parsed body; for a correct contract select the 2xx responses and unwrap the body as in [examples/client.md](../examples/client.md) (`SuccessOf` / `DataOf`)
- Kubb は retry・interceptor・リクエスト署名に依存しない。必要なら `client` に追加する
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/write-your-client （`@kubb/plugin-client@5.5.15`）

## Related

- [client-calling-operations](./client-calling-operations.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
