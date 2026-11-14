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
2. Open **Settings > Computer use**. Under **Control**, find **Any App**. If the row shows **Install**, select it and follow the prompts; if the switch is off, turn it on. If your app shows a **Computer Use** plugin page instead, follow the setup prompts on that page.
3. Start a Computer Use task. ChatGPT asks for permission before it uses an app; apps you approve for future tasks appear under **Always-allowed apps** in the same settings. If you don't see **Any App**, separate browser or per-app controls don't grant access to other desktop apps; in a managed workspace ask your administrator.
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
- On macOS, a scoped task can run in the background while you keep working elsewhere. Good fits: testing a desktop app or iOS simulator flow, tasks that need your web browser, reproducing GUI-only bugs, changing app settings, reading data not available via a plugin, multi-app workflows.
- `Always allow` entries can be removed in the **Computer Use** section of the app settings. Admins can restrict which apps Computer Use may access and whether approvals can be saved (managed browser and Computer Use controls).
- If macOS can't see or control an app, check **System Settings > Privacy & Security** > **Screen Recording** and **Accessibility** for **Codex Computer Use**.
- If ChatGPT uses your browser it can act in pages where you're signed in; to keep using your browser meanwhile, ask it to use a different browser. Screenshots taken by Computer Use fall under your ChatGPT data controls.
- Source: https://learn.chatgpt.com/docs/computer-use (retrieved 2026-11-14).

## Related

- [Browser](./browser.md)
- [Record & Replay](./record-and-replay.md)
