# Serialization

生成された Fetch / Axios クライアントが、OpenAPI operation のシリアライズ metadata を使って path / query / header / cookie パラメータをエンコードする際の既定スタイル。

## Signature / Usage

Override a serializer on the generated client (omitted functions keep their defaults):

```typescript
import { client } from './gen/.kubb/client'
import qs from 'qs'

client.setConfig({
  serializer: {
    query: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
})
```

Query の例（`form` スタイル、既定）:

| Style | `explode` | Input | Result |
|-------|-----------|-------|--------|
| `form` (default) | `true` | `{ id: [3, 4, 5] }` | `id=3&id=4&id=5` |
| `form` | `false` | `{ id: [3, 4, 5] }` | `id=3,4,5` |
| `spaceDelimited` | `false` | `{ id: [3, 4, 5] }` | `id=3%204%205` |
| `pipeDelimited` | `false` | `{ id: [3, 4, 5] }` | `id=3\|4\|5` |
| `deepObject` | `n/a` | `{ a: { b: 1 } }` | `a%5Bb%5D=1` |

## Options / Props

### Path

既定は `simple`（値をそのまま出力）。`label` は `.` を、`matrix` は `;name=` セグメントを前置する。以下はパラメータ名 `id` のシリアライズ結果。

| Style | `explode` | Input | Result |
|-------|-----------|-------|--------|
| `simple` (default) | `false` | `[3, 4, 5]` | `3,4,5` |
| `label` | `true` | `[3, 4, 5]` | `.3.4.5` |
| `matrix` | `true` | `[3, 4, 5]` | `;id=3;id=4;id=5` |
| `simple` | `false` | `{ x: 1, y: 2 }` | `x,1,y,2` |

### Header and cookie

header は `simple`、cookie は `form` スタイルでスタイル固定、`explode` のみ変えられる（この 2 つの location の metadata は `explode` のみを持つ）。header 値はそのまま送り、cookie 値は URL エンコードして単一の `Cookie` header にまとめる。

| Location | `explode` | Input | Result |
|----------|-----------|-------|--------|
| header | `false` | `[3, 4]` | `X-Ids: 3,4` |
| header | `true` | `{ role: 'admin' }` | `X-Filter: role=admin` |
| cookie | `false` | `{ session: 'abc', ids: [1, 2] }` | `session=abc; ids=1,2` |
| cookie | `true` | `{ ids: [1, 2] }` | `ids=1; ids=2` |

## Notes

- Query の配列は spec が別途指定しない限り繰り返しキーに展開される。`spaceDelimited` / `pipeDelimited` は `explode: true` だと `form` と同じ繰り返しキーに戻り、区切り文字は `explode: false` のときのみ現れる
- カスタム serializer・body codec・レスポンスのデコード・バリデーションは plugin-fetch の「Configure serialization」ガイドを参照（`/extensions/kubb-labs/plugin-fetch/guides/serialization`）
- 出典: https://kubb.dev/docs/5.x/reference/serialization （kubb@5.11.0 の docs/5.x/reference/serialization.md）

## Related

- [plugin-fetch](../plugins/plugin-fetch.md)
- [plugin-axios](../plugins/plugin-axios.md)
