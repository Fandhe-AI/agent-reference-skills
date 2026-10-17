# JavaScript/TypeScript アクション

## source カテゴリ

| アクション | 推奨 | 説明 |
|-----------|------|------|
| organizeImports | ○ (info) | JS/TS のインポート・エクスポートを自動ソート。組み込みまたはカスタム順序ロジック使用 |
| useSortedAttributes | — | JSX 要素の属性をソート |
| useSortedEnumMembers | — | enum メンバーを自然順でソート（2.5.0 で追加。changelog では TypeScript と GraphQL の enum が対象） |
| useSortedInterfaceMembers | — | interface メンバーをキーでソート |
| useSortedKeys | — | JS オブジェクトのプロパティを自然順でソート |
| noDuplicateClasses | — | 重複する CSS クラスを削除 |

## IDE コードアクション名

| アクション | コードアクション |
|-----------|----------------|
| organizeImports | `source.organizeImports.biome` |
| useSortedKeys | `source.action.useSortedKeys.biome` |
| useSortedAttributes | `source.action.useSortedAttributes.biome` |
| useSortedEnumMembers | `source.action.useSortedEnumMembers.biome` |
| useSortedInterfaceMembers | `source.action.useSortedInterfaceMembers.biome` |
| noDuplicateClasses | `source.action.noDuplicateClasses.biome` |

## Notes

- `organizeImports` の 2.5.0 での追加: `:STYLE:` グループマッチャー（スタイル import に一致）、`sortBareImports` オプション（`false` で bare import を他の import 内でソート）、`ImportMatcher` の `kind` フィールド（`bare` と否定 `!bare`）。例: `{ "kind": "bare", "source": "**/*.css" }`

```json
{
  "assist": {
    "actions": {
      "source": {
        "organizeImports": {
          "level": "on",
          "options": {
            "sortBareImports": true,
            "groups": [{ "kind": "!bare" }, ":BLANK_LINE:", { "kind": "bare" }]
          }
        }
      }
    }
  }
}
```
