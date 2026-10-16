# GraphQL ルールのソース

対象 Biome 2.5.15。

## Biome 独自ルール

- noEmptySource
- noExcessiveLinesPerFile

## GraphQL-ESLint 対応

| GraphQL-ESLint ルール | Biome ルール |
|----------------------|-------------|
| description-style | useConsistentGraphqlDescriptions |
| input-name | useInputName |
| lone-anonymous-operation | useLoneAnonymousOperation |
| lone-executable-definition | useLoneExecutableDefinition |
| no-anonymous-operations | useGraphqlNamedOperations |
| no-duplicate-fields | noDuplicateFields |
| no-root-type | noRootType |
| require-deprecation-date | useDeprecatedDate |
| require-deprecation-reason | useDeprecatedReason |
| unique-argument-names | noDuplicateArgumentNames |
| unique-enum-value-names | noDuplicateEnumValueNames |
| unique-field-definition-names | noDuplicateFieldDefinitionNames |
| unique-input-field-names | noDuplicateInputFieldNames |
| unique-operation-name | noDuplicateGraphqlOperationName (inspired) |
| unique-variable-names | noDuplicateVariableNames |

## graphql-schema-linter 対応

| graphql-schema-linter ルール | Biome ルール |
|----------------------------|-------------|
| enum-values-all-caps | useGraphqlNamingConvention (inspired) |

注意: 一部のルールは元のルールと比べてオプションを持たない場合がある。
