# GraphQL アクション + ソース

## アクション一覧

| アクション | 推奨 | 修正 | 説明 |
|-----------|------|------|------|
| useSortedEnumMembers | — | safe | Sort the members of an enum in natural order. |
| useSortedSelectionSet | — | unsafe | Sort GraphQL selection sets. |
| useSortedTypeFields | — | safe | Sort fields in GraphQL type definitions alphabetically. |

## ドキュメントパス

```text
/assist/actions/use-sorted-enum-members/graphql
/assist/actions/use-sorted-selection-set/graphql
/assist/actions/use-sorted-type-fields/graphql
```

## ソース

- 公式ソース表に載っている他ツールの対応は alphabetize のみ（useSortedSelectionSet / useSortedTypeFields の対応は未記載）

### GraphQL-ESLint

| GraphQL-ESLint アクション | Biome アクション |
|--------------------------|-----------------|
| alphabetize | useSortedEnumMembers (inspired) |

## Notes

- 一部の Biome ルールは元のルールと比べてオプションを持たない場合がある
- 出典: https://biomejs.dev/assist/graphql/actions/ （Biome website release 2.5.15 の原本）
