# Oxc (oxlint / oxfmt)

Rust 製の超高速 JavaScript / TypeScript ツールスイート。

## oxlint

```json
{
  "scripts": { "lint": "oxlint .", "lint:fix": "oxlint . --fix" }
}
```

```json
{
  "tasks": {
    "//#lint": {},
    "//#lint:fix": { "cache": false }
  }
}
```

## oxfmt（アルファ版）

```json
{
  "scripts": { "format": "oxfmt --check .", "format:fix": "oxfmt ." }
}
```

## 注意点

- type-aware lint を有効にする場合、Compiled Package は事前にビルドが必要
- oxfmt はアルファ版のため本番採用には注意
- 統合ワークフロー: 検証は並列、修正は逐次実行（ファイル書き込み競合防止）
