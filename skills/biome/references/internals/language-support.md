# 言語サポート

## サポート状況一覧

| 言語 | 解析 | フォーマット | リント | プラグイン |
|------|------|-----------|--------|----------|
| JavaScript | ✅ | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ | ✅ |
| JSX | ✅ | ✅ | ✅ | ✅ |
| TSX | ✅ | ✅ | ✅ | ✅ |
| JSON | ✅ | ✅ | ✅ | ✅ |
| JSONC | ✅ | ✅ | ✅ | ✅ |
| HTML* | ✅ | 🟡 | ✅ | 🚫 |
| SVG | ✅ | 🟡 | ✅ | 🚫 |
| Vue | 🟡 | 🟡 | 🟡 | 🚫 |
| Svelte | 🟡 | 🟡 | 🟡 | 🚫 |
| Astro | 🟡 | 🟡 | 🟡 | 🚫 |
| CSS | ✅ | ✅ | ✅ | ✅ |
| SCSS | ⌛ | ⌛ | 🚫 | 🚫 |
| YAML | ⌛ | ⌛ | 🚫 | 🚫 |
| GraphQL | ✅ | ✅ | ✅ | 🚫 |
| Markdown | ⌛ | ⌛ | 🚫 | 🚫 |
| GritQL | ✅ | ✅ | 🚫 | 🚫 |

凡例: ✅ サポート / 🟡 実験的 / ⌛ 進行中 / 🚫 未着手

\* HTML は[明示的なオプトイン](./../reference/configuration.md)が必要（`html.experimentalFullSupportEnabled`）。

## 言語別詳細

- **JavaScript**: ES2024 対応。公式構文のみ（提案が Stage 3 に達した時点で新構文の開発を開始）
- **TypeScript**: v5.9 対応
- **JSONC**: 専用の言語設定は無く、`json.parser.allowComments` / `json.parser.allowTrailingCommas` / `json.formatter.trailingCommas` で扱う。`.jsonc` または言語 ID が `jsonc` のファイルでは allowComments: true / allowTrailingCommas: true / trailingCommas: none が既定。`tsconfig.json` / `.babelrc` 等の well-known ファイルは自動識別される
- **HTML スーパー言語（Vue / Svelte / Astro）**: v2.3.0 から実験的サポート。v2.4.0 で Svelte の制御フロー構文（`{#if}{/if}`）等の言語固有構文が大幅改善。埋め込み言語をまたぐ lint ルールは v2.5.0 でやや改善（誤検知の可能性は残る）。明示的な opt-in が必要:

```json
{
  "html": {
    "experimentalFullSupportEnabled": true,
    "formatter": { "enabled": true }
  }
}
```

`html.experimentalFullSupportEnabled` が false のまま `.svelte` / `.astro` / `.vue` を lint する場合、誤検知を避けるため `overrides` で `style/useConst`・`style/useImportType`・`correctness/noUnusedVariables`・`correctness/noUnusedImports` を off にすることが推奨される。

## Embedded languages support（実験的）

JavaScript のテンプレートリテラル内の CSS（`css` / `styled` タグ）と GraphQL（`gql` / `graphql` タグ）をサポート。既定で無効。

```json
{
  "javascript": {
    "experimentalEmbeddedSnippetsEnabled": true
  }
}
```

## Formatting with different settings

複数言語を含むファイル（HTML 系で JavaScript と CSS を含む場合等）で、言語ごとに `indentStyle` 等が異なる設定だと、タブとスペースが混在するリスクがある。公式は GitHub discussion #7754 で議論中。このセクションは古くなる可能性があるため playground で確認すること。

## Notes

- 公式 URL は `/internals/language-support` から `/introduction/language-support` へ移動した（本ディレクトリ名 `internals/` は維持）
