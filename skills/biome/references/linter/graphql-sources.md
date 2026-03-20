# GraphQL ルールのソース

## Biome 独自ルール

多くの GraphQL ルールは Biome 独自に実装されている。

## @graphql-eslint 対応

GraphQL ルールの一部は `@graphql-eslint` プラグインからインスパイアされている。

| @graphql-eslint ルール | Biome ルール |
|----------------------|-------------|
| naming-convention | useGraphqlNamingConvention |
| require-deprecation-reason | useDeprecatedReason |
| no-duplicate-fields | noDuplicateFields |
| require-description | useConsistentGraphqlDescriptions |

注意: 一部のルールは元のルールと比べてオプションを持たない場合がある。
