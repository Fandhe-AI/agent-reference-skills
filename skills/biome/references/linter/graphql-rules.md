# GraphQL ルール

## correctness

| ルール | 推奨 | 説明 |
|-------|------|------|
| useGraphqlNamedOperations | ○ (error) | GraphQL 操作に名前を必須 |

## nursery

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateArgumentNames | — | 引数名の重複を禁止 |
| noDuplicateEnumValueNames | — | enum 値名の重複を禁止 |
| noDuplicateFieldDefinitionNames | — | フィールド定義名の重複を禁止 |
| noDuplicateGraphqlOperationName | — | 操作名の重複を禁止 |
| noDuplicateInputFieldNames | — | 入力フィールド名の重複を禁止 |
| noDuplicateVariableNames | — | 変数名の重複を禁止 |
| noExcessiveLinesPerFile | — | ファイルの行数上限 |
| noRootType | — | ルート型の使用禁止 |
| useConsistentGraphqlDescriptions | — | 説明の一貫性を強制 |
| useInputName | — | 入力型名の規則を強制 |
| useLoneAnonymousOperation | — | 単一の匿名操作を強制 |
| useLoneExecutableDefinition | — | 単一の実行可能定義を強制 |

## style

| ルール | 推奨 | 説明 |
|-------|------|------|
| useDeprecatedReason | ○ (warn) | @deprecated に理由を必須 |
| useGraphqlNamingConvention | — | enum 値の大文字化を検証 |

## suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateFields | ○ (info) | 重複フィールドを禁止 |
| noEmptySource | — | 空ソースを禁止 |
| useDeprecatedDate | — | @deprecated に削除日を要求 |
