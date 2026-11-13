---
source: https://opencode.ai/docs/build/plugins/gui/#where-gui-entries-load
---

# Where GUI entries load and reload

How OpenCode Desktop loads GUI entries, and how rebuilds, updates, and options changes reload them.

## Signature / Usage

### Where GUI entries load

OpenCode Desktop loads GUI entries from its own background server, which already loads the plugins from your config, so
they never add a new source of code. Configure the plugin in the global `opencode.json(c)` to make its GUI available in
every window.

The desktop app's main process lists the plugins and reads their bundles from its own server, with a credential that
only it holds, and sends windows the same set. A window cannot supply main-process code.

A plugin whose server part fails to load has no GUI.

### Reload and updates

Load the plugin from its local directory and rebuild on every change:

```bash
vite build --watch
```

- A local directory whose `package.json` has a `name` and `exports` resolves `./gui-experimental` through them. Without
  them, it loads `gui-experimental.cjs` (or `.js`) at its root. The entry must be `.cjs` or `.js`; any other file is
  ignored.
- Each rebuild reloads the plugin's GUI in every window and in the main process. The server entry does not restart.
- An installed package's GUI changes only with its version.
- Changing the plugin's `options` in `opencode.json(c)` reloads the plugin.
- `opencode plugin update` replaces a package's GUI once the update finishes.
- [**Settings > Extensions > Plugins**](https://opencode.ai/docs/plugins/#desktop) lists the plugin with a switch that turns its GUI off. To
  remove it, remove it from `opencode.json(c)` or run `opencode plugin remove <package>`.

## Notes

- The TUI reads its plugins from `cli.json`, but the desktop app reads only `opencode.json(c)`. A package that shipped only a TUI part, and that users list in `cli.json`, must also be listed in `opencode.json(c)` once it adds `./gui-experimental`.
- The app's own plugins reserve their ids. If your plugin's id is one of them, nests under one with a `.`, has one nested under it, or is in the `opencode` namespace, its GUI does not load, and **Settings > Extensions > Plugins** lists it as not loaded.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Package](./package.md)
- [Build the bundle](./build-bundle.md)
