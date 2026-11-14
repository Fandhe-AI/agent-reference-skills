# plugin-fetch: Calling operations

生成クライアントは各 operation でグループ化されたリクエストオプションを受け取り、既定で型付き `RequestResult` を返す。

## Signature / Usage

parameters は OpenAPI operation に合わせ `path` / `query` / `headers` / `cookies` / `body` の下に渡す。

```typescript
import { getPetById } from './gen/clients/getPetById'

const { data } = await getPetById({ path: { petId: 1 } })
//      ^ the parsed pet, typed from the 200 response
```

```typescript
import { searchPets } from './gen/clients/searchPets'
import { updatePet } from './gen/clients/updatePet'

await searchPets({
  query: { status: 'available', category: 'dogs', limit: 10, offset: 0 },
})

await updatePet({
  path: { petId: '123' },
  headers: { 'X-Request-ID': 'req-123456' },
  body: { name: 'Updated name', status: 'sold' },
})
```

各キーは operation が宣言したものだけ現れる。必須パラメーターのない operation は引数なしで `getStatus()` と呼べる。

### Read the result

resolve された呼び出しは数値 `status` で判別される `RequestResult` を返す:

```typescript
type RequestResult = {
  status: number
  data: TData // the parsed success body, undefined on an error result
  error: TError // the parsed error body, undefined on a success result
  contentType: string | undefined // the negotiated response media type
  headers: Headers // the response headers
  request: Request // the native request
  response: Response // the native response
}
```

`throwOnError` が `true`（生成既定）なら resolve は常に成功なので `data` を直接読める:

```typescript
const { data, status, response } = await getPetById({ path: { petId: 1 } })

console.info(status) // 200
console.info(response.headers.get('x-ratelimit-remaining'))
```

複数の成功 status を持つ operation では `status` で絞り込む:

```typescript
const result = await getPetById({ path: { petId: 1 } })

if (result.status === 200) {
  console.info(result.data)
}
```

### Unwrap the success body

`.unwrap()` で成功ボディのみを返す（直接 await すると完全な result）。

```typescript
const pet = await getPetById({ path: { petId: 1 } }).unwrap()
//    ^ the parsed pet, not the full RequestResult
```

`throwOnError: true` では非 2xx で通常の await と同じ `ResponseError` を投げる。`throwOnError: false` では `.unwrap()` はパース済みエラーボディで reject する:

```typescript
try {
  const pet = await getPetById({ path: { petId: 1 }, throwOnError: false }).unwrap()
} catch (error) {
  // the parsed error body, not a ResponseError
  console.error(error)
}
```

### Set the content type

operation が複数メディアタイプを受け付ける／返す場合、呼び出しに `contentType` を指定する。文字列はリクエストの content type、オブジェクト形式はレスポンス用の `Accept` ヘッダーも送る:

```typescript
await uploadAvatar({
  path: { petId: '123' },
  body: avatarBlob,
  contentType: 'image/png',
})

await getPet({
  path: { petId: '123' },
  contentType: { request: 'application/json', response: 'application/xml' },
})
```

content type が 1 つだけ宣言された operation は組み込み済みで、multipart upload も `uploadFile({ path: { petId: '123' }, body: { file: pngBlob } })` のように body のみで足りる。

### Pass native client options

native fetch 設定（`cache` / `mode` / `redirect` / `keepalive` / `next`）は `options` で渡す:

```typescript
await getPetById({ path: { petId: 1 }, options: { cache: 'no-store' } })
```

共有既定は `client.setConfig({ options })`。呼び出し単位の options が優先。serialization と HTTP エラー処理は Kubb が制御する。

### Build a URL without sending

`client.getUrl` はリクエストと同じ base URL・path 補間・query serialization で URL を組み立てる:

```typescript
import { client } from './gen/.kubb/client'

const url = client.getUrl({
  url: '/pets/{petId}',
  path: { petId: 1 },
  query: { fields: 'name' },
})
// https://api.example.com/v1/pets/1?fields=name
```

## Notes

- 例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`petId` のような `int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す
- `headers` はレスポンスの `Headers`（`contentType` の次のキー）。ヘッダーを宣言した operation では、`status` を絞り込んだ後 `get` がその名前を補完し、値は文字列のまま
- `trace` operation の呼び出しも生成されるが、`fetch` と ky は `TRACE` メソッドを拒否する。`@kubb/plugin-axios` か custom transport を使う
- `request` / `response` は native の `Request` / `Response`（plugin-axios 版は `AxiosRequestConfig` / `AxiosResponse`）
- Migration (5.x → 6.0): every result and thrown `ResponseError` now carries the response's `Headers` as `headers`; a `responseType` on a call is replaced by `parseAs`; a call to an operation with its own `servers` goes to that server unless `baseURL` is passed on the call (6.0.0 CHANGELOG and migrate-to-v6)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-fetch/guides/calling-operations （`@kubb/plugin-fetch@6.0.1`、取得日 2026-11-14）

## Related

- [fetch-error-handling](./fetch-error-handling.md)
- [fetch-transport](./fetch-transport.md)
- [fetch-serialization](./fetch-serialization.md)
- [axios-calling-operations](./axios-calling-operations.md)
- [fetch-migrate-to-v6](./fetch-migrate-to-v6.md)
