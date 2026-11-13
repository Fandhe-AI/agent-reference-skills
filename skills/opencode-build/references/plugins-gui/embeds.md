---
source: https://opencode.ai/docs/build/plugins/gui/#embedded-web-views
---

# Embedded web views

To embed an isolated `WebContentsView` in a panel, create it in `main` and render its box from the window.

## Signature / Usage

To embed an isolated `WebContentsView` in a panel, create it in `main` and render its box from the window.

Adapted (not in the official docs): the official example never closes the page and drops the `windows.on` cleanup; each page now closes when its window closes or the plugin goes away, and `ctx.onCleanup` removes the `"open"` handler.

```ts title="src/gui/main.ts"
import { type BrowserWindow, WebContentsView } from "electron"
import type { Plugin } from "@opencode/plugin/gui"

export const main: Plugin.MainSetup = (ctx) => {
  const attach = (window: BrowserWindow) => {
    const view = new WebContentsView()
    const embed = ctx.embeds.create(view, window)
    const close = () => {
      if (!view.webContents.isDestroyed()) view.webContents.close()
    }
    window.once("closed", close)
    ctx.onCleanup(close)
    void view.webContents.loadURL("https://acme.example")
    embed.show(true)
    // Send embed.id to the window over your Ipc.
  }
  ctx.windows.list().forEach(attach)
  ctx.onCleanup(ctx.windows.on("open", attach))
}
```

```tsx title="src/gui/pane.tsx"
<ctx.embeds.View id={embedId} visible radius={8} />
```

- `"open"` fires only for windows that open later, so attach to `ctx.windows.list()` first.
- A window passes the embed's `id` to `ctx.embeds.View` and `ctx.embeds.capture`.
- `show(visible)` is the page's side of visibility: the view shows only while the window lays it out and `show(true)`
  holds.
- `on("visible", handler)` runs when the view goes on or off screen, including when the window paints a still in its
  place.
- `capture()` returns a still of the page, or `undefined` while it is hidden.
- `dispose()` removes the view from the window, but does not close its page; call `view.webContents.close()` when
  you are done with it. The host also disposes the embed when the plugin goes away.
- In the window, `View` fills its box with the embed. The host keeps the view's bounds, zoom, rounded corners, and
  dialog occlusion in step, and hides it while the window is hidden or a dialog is open.
- `frozen` paints a still in place of the live view, so DOM content can float above it. `radius` rounds the bottom
  corners, and `background` is the color the corners show.
- `page` is what the embed shows, such as its URL. While a panel moves, the host paints a still of the embed in its
  place, and drops a still taken while `page` had another value.
- The window's `capture(id)` returns a JPEG still, or `undefined` while the embed is hidden and always on the web.

#### Reference

```ts
interface MainEmbeds {
  create(view: WebContentsView, window: BrowserWindow): Embed
}

interface Embed {
  id: string
  show(visible: boolean): void
  on(event: "visible", handler: (visible: boolean) => void): Cleanup
  capture(): Promise<NativeImage | undefined>
  dispose(): void
}

interface Embeds {
  View(props: EmbedProps): JSX.Element
  capture(id: string): Promise<Uint8Array | undefined>
}

interface EmbedProps {
  id: string | undefined
  visible: boolean
  frozen?: boolean
  page?: string
  radius?: number
  background?: string
  class?: string
  children?: JSX.Element
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string \| undefined | — | The embed's `id`. |
| visible | boolean | — | — |
| frozen | boolean | — | Paints a still in place of the live view, so DOM content can float above it. |
| page | string | — | What the embed shows, such as its URL. |
| radius | number | — | Rounds the bottom corners. |
| background | string | — | The color the rounded corners show. |

## Notes

- Adapted from the official docs: the `main` example closes each embedded page on the window's `closed` event and in `ctx.onCleanup`, and removes the `windows.on("open")` handler, because `dispose()` does not close the page.
- Load only content you trust in an embedded `WebContentsView`, and do not expose Node.js or Electron APIs to it.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Main context](./main-context.md)
- [Define and provide an Ipc](./ipc.md)
