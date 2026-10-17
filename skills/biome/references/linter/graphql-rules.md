# GraphQL ルール

対象 Biome 2.5.15。

## correctness

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateArgumentNames | ○ | フィールド・ディレクティブの引数名の重複を禁止 |
| noDuplicateEnumValueNames | ○ | enum 値名の重複を禁止 |
| noDuplicateInputFieldNames | ○ | 入力オブジェクト内フィールドの重複を禁止 |
| noDuplicateVariableNames | ○ | 変数定義の重複を禁止 |
| useGraphqlNamedOperations | ○ | GraphQL 操作に名前を必須（nursery から昇格） |
| useLoneAnonymousOperation | ○ | 複数操作のドキュメントでの匿名操作を禁止（nursery から昇格） |

## nursery

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateFieldDefinitionNames | — | 型内のフィールド定義名の重複を禁止 |

## style

| ルール | 推奨 | 説明 |
|-------|------|------|
| noExcessiveLinesPerFile | — | ファイルの行数上限 |
| noRootType | — | 指定したルート型の使用禁止 |
| useConsistentGraphqlDescriptions | — | 説明のスタイル（block / inline）を統一 |
| useDeprecatedReason | ○ (warn) | @deprecated に理由を必須 |
| useGraphqlNamingConvention | — | enum 値の大文字化を検証 |
| useInputName | — | mutation 引数名を常に "input" に |
| useLoneExecutableDefinition | — | query / mutation / subscription / fragment を別ファイルに |

## suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
| noDuplicateFields | ○ (info) | 操作内の重複フィールドを禁止 |
| noDuplicateGraphqlOperationName | ○ | ドキュメント内の操作名の重複を禁止 |
| noEmptySource | — | 空ソースを禁止 |
| useDeprecatedDate | — | @deprecated に削除日を要求 |

## Notes

- `noDuplicateArgumentNames` / `noDuplicateEnumValueNames` / `noDuplicateInputFieldNames` / `noDuplicateVariableNames` / `noDuplicateGraphqlOperationName` / `useGraphqlNamedOperations` / `useLoneAnonymousOperation` は nursery から昇格（`noDuplicateGraphqlOperationName` は suspicious）
