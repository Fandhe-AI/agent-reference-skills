# JavaScript/TypeScript アクションのソース

## Biome 独自アクション

一部のアクションは Biome 独自に開発。

## ESLint プラグイン対応

| ESLint プラグインルール | Biome アクション |
|-----------------------|-----------------|
| no-duplicate-imports (eslint) | organizeImports |
| sort-imports (eslint) | organizeImports |
| sort-keys (eslint) | useSortedKeys |
| jsx-sort-props (eslint-plugin-react) | useSortedAttributes |
| sort-interfaces (eslint-plugin-typescript-sort-keys) | useSortedInterfaceMembers |
| no-duplicate-classes (eslint-plugin-better-tailwindcss) | noDuplicateClasses |

注意: 一部の Biome ルールは元のルールと比べてオプションを持たない場合がある。
