# Computer Use

With Computer Use, ChatGPT can see and operate graphical user interfaces on macOS or Windows (ChatGPT desktop app, with ChatGPT Work and Codex, in supported regions).

## Signature / Usage

```text
Open the app with Computer Use, reproduce the onboarding bug, and fix the
smallest code path that causes it. After each change, run the same UI flow
again.
```

Mention `@Computer` or `@AppName` (for example `@Chrome`), or ask ChatGPT to use Computer Use.

### Setup

1. In the desktop app, select ChatGPT and switch to Work, or select Codex.
2. Open **Plugins > Computer Use**, select **Install plugin** (or **Enable**), turn on the Computer Use server and skill toggles, then **Try now**.
3. Review app access in **Settings > Computer use** (**Always-allowed apps**; connected browser controls have **Manage**).
4. macOS: grant **Screen Recording** (see the app) and **Accessibility** (click, type, navigate). Windows: keep the target app visible on the active desktop.

### Windows app policy

```toml
[computer_use.windows]
always_allowed_app_ids = ["mspaint.exe"]
```

Stored in `$CODEX_HOME/config.toml`; use the app identifier Windows Computer Use reports (executable name, or app user model ID for packaged apps). Older `$CODEX_HOME/computer-use/config.toml` allow-list entries are migrated; its `denied` list is not part of the current schema. Admins disable with `[features].computer_use = false` in `requirements.toml`.

### Locked use (macOS only)

Enable in **Settings > Computer Use**. Installs an Apple authorization plug-in so ChatGPT can use Computer Use after the Mac locks, only during active trusted Computer Use turns. Safeguards: short-lived scoped authorization, all displays covered while unlocked, relock and pause on local keyboard or pointer input.

## Notes

- Windows runs in the foreground on the active desktop and cannot work in the background; use remote control from a phone or a Windows VM for tasks that continue while you step away.
- System permissions are separate from per-app approvals; file reads, edits, and shell commands still follow sandbox and approval settings.
- If an app has a dedicated plugin or MCP server, prefer that structured integration; for local web apps being built, use the built-in browser first.
- It cannot automate terminal apps or ChatGPT itself, cannot authenticate as administrator, and cannot approve security and privacy permission prompts.
- Changes made through desktop apps may not appear in the review pane until saved to disk and tracked by the project.
- For visual-judgment tasks the source recommends GPT-6 Astra when available in the model selector.
- Source: https://learn.chatgpt.com/docs/computer-use (retrieved 2026-10).

## Related

- [Browser](./browser.md)
- [Record & Replay](./record-and-replay.md)
