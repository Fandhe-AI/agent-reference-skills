---
source: https://opencode.ai/docs/build/plugins/
---

# Plugin development commands

Commands for setting up, building, packing, publishing, and updating OpenCode plugins (server / TUI / GUI / Effect).

## Signature / Usage

### Install Effect plugin dev dependencies

Source: https://opencode.ai/docs/build/plugins/effect/

```sh
bun add --peer @opencode/plugin effect@4.0.1
```

### Build the GUI bundle

Source: https://opencode.ai/docs/build/plugins/gui/ (Vite preset `gui()` from `@opencode/plugin/gui/vite` in `vite.config.ts`)

```bash
vite build
```

Rebuild on every change while loading the plugin from its local directory:

```bash
vite build --watch
```

### Add GUI build dependencies

```bash
bun add -d vite vite-plugin-solid solid-js
```

For the Electron and Node types in `main`:

```bash
bun add -d electron @types/node
```

### Pack and install a local tarball (Effect plugin)

Test the installed package rather than only a workspace-linked copy.

```sh
bun pm pack
bun add ./opencode-acme-effect-plugin-1.0.0.tgz
```

### Publish to npm

Source: https://opencode.ai/docs/build/plugins/

```bash
npm publish
```

### Update or remove an installed plugin

Source: https://opencode.ai/docs/build/plugins/gui/ (`opencode plugin update` replaces a package's GUI once the update finishes; `<package>` is a placeholder for the package name)

```bash
opencode plugin update
opencode plugin remove <package>
```

## Notes

- `npm publish` publishes to the public registry and is not reversible in practice; check `package.json` `name`, `version`, and `files` first, and build the GUI bundle before publishing.
- Do not bundle `effect` into the published artifact; mark `effect` and `effect/*` external if a bundler is used.
- The docs only show `opencode plugin update` and `opencode plugin remove <package>` in the build section; `opencode plugin add` and `list` are documented in the Configure plugins page, not here.
- OpenCode plugins, commands, and plugin hooks are distinct from Claude Code (anthropic-claude-code-extend / anthropic-claude-code-admin) equivalents.

## Related

- [Install client and SDK packages](./install.md)
- https://opencode.ai/docs/build/plugins/gui/
- https://opencode.ai/docs/build/plugins/effect/
- https://opencode.ai/docs/plugins/
