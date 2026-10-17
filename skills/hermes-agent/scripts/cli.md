# CLI

hermes コマンドの起動・セッション管理・基本操作。

## インタラクティブセッションの起動

```bash
hermes
```

## 非インタラクティブな単一クエリ実行

```bash
hermes chat -q "Hello"
hermes chat --oneshot -q "Summarize the latest PRs"
```

`-q` のみだと対話セッションが開始され、`--oneshot` は回答して終了する。

## スクリプト向けワンショット実行

```bash
hermes -z "What's the capital of France?"
hermes -z "summarize this repo" --usage-file ~/.hermes/cache/scratch/usage.json
```

親スクリプトから応答を取得しやすい形式。`--usage-file` は使用量を JSON で書き出す。

## モデルを指定して起動

```bash
hermes chat --model "anthropic/claude-sonnet-4.6"
```

## プロバイダーを指定して起動

```bash
hermes chat --provider nous
hermes chat --provider openrouter --model anthropic/claude-sonnet-4.6
```

## ツールセットを有効化して起動

```bash
hermes chat --toolsets "web,terminal,skills"
```

## スキルをプリロードして起動

```bash
hermes -s hermes-agent-dev,github-auth
```

## 直前のセッションを再開

```bash
hermes --continue
hermes -c
```

## セッション ID またはタイトルで再開

```bash
hermes --resume <session_id>
hermes --resume "refactoring auth"
hermes --resume latest
```

## 隔離された git worktree で起動

```bash
hermes -w
```

## TUI / クラシック CLI の切り替え

```bash
hermes --tui
hermes --cli
```

## 詳細出力モードで起動

```bash
hermes chat --verbose
```

## バージョン表示

```bash
hermes --version
hermes version
```

## シェル補完スクリプトの生成

```bash
hermes completion bash
hermes completion zsh
hermes completion fish
```

## トークン・コスト分析の表示

```bash
hermes insights
hermes insights --days 7
hermes insights --source telegram
```

## アカウントのレート制限ウィンドウの表示

```bash
hermes usage
hermes usage --provider openai-codex
hermes usage --json
```

## Claude Code / Codex CLI の設定インポート

```bash
hermes import-agent [claude-code|codex] --dry-run
hermes import-agent [claude-code|codex]
hermes import-agent --sync
```

`~/.claude` または `~/.codex` を取り込む。常にプレビューしてから適用され、API キーや認証情報はインポートされない。`--sync` は過去にインポートしたソースのうち変更があったものだけを再インポートする。

> **警告**: `--overwrite` は競合する MCP サーバー・スキルを置き換える（既定はスキップ）。先に `--dry-run` で確認する。

## ホスト型コネクターアカウントの管理

```bash
hermes connectors list
hermes connectors accounts [app] [--all]
hermes connectors connect <app> [--alias NAME]
hermes connectors rename <app> <name-or-label> --to <new>
hermes connectors disconnect <app> [--alias NAME]
```

Nous Portal へのサインインが必要。

> **警告**: `disconnect` はアカウントを削除する。`--yes` を付けると確認なしで実行される。

## デスクトップアプリの起動

```bash
hermes desktop
```

ネイティブ Electron アプリをビルドして起動する（エイリアス: `hermes gui`）。

## 注記

`hermes --native` と `hermes sync` は v0.22.2 の `reference/cli-commands.md` で確認できなかったため収録していない。
