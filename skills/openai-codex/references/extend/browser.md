# Browser

Browser lets ChatGPT open websites, gather current information, and act while you stay in control. In the ChatGPT desktop app it is a built-in browser shared between you and ChatGPT; on web, ChatGPT Work uses a cloud browser.

## Signature / Usage

```text
Use the browser to open http://localhost:3000/settings, reproduce the layout
bug, and fix only the overflowing controls.
```

Reference the built-in browser with `@Browser`; use `@Chrome` for the Chrome extension.

### Desktop built-in browser

- Open with **New tab** then a URL, or press Cmd+T (Ctrl+T on Windows and Linux).
- Cmd+Shift+B (Ctrl+Shift+B) toggles tabs / returns from full view to split view.
- **Settings > Browser**: manage browser data, history, download location, **Ask where to save downloads**, **Agent permissions** (defaults for browsing, downloads, uploads; per-site exceptions).
- Annotate: select **Annotate**, click an element or drag an area, write and save a comment, then ask ChatGPT to address comments. **Adjust** gives style controls (font, text, spacing, color).
- Preview workflow: start the dev server, open the local route, review rendered state beside the diff, leave comments, ask for narrow fixes.

### Developer mode

```text
This app is slow. Use @Browser to capture a performance trace and inspect
network traffic, then identify the bottleneck.
```

Enable in **Settings > Browser > Developer mode > Enable full CDP access**. Admins disable with:

```toml
[features]
browser_use_full_cdp_access = false
```

### ChatGPT Work cloud browser (web / mobile)

- Runs on a separate cloud computer with its own cookies and sessions; ChatGPT decides when to use it.
- **Cloud browser** settings: **Always ask**, **Auto approve**, **Always allow** (not recommended); per-site allow/block.
- Sign in through the secure sign-in form (credentials not visible to the model) or **Sign in on web page instead**; clear data at **Settings > Cloud browser > Browser data > Clear all**.
- Website sign-in is on Plus and Pro plans (web and mobile); not for Enterprise or Edu workspaces. Enterprise admins must enable cloud browsing; paid plans other than Free and Go in all regions.

## Notes

- Not available in Codex CLI or the Codex IDE extension; use the ChatGPT desktop app.
- The built-in browser uses a profile separate from your regular browser; use the browser extension for existing Chrome, Edge, Brave, Opera, or Vivaldi tabs and profiles.
- ChatGPT cannot automate file uploads in the built-in browser and asks confirmation before sensitive actions (submitting information, purchases, permission changes, deletion).
- Treat page content as untrusted; a site permission does not make its content trustworthy.
- Admins can restrict origins, uploads, downloads, and developer access via managed browser controls.
- Source: https://learn.chatgpt.com/docs/browser (retrieved 2026-10).

## Related

- [Computer Use](./computer-use.md)
- [Plugins](./plugins.md)
