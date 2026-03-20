# VS Code

## インストール

Visual Studio Marketplace から公式 Biome VS Code 拡張機能をインストール。

## デフォルトフォーマッタ設定

1. サポート対象ファイルを開く
2. コマンドパレット（Ctrl/⌘+⇧+P）→「Format Document With…」
3.「Configure Default Formatter」→「Biome」

## 設定項目

| 設定 | デフォルト | 説明 |
|------|-----------|------|
| `biome.enabled` | true | LSP セッション作成の制御 |
| `biome.requireConfiguration` | false | biome.json 必須化 |
| `biome.configurationPath` | null | カスタム設定ファイルパス |
| `biome.inlineConfig` | — | インライン設定で上書き |
| `biome.lsp.bin` | undefined | Biome バイナリパス上書き |
| `biome.runFromTemporaryLocation` | OS依存 | 一時的な場所から実行 |
| `biome.suggestInstallingGlobally` | true | グローバル導入提案 |
| `biome.lsp.trace.server` | off | ログレベル（off/messages/verbose） |
| `biome.lsp.watcher.kind` | null | ファイルウォッチャー動作 |
| `biome.lsp.watcher.pollingInterval` | null | ポーリング間隔（ms） |

## codeActionsOnSave

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.fixAll.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

## マルチルートワークスペース

フォルダごとに Biome インスタンスを自動作成。

## v2.x からの移行

- `biome.lspBin` → `biome.lsp.bin`（推奨）
- `biome.requireConfigFile` → `biome.requireConfiguration`（必須）
