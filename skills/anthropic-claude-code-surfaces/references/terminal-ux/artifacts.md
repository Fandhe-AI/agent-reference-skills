<!-- source: https://code.claude.com/docs/en/artifacts.md / last verified: 2026-08-07 -->

# Share session output as artifacts

An artifact is a live, interactive web page Claude Code publishes from a session to a private URL on claude.ai, updated in place as the session continues. Available on Pro, Max, Team, and Enterprise plans; requires a session signed in via `/login`.

## Signature / Usage

```text
Make an artifact that walks through this PR with the diff annotated inline.

# Update the same page later
Add a per-region breakdown below the summary chart and republish.

# Reopen the most recent artifact from the terminal
Ctrl+]
```

Claude writes an `.html`, `.htm`, or `.md` file, asks permission before first publish, then prints the URL.

## Options / Props

| Constraint | Effect |
| --- | --- |
| No external requests | CSP blocks scripts/styles/fonts/images from other hosts and `fetch`/XHR/WebSocket; MCP connector calls are the one exception |
| No backend | Static page only; can't store form input or authenticate viewers |
| Single page | Relative links don't resolve; use in-page anchors |
| Source file types | `.html`, `.htm`, or `.md` only |
| Rendered size | Must be 16 MiB or smaller |

| Sharing scope | Plans |
| --- | --- |
| Private / Team | Team, Enterprise |
| Private / Public | Pro, Max |

## Notes

- Not the Claude API's own feature — this is Claude Code's session-output publishing feature (a session artifact viewer on claude.ai), unrelated to the Claude API `computer_use`/tool-use surface.
- MCP connector-backed pages call each viewer's own connected tools at view time (not the publisher's), and can't be shared to a public link on any plan.
- Not available on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, or when CMEK/HIPAA/Zero Data Retention is enabled for the org.
- `CLAUDE_CODE_ARTIFACT_AUTO_OPEN=0` stops the browser auto-opening on publish; `"disableArtifact": true` / `CLAUDE_CODE_DISABLE_ARTIFACT=1` / a `permissions.deny` entry for `Artifact` turn the feature off.

## Related

- [computer-use](./computer-use.md)
