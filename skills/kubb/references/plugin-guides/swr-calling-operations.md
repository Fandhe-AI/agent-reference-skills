# plugin-swr: Calling operations

`@kubb/plugin-swr` は operation ごとに型付き SWR フックを生成する。`GET` は `useGetPetById` のような `useSWR` フック、`POST` / `PUT` / `PATCH` / `DELETE` は `useCreatePet` のような `useSWRMutation` フック。各フックは `@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client` のクライアント関数を呼ぶ。

## Signature / Usage

### Queries

query フックは operation のグループ化リクエスト設定（`path` / `query` / `headers` のうち宣言されたもの）を第 1 引数に取る:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

const { data, error, isLoading } = useGetPetById({ path: { petId: 1 } })
```

第 2 引数は `query`（任意の `SWRConfiguration`）、`client`（この呼び出し用のリクエスト設定、`baseURL` 等）、Kubb オプションの `shouldFetch` と `immutable`:

```typescript
useGetPetById(
  { path: { petId: 1 } },
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

`shouldFetch: false` で SWR に `null` キーを与えリクエストをスキップする。必要なパラメーターが揃ったら `true` を渡す。mutation フックも同じオプションを受け付け、`null` キーのとき `trigger` を呼ぶと missing-key エラーを投げる:

```typescript
import { useGetPetById } from './gen/hooks/useGetPetById'

export function useSelectedPet(petId: number | undefined) {
  return useGetPetById(
    { path: { petId: petId ?? 0 } },
    { shouldFetch: petId != null },
  )
}
```

### Fetch immutable data

変化しないデータには query フックに `immutable: true`。`revalidateIfStale` / `revalidateOnFocus` / `revalidateOnReconnect` を `false` にする:

```typescript
const { data, error } = useGetPetById(
  { path: { petId: 1 } },
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
- 例は adapter に `integerType: 'number'` を設定しているため `int64` の `petId` は `number`（既定では `bigint` で `1n` を渡す）
- Migration (5.4 → 5.9): with `shouldFetch: false` (`null` key), calling a mutation's `trigger` now throws a missing-key error (the earlier docs said a `null` key only stops `trigger` from firing); the page's `petId` examples changed from `bigint` to `number` because the docs now set `integerType: 'number'`
- Source: https://kubb.dev/extensions/kubb-labs/plugin-swr/guides/calling-operations （`@kubb/plugin-swr@5.9.1`、取得日 2026-11-14）

## Related

- [plugin-swr](../plugins/plugin-swr.md)
- [react-query-calling-operations](./react-query-calling-operations.md)
- [vue-query-calling-operations](./vue-query-calling-operations.md)
