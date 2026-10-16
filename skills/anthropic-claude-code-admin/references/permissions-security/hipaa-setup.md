<!-- source: https://code.claude.com/docs/en/hipaa-setup.md / last verified: 2026-10-16 -->

# Set up Claude Code (local mode) for a HIPAA-ready organization

Prepare developers' computers to run Claude Code (local mode) under the HIPAA configuration, an organization setting on Claude Enterprise plans for organizations that handle PHI and have a Business Associate Agreement (BAA) with Anthropic. It applies to Claude Code (local mode) and Cowork (local mode).

## Signature / Usage

Sample managed settings (a recommended starting point; the settings apply whether or not the HIPAA configuration is in effect):

```json
{
  "forceLoginMethod": "claudeai",
  "forceLoginOrgUUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "allowedProviders": ["anthropic"],
  "cleanupPeriodDays": 30
}
```

Check the installed version (requires Claude Code v2.1.285 or later; Claude Desktop v2.19675.0 or later):

```bash
claude --version
```

## Options / Props

Managed settings keys:

| Key | Set it to | What Claude Code enforces |
|-----|-----------|---------------------------|
| `forceLoginMethod` | `"claudeai"` | Directs developers to claude.ai sign-in instead of Claude Console |
| `forceLoginOrgUUID` | Your organization ID (an Owner can copy it from claude.ai admin settings) | Exits at startup when the claude.ai sign-in belongs to another organization |
| `allowedProviders` | `["anthropic"]` | Refuses to start on a cloud provider or a gateway |
| `cleanupPeriodDays` | Days your records policy lets a computer keep session data | Every computer deletes old session data after the same number of days |

Connections eligible for the HIPAA configuration:

| How Claude Code connects | Eligible |
|--------------------------|----------|
| Claude Enterprise account, connecting directly to the Claude API | Yes |
| Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, Claude Platform on AWS, or a Claude apps gateway | No |
| An LLM gateway or any other custom `ANTHROPIC_BASE_URL` | No |
| `ANTHROPIC_AUTH_TOKEN` or `apiKeyHelper`, on a computer with no Claude Enterprise sign-in | No |
| A Claude Console API key or federation credentials | No (belongs to a Claude Console organization with its own agreement and settings) |

Network hosts to allow (HTTPS, port 443, whole host):

| Host | Needed for |
|------|-----------|
| `api.anthropic.com` | Claude API requests, telemetry, and the organization policy that tells Claude Code the HIPAA configuration is on |
| `claude.ai`, `claude.com`, `platform.claude.com` | Sign-in and token refresh |
| `downloads.claude.ai` | The native installer and its updates |
| `mcp-proxy.anthropic.com` | Connectors from claude.ai |

What developers notice with the configuration applied:

| What a developer notices | Why |
|--------------------------|-----|
| The WebFetch tool is unavailable | WebFetch is off. Web search still works |
| `--cloud`, `/teleport`, and Remote Control are refused | Cloud sessions and Remote Control are off |
| `/feedback` and `/bug` are unavailable | Feedback submission is off |
| Claude can't publish an artifact | Artifact publishing is off |
| MCP tools load into context upfront | MCP tool search is off; neither `ENABLE_TOOL_SEARCH` nor managed settings turns it back on |
| An MCP server or hook that reads `ANTHROPIC_API_KEY` stops authenticating | Claude Code removes Anthropic credentials (`ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`) from the environment of shell commands, hooks, and MCP servers it starts |
| Restrictions remain after `/login` to a different organization | The HIPAA status lasts until Claude Code restarts |

## Notes

- "(local mode)" means a local session (terminal, the Code tab of Claude Desktop, or Cowork in Claude Desktop), not a cloud session. The VS Code and JetBrains extensions are not part of local mode; the BAA does not cover them.
- Check how a computer connects with `/status`: `Login method` reads `Claude Enterprise account` and `Organization` shows the organization; `API provider` / `Anthropic base URL` lines appear only for cloud providers, gateways, or a custom base URL.
- Versions older than the minimum are rejected by Anthropic's servers for HIPAA organizations (Claude Code shows an `API Error`; Claude Desktop shows an **Update required** dialog). Anthropic raises the minimum over time.
- Claude Code fetches the organization policy from `api.anthropic.com` at startup and about every hour while in use; a running session picks up the configuration within about an hour.
- Check `forceLoginOrgUUID` before deploying: a mismatch makes Claude Code exit at startup for every developer signing in with a claude.ai account. With `forceLoginMethod` or `forceLoginOrgUUID` set, sessions authenticating with `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` are also refused.
- The HIPAA configuration does not limit `cleanupPeriodDays`; when set in managed settings, the developer's value is ignored.
- Not blocked by these keys: Claude Console sign-ins and federation credentials; server-managed settings (have an Owner add the same keys there); versions older than v2.1.285 ignore `allowedProviders` (add `requiredMinimumVersion: "2.1.285"` to make v2.1.163 through v2.1.284 refuse to start; versions before v2.1.163 ignore it too, so update them).
- Confirm on one managed computer: restart `claude`; startup notice `Per your organization's policy, some features are limited · /status for details`; footer tag `HIPAA configured` (reads `HIPAA` before v2.1.286); `/status` lists `HIPAA` on the `Organization configuration` line. If missing, check wrong account/connection, a blocked policy fetch (`Organization policy` line in `/status` or `claude doctor`), or that the Primary Owner has not applied the configuration yet.
- Applying the configuration turns the Code tab off for the organization; an Owner turns the **Desktop** toggle back on under Organization settings > Claude Code.
- Cloud provider and GitHub credentials are not removed from the environment; data sent there is not covered by the BAA. Limit commands and hosts with permission rules and the sandbox.
- Local data: the retention sweep runs only when someone starts Claude Code. The Code tab stores transcripts in `~/.claude/projects/` and Claude Desktop data in `~/Library/Application Support/Claude` (macOS) or `%APPDATA%\Claude` (Windows, also `%LOCALAPPDATA%\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude` for the installer downloaded from Anthropic). With the configuration applied, Claude Desktop deletes local Code tab sessions inactive longer than `cleanupPeriodDays` (including starred ones, only while running); the worktree is removed only if there are no uncommitted changes, the session is not starred or pinned, and no other session uses it.
- Delete session data right away (removes transcripts, auto memory, `tasks/`, `debug/`, `file-history/`, `history.jsonl`, and project entries in `~/.claude.json`; leaves paths such as `paste-cache/`; without `--yes` it prints the plan and asks first). On v2.1.288 or later:

  ```bash
  claude purge --all --yes
  ```

  On v2.1.126 through v2.1.287 use `claude project purge --all --yes`.
- Removing a seat or account, or `/logout`, deletes nothing on the computer; wipe the computer with a device management tool to offboard a developer.
- A fuller `managed-settings.json` (sandboxing, network allowlist, credential protections, data retention) is `settings-hipaa.json` / `README-hipaa.md` in the `examples/settings` directory of the `anthropics/claude-code` repository.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [data-usage](./data-usage.md)
- [legal-and-compliance](./legal-and-compliance.md)
- [permissions](./permissions.md)
- [sandboxing](./sandboxing.md)
