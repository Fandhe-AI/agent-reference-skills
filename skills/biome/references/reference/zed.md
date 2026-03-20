# Zed

## インストール

1. コマンドパレット（Ctrl/⌘+⇧+P）→「zed: extensions」
2.「Biome」を検索 → Install

## 設定

`.zed/settings.json`:

```json
{
  "lsp": {
    "biome": {
      "settings": {
        "configuration_path": "./biome.json"
      }
    }
  },
  "code_actions_on_format": {
    "source.fixAll.biome": true,
    "source.organizeImports.biome": true
  }
}
```

## デフォルトフォーマッタ設定

```json
{
  "formatter": {
    "external": {
      "command": "biome",
      "arguments": ["format", "--write", "--stdin-file-path", "{buffer_path}"]
    }
  }
}
```
