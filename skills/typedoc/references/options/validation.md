# Options: Validation

TypeDoc の Validation オプション一覧。

## validation

**Type:** `object`
**Default:** `{ "notExported": true, "invalidLink": true, "invalidPath": true, "rewrittenLink": true, "notDocumented": false, "unusedMergeModuleWith": true }`
**CLI:** `--validation.invalidLink`, `--validation` など

TypeDoc が生成されたドキュメントに対して実行すべき検証ステップを指定する。

サブオプション:
- **notExported:** 型が参照されているがエクスポートされていない場合に警告
- **invalidLink:** 解決できない `@link` タグに対して警告
- **invalidPath:** ファイルに解決されない相対パスリンクに対して警告
- **rewrittenLink:** `@link` タグが解決されるがターゲットに一意の URL がない場合に警告
- **notDocumented:** ドキュメントコメントのないリフレクションに対して警告
- **unusedMergeModuleWith:** 未解決の `@mergeModuleWith` タグに対して警告

```json
{
  "validation": {
    "notExported": true,
    "invalidLink": true,
    "invalidPath": true,
    "rewrittenLink": true,
    "notDocumented": false,
    "unusedMergeModuleWith": true
  }
}
```

## treatWarningsAsErrors

**Type:** `boolean`
**Default:** `false`
**CLI:** `--treatWarningsAsErrors`

TypeDoc が報告された警告をすべて、ドキュメント生成を妨げる可能性のある致命的エラーとして扱うようにする。

```json
{
  "treatWarningsAsErrors": true
}
```

## treatValidationWarningsAsErrors

**Type:** `boolean`
**Default:** `false`
**CLI:** `--treatValidationWarningsAsErrors`

`treatWarningsAsErrors` の限定版で、プロジェクトの検証中に発生した警告にのみ適用される。

```json
{
  "treatValidationWarningsAsErrors": true
}
```

## intentionallyNotExported

**Type:** `string[]`
**Default:** なし
**CLI:** なし

警告を生成すべきではない、出力から意図的に除外されたシンボルをリストする。パス付きの形式もサポート。

```json
{
  "intentionallyNotExported": [
    "InternalClass",
    "typedoc/src/other.ts:OtherInternal"
  ]
}
```

## requiredToBeDocumented

**Type:** `string[]`
**Default:** `["Enum", "EnumMember", "Variable", "Function", "Class", "Interface", "Property", "Method", "Accessor", "TypeAlias"]`
**CLI:** なし

ドキュメント化が必須のリフレクションタイプを設定する。`validation.notDocumented` で使用される。

```json
{
  "requiredToBeDocumented": [
    "Enum",
    "Variable",
    "Function",
    "Class",
    "Interface",
    "Property",
    "Method",
    "Accessor",
    "TypeAlias"
  ]
}
```

## packagesRequiringDocumentation

**Type:** `string[]`
**Default:** `package.json` のパッケージ名
**CLI:** なし

ドキュメント化が必要なパッケージを指定する。

```json
{
  "packagesRequiringDocumentation": ["typedoc", "typedoc-plugin-mdn-links"]
}
```

## intentionallyNotDocumented

**Type:** `string[]`
**Default:** なし
**CLI:** なし

ドキュメント化されていないフィールドを選択的に無視する。`validation.notDocumented` で使用される。ドット区切りの完全修飾名をサポート。

```json
{
  "intentionallyNotDocumented": [
    "Namespace.Class.prop",
    "SomeInternalMethod"
  ]
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Other](./other.md)
