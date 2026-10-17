# HTML アクション + ソース

## HTML アクション

| アクション | 推奨 | 説明 |
|-----------|------|------|
| noDuplicateClasses | — | 重複する CSS クラスを削除 |
| useSortedAttributes | — | HTML 要素の属性をソート（2.5.0 で追加） |

推奨アクションは無し（2.5.15 の公式一覧）。

## ソース

Biome 独自アクションは無し。

| ソース | ESLint プラグインルール | Biome アクション |
|-------|-----------------------|-----------------|
| @html-eslint/eslint-plugin | sort-attrs | useSortedAttributes (inspired) |
| eslint-plugin-astro | sort-attributes | useSortedAttributes (inspired) |
| eslint-plugin-better-tailwindcss | no-duplicate-classes | noDuplicateClasses (inspired) |
| eslint-plugin-svelte | sort-attributes | useSortedAttributes (inspired) |
| eslint-plugin-vue | attributes-order | useSortedAttributes (inspired) |

## Related

- [graphql-actions.md](./graphql-actions.md)
