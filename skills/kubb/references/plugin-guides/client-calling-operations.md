# plugin-client: Calling operations

各生成関数はグループ化された 1 つのオプションオブジェクトを受け取り、client の promise を返す。

## Signature / Usage

```typescript
import { addPet, getPetById } from './gen/clients'

const created = await addPet({ body: { name: 'Odie', photoUrls: [] } })
console.log(created.data, created.response.status)

const pet = await getPetById({ path: { petId: 1 } })
```

例は adapter に [`integerType: 'number'`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を設定しており、`int64` の id は `number` になる。既定では `bigint` で、呼び出しには `1n` を渡す。

キーは `path` / `query` / `headers` / `cookies` / `body`。Kubb が spec から型付けするため、誤ったキーや値はコンパイル時に失敗する。

### Errors

`throwOnError` の既定は `true`（`throwOnErrorDefault` を参照）。その意味は自前 client 次第。[minimal client](https://kubb.dev/extensions/kubb-labs/plugin-client/guides/write-your-client#a-minimal-client)（client-write-your-client ページ参照）では非 2xx で throw し、`throwOnError: false` でエラーを値として返す:

```typescript
const result = await getPetById({ path: { petId: 1 }, throwOnError: false })

if (result.error === undefined) {
  console.log('pet', result.data)
}
if (result.error !== undefined) {
  console.log('failed', result.response.status)
}
```

Adapted (not in the official docs): safer branching with the example client

```typescript
const result = await getPetById({ path: { petId: 1 }, throwOnError: false })

if (result.response.ok) {
  console.log('pet', result.data)
} else {
  console.log('failed', result.response.status, result.error)
}
```

### Use a different client for one call

`client` を渡すと、1 呼び出しだけ別の関数で送信する:

```typescript
await getPetById({ path: { petId: 2 }, client: tenantClient })
```

## Notes

- Migration (5.x → 6.0): the 5.x guide called `getPetById({ path: { petId: 1n } })` with the default `integerType: 'bigint'`; the 6.0 guide sets `integerType: 'number'` on the adapter and calls it with `petId: 1`; `cookies` is now a grouped key next to `path` / `query` / `headers` / `body` (migrate-to-v6 and the 6.0 guide)
- With the example client, a non-2xx response with an empty body yields both `data` and `error` as `undefined`, so checking `result.error === undefined` is not a success check; branch on `result.response.ok` (or add a success discriminator to your client); see the adapted snippet above
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/calling-operations （`@kubb/plugin-client@6.0.1`、取得日 2026-11-14）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
- [client-migrate-to-v6](./client-migrate-to-v6.md)
