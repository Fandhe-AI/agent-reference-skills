# plugin-fetch: Serialization

生成クライアントは OpenAPI の `style` / `explode` でパラメーターをエンコードし、media type でボディをエンコード・デコードする。各生成 operation はパラメーター style と content type を保持するため、通常は追加設定不要。

## Signature / Usage

### Parameter styles

spec で `style` / `explode` を指定しないパラメーターは、その位置の既定を使う。

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

header パラメーターは `simple` style、cookie パラメーターは `form` style を使う。どちらも style は固定で `explode` のみ変えられるため、これらの位置のメタデータは `explode` だけを持つ。header 値はそのまま送られ、cookie 値は URL エンコードされて 1 本の `Cookie` ヘッダーになる。

| Location | `explode` | Input                             | Result                 |
| -------- | --------- | --------------------------------- | ---------------------- |
| header   | `false`   | `[3, 4]`                          | `X-Ids: 3,4`           |
| header   | `true`    | `{ role: 'admin' }`               | `X-Filter: role=admin` |
| cookie   | `false`   | `{ session: 'abc', ids: [1, 2] }` | `session=abc; ids=1,2` |
| cookie   | `true`    | `{ ids: [1, 2] }`                 | `ids=1; ids=2`         |

### Override parameter serialization

既定を置き換えるには、クライアントの `serializer.query` または `serializer.path` を上書きする。省略した関数は既定のまま:

```typescript
import { client } from './gen/.kubb/client'
import qs from 'qs'

client.setConfig({
  serializer: {
    query: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
})
```

この方法で設定した serializer は全呼び出しで動く。単一呼び出しに `serializer` を渡せば、そのリクエストだけ上書きできる。

Kubb は spec が必要とする serializer を `.kubb/serializers/` に書き出し、`.kubb/config.ts` に列挙する。`.kubb/client.ts` がそれを `setConfig` に渡す。core 自身は serializer を持たない。

| Key in `serializer` | File                                                                                 | Written for                    |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------ |
| `query`             | `query.ts`, or `queryStyles.ts` for a spec with a styled query parameter             | every spec                     |
| `path`              | `path.ts`, plus `pathStyles.ts` for a spec with a `label` or `matrix` path parameter | every spec                     |
| `header`            | `headers.ts`                                                                         | a spec with a header parameter |
| `cookie`            | `cookies.ts`                                                                         | a spec with a cookie parameter |

spec が登録しなかった serializer を必要とする呼び出しは、`serializer.cookie` のようにキー名を示す `TypeError` を投げる。そのような呼び出しを送るにはクライアントに設定する。`serializer.header` が無いと、配列やオブジェクトの header 値は JSON で送られる。

### Built-in media types

| Keys                                                                                     | Encodes                                           | Decodes                                    |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| `application/json`, `application/*+json`, `text/json`                                    | JSON                                              | JSON                                       |
| `text/*`                                                                                 | a string                                          | text                                       |
| `multipart/form-data`, `application/x-www-form-urlencoded`                               | `FormData` or `URLSearchParams` from an object    | `FormData`                                 |
| `application/octet-stream`, `application/pdf`, `image/*`, `audio/*`, `video/*`           | a `Blob` as is                                    | `Blob`                                     |
| `text/event-stream`, `application/jsonl`, `application/x-ndjson`, `application/json-seq` |                                                   | text, or item by item with `client.stream` |
| `*/*`                                                                                    | JSON for objects, strings and binary bodies as is | JSON, or text when the body is not JSON    |

`.kubb/client.ts` は、ドキュメントにその型のボディがある場合だけ form media type を登録し、stream の場合だけ stream media type を登録する。`multipartFormData` は `.kubb/mediaTypes/formData.ts`、`urlencoded` は `.kubb/mediaTypes/urlencoded.ts` にある。stream media type は `.kubb/sse.ts` の `streamMediaTypes`。

キーはパターンにできる。runtime は type を小文字化しパラメーターを落としてから、完全一致、`application/*+json` のような suffix、`text/*` のようなワイルドカード、`*/*` の順に試す。自分のキーは小文字で書く。

### Encode request bodies

operation が request content type を 1 つだけ宣言する場合、Kubb が生成関数にそれを設定するのでボディだけ渡せばよい。複数受け付ける operation では呼び出しに `contentType` を指定する。content type の無いボディは、すでにエンコード済みでない限り `application/json` で送られる。

エンコード済みボディ（`FormData` / `URLSearchParams` / `Blob` / `ArrayBuffer` / typed arrays / streams / string）はどの組み込み media type でもそのまま通る。JSON media type 下の string は JSON エンコードされる。

XML / YAML / CSV の media type には組み込みハンドラーが無く、その下でオブジェクトを送ると `TypeError` を投げる。エンコード済みボディを string で渡すか、media type を登録する。生成されるボディ型は `Pet` のような schema なので、string ボディにはキャストが必要: `body: xml as unknown as AddPetBodyXml`。

### Add a media type

`mediaTypes` で media type ごとにハンドラーを登録する。`encode` はボディと完全な `contentType` を含む context を受け取り、`fetch` が送れる値を返す。`decode` は `Response` を受け取るので、バイナリ形式はバイト列を読める:

```typescript
import { client } from './gen/.kubb/client'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'

client.setConfig({
  mediaTypes: {
    'application/xml': {
      encode: (body) => new XMLBuilder().build(body),
      decode: async (response) => new XMLParser().parse(await response.text()),
    },
  },
})
```

ハンドラーはキーごとに、組み込み、先の `setConfig` 呼び出し、単一呼び出しに渡した場合はクライアント側の順にマージされる。`decode` だけのエントリーでも、エンコードは `*/*` など次の一致を通る。

ストリーミング形式は `stream` を足し、2xx ボディを項目ごとに読む。runtime は各項目を検証する:

```typescript
client.setConfig({
  mediaTypes: {
    'multipart/mixed': { stream: (body, { contentType }) => readParts(body, boundaryOf(contentType)) },
  },
})
```

### Decode responses

runtime はレスポンスの `Content-Type` ごとにボディをデコードする。media type は result の `contentType` にあり、複数返す operation では `switch (result.contentType)` で `data` が絞り込まれる。

- `Content-Type` の無い 2xx レスポンスは、呼び出しが `contentType.response` で求めた media type、次に `*/*` としてデコードされる
- 204 / 205 / 304 レスポンス、`HEAD` リクエスト、空ボディは `data: undefined`
- JSON media type 下の不正な JSON は `ParseError` を投げる。catch するか、寛容な `application/json` ハンドラーを登録する

1 回の呼び出しで lookup を省くには `parseAs` を `'json'` / `'text'` / `'blob'` / `'arrayBuffer'` / `'stream'` に設定する。2xx ボディにのみ適用される。成功コンテンツがバイナリのみの operation には Kubb が `parseAs: 'blob'` を設定する:

```typescript
const { data } = await getReport({ path: { id: '123' }, parseAs: 'text' })
```

生成される型は組み込み media type の戻り値に従う。`application/xml` / `application/yaml` / `text/csv` のようにテキストとして読まれるレスポンスは、ドキュメントがオブジェクト schema を与えていても `string` 型。`application/vnd.github.object` のようなベンダー型は JSON ボディをパースするため schema 型のまま。登録した media type は値を変えるがその型は変えないので、`data` を絞り込むかキャストする:

```typescript
const result = await getPetById({ path: { petId: 1 }, contentType: { response: 'application/xml' } })
if (result.contentType === 'application/xml') {
  const pet = result.data as unknown as Pet
}
```

[Server-sent events](https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/server-sent-events) は stream media type と `client.stream` を扱う。

### Validate responses

クライアントプラグインで `validator` を有効にし、同じ設定に `pluginZod` を登録する。既定は無効:

```typescript
import { pluginFetch } from '@kubb/plugin-fetch'

pluginFetch({ validator: 'zod' })
```

方向ごとに指定する場合:

```typescript
pluginFetch({ validator: { request: 'zod', response: 'zod' } })
```

`'zod'` は成功レスポンスボディとエラーボディを検証する。`request` は送信前にリクエストボディを検証する。Kubb は各生成呼び出しに対応する schema を渡し、runtime はデコード済みボディをそれでパースする。不一致は schema の `issues` を持つ `ParseError` を投げる。

## Notes

- `FormData` ボディでは runtime が `Content-Type` ヘッダーを削除し、transport が multipart boundary 付きで設定する
- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- adapter 既定の `integerType: 'bigint'` では `format: int64` のフィールドは `bigint` 型だが `JSON.parse` は `number` を返す。`adapterOas` に `integerType: 'number'` を設定するか、フィールドを `bigint` に変換する `validator: 'zod'` を有効にする。いずれでも `JSON.parse` は `Number.MAX_SAFE_INTEGER` を超えると精度を失うため、厳密な 64 ビット ID はドキュメント上 string で宣言する
- `mediaTypes` / `parseAs` は呼び出し単位でも渡せる
- `parseAs: 'stream'` は server-sent events ページを参照
- Migration (5.x → 6.0): `codecs` is now `mediaTypes`, `serialize` is now `encode`, and `deserialize` is now `decode` (receiving the `Response`; read the body yourself with `await response.text()`); `serializer.body` is removed (move a custom body serializer into a `mediaTypes` entry); `responseType` on a call is replaced by `parseAs`; `defaultQuerySerializer` / `defaultPathSerializer` / `applyHeaderStyles` are now `serializeQuery` / `serializePath` / `serializeHeaders`, `serializer.header` and `serializer.cookie` are new keys, and `setConfig({ serializer })` merges per key; `formMediaTypes` is gone (form media types live in `.kubb/mediaTypes/`) (6.0.0 CHANGELOG and migrate-to-v6)
- Migration (5.x → 6.0): behavior changes that compile without errors — an object query parameter without a `style` goes out as `name=odie&age=3` rather than `filter[name]=odie` (set `style: deepObject` to keep brackets), an array or object header without a `style` goes out as `X-Ids: 3,4` rather than JSON, a space in a query value goes out as `%20` rather than `+`, `spaceDelimited` / `pipeDelimited` default `explode` to `false`, a `style: cookie` parameter goes out without percent-encoding (a value it cannot send, such as one containing `;`, throws a `TypeError`), `body: null` goes out as the JSON document `null`, and an empty body is `undefined` for every media type including text (migrate-to-v6, Behavior changes)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/serialization （`@kubb/plugin-fetch@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-server-sent-events](./fetch-server-sent-events.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [fetch-error-handling](./fetch-error-handling.md)
- [axios-serialization](./axios-serialization.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
