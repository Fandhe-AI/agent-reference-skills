# plugin-client: Migrate to v6

`@kubb/plugin-client` 6 は自前の client を型引数付きで呼び、stream は `client.stream` で送る。モジュールの `client` export を更新してから再生成する。自分のコードを下の表で探し、該当セクションに従う。

## Signature / Usage

### Upgrade steps

1. `kubb` と `@kubb/plugin-client` を一緒にアップグレードする。v6 は Kubb 5.18.4 以降が必要:

```bash
npm install --save-dev kubb@latest @kubb/plugin-client@6
```

2. 下のセクションに沿って client モジュールを更新する。

3. operation ファイルを再生成する:

```bash
npx kubb generate
```

4. 型チェックを実行する。client モジュールの export やフィールドの不足は、生成ファイルのコンパイルエラーとして現れる:

```bash
npx tsc --noEmit
```

### A generic client call

生成関数は `client<TResponses, ThrowOnError>(config)` を呼ぶようになった。`client` をジェネリックにする:

```typescript
export const client = <TResponses, ThrowOnError extends boolean = true>(config: RequestConfig) =>
  send(config) as Promise<RequestResult<TResponses, ThrowOnError>>
```

### A stream method instead of toEventStream

Server-Sent Events または JSON Lines の operation は `client.stream<TResponses, ThrowOnError, TItem>(config)` を呼ぶ。`toEventStream` と `EventStreamResult` を削除し、`client` に `stream` を追加し、`StreamResult` / `SuccessOf` / `TypedEvent` / `ServerSentEvent` を export する:

```typescript
export type StreamResult<TResponses, ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>> = {
  stream: AsyncGenerator<TEvent>
  response: Response
}

export function client<TResponses, ThrowOnError extends boolean = true>(config: RequestConfig) {
  return send<TResponses, ThrowOnError>(config)
}

client.stream = async <TResponses, ThrowOnError extends boolean = true, TEvent = ServerSentEvent<SuccessOf<TResponses>>>(
  config: RequestConfig,
): Promise<StreamResult<TResponses, ThrowOnError, TEvent>> => {
  // send the request and parse the body into TEvent values
}
```

Server-Sent Events の呼び出しは `eventShape: 'event'` または `'data'` も渡す。`application/jsonl` / `application/x-ndjson` のような JSON Lines の呼び出しは media type を `contentType.response` に渡し、1 行 1 パース済み item を期待する。client-write-your-client ページも参照。

### New fields on the request config

`RequestConfig` に次のフィールドを追加する。さもないと生成関数がコンパイルに失敗する:

```typescript
export type RequestConfig = {
  // ...
  contentType?: string | { request?: string; response?: string }
  // Replaces `responseType`. Binary downloads pass 'blob'.
  parseAs?: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'stream'
  eventShape?: 'event' | 'data'
  // Name and value pairs for `in: cookie` parameters. Join them into a `Cookie` header on the server. Browsers ignore a `Cookie` header set by script and send their own cookies.
  cookies?: object
  // `style`, `explode`, `allowReserved`, and `contentType` per parameter, grouped by location.
  styles?: object
}
```

OpenAPI 3.2 の `cookie` style を持つ cookie パラメーターは `styles` に `style: 'cookie'` を渡す。値は percent-encoding なしで送る。

### Security requirements

1 つの requirement が API キーとセッション cookie のように複数 scheme を同時に要求する場合、`security` エントリーは配列になる。全てを送るか、そのエントリーをスキップする。

`oauth2` scheme は `flows` と `metadataUrl` も渡し、`openIdConnect` scheme は `url` を渡す。auth の型で受け取る:

```typescript
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
```

### Status ranges

status range は生成される名前とキーで小文字になる。import と、手書きの responses record や `validator.error` マップの range キーをリネームする。`'2XX'` のような大文字キーは読まれなくなる:

```diff
- import type { ListPetsStatus4XX } from './gen/types/ListPets'
+ import type { ListPetsStatus4xx } from './gen/types/ListPets'
```

### Tag folders

`group: { type: 'tag' }` では、OpenAPI 3.2 の `parent` が `store` のタグは `payment/` ではなく `store/payment/` に書き込まれる。`importPath` は与えたとおり全ファイルに書き込まれるため、`store/` と `store/payment/` のように深さの違うファイルを 1 つの相対パスでは賄えない。タグごとに 1 フォルダーを保つよう `group.name` を渡すか、全フォルダーから解決できるパッケージ名やエイリアスを `importPath` に設定する:

```typescript
pluginClient({ importPath: '../../../client', group: { type: 'tag', name: ({ group }) => group } })
```

### Behavior changes

これらはエラーなしでコンパイルされるため、手で確認する:

- path または operation が独自の `servers` を持つ場合、その server が呼び出しの `baseURL` として渡される。client は `config.baseURL` が設定されていればそれを使う必要がある
- `2xx` レスポンスキーは成功で、`200` のような正確なコードは、それより前に列挙された range に優先する
- XML / YAML / CSV レスポンスは `string` 型。画像・音声・動画・PDF・`application/octet-stream` レスポンスは `Blob` 型。成功 content type が全てバイナリなら、呼び出しは `parseAs: 'blob'` を渡す
- 成功 content type が JSON Lines のみの operation は、本文全体の 1 文字列ではなく `StreamResult` を返す

### Return type

`returnType` は新しく、既定は `'plain'` なので既存コードはそのまま動く。`'full'` では生成された呼び出しが結果を `withUnwrap` で包むので、モジュールは `withUnwrap` / `resolveThrowOnError` と `Unwrappable` 型も export する必要がある。`'data'` では `throwOnError` が `true` のとき呼び出しは本文へ resolve し、`false` のときは完全な result へ resolve する。このときモジュールは `unwrapResult` / `resolveThrowOnError` / `UnwrappedResult` 型を export する必要がある。stream operation は、`'full'` では `StreamResult` と共に、`'data'` では `UnwrappedStreamResult` と共に `StreamOptions` も import する。どちらのモードも `data` と `error` を持つ `StreamResult` が必要で（`@kubb/plugin-client/templates/core.ts` のもののように）、上の最小の型では足りない。これらは全て `@kubb/plugin-client/templates/core.ts` が export する。

## Options / Props

### What to change

| Your code                                                                       | What to do                                                                                                                                                                   |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exports a `client` that takes no type arguments                                 | Make it generic. See [A generic client call](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#a-generic-client-call).                                |
| Exports `toEventStream` or `EventStreamResult`                                  | Add a `stream` method to `client`. See [A stream method](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#a-stream-method-instead-of-toeventstream). |
| Declares `responseType` on `RequestConfig`, or lacks `contentType` or `cookies` | Add the new fields. See [New fields on the request config](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#new-fields-on-the-request-config).       |
| Reads `security` entries as single schemes                                      | Handle arrays and the new fields. See [Security requirements](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#security-requirements).               |
| Imports a `…Status2XX` type, or writes a `'2XX'` key                            | Write the range in lower case. See [Status ranges](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#status-ranges).                                  |
| Groups by tag in an OpenAPI 3.2 document whose tags set `parent`                | Update the import paths. See [Tag folders](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#tag-folders).                                            |
| Has `servers` on a path or operation, or reads XML, YAML, CSV, or binary bodies | Check [Behavior changes](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#behavior-changes). It compiles.                                            |
| Wants `.unwrap()` or a call that resolves to the body                           | Set `returnType`. See [Return type](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6#return-type). This is optional.                                 |

## Notes

- 対象は `kubb` 5.18.4 以降。`@kubb/plugin-fetch` / `@kubb/plugin-axios` の移行は各ページを参照
- Migration (5.x → 6.0): a generated function now calls `client<TResponses, ThrowOnError>(config)` (make `client` generic) and streams through `client.stream`; `toEventStream` and `EventStreamResult` are removed; `RequestConfig` gains `contentType`, `parseAs` (replacing `responseType`), `eventShape`, `cookies`, and `styles`; a `security` entry may be an array of schemes and `oauth2` / `openIdConnect` entries carry `flows` / `metadataUrl` / `url`; status ranges are written in lower case (`ListPetsStatus4xx`); with `group: { type: 'tag' }` a tag whose `parent` is `store` writes to `store/payment/`; `returnType` is new and defaults to `'plain'` (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/migrate-to-v6 （`@kubb/plugin-client@6.0.1`、取得日 2026-11-14）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-calling-operations](./client-calling-operations.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
- [axios-migrate-to-v6](./axios-migrate-to-v6.md)
