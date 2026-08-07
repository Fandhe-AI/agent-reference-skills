<!-- source: https://code.claude.com/docs/en/deep-links / last verified: 2026-08-07 -->
# Deep links

A `claude-cli://` URL that opens Claude Code in a new terminal window, optionally carrying a working directory and a pre-filled (not auto-sent) prompt. Useful for one-click entry points in runbooks, monitoring alerts, dashboards, and READMEs.

## Signature / Usage

```text
claude-cli://open
claude-cli://open?repo=acme/payments&q=Investigate%20the%20failed%20deploy
claude-cli://open?cwd=/Users/me/project&q=review%20open%20PRs
```

```bash
# macOS
open "claude-cli://open?repo=acme/payments&q=review%20open%20PRs"
# Linux
xdg-open "claude-cli://open?repo=acme/payments&q=review%20open%20PRs"
```

```powershell
# Windows PowerShell
Start-Process "claude-cli://open?repo=acme/payments&q=review%20open%20PRs"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `q` | string | Text to pre-fill in the prompt box, URL-encoded; `%0A` for line breaks. Max 5,000 characters |
| `cwd` | string | Absolute path for the working directory. Network/UNC paths and paths with invisible/bidi control characters are rejected |
| `repo` | string | GitHub `owner/name` slug; resolves to the local clone you most recently ran `claude` in. Falls back to your home directory if no matching clone is known |

## Notes

- `cwd` and `repo` both set the working directory; if both are passed, `cwd` wins even if that path doesn't exist.
- The prompt is never auto-sent — a `Prompt from an external link` warning stays visible until you send or clear it, and prompts over 1,000 characters show a character count reminding you to review before pressing Enter.
- GitHub-rendered Markdown (READMEs, issues, PRs, wikis) strips `claude-cli://` links, showing only the label with no clickable link — put the URL in a code block instead so readers can copy it.
- The handler registers with the OS only after you send your **first prompt** of an interactive session (not just on startup); registration is user-level (`~/Applications/...` on macOS, a `.desktop` file on Linux, a registry key on Windows).
- Disable registration entirely with `disableDeepLinkRegistration: "disable"` in `settings.json`, or enforce it via managed settings.
- The VS Code extension registers a separate handler, `vscode://anthropic.claude-code/open`, which opens an editor tab instead of a terminal.

## Related

- [Manage sessions](./sessions.md): name, resume, and switch conversations opened via a deep link
