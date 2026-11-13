---
source: https://opencode.ai/docs/build/plugins/gui/#system-and-environment
---

# System and environment

`ctx.system` works on every platform; `ctx.desktop` adds desktop-only abilities and is `undefined` on the web.

## Signature / Usage

`ctx.system` works on every platform. `ctx.desktop` adds desktop-only abilities and is `undefined` on the web.

```ts
const show = async (path: string) => {
  if (ctx.desktop && (await ctx.desktop.reveal(path))) return
  await ctx.system.copy(path)
}
```

- `system.save` shows a save dialog on desktop and downloads on the web. It returns `false` when the user cancels the
  dialog.
- `system.openExternal` opens a URL in the system browser. For links inside the app, use `ctx.links.open`, which routes
  a `Link` to its [link handler](./link-handler.md).
- `desktop.launch(path, app?)` opens a path with an app, or with the default app. `desktop.reveal(path)` shows it in the
  file manager.
- `ctx.embeds` renders a main-process web view in a window; see
  [Embedded web views](./embeds.md).
- `ctx.locale` reads the interface language and its writing direction. `ctx.appearance.font("mono")` is the CSS font
  family of the user's terminal font.
- `ctx.router` reads the current route path and whether a route transition is in progress.
- `ctx.workspaces.on("remove", handler)` runs when the user removes a workspace directory from a server, so you can
  clean up stores scoped to it.

`desktop.pick(options)` asks the user for files or folders with the system's open dialog, and resolves their absolute
paths:

```ts
const [folder] = (await ctx.desktop?.pick({ directory: true, title: ctx.t("pick.folder") })) ?? []

if (folder) await ctx.client.rpc(Acme).index({ directory: folder })
```

- `directory: true` picks folders instead of files, and `multiple: true` lets the user pick more than one.
- `extensions` limits the files offered, without the dot, such as `["json"]`. Folders ignore it.
- `title` is the dialog's title. Not every system shows it.
- The paths are empty when the user cancels. `pick` rejects when the dialog cannot open.
- `pick` is desktop only: a browser never tells the page where a picked file is.

`ctx.appearance.mode()` is the color scheme the interface shows, `"light"` or `"dark"`. It is reactive:

```ts
const background = () => (ctx.appearance.mode() === "dark" ? "#000" : "#fff")
```

- It follows the user's choice in **Settings > Appearance**, with **System** resolved to the system's current scheme.
- Before the app interface mounts, it is the system's scheme.

#### Reference

```ts
interface System {
  copy(text: string): Promise<void>
  save(file: { name: string; content: string }): Promise<boolean>
  openExternal(url: string): void
}

interface Desktop {
  os: "macos" | "windows" | "linux"
  zoom(): number
  launch(path: string, app?: string): Promise<void>
  reveal(path: string): Promise<boolean>
  installed(app: string): Promise<boolean>
  pick(options?: PickOptions): Promise<string[]>
}

interface PickOptions {
  directory?: boolean
  multiple?: boolean
  title?: string
  extensions?: string[]
}

interface Links {
  open(link: Link): boolean
  exists(link: Link): boolean | Promise<boolean>
}

interface Locale {
  locale(): string
  direction(): "ltr" | "rtl"
}

interface Appearance {
  font(kind: "mono"): string
  mode(): "light" | "dark"
}

interface Router {
  path(): string
  routing(): boolean
}

interface Workspaces {
  on(event: "remove", handler: (value: { server: string; directory: string }) => void): Cleanup
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| directory | boolean | — | `desktop.pick`: picks folders instead of files. |
| multiple | boolean | — | `desktop.pick`: lets the user pick more than one. |
| title | string | — | `desktop.pick`: the dialog's title; not every system shows it. |
| extensions | string[] | — | `desktop.pick`: limits the files offered, without the dot; folders ignore it. |

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- Pass only trusted URLs and paths to `openExternal`, `launch`, and `reveal`; do not forward strings taken from messages or other external input without validating them.

## Related

- [Link handlers](./link-handler.md)
- [Embedded web views](./embeds.md)
- [Theme](./theme.md)
