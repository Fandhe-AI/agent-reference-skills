# plugin-client: Write your client

生成関数は `importPath` 経由で自前モジュールを import する。そのモジュールが生成関数の呼ぶ唯一の runtime コードで、自分で所有する。

## Signature / Usage

必須 export:

| Export | Kind | Purpose |
| --- | --- | --- |
| `client` | function | リクエストを送る。呼び出しが独自の `client` を渡さない限り、全生成関数が呼ぶ |
| `Options` | type | 生成関数が受け取るグループ化オプションオブジェクト |
| `RequestResult` | type | 生成関数が resolve する型 |

生成関数は `client<TResponses, ThrowOnError>(config)` を呼ぶので、`client` は `Promise<RequestResult<TResponses, ThrowOnError>>` を返すよう型付けする。

spec に server-sent event または JSON Lines の operation がある場合、`client` に `stream` メソッドも必要で、モジュールは `StreamResult` / `SuccessOf` / `TypedEvent` / `ServerSentEvent` 型を export する。生成関数は `client.stream<TResponses, ThrowOnError, TItem>(config)` を呼び、`Promise<StreamResult<TResponses, ThrowOnError, TItem>>` を返す。`TItem` は、ドキュメントが event ごとに名前を付ける場合は `TypedEvent<…>`、JSON Lines では成功型になる。ドキュメントが payload だけを型付けする場合 `TItem` は省略され、既定の `ServerSentEvent<SuccessOf<TResponses>>` になる。Server-Sent Events の呼び出しは `eventShape: 'event'` または `'data'` を渡し、`config.validator.response` が event 全体と `data` のどちらを検査するかを示す。

クエリ系プラグイン（`@kubb/plugin-react-query` / `@kubb/plugin-vue-query` / `@kubb/plugin-swr`）と `@kubb/plugin-mcp` は生成関数を `throwOnError: true` で呼び、result から `data` を読む。クエリ系プラグインは追加で次の 2 型も import する:

| Export | Kind | Purpose |
| --- | --- | --- |
| `RequestConfig` | type | フックが受け取る呼び出し単位の `client` オプション（リクエストフィールド除く） |
| `ResponseErrorConfig` | type | spec のエラー型を受けた、失敗したフックのエラー型 |

### Build on the shared runtime

fetch / axios クライアントの runtime を、自前のリクエストパイプラインを書かずに再利用するには:

1. `@kubb/plugin-client/templates` から `core.ts` / `mediaTypes.ts` / `serializers.ts` / `standardSchema.ts` / `sse.ts` と、spec が必要とする `mediaTypes/` / `serializers/` のファイルを `client.ts` の隣にコピーする
2. `client.ts` で、core が import する 3 つの型（下の表）を export する
3. `ResolvedRequest` を送って web `Response` を返す `Transport` 関数を書く。ライブラリが `Response` を返さない場合は、そのバイト列を `new Response(bytes, { status, headers })` で包む
4. `createLazyClient((config) => createClientCore({ defaultTransport, ...config }))` を `client` として export する。spec が必要とする form / stream media type は `client.setConfig({ mediaTypes: { 'multipart/form-data': multipartFormData, ...streamMediaTypes } })` で登録し、`export * from './core.ts'` と `export * from './sse.ts'` を追加する。core は独自の serializer を持たないので、`serializers/query.ts` と `serializers/path.ts`（またはその styled 版）から `serializer: { query: serializeQuery, path: serializePath }` も設定し、該当パラメーターを持つ spec には `header` と `cookie` も設定する

| Export           | Purpose                                                 | On fetch      | On axios             |
| ---------------- | ------------------------------------------------------- | ------------- | -------------------- |
| `NativeRequest`  | The request object on a result and a `ResponseError`.   | `Request`     | `AxiosRequestConfig` |
| `NativeResponse` | The response object on a result and a `ResponseError`.  | `Response`    | `AxiosResponse`      |
| `NativeOptions`  | The `options` a call passes to your HTTP library as is. | `RequestInit` | `AxiosRequestConfig` |

[`@kubb/plugin-fetch/templates/client.ts`](https://github.com/kubb-labs/plugins/blob/main/packages/plugin-fetch/templates/client.ts) が完全な例。

### What a generated function looks like

生成関数の形:

```typescript
import type { Options, RequestResult } from '../../../client'
import type { GetPetByIdOptions, GetPetByIdResponses } from '../../types/GetPetById'
import { client } from '../../../client'

export function getPetById<ThrowOnError extends boolean = true>(
  options: Options<GetPetByIdOptions, ThrowOnError>,
): Promise<RequestResult<GetPetByIdResponses, ThrowOnError>> {
  const { client: apiClient = client, ...config } = options

  return apiClient<GetPetByIdResponses, ThrowOnError>({
    method: 'GET',
    url: '/pet/{petId}',
    security: [{ type: 'apiKey', name: 'api_key', in: 'header' }, { type: 'oauth2' }],
    ...config,
    throwOnError: config.throwOnError ?? true,
  })
}
```

`client` は `method`・`{param}` プレースホルダー付きの `url` テンプレート・`security`・グループ化された `path` / `query` / `headers` / `cookies` / `body`・`throwOnError` を受け取り、promise を返す。`cookies` は name / value のペアで、`client` が `Cookie` ヘッダーに結合する（下の例のとおり）。`security` エントリーは 1 つの scheme、または同時に送る scheme の配列。

ボディはレスポンスの `Content-Type` に従って読む。成功 content がバイナリのみの operation は `parseAs: 'blob'` も渡す。

呼び出しは `contentType` も渡せる: `request` はボディの media type、`response` は `Accept` で求める media type。stream operation は常に `contentType: { response: 'text/event-stream' }` や `contentType: { response: 'application/jsonl' }` のように media type を渡す。`text/event-stream` と別の content type を並べて返す operation の呼び出しは、呼び出し側が別のものを選ばない限り `text/event-stream` も渡す。`RequestConfig` にこのフィールドが必要。

### Serialize parameters

spec がパラメーターに `style` / `explode` / `allowReserved` / `contentType` を設定した場合、生成された呼び出しは、位置ごとにグループ化しパラメーター名をキーにした `styles` も渡す:

```typescript
styles: {
  path: { petId: { style: 'matrix', explode: true } },
  query: { tags: { style: 'pipeDelimited', explode: false } },
}
```

エントリーの無いパラメーターは、その位置の既定を使う。共有 runtime の `serializers.ts` がこれらの style を適用する。ゼロから書く client は `RequestConfig` に `styles` を宣言して自前で style を適用するか、spec が既定しか使わないなら無視する。

query パラメーターの既定は `form` style。spec が別に指定しない限り配列は繰り返しキーに展開され、`spaceDelimited` / `pipeDelimited` / `deepObject` は配列とオブジェクトの畳み方を変える。

| Style            | `explode` | Input               | Result           |
| ---------------- | --------- | ------------------- | ---------------- |
| `form` (default) | `true`    | `{ id: [3, 4, 5] }` | `id=3&id=4&id=5` |
| `form`           | `false`   | `{ id: [3, 4, 5] }` | `id=3,4,5`       |
| `spaceDelimited` | `false`   | `{ id: [3, 4, 5] }` | `id=3%204%205`   |
| `pipeDelimited`  | `false`   | `{ id: [3, 4, 5] }` | `id=3\|4\|5`     |
| `deepObject`     | `n/a`     | `{ a: { b: 1 } }`   | `a%5Bb%5D=1`     |

`explode: true` では `spaceDelimited` / `pipeDelimited` は `form` と同じ繰り返しキーに戻るため、区切り文字は `explode: false` のときだけ現れる。

path パラメーターの既定は `simple` style（値そのまま）。`label` は `.` を、`matrix` は `;name=` セグメントを前置する。下の結果は `id` という名前のパラメーターのシリアライズ済みセグメント。

| Style              | `explode` | Input            | Result            |
| ------------------ | --------- | ---------------- | ----------------- |
| `simple` (default) | `false`   | `[3, 4, 5]`      | `3,4,5`           |
| `label`            | `true`    | `[3, 4, 5]`      | `.3.4.5`          |
| `matrix`           | `true`    | `[3, 4, 5]`      | `;id=3;id=4;id=5` |
| `simple`           | `false`   | `{ x: 1, y: 2 }` | `x,1,y,2`         |

header パラメーターは `simple` style、cookie パラメーターは `form` style を使うので、これらの位置のメタデータは `explode` のみを持ち、OpenAPI 3.2 の `cookie` style の cookie パラメーターには `style: 'cookie'` も付く。header 値はそのまま送られ、cookie 値は URL エンコードされて 1 本の `Cookie` ヘッダーになる。`cookie` style は RFC 6265 のとおりエンコードなしで送り、`explode` の既定は `true` で、`;` やスペースなどの文字を含む値や、`a=b` のように cookie 名として不正な展開済みオブジェクトキーには throw する。

| Location               | `explode` | Input                             | Result                    |
| ---------------------- | --------- | --------------------------------- | ------------------------- |
| header                 | `false`   | `[3, 4]`                          | `X-Ids: 3,4`              |
| header                 | `true`    | `{ role: 'admin' }`               | `X-Filter: role=admin`    |
| cookie                 | `false`   | `{ session: 'abc', ids: [1, 2] }` | `session=abc; ids=1,2`    |
| cookie                 | `true`    | `{ ids: [1, 2] }`                 | `ids=1; ids=2`            |
| cookie, `cookie` style | default   | `{ sid: 'a%20b', ids: [1, 2] }`   | `sid=a%20b; ids=1; ids=2` |

最小の client（`fetch` 使用。transport は使う HTTP ライブラリに置き換える）:

```typescript
// src/client.ts
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

export type RequestConfig = {
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'
  url: string
  baseURL?: string
  headers?: object
  path?: object
  query?: object
  cookies?: object
  body?: unknown
  signal?: AbortSignal
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream'
  contentType?: string | { request?: string; response?: string }
  throwOnError?: boolean
  security?: Array<Auth | Array<Auth>>
  styles?: object
  client?: typeof client
}

type DataShape = { body?: unknown; cookies?: unknown; headers?: unknown; path?: unknown; query?: unknown }

export type Options<TData extends DataShape, ThrowOnError extends boolean = true> = Omit<RequestConfig, keyof DataShape | 'url' | 'method'> &
  TData & { throwOnError?: ThrowOnError }

export type RequestResult<TResponses, ThrowOnError extends boolean = true> = ThrowOnError extends true
  ? { data: TResponses[keyof TResponses]; error: undefined; response: Response }
  : { data: TResponses[keyof TResponses]; error: undefined; response: Response } | { data: undefined; error: {}; response: Response }

// Only needed by the query plugins: what a failed hook rejects with.
export type ResponseErrorConfig<TError = unknown> = Error & { body?: TError }

// Set this to your API host. `new URL()` needs an absolute URL.
export const settings = { baseURL: 'https://petstore3.swagger.io/api/v3' }

async function send(config: RequestConfig) {
  const path: Record<string, unknown> = { ...config.path }
  const url = new URL((config.baseURL ?? settings.baseURL) + config.url.replace(/\{(\w+)\}/g, (_, key) => encodeURIComponent(String(path[key]))))
  const cookie = Object.entries(config.cookies ?? {})
    .filter(([, value]) => value != null)
    .map(([name, value]) => `${name}=${encodeURIComponent(String(value))}`)
    .join('; ')

  const response = await fetch(url, {
    method: config.method,
    headers: {
      ...(config.headers as Record<string, string>),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: config.body === undefined ? undefined : JSON.stringify(config.body),
    signal: config.signal,
  })
  const body = await response.json().catch(() => undefined)

  if (response.ok) return { data: body, error: undefined, response }
  if (config.throwOnError ?? true) throw new Error(`Request failed with status ${response.status}`)
  return { data: undefined, error: body ?? { status: response.status }, response }
}

// Generated functions pass their responses type and `ThrowOnError`.
export const client = <TResponses, ThrowOnError extends boolean = true>(config: RequestConfig) =>
  send(config) as Promise<RequestResult<TResponses, ThrowOnError>>
```

## Notes

- 相対 `importPath` の場合、フックは生成 operation ファイルから解決するため、1 つのパスで両方に通用する
- 上記の型は最小のスケッチ。status 対応のレスポンス型が必要なら追加する。base URL setter・query 処理・async auth hook を備えた完全版は公式 example project（`https://github.com/kubb-labs/plugins/tree/main/examples/client`）にある
- The sketch's `RequestResult` types `data` as `TResponses[keyof TResponses]`, which includes error responses and the raw `{ contentType, data }` definitions, while the client returns only the parsed body; for a correct contract select the 2xx responses and unwrap the body as in [examples/client.md](../examples/client.md) (`SuccessOf` / `DataOf`)
- Migration (5.x → 6.0): `toEventStream` / `EventStreamResult` are replaced by a `client.stream` method plus `StreamResult` / `SuccessOf` / `TypedEvent` / `ServerSentEvent` exports; a generated function now calls `apiClient<TResponses, ThrowOnError>(...)` without a cast and imports its types from `../../types/<Operation>` (previously `../../models/<tag>/<Operation>`); `RequestConfig` gains `cookies`, `parseAs`, `contentType`, and `styles`, and `security` entries become `Auth` or an array of `Auth` (6.0.0 CHANGELOG and migrate-to-v6)
- A custom client (`importPath`) gets no typed response headers (6.0.0 CHANGELOG)
- Kubb は retry・interceptor・リクエスト署名に依存しない。必要なら `client` に追加する
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/write-your-client （`@kubb/plugin-client@6.0.1`、取得日 2026-11-14）

## Related

- [client-migrate-to-v6](./client-migrate-to-v6.md)
- [client-calling-operations](./client-calling-operations.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
