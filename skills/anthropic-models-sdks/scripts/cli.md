<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart / last verified: 2026-08-07 -->

# CLI

`ant` コマンドラインツールのインストール・認証・基本操作・スクリプティングコマンド集。

## インストール

```bash
# Homebrew (macOS)
brew install anthropics/tap/ant

# curl (Linux/WSL)
VERSION=1.21.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
case $(uname -m) in
  x86_64) ARCH=amd64 ;;
  aarch64) ARCH=arm64 ;;
esac
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant

# Go (requires Go 1.22+)
go install github.com/anthropics/anthropic-cli/cmd/ant@latest
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
ant messages create --model claude-opus-5 --max-tokens 1024 ...
ant beta:agents retrieve --agent-id agent_01...
ant beta:sessions:events list --session-id session_01...

# GJSON transform
ant beta:agents list --transform "{id,name,model}" --format jsonl

# Extract a scalar
AGENT_ID=$(ant beta:agents create \
  --name "My Agent" \
  --model '{id: claude-opus-5}' \
  --transform id --raw-output)

# Debug (prints full HTTP request/response to stderr, API keys redacted)
ant --debug beta:agents list
```

## スクリプティング・自動化

```bash
# Version-control a managed agent as YAML
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
  -d '{"model": "claude-opus-5", "max_tokens": 256, "messages": [{"role": "user", "content": "hi"}]}'
```

## Notes

- This is the Claude API CLI (platform.claude.com), distinct from the Claude Code CLI (see the anthropic-claude-code skill).
- Keep `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` unset when authenticating `curl` with a CLI login token — either variable takes precedence and can silently route requests to a different organization or workspace.
- If `ANTHROPIC_API_KEY` is set, it overrides every profile for `ant` commands.
