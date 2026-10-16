<!-- source: https://code.claude.com/docs/en/cli-reference.md / last verified: 2026-10-17 -->
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

`--email` pre-fills the email address on sign-in.

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
claude attach 7c5dcf5d       # attach to a background session in this terminal (<id|name>; name needs v2.1.290+)
claude logs <id>             # print recent output from a background session
claude respawn <id>          # restart a background session, keeping conversation intact
claude rm 7c5dcf5d           # remove a background session from the list (transcript stays on disk)
claude stop <id>             # stop a background session
claude kill <id>             # alias for claude stop
```

> **警告**: `claude rm` can be refused over the session's worktree; the refusal prints the exact flag to pass. `--discard-unpushed <commit>@<worktree-id>` (v2.1.260+) discards a worktree together with its unpushed commits, and `--force-remove-worktree <worktree-id>` (v2.1.268+) deletes a worktree directory that git or the `WorktreeRemove` hook couldn't remove. Not reversible.

## デーモン（バックグラウンドセッションのスーパーバイザー）

```bash
claude daemon logs                          # follow ~/.claude/daemon.log
claude daemon run                           # run the supervisor in the foreground
claude daemon status
claude daemon stop --any
claude daemon stop --any --keep-workers     # leave background sessions running
```

## 他のコーディングエージェントからの設定インポート

```bash
claude import codex --dry-run
```

Requires Claude Code v2.1.213 or later. Accepts `--dry-run` and `--yes`. Not available on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Platform on AWS.

## Claude Desktop で開く

```bash
claude --desktop
```

Opens the Claude Desktop app on the current directory and exits. Requires v2.1.285 or later; available on macOS and x64 Windows with a Claude subscription. Takes no prompt and no other flags except `--verbose` and the `--debug` flags.

## restricted モード

```bash
claude --restricted -p "query"
```

Removes command/code-running built-in tools and WebFetch, confines file tools to the working directories, loads only managed settings and `--settings`, and refuses `bypassPermissions`. Intended for evaluation harnesses on shared machines. Requires v2.1.248 or later.

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
