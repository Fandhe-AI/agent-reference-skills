# Plugins

Plugins bundle capabilities (skills, MCP servers, browser extensions, hooks) into reusable workflows in ChatGPT and Codex. Both products share one universal plugin directory.

## Signature / Usage

```text
codex
/plugins
```

- ChatGPT desktop app / web: open the **Plugins** tab, search or browse, open details, select the plus button to install, connect the MCP server if prompted, then start a new chat and ask ChatGPT or Codex to use the plugin.
- Codex CLI: `/plugins` opens the plugin browser. Install from a configured marketplace, then start a new session before using bundled skills or tools. Press Space on an installed plugin to turn it on or off.
- Type `@` to invoke a plugin or one of its bundled skills explicitly.

### Directory tabs

- **OpenAI**: plugins built by OpenAI.
- **Your workspace name**: plugins provided by your workspace.
- **Personal**: personal marketplace plugins (**Created by me** / **Shared with me**).
- A separate **Installed** row lists installed plugins.

## Options / Props

### Plugin parts

| Part | Description |
|------|-------------|
| Skills | Reusable instructions for specific kinds of work; loaded when needed. |
| MCP servers | Services that connect ChatGPT and Codex to tools and information in systems such as GitHub, Slack, or Google Drive. Define tools, enforce authentication, return structured data, perform actions; may include custom UI. |
| Browser extensions | Browser capabilities a plugin needs for its workflow. |
| Hooks | Commands that run at configured lifecycle points in the Codex runtime. Not supported in cloud-orchestrated ChatGPT Work; hook scripts must exist in the execution environment (enterprise admins can deploy via MDM). |

## Notes

- Availability: Chat and Work across ChatGPT on web, desktop, and mobile; Codex in the ChatGPT desktop app; Codex CLI has a plugin browser. The IDE extension does not support plugins. Plugins marked **Desktop only** require the desktop app.
- Bundled skills become available when a new chat or CLI session starts after installation.
- Sign in with ChatGPT is in beta for supported plugins and partner sites (Airtable, GitLab, HubSpot, Notion, Supabase, Vercel). It shares only name, email address, and profile picture with the partner; permissions are approved separately.
- Signed in to Codex with an OpenAI API key: you can browse, install, and manage supported OpenAI-curated plugins in Codex CLI and the desktop app; some plugins are unavailable because their connection flows need unsupported OAuth capabilities.
- When a plugin runs through a Codex host, the host's sandbox and approval policy applies.
- Uninstalling removes the plugin bundle from that environment; separately connected MCP integrations stay connected in ChatGPT until disconnected. Workspace-installed or default plugins may not offer uninstall.
- Apple Messages plugin: macOS desktop app only (Apple Silicon build in this release); sends only after approval of message and recipients; not available in web, mobile, Codex CLI, or the IDE extension.
- Workspace admins can import and sync a GitHub marketplace for their team.
- Building and distributing plugins is covered at developers.openai.com/plugins (outside this skill's scope); this page is the Codex / ChatGPT consumer side.
- Source: https://learn.chatgpt.com/docs/plugins (retrieved 2026-10).

## Related

- [Record & Replay](./record-and-replay.md)
- [Build skills](./build-skills.md)
