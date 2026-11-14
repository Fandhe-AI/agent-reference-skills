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
- Address bar: typing searches the built-in browser's own history; with no match, entering a term searches Google. Results don't include your regular Chrome profile.
- **Settings > Browser** also lets you search/reopen/remove history entries (when your organization permits) and use **Clear browsing data** (time range and data types). ChatGPT may ask to search browsing history for a task; history can contain internal URLs and search terms, so allow it only when needed.
- **Enter full view** / **Enter split view** switch between a full tab and chat-plus-tab.
- Computer Use in the browser: in the desktop app, Computer Use lets ChatGPT Work or Codex operate the built-in browser directly (open pages, click, type, inspect rendered state, screenshots, verify). Browser is included and installs automatically.
- Annotate: select **Annotate**, click an element or drag an area, write and save a comment, then ask ChatGPT to address comments. **Adjust** gives style controls (font, text, spacing, color).
- Preview workflow: start the dev server, open the local route, review rendered state beside the diff, leave comments, ask for narrow fixes.

### Inspect a web app in Codex Cloud

When a Codex Cloud task has browser access, Codex can use a browser inside the cloud task to inspect your web app, reproduce a bug, or verify a fix. Give Codex the command to start the app in the task, the port, and the behavior to check (e.g. open the settings page, change and save a preference, reload to check it persists; ask for a screenshot). Install dependencies when preparing the Cloud environment; for external services check the environment's network settings or use local test data.

### Developer mode

Works with Computer Use in Chrome and the built-in browser; gives controlled access to the Chrome DevTools Protocol (CDP). Use `@Browser` for the built-in browser, or set up the Chrome extension and invoke `@Chrome`. ChatGPT asks for explicit approval before using full CDP to inspect a website.

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

- Browser is available in ChatGPT on the web and in the ChatGPT desktop app; not available in Codex CLI or the Codex IDE extension (use the desktop app).
- GPT-6 Astra improves visual judgment (e.g. checking a page against a screenshot); describe how to verify the finished result.
- Website permissions in Agent permissions can be removed to restore defaults; ChatGPT cannot automate file uploads in the built-in browser.
- The built-in browser uses a profile separate from your regular browser; use the browser extension for existing Chrome, Edge, Brave, Opera, or Vivaldi tabs and profiles.
- ChatGPT cannot automate file uploads in the built-in browser and asks confirmation before sensitive actions (submitting information, purchases, permission changes, deletion).
- Treat page content as untrusted; a site permission does not make its content trustworthy.
- Admins can restrict origins, uploads, downloads, and developer access via managed browser controls.
- Source: https://learn.chatgpt.com/docs/browser (retrieved 2026-11-14).

## Related

- [Computer Use](./computer-use.md)
- [Plugins](./plugins.md)
