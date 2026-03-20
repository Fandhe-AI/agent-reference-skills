# Configure Biome

Source: https://biomejs.dev/guides/configure-biome

## 設定ファイル

- ファイル名: `biome.json` または `biome.jsonc`
- 配置場所: プロジェクトルート（package.json の隣）

## 3つのツール

Biome は以下の3つのツールを中心に構成される:

1. **Formatter** -- コードフォーマッター
2. **Linter** -- 静的解析
3. **Assist** -- インポート整理などの補助機能

## 基本構造

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json",
  "formatter": { "enabled": true },
  "linter": { "enabled": true }
}
```

## 言語別設定

`<language>.<tool>` パターンで言語ごとにツールの挙動を制御できる。

```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  }
}
```

## ファイル探索順序

Biome は設定ファイルを以下の順序で探索する:

1. カレントディレクトリ
2. 親フォルダ（再帰的に上方向へ）
3. ホームディレクトリ

## ファイル処理の制御

- `files.includes` -- 処理対象ファイルの指定
- `<tool>.includes` -- ツールごとの対象ファイル指定
- `!` プレフィックス -- ファイルを除外
- `!!` プレフィックス -- ファイルを完全除外（オーバーライド不可）
