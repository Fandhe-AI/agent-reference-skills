# plugin-swr: Calling operations

`@kubb/plugin-swr` は operation ごとに型付き SWR フックを生成する。`GET` は `useGetPetById` のような `useSWR` フック、`POST` / `PUT` / `PATCH` / `DELETE` は `useCreatePet` のような `useSWRMutation` フック。各フックは `@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client` のクライアント関数を呼ぶ。

## Signature / Usage

### Queries

query フックは operation のグループ化リクエスト設定（`path` / `query` / `headers` のうち宣言されたもの）を第 1 引数に取る:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

const { data, error, isLoading } = useGetPetById({ path: { petId: 1n } })
```

第 2 引数は `query`（任意の `SWRConfiguration`）、`client`（この呼び出し用のリクエスト設定、`baseURL` 等）、Kubb オプションの `shouldFetch` と `immutable`:

```typescript
useGetPetById(
  { path: { petId: 1n } },
  {
    query: { refreshInterval: 30_000 },
    client: { baseURL: 'https://api.example.com/v1' },
  },
)
```

export された `queryKey` ヘルパーは operation URL とリクエストパラメーターを含む。SWR の `mutate` に渡してエントリを更新 / 再検証する。

### Mutations

mutation フックはオプションオブジェクトのみを取る。グループ化リクエスト設定は `trigger(...)` に渡す。`mutationKey` ヘルパーがフックの隣に export される:

```typescript
import { mutate } from 'swr'
import { useCreatePet } from './gen/hooks/useCreatePet'
import { getPetsQueryKey } from './gen/hooks/useGetPets'

const { trigger, isMutating } = useCreatePet({
  mutation: { onSuccess: () => mutate(getPetsQueryKey()) },
})

await trigger({ body: { name: 'Fluffy' } })
```

### Skip requests until ready

`shouldFetch: false` で SWR に `null` キーを与えリクエストをスキップする。必要なパラメーターが揃ったら有効にする。mutation フックも同じスイッチを受け付け、`null` キーは `trigger` の発火を止める:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

export function useSelectedPet(petId: bigint | undefined) {
  return useGetPetById(
    { path: { petId: petId ?? 0n } },
    { shouldFetch: petId != null },
  )
}
```

### Fetch immutable data

変化しないデータには query フックに `immutable: true`。`revalidateIfStale` / `revalidateOnFocus` / `revalidateOnReconnect` を `false` にする:

```typescript
const { data, error } = useGetPetById(
  { path: { petId: 1n } },
  { immutable: true },
)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `query` | `SWRConfiguration` | SWR オプション。`immutable` による再検証既定を上書きする |
| `client` | request config | この呼び出し用のリクエスト設定（`baseURL` 等） |
| `shouldFetch` | `boolean` | `false` で `null` キーを与えてリクエストをスキップ |
| `immutable` | `boolean` | `true` で再検証系 3 オプションを `false` にする |

## Notes

- 各生成フックは client 関数を `throwOnError: true` で呼ぶ。失敗は SWR の `error` に入り、型は spec のエラーレスポンスから付く。base URL・認証・interceptor・serialization・検証は client プラグイン側で設定する（plugin-client の場合は自前 client モジュール）
- `query` 内のオプションは `immutable` の再検証既定を上書きする
- Source: https://kubb.dev/extensions/kubb-labs/plugin-swr/guides/calling-operations （`@kubb/plugin-swr@5.4.3`）

## Related

- [plugin-swr](../plugins/plugin-swr.md)
- [react-query-calling-operations](./react-query-calling-operations.md)
- [vue-query-calling-operations](./vue-query-calling-operations.md)
