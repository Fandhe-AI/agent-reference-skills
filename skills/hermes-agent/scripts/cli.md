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
hermes chat -s hermes-agent-dev,github-auth
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
hermes -c "my thread" --create-if-missing
```

`-c <title> --create-if-missing` はタイトル付きセッションが無ければ作成し、あれば再開する。

## 隔離された git worktree で起動

```bash
hermes --tui -w
```

v0.23 のクラシック CLI は `-w` / `--verbose` を拒否する（gateway クライアント化）。worktree は TUI 側で使う。

## worktree の一覧・整理・復元

```bash
hermes worktree list
hermes worktree list --json
hermes worktree prune --dry-run
hermes worktree prune
hermes worktree restore <name>
```

> **警告**: `hermes worktree prune` は安全なものを削除する（未コミット変更・未 push コミットを持つ idle な worktree は復元可能なアーカイブ化の後に削除される）。先に `--dry-run` で確認する。

## 切り分け用のセーフモードで起動

```bash
hermes chat --safe-mode --model gpt-4.1 -q "Is this bug mine or Hermes'?"
hermes chat --safe-mode --provider custom --base-url http://127.0.0.1:8000/v1 --model local -q "Isolate against a local server"
```

`--safe-mode` はユーザー設定・プラグイン・MCP・shell hook を無効化し、`--model` の明示が必須。

## TUI / クラシック CLI の切り替え

```bash
hermes --tui
hermes --cli
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

## OpenClaw / Claude Code / Codex CLI / Cursor の設定インポート

```bash
hermes plugins install agent-importers
hermes import-agent [openclaw|claude-code|codex|cursor] --dry-run
hermes import-agent [openclaw|claude-code|codex|cursor]
hermes import-agent --sync
hermes migrate
hermes migrate <agent>
```

`~/.openclaw` / `~/.claude` / `~/.codex` / `~/.cursor` を取り込む。コマンドは公式 `agent-importers` プラグイン由来（未導入だと `hermes import-agent` / `hermes claw` はインストール手順を表示する）。常にプレビューしてから適用され、API キーや認証情報はインポートされない（OpenClaw の許可リスト済みキーのみ `--migrate-secrets` 指定時に取り込まれる）。`--sync` は Claude Code / Codex / Cursor で過去にインポートしたソースのうち変更があったものだけを再インポートする。`hermes migrate` は他エージェントの設定を検出してインポートを提案し、`hermes migrate <agent>`（`openclaw` / `claude-code` / `codex` / `cursor` / `grok-bot` / `openbot`）はプラグインが無ければ導入してから実行する。

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

## クリップボード画像をファイルへ書き出し

```bash
hermes clipboard image --out PATH [--json]
```

このマシンのクリップボードのみを読む。gateway もセッションも不要。終了コード: `0` 成功、`1` 画像なし、`3` クリップボードツール未導入、`4` 書き込み失敗、`2` 引数エラー。

## ブラウザで Desktop ワークスペースを開く

```bash
hermes config set webapp.enabled true
hermes gateway restart
hermes webapp
```

## 注記

`hermes --native` と `hermes sync` は v0.22.2 の `reference/cli-commands.md` で確認できなかったため収録していない（v0.23.1 の同ページ差分にも現れない）。

v0.22 -> v0.23 の変更: `hermes import-agent` / `hermes claw` はコアからプラグインへ移動、`hermes -s ...` の例は公式の `hermes chat -s ...` に合わせた、`hermes -w` / `hermes chat --verbose` はクラシック CLI が拒否するため前者を `hermes --tui -w` に置き換え後者を削除した（worktree の `hermes --tui -w` 形式は v0.23.1 の CLI ガイドの記述に基づく）。

- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/cli (pinned to v0.23.1)
