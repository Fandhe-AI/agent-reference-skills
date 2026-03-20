# Options: Comments

TypeDoc の Comments オプション一覧。

## commentStyle

**Type:** `"jsdoc" | "block" | "line" | "all"`
**Default:** `"jsdoc"`
**CLI:** `--commentStyle <style>`

TypeDoc が解析するコメント構文を決定する。

- **jsdoc:** `/**` で始まるブロックコメント
- **block:** すべてのブロックコメント
- **line:** `//` コメント
- **all:** ブロックとラインの両方

非 JSDoc コメントは VSCode の IntelliSense の品質を低下させる可能性がある。

```json
{
  "commentStyle": "jsdoc"
}
```

## useTsLinkResolution

**Type:** `boolean`
**Default:** `true`
**CLI:** `--useTsLinkResolution`

`{@link}` タグが TypeScript の解析ルールを使用して解決されるかどうかを制御する。

```json
{
  "useTsLinkResolution": true
}
```

## preserveLinkText

**Type:** `boolean`
**Default:** `true`
**CLI:** `--preserveLinkText`

`{@link}` タグが完全なオリジナルのリンクテキストを表示するか、ターゲットリフレクション名のみを表示するかを決定する。

```json
{
  "preserveLinkText": true
}
```

## jsDocCompatibility

**Type:** `object`
**Default:** `{ "exampleTag": true, "defaultTag": true, "inheritDocTag": true, "ignoreUnescapedBraces": true }`
**CLI:** `--jsDocCompatibility` および `--jsDocCompatibility.<property>`

JSDoc と TSDoc 標準間の競合を処理する。

- **exampleTag:** `@example` タグのコードブロック推論
- **defaultTag:** `@default` タグのコードブロック推論
- **inheritDocTag:** `@inheritDoc` の大文字小文字の処理
- **ignoreUnescapedBraces:** ブレースのエスケープ警告

```json
{
  "jsDocCompatibility": {
    "exampleTag": true,
    "defaultTag": true,
    "inheritDocTag": true,
    "ignoreUnescapedBraces": true
  }
}
```

## suppressCommentWarningsInDeclarationFiles

**Type:** `boolean`
**Default:** `false`
**CLI:** `--suppressCommentWarningsInDeclarationFiles`

`.d.ts` ファイル内の未指定タグに関する警告を抑制する。

```json
{
  "suppressCommentWarningsInDeclarationFiles": true
}
```

## blockTags

**Type:** `string[]`
**Default:** TypeDoc の標準ブロックタグ
**CLI:** なし

有効なブロックタグを指定する。カスタムタグは `OptionDefaults.blockTags` を拡張して追加できる。`tsdoc.json` でも設定可能。

```json
{
  "blockTags": [
    "@example",
    "@remarks",
    "@param",
    "@returns",
    "@throws",
    "@see",
    "@customTag"
  ]
}
```

## inlineTags

**Type:** `string[]`
**Default:** TypeDoc の標準インラインタグ
**CLI:** なし

有効なインラインタグを指定する。カスタムタグは `OptionDefaults.inlineTags` を拡張して追加できる。`tsdoc.json` でも設定可能。

```json
{
  "inlineTags": [
    "@link",
    "@inheritDoc",
    "@label"
  ]
}
```

## modifierTags

**Type:** `string[]`
**Default:** TypeDoc の標準修飾子タグ
**CLI:** なし

有効な修飾子タグを指定する。カスタムタグは `OptionDefaults.modifierTags` を拡張して追加できる。`tsdoc.json` でも設定可能。

```json
{
  "modifierTags": [
    "@public",
    "@private",
    "@protected",
    "@internal",
    "@readonly",
    "@override",
    "@virtual",
    "@sealed",
    "@deprecated"
  ]
}
```

## cascadedModifierTags

**Type:** `string[]`
**Default:** なし
**CLI:** なし

すべての子リフレクションにカスケードすべき修飾子タグを指定する。`@deprecated` はブロックタグであるため、ここには含めるべきではない。

```json
{
  "cascadedModifierTags": ["@alpha", "@beta"]
}
```

## excludeTags

**Type:** `string[]`
**Default:** なし
**CLI:** `--excludeTags`

コメント解析中に削除するタグ。REST API ドキュメント用に apiDoc を使用するプロジェクトに便利。

```json
{
  "excludeTags": ["@apiNote", "@apiGroup"]
}
```

## notRenderedTags

**Type:** `string[]`
**Default:** なし
**CLI:** `--notRenderedTags`

コメントに保持されるが出力から除外されるタグ。packages モードでのデシリアライゼーション後の処理のためのレンダリング命令や意味を持つタグ向け。

```json
{
  "notRenderedTags": ["@packageDocumentation"]
}
```

## preservedTypeAnnotationTags

**Type:** `string[]`
**Default:** なし
**CLI:** なし

型注釈が保持されるべきブロックタグ。そのコンテンツがレンダリングされたドキュメントに含まれることを可能にする。

```json
{
  "preservedTypeAnnotationTags": ["@returns"]
}
```

## externalSymbolLinkMappings

**Type:** `object`（パッケージ名からエクスポート名-URL マッピングへのマッピング）
**Default:** なし
**CLI:** なし

外部型をドキュメント URL にマッピングする。`.` セパレーターで名前空間付き名前をサポートする。`@types` パッケージと元のモジュールの両方をサポートする。グローバル型には特別な `global` パッケージを使用する。リンクを作成せずに型を解決済みとしてマークするには `"#"` を使用する。

```json
{
  "externalSymbolLinkMappings": {
    "global": {
      "Promise": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
    },
    "typescript": {
      "CompilerOptions": "https://www.typescriptlang.org/tsconfig"
    }
  }
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
