# JavaScript/TypeScript アクションのソース

対象 Biome 2.5.15。独自アクション（Biome exclusive actions）は無し。

## ESLint プラグイン対応

| ESLint プラグインルール | Biome アクション |
|-----------------------|-----------------|
| no-duplicate-imports (eslint) | organizeImports (inspired) |
| sort-imports (eslint) | organizeImports (inspired) |
| sort-keys (eslint) | useSortedKeys (inspired) |
| order (eslint-plugin-import) | organizeImports (inspired) |
| sort-enums (eslint-plugin-perfectionist) | useSortedEnumMembers (inspired) |
| sort-interfaces (eslint-plugin-perfectionist) | useSortedInterfaceMembers (inspired) |
| sort-objects (eslint-plugin-perfectionist) | useSortedKeys (inspired) |
| jsx-sort-props (eslint-plugin-react) | useSortedAttributes |
| interface (eslint-plugin-typescript-sort-keys) | useSortedInterfaceMembers (inspired) |
| string-enum (eslint-plugin-typescript-sort-keys) | useSortedEnumMembers (inspired) |
| no-duplicate-classes (eslint-plugin-better-tailwindcss) | noDuplicateClasses (inspired) |

注意: 一部の Biome ルールは元のルールと比べてオプションを持たない場合がある。
