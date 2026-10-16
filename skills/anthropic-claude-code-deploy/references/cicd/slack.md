<!-- source: https://code.claude.com/docs/en/slack.md / last verified: 2026-10-16 -->

# Claude Code in Slack

Delegate coding tasks from Slack by mentioning `@Claude`; Claude detects coding intent and creates a Claude Code cloud session under the mentioning user's own account and plan limits. This earlier version answers channel mentions only from Pro and Max accounts in workspaces not connected to Claude Tag.

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
| Code + Chat | routing mode | Intelligently routes between Claude Code (coding tasks) and Claude Chat (writing/analysis/general questions) |
| View Session | message action | Opens the full Claude Code session transcript in the browser |
| Create PR | message action | Creates a pull request from the session's changes |
| Retry as Code | message action | Retries as a Claude Code task when Claude answered as a chat assistant (Code + Chat mode) |
| Change Repo | message action | Selects a different repository when Claude chose incorrectly |

## Notes

This page describes the earlier Claude Code in Slack, which runs each session under an individual user's account. Claude Tag is its successor: it runs `@Claude` as your organization's shared identity with admin-configured access.

- Pro and Max plans: Claude Tag isn't available on individual plans, so this page remains the setup path in a workspace that isn't connected to Claude Tag.
- Team and Enterprise plans: the existing Slack app and `@Claude` handle stay. Set up Claude Tag for a new workspace (https://claude.com/docs/claude-tag/overview); to move a workspace that already uses this version, see https://claude.com/docs/claude-tag/admins/migrate-from-earlier.
- Prerequisites: Pro or Max plan; a Slack workspace not connected to Claude Tag by any organization; cloud sessions enabled for the account; a GitHub account connected at claude.ai/code with at least one authenticated repository; Slack account linked to the Claude account via the Claude app.
- Works only in channels (public or private) via explicit `@Claude` mentions after `/invite @Claude`; does not work in direct messages.
- Gathers context from the full thread when mentioned in a thread, or recent channel messages when mentioned directly; Claude may follow directions found in that context, so use only in trusted conversations.
- For Enterprise and Team accounts, sessions created from Claude in Slack are automatically visible to the organization.
- Troubleshooting notices:
  - "This workspace isn't set up for Claude Tag yet": shown when no organization has connected the workspace to Claude Tag and the linked Claude account isn't on a Pro or Max plan. Start with the `@Claude connect` command the notice names.
  - "The legacy Claude in Slack bot is retired effective October 5, 2026 and no longer responds in channels.": the workspace is connected to a Claude organization and the earlier version is still selected for the channel, workspace, or organization default. An Owner switches it at claude.ai/admin-settings/claude-tag; the notice doesn't depend on your plan, so Pro and Max accounts get it too.
  - "Claude Code is not enabled for your account": the account has no cloud environment yet; sign in at claude.ai/code once with the Slack-connected account and finish web onboarding. Each user does this individually.
  - Sessions from a Claude Tag channel fail to start: a personal environment can't be used for channel sessions; set an organization-shared environment as the organization default (claude.ai/admin-settings/claude-code) or on the channel in the Claude Tag admin settings.
- Current limitations: GitHub only (repositories must be on GitHub); one PR at a time (each session can create one pull request); cloud session access required.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
