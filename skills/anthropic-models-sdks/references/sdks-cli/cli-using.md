<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/using / last verified: 2026-08-07 -->

# Using the CLI

Command structure, output formats, GJSON transforms, request bodies, and debugging for the `ant` CLI.

## Signature / Usage

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

# Debug
ant --debug beta:agents list
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--profile` | string | Named profile to use for this invocation |
| `--format` | string | Output format: `auto`, `json`, `jsonl`, `yaml`, `pretty`, `raw`, `explore` |
| `--transform` | string | Filter or reshape the response with a GJSON path |
| `-r`, `--raw-output` | flag | Print string results without surrounding quotes, like `jq -r` |
| `--base-url` | string | Override the API base URL |
| `--debug` | flag | Print full HTTP request and response to stderr (API keys redacted) |
| `--format-error`, `--transform-error` | string | Same as `--format`/`--transform` but applied to error responses |

## Notes

- Resources in beta (agents, sessions, deployments, environments, skills) live under the `beta:` prefix, which automatically sends the right `anthropic-beta` header.
- `auto` pretty-prints JSON by default for create/modify commands; list and retrieve commands default to the interactive explorer TUI when writing to a terminal, and to pretty-printed JSON when piped.
- List endpoints auto-paginate; `--transform` on a list endpoint runs against each item individually, not the envelope.
- Request bodies can be passed as flags (scalar/short structured YAML-like or JSON), piped via stdin/heredoc (merged with flags, flags take precedence), or via `@path`/`@file://`/`@data://` file references for string or binary fields.
- This is the CLI for the Claude API (platform.claude.com). It is a different product from the Claude Code CLI (see anthropic-claude-code).

## Related

- [CLI quickstart](./cli-quickstart.md)
- [CLI authentication options](./cli-authentication.md)
- [CLI scripting and automation](./cli-scripting.md)
