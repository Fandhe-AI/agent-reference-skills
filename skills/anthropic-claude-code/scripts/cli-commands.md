<!-- source: https://code.claude.com/docs/en/cli-reference.md / last verified: 2026-08-07 -->
<!-- source: https://code.claude.com/docs/en/quickstart.md / last verified: 2026-08-07 -->

# cli-commands

Interactive/print-mode session start, session continuation, auth, and diagnostic commands for the `claude` CLI. `claude --help` doesn't list every flag, so absence from `--help` doesn't mean unavailable.

## 対話セッションの開始

```bash
claude
claude "explain this project"
```

## 印字モード（print mode）で一度だけ問い合わせて終了

```bash
claude -p "explain this function"
```

## パイプ入力を処理

```bash
cat logs.txt | claude -p "explain"
```

## 直前の会話を継続

```bash
claude --continue
claude -c
claude -c -p "query"
```

## セッションを ID / 名前で再開

```bash
claude --resume auth-refactor
claude -r "<session>" "query"
```

## バージョン確認

```bash
claude --version
claude -v
```

## インストール・設定の診断（セッションを開始しない）

```bash
claude doctor
```

## 最新バージョンへ更新

```bash
claude update
```

## 認証（ブラウザログイン）

```bash
claude auth login
claude auth login --sso
claude auth login --console
```

`--email` is also listed as a sign-in option (argument syntax not documented in the official reference).

## ログアウト

```bash
claude auth logout
```

## 認証状態の確認

```bash
claude auth status
claude auth status --text
```

## CI / スクリプト用の長期 OAuth トークン発行

```bash
claude setup-token
```

## MCP サーバーの設定

```bash
claude mcp
claude mcp login <name>
claude mcp logout <name>
```

## プラグイン管理

```bash
claude plugin
claude plugins
```

## バックグラウンドセッション

```bash
claude agents                # open agent view for background sessions
claude attach <id>           # attach to a background session in this terminal
claude logs <id>             # print recent output from a background session
claude respawn <id>          # restart a background session, keeping conversation intact
claude rm <id>                # remove a background session from the list (transcript stays on disk)
claude stop <id>             # stop a background session
claude kill <id>             # alias for claude stop
```

## デーモン（バックグラウンドセッションのスーパーバイザー）

```bash
claude daemon status
claude daemon stop --any
claude daemon stop --any --keep-workers
```

## Remote Control サーバー

```bash
claude remote-control
```

## ultrareview の非対話実行

```bash
claude ultrareview
claude ultrareview <target>
claude ultrareview --json
claude ultrareview --timeout 30
```

## 代表的な CLI フラグ

```bash
claude --model sonnet
claude --permission-mode plan
claude --dangerously-skip-permissions
claude --add-dir ../docs
claude --output-format json -p "query"
claude --allowedTools "Bash(git diff *)"
claude --mcp-config ./mcp.json
claude --worktree '#123'
```

> **警告**: `--dangerously-skip-permissions` (equivalent to `--permission-mode bypassPermissions`) skips every permission prompt, so file edits and command execution happen without confirmation. Only use it in a trusted environment.

## セッション内スラッシュコマンド

```text
/clear
/help
/exit
```

Ctrl+D twice also exits, as an alternative to `/exit`.

## Notes

- `claude --help` doesn't list every flag; the full flag reference is `references/settings/cli-reference.md`.
- `--enable-auto-mode` was removed in v2.1.111; use `--permission-mode auto` instead.
