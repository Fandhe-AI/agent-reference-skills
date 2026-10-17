# plugin-client: Calling operations

各生成関数はグループ化された 1 つのオプションオブジェクトを受け取り、client の promise を返す。

## Signature / Usage

```typescript
import { addPet, getPetById } from './gen/clients'

const created = await addPet({ body: { name: 'Odie', photoUrls: [] } })
console.log(created.data, created.response.status)

const pet = await getPetById({ path: { petId: 1n } })
```

キーは `path` / `query` / `headers` / `body`。Kubb が spec から型付けするため、誤ったキーや値はコンパイル時に失敗する。

### Errors

`throwOnError` の既定は `true`（`throwOnErrorDefault` を参照）。その意味は自前 client 次第。例の client では非 2xx で throw し、`throwOnError: false` でエラーを値として返す:

```typescript
const result = await getPetById({ path: { petId: 1n }, throwOnError: false })

if (result.error === undefined) {
  console.log('pet', result.data.name)
}
if (result.error !== undefined) {
  console.log('failed', result.response.status)
}
```

### Use a different client for one call

`client` を渡すと、1 呼び出しだけ別の関数で送信する:

```typescript
await getPetById({ path: { petId: 2n }, client: tenantClient })
```

## Notes

- With the example client, a non-2xx response with an empty body yields both `data` and `error` as `undefined`, so checking `result.error === undefined` is not a success check; branch on `result.response.ok` (or add a success discriminator to your client)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-client/guides/calling-operations （`@kubb/plugin-client@5.5.15`）

## Related

- [client-write-your-client](./client-write-your-client.md)
- [client-authentication](./client-authentication.md)
- [client-validate-requests-and-responses](./client-validate-requests-and-responses.md)
- [fetch-calling-operations](./fetch-calling-operations.md)
