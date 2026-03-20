# Options: Organization

TypeDoc の Organization オプション一覧。

## groupReferencesByType

**Type:** `boolean`
**Default:** `false`
**CLI:** `--groupReferencesByType`

既にドキュメントに含まれているメンバーへの再エクスポートを、参照されたメンバーがグループ化されている型の下にグループ化する。デフォルトでは、TypeDoc はこれらの参照を `References` グループにグループ化する。

```json
{
  "groupReferencesByType": true
}
```

## categorizeByGroup

**Type:** `boolean`
**Default:** `false`
**CLI:** `--categorizeByGroup`

グループ別（プロパティ、メソッドなど内）にリフレクションをカテゴリ化する。同じカテゴリのメソッドとプロパティをグループ化するには、このフラグを `false` に設定する。

```json
{
  "categorizeByGroup": true
}
```

## defaultCategory

**Type:** `string`
**Default:** `"Other"`
**CLI:** `--defaultCategory <name>`

ページの一部の要素のみがカテゴリ化されている場合に使用されるデフォルトカテゴリの名前を設定する。

```json
{
  "defaultCategory": "General"
}
```

## categoryOrder

**Type:** `string[]`
**Default:** なし（アルファベット順、不明なカテゴリは末尾）
**CLI:** なし

カテゴリの表示順序をオーバーライドする配列オプション。`*` の文字列はリストにないカテゴリの表示位置を示す。`none`（大文字小文字を区別しない）というカテゴリは予約されており、カテゴリ見出しなしで表示される。

```json
{
  "categoryOrder": ["Getting Started", "Configuration", "Advanced", "*"]
}
```

## groupOrder

**Type:** `string[]`
**Default:** アルファベット順（不明なグループは末尾）
**CLI:** なし

グループの表示順序をオーバーライドする配列オプション。`*` の文字列はリストにないグループの表示位置を示す。`none` というグループはグループ見出しなしで表示するために予約されている。

```json
{
  "groupOrder": ["Variables", "Functions", "Classes", "Interfaces", "*"]
}
```

## sort

**Type:** `string[]`
**Default:** `["kind", "instance-first", "alphabetical-ignoring-documents"]`
**CLI:** `--sort <strategy>`（繰り返し可）

メンバーのソート順を指定する。複数のストラテジーが順次適用され、先のストラテジーが優先される。

利用可能なストラテジー:
- `source-order` - ソースコード内の出現順
- `alphabetical` - アルファベット順
- `enum-value-ascending` - enum 値の昇順
- `enum-value-descending` - enum 値の降順
- `static-first` - 静的メンバー優先
- `instance-first` - インスタンスメンバー優先
- `visibility` - 可視性順
- `required-first` - 必須プロパティ優先
- `kind` - 種類別
- `external-last` - 外部メンバーを最後に
- `documents-first` - ドキュメントを先頭に
- `documents-last` - ドキュメントを最後に
- `alphabetical-ignoring-documents` - ドキュメントを無視したアルファベット順

```json
{
  "sort": ["static-first", "alphabetical"]
}
```

## sortEntryPoints

**Type:** `boolean`
**Default:** `true`
**CLI:** `--sortEntryPoints`

TypeDoc がトップレベルのメンバーを `sort` オプションに従ってソートするかどうかを制御する。

```json
{
  "sortEntryPoints": true
}
```

## kindSortOrder

**Type:** `string[]`
**Default:** `["Reference", "Project", "Module", "Namespace", "Enum", "EnumMember", "Class", "Interface", "TypeAlias", "Constructor", "Property", "Variable", "Function", "Accessor", "Method", "Parameter", "TypeParameter", "TypeLiteral", "CallSignature", "ConstructorSignature", "IndexSignature", "GetSignature", "SetSignature"]`
**CLI:** なし

`sort` オプションで `kind` が指定された場合のリフレクションの相対的な順序を指定する。

```json
{
  "kindSortOrder": [
    "Class",
    "Interface",
    "TypeAlias",
    "Function",
    "Variable",
    "Enum"
  ]
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
