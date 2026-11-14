# plugin-fetch: Migrate to v6

`@kubb/plugin-fetch` 6 は `@kubb/plugin-client` の共有クライアント core の上で動く（`@kubb/plugin-axios` と同じ core）。生成された関数・SDK クラス・フックを呼ぶだけのコードは再生成のみでよい。`client` を設定する、media type を追加する、stream を使う、transport を書くコードは下の修正が必要。

## Signature / Usage

### Upgrade steps

1. `kubb` と `@kubb/plugin-fetch` を一緒にアップグレードする。v6 は Kubb 5.18.4 以降が必要:

```bash
npm install --save-dev kubb@latest @kubb/plugin-fetch@6
```

2. 再生成する。`.kubb/` と operation ファイルが書き換わる:

```bash
npx kubb generate
```

3. 型チェックを実行する。破壊的変更の多くは自分のコード側のコンパイルエラーとして現れる:

```bash
npx tsc --noEmit
```

4. 各エラーを下の「What to change」表の該当行で直す。その後、型チェッカーが捕まえない「Behavior changes」を読む。

### Template imports

`templates/fetch.ts` は無くなり、パッケージは独自の `templates/core.ts` / `templates/serializers.ts` / `templates/standardSchema.ts` を公開しなくなった。クライアントの型は `@kubb/plugin-fetch/templates/client.ts` から、共有 runtime は `@kubb/plugin-client/templates/*` から import する:

```typescript
// before
import type { RequestConfig } from '@kubb/plugin-fetch/templates/fetch.ts'
import type { ResolvedRequest } from '@kubb/plugin-fetch/templates/core.ts'

// after
import type { RequestConfig } from '@kubb/plugin-fetch/templates/client.ts'
import type { ResolvedRequest } from '@kubb/plugin-client/templates/core.ts'
```

パッケージが export する `templates/client.ts` は型専用。`client` などの runtime の値は引き続き生成された `.kubb/client.ts` から来る。

### Media types

`codecs` は `mediaTypes` になり、メソッド名も変わる（表は Options / Props の「Media types」）。

```typescript
// before
client.setConfig({ codecs: { 'application/xml': { deserialize: (raw) => parseXml(raw as string) } } })

// after
client.setConfig({ mediaTypes: { 'application/xml': { decode: async (response) => parseXml(await response.text()) } } })
```

キーは `application/*+json` や `text/*` のようなパターンにできる。form media type は、ドキュメントに form ボディがある場合だけ `.kubb/mediaTypes/` に `multipartFormData` / `urlencoded` として書き出される。

### Streams

stream リクエストは `client.stream` で送る。result はすでに stream:

```typescript
// before
const { stream } = await toEventStream(client({ method: 'GET', url: '/events', responseType: 'stream' }), { shape: 'data' })

// after
const { stream } = await client.stream({ method: 'GET', url: '/events', eventShape: 'data' })
```

`StreamResult` / `UnwrappedStreamResult` は responses record と完全な event 型を取る。payload は `ServerSentEvent` で包む。`TypedEvent<…>` で型付けした stream は変わらない:

```typescript
// before
let result: EventStreamResult<PetEvent>

// after
let result: StreamResult<StreamPetsResponses, true, ServerSentEvent<PetEvent>>
```

成功 content type が JSON Lines（`application/jsonl` / `application/x-ndjson`）のみの operation は、行ごとにパースした item を持つ `StreamResult` を返す。以前は本文全体を 1 つの文字列として返していた:

```typescript
for await (const entry of await streamLogs()) {
  console.info(entry.message) // LogEntry
}
```

ヘッダーを宣言する stream レスポンスは `StreamResultWithHeaders`（`returnType: 'data'` では `UnwrappedStreamResultWithHeaders`）を返す。

### Transports

transport は web `Response`、または native オブジェクトも設定する `{ webResponse, request, response }` を返す。`toRequestInit(request)` で `RequestInit` を組み立てる。core がボディをデコードし、response interceptor は `TransportResult` が持っていた形の `DecodedResponse` を受け取る:

```typescript
// before
transport: async () => ({ data: { id: 1 }, status: 200, statusText: 'OK', headers: new Headers(), request, response })

// after
transport: async () => Response.json({ id: 1 })
```

詳細は fetch-transport ページを参照。

### Error interceptors

`client.interceptors.error` ハンドラーはネットワークエラー・abort・検証エラーも受け取るようになった。`status` を読む前に `ResponseError.is` で絞り込む。各ハンドラーは直前のハンドラーが返した error を受け取る:

```typescript
client.interceptors.error.use((error) => {
  if (ResponseError.is(error) && error.status === 401) refreshToken()
  return error
})
```

### Status ranges

status range は生成される名前とキーで小文字になる。import と、手書きの responses record や `validator.error` マップの range キーをリネームする。`'2XX'` のような大文字キーは読まれなくなる:

```diff
- import type { ListPetsStatus4XX } from './gen/types/ListPets'
+ import type { ListPetsStatus4xx } from './gen/types/ListPets'
```

### Generated file paths

2 つの変更で生成ファイルが移動する。export 名は変わらない:

- `group: { type: 'tag' }` では、OpenAPI 3.2 の `parent` が `store` のタグは `payment/` ではなく `store/payment/` に書き込まれる。タグごとに 1 フォルダーを保つには `group.name` を渡す: `pluginFetch({ group: { type: 'tag', name: ({ group }) => group } })`
- schema ファイルと大文字小文字を無視して同名の operation ファイルには `Operation` suffix が付く。operation `point` は schema `Point` の隣の `types/PointOperation.ts` に出力される

```diff
- import { listPayments } from './gen/clients/payment/listPayments'
+ import { listPayments } from './gen/clients/store/payment/listPayments'
```

### SDK class names

`sdk` と `group: { type: 'tag' }` では、タグクラスは `pet` ではなく `PetClient` のように命名される。ファイルと root クラスの `pet` / `store` フィールドは変わらない:

```diff
- import { pet } from './gen/sdk/pet/pet'
- const api = new pet({ baseURL })
+ import { PetClient } from './gen/sdk/pet/pet'
+ const api = new PetClient({ baseURL })
```

root クラスは全タグで 1 つの client を共有する。interceptor は `api.client` に追加する。

### Behavior changes

これらはエラーなしでコンパイルされるため、手で確認する。

リクエスト:

- path または operation が独自の `servers` を持つ場合、その呼び出しはクライアントの `baseURL` ではなくそこへ送られる。上書きするには呼び出しに `baseURL` を渡す
- `style` の無いオブジェクト query パラメーターは `filter[name]=odie` ではなく `name=odie&age=3` で送られる。ブラケットを保つにはドキュメントに `style: deepObject` を設定する
- `style` の無い配列 / オブジェクト header は JSON ではなく `X-Ids: 3,4` で送られる
- query 値のスペースは `+` ではなく `%20` で送られる
- `spaceDelimited` / `pipeDelimited` は `explode` の既定が `false` になり、配列は `ids=1%7C2` で送られる
- `style: cookie` パラメーターは percent-encoding なしで送られる。送れない値（`;` を含むものなど）は `TypeError` を投げる
- `body: null` は JSON ドキュメントの `null` として送られる
- stream 呼び出しは `Accept: text/event-stream`（または JSON Lines の media type）を送る
- 複数 scheme を要求する auth requirement は全てを送る

レスポンス:

- JSON media type 下の不正な JSON は文字列にならず `ParseError` を投げる。catch するか、寛容な `application/json` エントリーを登録する
- 空ボディは text を含む全 media type で `undefined`
- ボディの無い失敗呼び出しは `{ status, statusText }` を `error` として報告する
- `ResponseError.data` は検証済みボディを持つ。エラーボディをその status の schema で検査するには、`validator.error` を `{ 404: getPetStatus404Schema }` のような status キーのマップに設定する
- abort された呼び出しや stream は signal の reason で reject する
- 全ての result と投げられた `ResponseError` は、レスポンスの `Headers` を `headers` として持つ

型:

- `2xx` レスポンスキーは成功で、`4xx` のような range キーは `status` をそれがカバーする数値として型付けする。`200` のような正確なコードは、それより前に列挙された range に優先する
- XML / YAML / CSV レスポンスは `string` 型。JSON と XML を返す operation は `data: Pet | string` なので `result.contentType` で絞り込む
- 画像・音声・動画・PDF・`application/octet-stream` レスポンスは、schema が `type: string` でも `Blob` 型
- `result.contentType` は `'text/html'` のような media type 本体のみ
- `server.index` は `url` の無い server を数えなくなった。`name` を持つ server は `.kubb/client.ts` から `servers` として export され、`client.setConfig({ baseURL: servers.staging })` に使える

### From 5.12 or earlier

5.13 で次が変わった（エラーなしでコンパイルされる）:

- ストリームでないボディ（JSON ボディなど）を持つ成功した stream 呼び出しは、ボディを `cause` とする `TypeError` を投げる。ボディの無い成功応答は引き続き空の stream で終わる
- サーバーが空行なしで終えた event は、ブラウザーの `EventSource` と同じく破棄される。全 event を空行で終える

### Query plugins

`@kubb/plugin-react-query` / `@kubb/plugin-vue-query` / `@kubb/plugin-swr` / `@kubb/plugin-mcp` は v5 と v6 の両方で動くので、別々にアップグレードできる。JSON Lines operation のフックは、event stream と同様に生成されない。

## Options / Props

### What to change

| Your code                                                                                       | What to do                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calls generated functions, SDK methods, or hooks                                                | Regenerate. Then check [Behavior changes](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#behavior-changes).                                |
| Imports from `@kubb/plugin-fetch/templates/fetch.ts` or `templates/core.ts`                     | Change the import path. See [Template imports](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#template-imports).                           |
| Uses `FetchOptions`, `defaultQuerySerializer`, `toEventStream`, or another removed export       | Use the replacement. See [Renamed and removed exports](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#renamed-and-removed-exports).        |
| Sets `codecs`, `serializer.body`, or `responseType`                                             | Use `mediaTypes` and `parseAs`. See [Media types](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#media-types).                             |
| Streams Server-Sent Events, or names `EventStreamResult`                                        | Use `client.stream` and `StreamResult`. See [Streams](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#streams).                             |
| Writes a `transport`                                                                            | Return a web `Response`. See [Transports](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#transports).                                      |
| Registers `client.interceptors.error` handlers                                                  | Narrow the error first. See [Error interceptors](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#error-interceptors).                       |
| Imports a `…Status2XX` type, or writes a `'2XX'` key                                            | Write the range in lower case. See [Status ranges](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#status-ranges).                          |
| Imports generated files by path, and groups by tag or has a schema and an operation of one name | Update the import paths. See [Generated file paths](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#generated-file-paths).                  |
| Uses SDK classes with `group: { type: 'tag' }`, such as `new pet(config)`                       | Use the new names, such as `new PetClient(config)`. See [SDK class names](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#sdk-class-names). |
| Comes from 5.12 or earlier and uses streams                                                     | Check [From 5.12 or earlier](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#from-5-12-or-earlier).                                         |

### Renamed and removed exports

| Before                                                             | After                                                                                                                               |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `FetchOptions`                                                     | `NativeOptions`, the same type: `RequestInit` plus Next.js's `next`.                                                                |
| `defaultQuerySerializer`                                           | `serializeQuery`, or `serializeStyledQuery` for a styled query parameter or a urlencoded body                                       |
| `defaultPathSerializer`                                            | `serializePath`, plus `serializeStyledPath` for a `label` or `matrix` parameter                                                     |
| `applyHeaderStyles`                                                | `serializeHeaders`                                                                                                                  |
| `toEventStream`, `EventStreamCall`, `EventStreamResult`            | `client.stream` and `StreamResult`. See [Streams](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#streams). |
| `Codec`, `Deserializer`, `ContentBodySerializer`, `BodySerializer` | `MediaType`. See [Media types](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6#media-types).                |
| `defaultBodySerializer`, `isDefaultJsonBody`                       | A `mediaTypes` entry, or `defaultMediaTypes`.                                                                                       |
| `ResponseType`, `ResponseTypeMap`, `resolveResponseType`           | `ParseAs` and `parseAs`.                                                                                                            |
| `CallResult`, `isStreamed`, `getResponseContentType`               | Removed. Read `result.contentType`.                                                                                                 |
| `clientGenerator` from `@kubb/plugin-fetch`                        | Removed. Build on `setupClient` and `clientDependencies` from `@kubb/plugin-client`.                                                |

serializer は `.kubb/serializers/` に 1 ファイルずつ置かれ、Kubb は書類が必要とするときだけファイルを書く。`.kubb/config.ts` がそれらを登録し、`setConfig({ serializer })` はキーごとにマージするので、`serializer.query` を設定しても他は保たれる。`createClientCore` で組み立てたクライアントには何も付かないので、その `serializer` 設定に渡す。`serializer.header` と `serializer.cookie` は新しいキー。

`ServerSentEvent` / `TypedEvent` / `StreamResult` は `.kubb/sse.ts` から `.kubb/client.ts` へ移った。

### Media types

| Before                                                          | After                                        | Migration                                                                      |
| --------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `codecs`                                                        | `mediaTypes`                                 | Rename the key.                                                                |
| `codecs[type].serialize(body, contentType)`                     | `mediaTypes[type].encode(body, context)`     | Read `context.contentType`.                                                    |
| `codecs[type].deserialize(raw, contentType)` with a parsed body | `mediaTypes[type].decode(response, context)` | Read the body yourself: `await response.text()`.                               |
| `serializer.body`                                               | removed                                      | Move a custom body serializer into a `mediaTypes` entry.                       |
| `responseType` on a call, a string or a map                     | removed                                      | Use `parseAs`, such as `parseAs: 'blob'`, or a media type entry for that call. |

## Notes

- 対象は `kubb` 5.18.4 以降。6.0.0 は共有 core への統合による破壊的変更、6.0.1 はドキュメントの修正と `returnType: 'plain'` の削除
- Migration (5.x → 6.0): `@kubb/plugin-fetch` 6.0.0 runs the fetch and axios clients on one core (`@kubb/plugin-client`) with the same interceptors and client factory; ``templates/fetch.ts` is gone, `FetchOptions` is now `NativeOptions`, `codecs` is now `mediaTypes`, and `toEventStream` is replaced by `client.stream`` (6.0.0 CHANGELOG, Major Changes)
- Migration (5.x → 6.0): `returnType: 'plain'` is no longer accepted or offered on `@kubb/plugin-fetch` and `@kubb/plugin-axios` because it generated code that did not typecheck; it stays available on `@kubb/plugin-client` (6.0.1 CHANGELOG)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/migrate-to-v6 （`@kubb/plugin-fetch@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-calling-operations](./fetch-calling-operations.md)
- [fetch-serialization](./fetch-serialization.md)
- [fetch-server-sent-events](./fetch-server-sent-events.md)
- [fetch-transport](./fetch-transport.md)
- [fetch-interceptors](./fetch-interceptors.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
- [client-migrate-to-v6](./client-migrate-to-v6.md)
