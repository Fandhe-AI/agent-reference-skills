<!-- source: https://code.claude.com/docs/en/slack.md / last verified: 2026-08-07 -->

# Claude Code in Slack

Delegate coding tasks from Slack by mentioning `@Claude`; Claude detects coding intent and creates a Claude Code session on the web under the mentioning user's own account and plan limits.

## Signature / Usage

```text
@Claude fix the TypeError in the user dashboard component
```

Invite Claude to a channel first:

```text
/invite @Claude
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Code only | routing mode | Routes all `@Claude` mentions to Claude Code sessions |
| Code + Chat | routing mode | Intelligently routes between Claude Code (coding tasks) and Claude Chat (writing/analysis/general questions); "Retry as Code" available when misrouted |
| View Session | message action | Opens the full Claude Code session transcript in the browser |
| Create PR | message action | Creates a pull request from the session's changes |
| Change Repo | message action | Selects a different repository when Claude chose incorrectly |

## Notes

This page documents the setup and usage of the earlier Claude Tag (Claude in Slack), which runs sessions under an individual Slack user's own account and plan limits. Anthropic is retiring this version for Team and Enterprise workspaces in favor of Claude Tag, which runs `@Claude` as a shared organization identity with admin-configured access; existing Slack app and `@Claude` handle carry over at cutover. This page remains the setup path for Pro and Max plans, where Claude Tag is unavailable.

- Prerequisites: Pro/Max/Team/Enterprise plan with Claude Code access, Claude Code on the web enabled, a connected GitHub account with at least one authenticated repository, and Slack account linked via the Claude app.
- Works only in channels (public or private) via explicit `@Claude` mentions after `/invite @Claude`; does not work in direct messages.
- Gathers context from the full thread when mentioned in a thread, or recent channel messages when mentioned directly; Claude may follow directions found in that context, so use only in trusted conversations.
- Current limitations: GitHub repositories only, one PR per session, individual plan rate limits apply, and users without Claude Code on the web access get only standard chat responses.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
