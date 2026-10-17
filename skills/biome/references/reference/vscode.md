# VS Code

## インストール

Visual Studio Marketplace から公式 Biome VS Code 拡張機能をインストール。

## デフォルトフォーマッタ設定

1. サポート対象ファイルを開く
2. コマンドパレット（Ctrl/⌘+⇧+P）→「Format Document With…」
3.「Configure Default Formatter」→「Biome」

## 設定項目

設定は VS Code の settings precedence に従い、最も具体的なスコープの値が使われる。

| 設定 | デフォルト | 説明 |
|------|-----------|------|
| `biome.enabled` | true | LSP セッション作成の制御 |
| `biome.requireConfiguration` | false | `true` の場合、ワークスペースフォルダーに biome.json がある場合のみフォーマッター / 診断プロバイダーとして登録される（同じスコープで `biome.enabled` も true が必要） |
| `biome.configurationPath` | null | カスタム設定ファイルパス（Biome v2 のみ有効） |
| `biome.inlineConfig` | — | インライン設定で上書き（ディスク上の biome.json より優先） |
| `biome.gotoDefinition` | false | Go-to definition 機能を有効化（LSP） |
| `biome.lsp.bin` | undefined | Biome バイナリパス上書き |
| `biome.runFromTemporaryLocation` | OS依存 | 一時的な場所から実行 |
| `biome.suggestInstallingGlobally` | true | グローバル導入提案 |
| `biome.lsp.trace.server` | off | ログレベル（off/messages/verbose） |
| `biome.lsp.watcher.kind` | null | ファイルウォッチャー動作（`recommended` / `polling` / `none`。Biome 2.4.0+ で有効） |
| `biome.lsp.watcher.pollingInterval` | null | ポーリング間隔（ms、既定動作は 2000。`polling` 時のみ。Biome 2.4.0+ で有効） |

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

## 利用パターン（Common use cases）

- **Single-root workspace**: ワークスペースフォルダが 1 つの通常構成（ルートに `biome.json`）
- **Multi-root workspace**: ワークスペースフォルダが複数ある構成。フォルダごとに Biome インスタンスを自動作成（各フォルダに `biome.json` を置ける）

## 拡張機能 2.x からの移行

手順（この順序で）: 拡張機能を更新 → エディタを完全に閉じる → タスクマネージャーで `biome` プロセスを全て終了 → エディタを開く。古いデーモン接続が残ると保存時に誤ったフォーマットになることがある。

- `biome.lspBin` → `biome.lsp.bin`（旧名は当面動作するが非推奨）
- `biome.requireConfigFile` → `biome.requireConfiguration`（旧名は未サポート。必須の移行）
