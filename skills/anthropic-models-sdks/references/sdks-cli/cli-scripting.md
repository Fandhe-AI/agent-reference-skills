<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/cli/scripting / last verified: 2026-10-17 -->

# CLI scripting and automation

Version-control API resources as files with `ant apply`, chain `ant` CLI commands in scripts, operate on resources from Claude Code, and authenticate `curl` calls with CLI credentials.

## Signature / Usage

```bash
# Version-control a managed agent as YAML (older approach; the current docs recommend `ant apply`, see cli-apply.md)
ant beta:agents create < summarizer.agent.yaml
ant beta:agents update --agent-id agent_01... --version 1 < summarizer.agent.yaml

# Run the applied agent from the shell (read the IDs from claude-lock.json under `resources`)
ant beta:sessions create \
  --agent agent_011CYm1BLqPXpQRk5khsSXrs \
  --environment-id env_01595EKxaaTTGwwY3kyXdtbs \
  --title "Summarization task"

ant beta:sessions:events send \
  --session-id session_01JZCh78XvmxJjiXVy3oSi7K \
  --event '{type: user.message, content: [{type: text, text: "Summarize the benefits of type safety in one sentence."}]}'

# `--transform` runs against each listed event; `--format auto` overrides the interactive explorer
ant beta:sessions:events list \
  --session-id session_01JZCh78XvmxJjiXVy3oSi7K \
  --transform 'content.0.text' \
  --raw-output \
  --format auto

# Chain list output into a second command
FIRST_AGENT=$(ant beta:agents list --transform id --raw-output | head -1)
ant beta:agents:versions list --agent-id "$FIRST_AGENT" --transform "{version,created_at}" --format jsonl

# Inspect errors
ant beta:agents retrieve --agent-id bogus \
  --transform-error error.message --format-error yaml 2>&1

# Authenticate curl with CLI credentials
curl https://api.anthropic.com/v1/messages \
  -H "Authorization: Bearer $(ant auth print-credentials --access-token)" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 256, "messages": [{"role": "user", "content": "hi"}]}'
```

## Notes

- Managed-agent resources (agents, environments, sessions) can be defined as YAML files checked into a repository and synced with the API in CI. The current official page points to "Manage resources as code with ant apply" (`cli-apply.md`) for this; the YAML-redirect `beta:agents create` / `update` form above is the older approach, kept for reference.
- After `ant apply`, read agent and environment IDs from `claude-lock.json`: each entry under `resources` has an `id`.
- `ant beta:sessions:events stream --session-id ...` watches a session live, writing events to stdout as they arrive.
- Claude Code can use the `ant` CLI out of the box for tasks like listing agent sessions, uploading files to the Files API, or debugging stuck sessions, once the CLI is installed and authenticated.
- Keep `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` unset when authenticating `curl` with a CLI login token — either variable takes precedence over the login and can silently route requests to a different organization or workspace.
- This is the CLI for the Claude API (platform.claude.com). It is a different product from the Claude Code CLI (see anthropic-claude-code).

## Related

- [CLI quickstart](./cli-quickstart.md)
- [Using the CLI](./cli-using.md)
- [CLI authentication options](./cli-authentication.md)
