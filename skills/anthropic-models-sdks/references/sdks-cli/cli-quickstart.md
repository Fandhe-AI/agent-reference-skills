<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart / last verified: 2026-08-07 -->

# CLI quickstart

Install the `ant` command-line tool, authenticate, and send your first request to the Claude API.

## Signature / Usage

The `ant` CLI provides access to the Claude API from your terminal. Every API resource is exposed as a subcommand, with output formatting, response filtering, and YAML or JSON file input.

Installation:

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

Authenticate and send a request:

```bash
ant auth login

ant messages create \
  --model claude-opus-5 \
  --max-tokens 1024 \
  --message '{role: user, content: "Hello, Claude"}'
```

Shell completion is available for bash, zsh, fish, and PowerShell via `ant @completion <shell>`.

## Notes

- Compared to `curl`, `ant` builds request bodies from typed flags or piped YAML instead of hand-written JSON, inlines file contents into string fields with an `@path` reference, extracts response fields with `--transform` (no separate `jq` needed), and auto-paginates list endpoints.
- This is the CLI for the Claude API (platform.claude.com). It is a different product from the Claude Code CLI (see anthropic-claude-code).

## Related

- [CLI authentication options](./cli-authentication.md)
- [Using the CLI](./cli-using.md)
- [CLI scripting and automation](./cli-scripting.md)
