# plugin-axios: Serialization

生成クライアントは OpenAPI の `style` / `explode` でパラメーターをエンコードし、content type でリクエストボディを serialize し、media type でレスポンスをデコードする。各生成 operation はパラメーター style と content type を保持するため、通常は追加設定不要。

## Signature / Usage

### Override parameter serialization

クライアントの `serializer.query` / `.body` / `.path` を上書きする。省略した関数は既定のまま:

```typescript
import { client } from './gen/.kubb/client'
import qs from 'qs'

client.setConfig({
  serializer: {
    query: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
})
```

`serializer` を単一呼び出しに渡せば、そのリクエストだけ上書きできる。

### Encode request bodies

request content type でボディのエンコードが決まる。既定の serializer は plain object を JSON、`multipart/form-data` を `FormData`、`application/x-www-form-urlencoded` を `URLSearchParams` にする。バイナリやエンコード済みボディ（`FormData` / `URLSearchParams` / `Blob` / `ArrayBuffer` / typed arrays / string）はそのまま通す。

既定で扱えない content type は media type 単位の codec を登録する。`codecs` は content type をキーとし、各エントリは `serialize`（リクエストボディ）・`deserialize`（レスポンス）のいずれか、または両方:

```typescript
import { client } from './gen/.kubb/client'
import { stringify } from 'yaml'

client.setConfig({
  codecs: {
    'application/yaml': { serialize: (body) => stringify(body) },
  },
})
```

### Decode responses

runtime はレスポンスの `Content-Type` でデコードする（JSON はパース、text は文字列、バイナリは `Blob`）。ネゴシエートされた media type は result の `contentType` にあり、複数返す operation では `switch (result.contentType)` で `data` が絞り込まれる。

runtime が扱わない media type は codec の `deserialize`（生ボディと content type を受け取りパース値を返す）で登録する。検証より前に実行される:

```typescript
client.setConfig({
  codecs: {
    'application/xml': { deserialize: (raw) => new DOMParser().parseFromString(raw as string, 'application/xml') },
  },
})
```

`Content-Type` 欠落や誤りでパースモードが外れる場合、呼び出しの `responseType`（`'json'` / `'text'` / `'blob'` / `'arraybuffer'` / `'document'` / `'formdata'`）で強制する:

```typescript
const { data } = await downloadInvoice({ path: { id: '123' }, responseType: 'blob' })
// data is a Blob even when the server leaves Content-Type unset
```

### Validate responses

クライアントプラグインで `validator` を有効にし、同じ設定に `pluginZod` を登録する。既定は無効:

```typescript
import { pluginAxios } from '@kubb/plugin-axios'

pluginAxios({ validator: 'zod' })

// 方向ごとに指定する場合
pluginAxios({ validator: { request: 'zod', response: 'zod' } })
```

`'zod'` は成功レスポンスボディと、throw しない非 2xx のエラーボディを検証する。`request` は送信前にリクエストボディを検証する。不一致は schema の `issues` を持つ `ParseError` を投げる。

## Notes

- `FormData` ボディでは runtime が `Content-Type` ヘッダーを削除し、transport が multipart boundary 付きで設定する。`multipart/form-data` を自分で設定する必要はなく、設定した値はそのリクエストで破棄される
- `codecs` も呼び出し単位で渡せ、呼び出し側のエントリは該当 content type についてクライアント側にマージされる
- 双方向フォーマットは media type codec に `serialize` と `deserialize` の両方を与え、operation の request / response `contentType` を設定する
- 既定のパラメーター style / encoding は公式 reference（`https://kubb.dev/docs/5.x/reference/serialization#parameter-styles`）を serializer 置換前に確認する
- `responseType: 'stream'` は server-sent events ページを参照
- Source: https://kubb.dev/extensions/kubb-labs/plugin-axios/guides/serialization （`@kubb/plugin-axios@5.6.5`）

## Related

- [axios-server-sent-events](./axios-server-sent-events.md)
- [axios-calling-operations](./axios-calling-operations.md)
- [axios-error-handling](./axios-error-handling.md)
- [fetch-serialization](./fetch-serialization.md)
