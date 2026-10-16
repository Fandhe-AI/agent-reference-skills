<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart / last verified: 2026-10-17 -->

# CLI

`ant` コマンドラインツールのインストール・認証・基本操作・スクリプティング・リソース as code（`ant apply`）・セッション接続のコマンド集。

## インストール

```bash
# Homebrew (macOS)
brew install anthropics/tap/ant

# curl (Linux/WSL)
VERSION=1.42.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case $(uname -m) in
  x86_64) ARCH=amd64 ;;
  aarch64) ARCH=arm64 ;;
esac
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant

# Go (requires Go 1.25+) — pinned to the same version as the curl route; the official docs use @latest
go install github.com/anthropics/anthropic-cli/cmd/ant@v1.42.0

# Check the installation
ant --version
```

Shell completion: `ant @completion <shell>` (bash, zsh, fish, PowerShell).

## 認証

```bash
# Interactive OAuth login
ant auth login

# Remote host without a browser
ant auth login --no-browser

# Bind to a specific workspace and skip the picker
ant auth login --workspace-id wrkspc_01...

# Named profile
ant auth login --profile <profile-name>

# Admin scope
ant auth login --profile admin --scope "org:admin"
ant auth print-credentials --profile admin --access-token

# API key via environment variable
export ANTHROPIC_API_KEY=sk-ant-api03-...

# Check status
ant auth status

# Logout
ant auth logout
ant auth logout --all
```

> **警告**: `ant auth logout --all` はすべてのプロファイルの認証情報を削除する。

## プロファイル・ワークスペース切替

```bash
ant profile activate other-ws
ant --profile other-ws models list
ANTHROPIC_PROFILE=other-ws ant models list

ant profile list
ant profile get --profile other-ws
ant profile set workspace_id wrkspc_01... --profile other-ws
```

## 基本操作

```bash
ant <resource>[:<subresource>] <action> [flags]

ant models list
ant messages create --model claude-opus-5-5 --max-tokens 1024 ...
ant beta:agents retrieve --agent-id agent_01...
ant beta:sessions:events list --session-id session_01...

# GJSON transform
ant beta:agents list --transform "{id,name,model}" --format jsonl

# Extract a scalar
AGENT_ID=$(ant beta:agents create \
  --name "My Agent" \
  --model '{id: claude-opus-5-5}' \
  --transform id --raw-output)

# Debug (prints full HTTP request/response to stderr, API keys redacted)
ant --debug beta:agents list
```

## スクリプティング・自動化

```bash
# Version-control a managed agent as YAML (旧方式。現行は ant apply — 下記「リソースの as code 管理」参照)
ant beta:agents create < summarizer.agent.yaml
ant beta:agents update --agent-id agent_01... --version 1 < summarizer.agent.yaml

# Chain list output into a second command
FIRST_AGENT=$(ant beta:agents list --transform id --raw-output | head -1)
ant beta:agents:versions list --agent-id "$FIRST_AGENT" --transform "{version,created_at}" --format jsonl

# Inspect errors
ant beta:agents retrieve --agent-id bogus \
  --transform-error error.message --format-error yaml 2>&1

# Watch a session live
ant beta:sessions:events stream --session-id session_01...

# Authenticate curl with CLI credentials
curl https://api.anthropic.com/v1/messages \
  -H "Authorization: Bearer $(ant auth print-credentials --access-token)" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 256, "messages": [{"role": "user", "content": "hi"}]}'
```

## リソースの as code 管理（ant apply）

```bash
# Apply one file (kind is inferred from its path, e.g. agents/)
ant apply agents/summarizer.md

# Apply a whole project directory
ant apply .

# Reconcile every file the lockfile tracks
ant apply

# Print the detailed plan and exit without changing anything
ant apply --dry-run .
```

`ant apply` は CLI 1.30.0 以降が必要。初回実行でカレントディレクトリに `claude-lock.json` を書き出す（リポジトリルートで実行し、コミットする）。vault ファイルは CLI 1.34.0 以降。

## ant apply の CI 実行

```bash
# On the default branch after merge: name the project directory
ant apply --yes .

# On pull requests: informational plan only (exits 0 even when blocked)
ant apply --dry-run .
```

端末が無い環境では `--yes` が必須。素の `ant apply --yes` はロックファイルが追跡済みのファイルだけを対象にし、新規追加ファイルはスキップする。

## ant apply のフラグ

> **警告**: `--force` はリソースがファイル外（Console 等）で変更・アーカイブ・削除されていても適用し、その編集を上書きするか置き換えを作成する。`--prune` はロックファイルにあるが宣言ファイルが無くなったリソースを削除（アーカイブ、skill は削除）する。いずれも必ず `--dry-run` でプランを確認してから使う。

```bash
# Skip the confirmation prompt (required without a terminal)
ant apply --yes .

# Overwrite resources changed/archived/deleted outside these files
ant apply --force .

# Remove resources that are in the lockfile but no longer declared in a file
ant apply --prune .

# Re-resolve skills referenced by GitHub URL (otherwise pinned to the locked commit)
ant apply --upgrade .

# Use a specific lockfile (one per organization / workspace)
ant apply --lock-file <path> .

# Show unchanged resources and full field values in the plan
ant apply --verbose .
ant apply -v .
```

## セッションへの接続

```bash
# Attach the terminal to an existing Managed Agents session (interactive terminal required)
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7

# Open the Console session viewer in the browser instead
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7 --web

# Serve the viewer without opening the browser
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7 --web --no-browser

# Start with tool inputs / results / token usage shown
ant beta:sessions connect sesn_011CZkZAtmR3yMPDzynEDxu7 --verbose
```

`ant beta:sessions connect` は CLI 1.32.0 以降が必要。Ctrl+C で切断（セッションは継続）。スクリプトでは `ant beta:sessions:events stream` / `ant beta:sessions:events send` を使う。

## Notes

- This is the Claude API CLI (platform.claude.com), distinct from the Claude Code CLI (see the anthropic-claude-code skill).
- The `go install` line is pinned to `@v1.42.0` to match the curl route and the CLI version recorded in SKILL.md; the official quickstart shows `@latest`. Change the tag to follow a newer release.
- Keep `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` unset when authenticating `curl` with a CLI login token — either variable takes precedence and can silently route requests to a different organization or workspace.
- If `ANTHROPIC_API_KEY` is set, it overrides every profile for `ant` commands.
- `ant apply` refuses a lockfile or credentials whose organization / workspace do not match; keep one lockfile per organization or workspace. Nothing locks the lockfile, so run one apply at a time.
- `ant apply` cannot adopt resources created in the Console or with `ant beta:agents create`; only what is in `claude-lock.json` is managed.
