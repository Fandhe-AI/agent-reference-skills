<!-- source: https://code.claude.com/docs/en/artifacts.md / last verified: 2026-10-17 -->

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
| External requests | The page can load Google Fonts typefaces and scripts from five CDN hosts (cdnjs, unpkg, the Tailwind CDN, the jQuery CDN, and selected jsDelivr paths such as `/npm/`). `fetch` / XHR / WebSocket can reach only the page's own origin and the Google Fonts hosts. External images are blocked (embed them as data URIs); all other external scripts, stylesheets, and fonts are blocked. MCP connector calls go through claude.ai |
| No backend | Static page only; can't authenticate viewers |
| Downloads | The page can't start a download itself; Claude declares the downloads runtime capability so viewers can save a generated file through a page control |
| Single page | Relative links don't resolve; use in-page anchors |
| Source file types | `.html`, `.htm`, or `.md` only; must decode as UTF-8, or UTF-16LE by its byte-order mark |
| Source location | A path that names a network host (network share) is refused without being read |
| Rendered size | Must be 16 MiB or smaller |

| Sharing scope | Plans |
| --- | --- |
| Private / Team | Team, Enterprise |
| Private / Public | Pro, Max |

## Notes

- Not the Claude API's own feature — this is Claude Code's session-output publishing feature (a session artifact viewer on claude.ai), unrelated to the Claude API `computer_use`/tool-use surface.
- MCP connector-backed pages call each viewer's own connected tools at view time (not the publisher's). They can be shared within the organization or publicly as plan and org settings allow, but connector calls don't run for a viewer who opens a public link without signing in to claude.ai or from outside the organization (that viewer sees the page without its live sections). Connector calls need v2.1.209+. On publish, Claude Code checks the connector tool names the page declares against the session's available tools and refuses the publish when none match (v2.1.265+; before that it published unchecked).
- Not available on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry, or when CMEK/HIPAA/Zero Data Retention is enabled for the org.
- `CLAUDE_CODE_ARTIFACT_AUTO_OPEN=0` stops the browser auto-opening on publish.
- Disabling: `"enableArtifact": false` (the `/config` Artifacts row writes it to user settings), `CLAUDE_CODE_DISABLE_ARTIFACT=1`, or a `permissions.deny` entry for `Artifact`. `"disableArtifact": true` is deprecated but still turns artifacts off. Project and local settings can turn artifacts off but not on (v2.1.242+). A `WebFetch(domain:claude.ai)` deny or ask rule applies to artifact reads.
- `/artifacts` (v2.1.208+) lists artifacts you own and ones shared with you (keys: `Enter` open/attach, `o` open, `c` copy link). A `⧉` pill below the prompt shows the session's artifact name or count.
- Sharing: on Team and Enterprise you can make someone an editor; if an editor publishes while Claude holds an older copy, Claude Code refuses a publish built on that copy and Claude merges onto the newer version.
- Comments: after a publish, Claude Code watches the artifact for comments sent to Claude (v2.1.228+; off when feature-flag fetching is off). `Ctrl+X Ctrl+K` twice within 3 seconds stops auto-replies for the rest of the session.
- Templates (beta): Claude can start from Slides / Design / Docs templates; `/slides` and `/design` need v2.1.265+. Claude Docs arrives as the claude.ai `Claude Docs` connector.
- Availability: also Claude Tag sessions, and sessions served by `claude remote-control` that you started yourself (v2.1.281+); Claude desktop app 1.13576.0+. Off by default in the Agent SDK, the GitHub Action, MCP-server contexts, `-p` from your own terminal or scripts, and with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`.
- Org admin controls (artifacts toggle, artifact connectors, public sharing, retention, audit log, Compliance API endpoints `/v1/compliance/code/artifacts`) are covered by the anthropic-admin-platform skill for the API side; the toggles live in claude.ai admin settings.

## Related

- [computer-use](./computer-use.md)
