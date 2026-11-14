# Setup

Hermes Agent の初期設定・プロバイダー設定・診断。

## 対話式セットアップウィザード

```bash
hermes setup
```

## セクション別セットアップ

```bash
hermes setup model
hermes setup terminal
hermes setup gateway
hermes setup tools
hermes setup agent
```

## 非インタラクティブ（デフォルト値を使用）

```bash
hermes setup --non-interactive
```

## 設定を初期化してセットアップし直す

```bash
hermes setup --reset
```

## プロバイダー・モデルの選択

```bash
hermes model
```

## 設定の表示

```bash
hermes config show
```

## 設定ファイルをエディタで開く

```bash
hermes config edit
```

## 設定値の個別変更

```bash
hermes config set KEY VAL
```

## 設定ファイルのパスを表示

```bash
hermes config path
```

## .env ファイルのパスを表示

```bash
hermes config env-path
```

## 設定の検証

```bash
hermes config check
```

## 新しいオプションをデフォルト値で追加

```bash
hermes config migrate
```

## 診断の実行

```bash
hermes doctor
```

## 自動修復を試みる診断

```bash
hermes doctor --fix
```

## システム・プラットフォームステータスの表示

```bash
hermes status
hermes status --all
hermes status --deep
```

## API キーファイルのパーミッション設定

```bash
chmod 600 ~/.hermes/.env
```

> **警告**: `~/.hermes/.env` に API キーを保存する。バージョン管理には絶対にコミットしない。

## 他エージェントの設定を持ち込む（初回セットアップ）

```bash
hermes setup
hermes migrate
hermes import-agent
```

初回の `hermes setup` が `~/.openclaw` / `~/.claude` / `~/.codex` / `~/.cursor` を検出すると、最初に「Import your setup from …?」（既定は yes）を尋ね、`agent-importers` プラグインを導入してインポートを実行する。設定済みの環境では `hermes migrate`（または `hermes import-agent`）を使う。`--non-interactive` ではこの質問もプラグイン導入も行われない。

## 注記

v0.23 の変更: 初回 `hermes setup` に他エージェントのインポート提案が加わった。`hermes setup model` 等のセクション指定、`hermes config` / `hermes doctor` / `hermes status` のコマンドは変更なし。

- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)
