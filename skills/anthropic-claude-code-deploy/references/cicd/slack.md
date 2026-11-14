<!-- source: https://code.claude.com/docs/en/slack.md / last verified: 2026-11-14 -->

# Claude Code in Slack

Delegate coding tasks from Slack by mentioning `@Claude`; Claude detects coding intent and creates a Claude Code cloud session under the mentioning user's own account and plan limits. This earlier version answers channel mentions only from Pro, Max, and Ultra accounts in workspaces not connected to Claude Tag.

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
| Connect Claude account | App Home button | Links your Slack account to your Claude account (browser authentication flow) |
| Routing Mode | App Home setting | Selects Code only or Code + Chat |
| View session | message action | Opens the full Claude Code session in the browser to see all work performed, continue the session, or make additional requests |
| Create PR | message action | Opens GitHub's compare page for the session's branch, where you create the pull request; appears on the status message Claude posted when the session started, once the session finishes |
| Switch to code repo... | message action | If Claude answered in Chat but you wanted a coding session, select a repository and Claude starts a Claude Code session with your original request (Code + Chat mode) |
| Select repository | message action | Shown when Claude can't tell which repository you mean; pick one from the list |

## Notes

This page describes the earlier Claude Code in Slack, which runs each session under an individual user's account. Claude Tag is its successor: it runs `@Claude` as your organization's shared identity with admin-configured access.

- Pro, Max, and Ultra plans: Claude Tag isn't available on individual plans, so this page remains the setup path in a workspace that isn't connected to Claude Tag.
- Team and Enterprise plans: the existing Slack app and `@Claude` handle stay. Set up Claude Tag for a new workspace (https://claude.com/docs/claude-tag/overview); to move a workspace that already uses this version, see https://claude.com/docs/claude-tag/admins/migrate-from-earlier.
- Setup: a workspace administrator installs the Claude app from the Slack App Marketplace (https://slack.com/marketplace/A08SF47R6P4); each user then clicks **Connect Claude account** in the App Home tab, configures cloud sessions at claude.ai/code (GitHub connected, at least one repository authenticated), and chooses a routing mode. Claude isn't added to any channel automatically; use `/invite @Claude`. In Code + Chat mode, **Switch to code repo...** on a chat reply starts a coding session instead.
- Workspace-level access: removing the app from a workspace immediately revokes access for all users there; Enterprise Grid organization admins can control which workspaces have the app.
- Prerequisites: Pro, Max, or Ultra plan; a Slack workspace not connected to Claude Tag by any organization; cloud sessions enabled for the account; a GitHub account connected at claude.ai/code with at least one authenticated repository; Slack account linked to the Claude account via the Claude app.
- Works only in channels (public or private) via explicit `@Claude` mentions after `/invite @Claude`; does not work in direct messages.
- Gathers context from the messages in the thread (yours and its own) when first mentioned in a thread, or from recent channel messages plus the channel's name, topic, and description when mentioned directly; to give Claude something a teammate wrote, such as an error report, paste its text into the message. Claude may follow directions found in that context, so use only in trusted conversations.
- For Enterprise and Team accounts, sessions created from Claude in Slack are automatically visible to the organization.
- Troubleshooting notices:
  - "This workspace isn't set up for Claude Tag yet": shown when no organization has connected the workspace to Claude Tag and the linked Claude account isn't on a Pro, Max, or Ultra plan. Claude Tag is available on Team and Enterprise plans; start with the `@Claude connect` command the notice names, then follow Set up Claude Tag (https://claude.com/docs/claude-tag/overview).
  - "The legacy Claude in Slack bot is retired effective October 5, 2026 and no longer responds in channels.": the workspace is connected to a Claude organization and the earlier version is still selected for the channel, workspace, or organization default. An Owner switches it at claude.ai/admin-settings/claude-tag; the notice doesn't depend on your plan, so Pro, Max, and Ultra accounts get it too. An Owner turns on Claude Tag for the channel, or changes the workspace or organization default to fix every inheriting channel; see https://claude.com/docs/claude-tag/admins/migrate-from-earlier. A non-Owner sends the entry to one.
  - "Claude Code is not enabled for your account": the account has no cloud environment yet; sign in at claude.ai/code once with the Slack-connected account and finish web onboarding. Each user does this individually.
  - Sessions from a Claude Tag channel fail to start: an environment created at claude.ai/code belongs to a personal account and can't be used for channel sessions (Claude Code fails the session immediately; retrying doesn't help). An Owner shares it with the organization from the environment selector (https://code.claude.com/docs/en/cloud-environments.md#organization-shared-environments) or recreates it as an organization-shared environment from the **Cloud environments** page in admin settings, then sets it as the organization default (claude.ai/admin-settings/claude-code) or on the channel (https://claude.com/docs/claude-tag/admins/troubleshooting#channel-sessions-use-the-wrong-environment-or-can%E2%80%99t-find-one).
  - Sessions not starting: verify the Claude account is connected in the App Home, cloud sessions are enabled, and at least one GitHub repository is connected. Repository not showing: connect it at claude.ai/code, verify GitHub permissions, or reconnect GitHub. Wrong repository: include the repository name in the request.
- Source: https://code.claude.com/docs/en/slack.md, fetched 2026-11-14
- Current limitations: GitHub only (repositories must be on GitHub); one PR at a time (each session can create one pull request); cloud session access required.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
