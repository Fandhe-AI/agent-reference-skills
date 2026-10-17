# Zed

## インストール

Zed >= v0.131.0 が必要。

1. コマンドパレット（Ctrl/⌘+⇧+P）→「zed: extensions」
2.「Biome」を検索 → Install

拡張機能は Biome バイナリを次の順で探す: (1) Zed 設定の `lsp.biome.binary.path`（`arguments: ["lsp-proxy"]`）、(2) `package.json` 経由のローカルインストール、(3) `PATH` 上のシステムインストール。いずれも無ければ Zed に npm で Biome をインストールさせる。

## 設定（lsp.biome.settings）

`.zed/settings.json`。設定ファイルは既定でワークスペースのルートに必要。

| 設定 | デフォルト | 説明 |
|------|-----------|------|
| `config_path` | — | 設定ファイルのパス（旧記載の `configuration_path` は誤り） |
| `require_config_file` | false | プロジェクトに設定ファイルがある場合のみ Biome を有効化 |
| `inline_config` | — | インライン設定。ディスク上の biome.json より優先 |
| `goto_definition` | false | Go-to definition 機能を有効化 |

```json
{
  "lsp": {
    "biome": {
      "settings": {
        "config_path": "<path>/biome.json",
        "require_config_file": true
      }
    }
  }
}
```

## フォーマッタ設定

言語ごとに language server として Biome を指定する（対象: Astro / CSS / GraphQL / HTML / JSON / JSONC / JSX / JavaScript / Svelte / TSX / TypeScript / Vue.js）:

```json
{
  "languages": {
    "TypeScript": { "formatter": { "language_server": { "name": "biome" } } }
  }
}
```

### code_actions_on_format

```json
{
  "languages": {
    "JavaScript": {
      "formatter": { "language_server": { "name": "biome" } },
      "code_actions_on_format": {
        "source.fixAll.biome": true,
        "source.organizeImports.biome": true
      }
    }
  }
}
```

unsafe fix を保存時に適用したい場合は、そのルールの code fix を safe に設定する必要がある。

### プロジェクト別 / グローバル設定

- Zed Project Settings（プロジェクトルートの `.zed/settings.json`）または User Settings（`~/.config/zed/settings.json`）に書ける
- 特定言語で Biome を無効化: `"GraphQL": { "language_servers": ["!biome", "..."] }`

## Notes

- トップレベルの `language_servers` / `formatter` / `code_actions_on_format` に biome をグローバル指定するのは非推奨（Biome 非対応の Rust・Python 等が壊れる）。以前のドキュメントはグローバル設定を推奨していたが、言語別の明示設定へ切り替えること
