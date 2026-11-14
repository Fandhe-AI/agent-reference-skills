<!-- source: https://code.claude.com/docs/en/artifacts.md / last verified: 2026-11-14 -->

# Share session output as artifacts

An artifact is a live, interactive web page Claude Code publishes from a session to a private URL on claude.ai, updated in place as the session continues. Available on Pro, Max, Ultra, Team, and Enterprise plans; requires a session signed in via `/login`.

## Signature / Usage

```text
Make an artifact that walks through this PR with the diff annotated inline.

# Update the same page later
Add a per-region breakdown below the summary chart and republish.

# Reopen the most recent artifact from the terminal
Ctrl+]
```

Unless you name a location, Claude writes an `.html`, `.htm`, or `.md` file to a temporary directory outside your project, publishes it, prints the URL, and opens the browser. A new artifact published in response to a prompt you type goes through without a permission prompt; it stays private to you until shared.

To update from a different session, give Claude the URL or attach it with `/artifacts`; otherwise a new session creates a new artifact:

```text
Update https://claude.ai/code/artifact/5fbea6f3-... with today's numbers.
```

## Options / Props

| Constraint | Effect |
| --- | --- |
| External requests | The page can load Google Fonts typefaces and scripts from five CDN hosts (cdnjs, unpkg, the Tailwind CDN, the jQuery CDN, and selected jsDelivr paths such as `/npm/`). `fetch` / XHR / WebSocket can reach only the page's own origin and the Google Fonts hosts. External images are blocked (embed them as data URIs); all other external scripts, stylesheets, and fonts are blocked. Connector calls go through claude.ai |
| No backend | Static page only; can't authenticate viewers |
| Downloads | The page can't start a download itself; Claude declares the downloads capability so viewers can save a generated file through a page control |
| Single page | Relative links don't resolve; use in-page anchors |
| Source file types | `.html`, `.htm`, or `.md` only; must decode as UTF-8, or UTF-16LE by its byte-order mark. A file that doesn't decode or contains `U+FFFD` is refused with the line and column to fix |
| Source location | A path that names a network host (network share) is refused without being read |
| Rendered size | Must be 16 MiB or smaller (large embedded images are the usual cause) |

| Sharing scope | Plans |
| --- | --- |
| Private to you (default) | All plans; on Pro, Max, and Ultra no admin management applies |
| Specific people or everyone in your organization; shared folder | Team, Enterprise |
| Public link | Team and Enterprise: off until an Owner enables External sharing for the organization |

| `/artifacts` key | Action |
| --- | --- |
| `Enter` | Open in browser if attached to the current session, otherwise attach |
| `o` | Open in browser |
| `c` | Copy link |
| `d` | Permanently delete an artifact you own after confirming (outside cloud sessions); the link stops working for everyone |

## Notes

- Not the Claude API's own feature — this is Claude Code's session-output publishing feature (a session artifact viewer on claude.ai), unrelated to the Claude API `computer_use`/tool-use surface.
- Claude Code asks first (or in auto mode the classifier reviews the publish) when: the session is in plan mode (first publish of each artifact); the publish declares runtime capabilities such as connector calls or file downloads; the artifact is shared publicly (once per conversation before changing it, and before each comment reply); the publish happens in a turn started by a session-scoped scheduled task; Claude can't read the file without approval (an allow rule for `Artifact` doesn't skip this); or, in Manual or `acceptEdits` mode, a small change to a file Claude can't edit without approval. Add a folder with `--add-dir` or `/add-dir` to let Claude read it without prompting. One-step updates (a small file change made as part of a publish) are turned off with `CLAUDE_CODE_ARTIFACT_PUBLISH_EDITS=0` (e.g. in the `env` block of `~/.claude/settings.json`; restart Claude Code).
- A `⧉` pill below the prompt shows the session's artifact name or count (click it in fullscreen rendering to open `/artifacts`). `/artifacts` lists artifacts you own and ones shared with you, current session first; it reads from your claude.ai account so it works after `/clear`. `CLAUDE_CODE_ARTIFACT_AUTO_OPEN=0` stops the browser auto-opening on publish. After a Remote Control prompt no tab opens on the host machine until Claude next publishes from a prompt typed at the terminal.
- Sharing: a new artifact is visible only to you; use **Share** in the page header (gallery at claude.ai/code/artifacts). Each publish becomes a version and you choose which version viewers see. Ask Claude for links to a specific tab or section (anchors such as `#overview`). On Team and Enterprise you can make someone an editor; if an editor publishes while Claude holds an older copy, Claude Code refuses a publish built on that copy and Claude merges onto the newer version.
- Reading others' artifacts: Claude reads a shared artifact like WebFetch (a summary, with instructions in the page reported rather than relayed) and saves the full source locally. It asks for approval for a cloud session without network access, another organization's public artifact (even in auto mode; readable only while feature-flag fetching is on), an unconfirmed owner or network setting, and in plan mode for an artifact someone else in your organization made.
- Comments (v2.1.221+): on an artifact shared within your organization, Claude can list threads and reply to or resolve only threads activated by an editor (**Send to Claude** or an `@claude` mention). Public-link-only viewers don't see or add comments. After a publish, Claude Code watches the artifact for comments sent to Claude (v2.1.228+; off when feature-flag fetching is off) and may auto-reply depending on permission mode (`Auto-replied to comment thread on Artifact: <name>` / `Comments are waiting on Artifact: <name>`; paused in plan mode). It stops auto-replying after 60 sent comments or thread activations on one artifact within an hour. Stop auto-replies with `Ctrl+C` once at an idle prompt (until your next message), by stopping the task in `/tasks` (System tasks row; Monitors for ones you started), or with `Ctrl+X Ctrl+K` twice within 3 seconds (rest of the session). A self-started watch can end after several hours without activity; publish again or ask Claude to watch it.
- MCP connector-backed pages (v2.1.209+) call each viewer's own connected claude.ai connectors at view time (not the publisher's; local MCP servers such as `.mcp.json` can supply data while building but can't be called by the published page). Claude declares which connectors the page may call; viewers approve access first. Viewers who haven't connected a connector, declined, or are outside the organization or not signed in to claude.ai on a public link see the page without live sections. On publish, Claude Code checks the declared connector tool names against the session's available tools, warns on mismatches, and refuses the publish when none match (v2.1.265+; before that it published unchecked). Ask Claude to add a fallback message naming the connector to each live section.
- Downloads: add a download control by prompt (e.g. `Add a button that downloads this table as a CSV file.`); ordinary download links, scripts, and `data:` / `blob:` URL links are blocked by the viewer.
- Design: Claude applies a built-in design skill and looks for your design system (e.g. in CLAUDE.md or a theme file) first; your design system outranks its choices, and your prompt outranks both. Google Fonts is the one external font source; other typefaces are inlined as `@font-face` data URIs. Generating an artifact costs more output tokens than terminal text; prefer SVG or HTML/CSS over raster images, omit unneeded interactivity, and summarize large datasets.
- Templates (beta, Claude Slides / Claude Design / Claude Docs): `/slides <brief>` and `/design <brief>` need v2.1.265+ and a session where artifacts are available; they are on by default on Pro, Max, Ultra, and Team, and an Enterprise Owner turns each on under Organization settings > Artifacts (`/slides` doesn't appear, and `/design` doesn't draft designs, if the template is off). Claude Docs arrives as the `claude.ai Claude Docs` connector listed in `/mcp`, not a command; a README or other in-repo document stays a file.
- Availability: needs the Anthropic API (not Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry), a claude.ai-backed session (API key, gateway token, or cloud-provider credential cannot publish; Claude Tag sessions need no sign-in step), and an organization without CMEK, HIPAA, or Zero Data Retention. Surfaces: Claude Code CLI, Claude desktop app 1.13576.0+, Claude Tag sessions, and `claude remote-control` sessions you started yourself (v2.1.281+). Off by default in the Agent SDK, the GitHub Action, MCP-server contexts, `-p` from your own terminal or scripts, and with `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`. The organization policy is loaded from `api.anthropic.com`; when it can't be loaded artifacts are unavailable (allow that host through a proxy, VPN, or filter).
- Disabling: `"enableArtifact": false` (the `/config` Artifacts row writes it to user settings), `CLAUDE_CODE_DISABLE_ARTIFACT=1`, or a `permissions.deny` entry for `Artifact`. `"disableArtifact": true` is deprecated but still turns artifacts off. Once off via `--settings`, `CLAUDE_CODE_DISABLE_ARTIFACT`, or managed settings, no settings file turns them back on. Project and local settings can turn artifacts off but not on (v2.1.242+). A `WebFetch(domain:claude.ai)` deny or ask rule applies to artifact reads; a `WebFetch` rule with no `domain:` doesn't.
- Org admin controls on Team and Enterprise live in claude.ai admin settings: Artifacts toggle (and a per-role Artifacts permission with RBAC on Enterprise), the separate **Enable artifact connectors** toggle (Organization settings > Capabilities), **External sharing** for public links (off by default), retention periods for private and shared artifacts (Data and privacy), and viewer-domain allowlisting (`*.claudeusercontent.com` plus `claude.ai`; optional `fonts.googleapis.com` and `fonts.gstatic.com`; CDN hosts `cdnjs.cloudflare.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, `code.jquery.com`, `unpkg.com`, with no fallback for a blocked library). On Enterprise the Compliance API Activity Feed shows publish, share, and delete activity. Compliance API endpoints: `GET /v1/compliance/apps/code/artifacts`, `GET /v1/compliance/apps/code/artifacts/{artifact_id}/versions/{version_id}`, `DELETE /v1/compliance/apps/code/artifacts/{artifact_id}` (API side is covered by the anthropic-admin-platform skill).
- Source: https://code.claude.com/docs/en/artifacts.md (fetched 2026-11-14). Corrected from the earlier summary: the Compliance endpoint path is `/v1/compliance/apps/code/artifacts` (not `/v1/compliance/code/artifacts`), and the `/artifacts` "v2.1.208+" note was dropped because the current source gives no version for it.

## Related

- [computer-use](./computer-use.md)
