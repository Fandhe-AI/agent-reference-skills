# Use Codex in Slack

Kick off coding work from Slack channels and threads: mention `@Codex` with a prompt, and Codex creates a cloud chat and replies with results.

## Signature / Usage

```md
# In a Slack channel or thread
@Codex fix the above in openai/codex
```

## Set up the Slack app

1. Set up [Codex cloud chats](../getting-started/cloud.md). Requires a Plus, Pro, Business, Enterprise, or Edu plan, a connected GitHub account, and at least one environment.
2. Go to Codex settings (`chatgpt.com/codex/settings/connectors`) and install the Slack app for the workspace (a Slack admin may need to approve, depending on workspace policy).
3. Add `@Codex` to a channel (Slack prompts to add it on first mention if not already present).

## Start a chat

1. In a channel or thread, mention `@Codex` with a prompt; Codex can reference earlier thread messages for context.
2. Optionally specify an environment/repository in the prompt, e.g. `@Codex fix the above in openai/codex`.
3. Codex reacts (👀), then replies with a link to the chat and, depending on settings, an answer in the thread when finished.

### How Codex chooses an environment and repo

Codex reviews accessible environments and selects the best match for the request, falling back to the most recently used environment if ambiguous. The chat runs against the default branch of the first repository listed in that environment's repo map.

### Enterprise data controls

By default Codex posts an answer in the thread, which can include information from the run environment. An Enterprise admin can clear **Allow Codex Slack app to post answers on task completion** in workspace settings so Codex replies only with a chat link.

## Notes

- Data handling for `@Codex` mentions (message + thread history) follows OpenAI's Privacy Policy and Terms of Use; see the security-automation category for Codex's own security/approval model.
- Distinct from the GitHub Action / non-interactive automation surfaces: this integration is triggered by chat mentions, not CI events.

## Related

- [Codex cloud](../getting-started/cloud.md)
- [Use Codex in Linear](./linear.md)
