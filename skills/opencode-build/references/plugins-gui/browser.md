---
source: https://opencode.ai/docs/build/plugins/gui/#browser
---

# Browser

`@opencode/plugin/gui/browser` exports `Browser`, the desktop browser pane of a session.

## Signature / Usage

```ts
import { Browser } from "@opencode/plugin/gui/browser"

const session = ctx.sessions.current()
const live = ctx.use(Browser)()
const url = "http://localhost:3000"

if (session && live.status === "active" && live.value.canOpen(session, url)) live.value.open(session, url)
```

- `attached(session)` is `true` when the session has a browser pane.
- `canOpen(session, path?)` is `true` when a workspace file or an http(s) URL can open in the pane.
- `open(session, url)` opens a URL as a browser tab in the session's side panel.
- `openFile(session, path)` opens a workspace file as a `file://` tab.

#### Reference

```ts
interface Browser {
  attached(session: SessionRef): boolean
  canOpen(session: SessionRef, path?: string): boolean
  open(session: SessionRef, url: string): void
  openFile(session: SessionRef, path: string): void
}
```

## Notes

- `Browser` is an app contract and is `inactive` on the web.
- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- URLs can originate from model output; validate the scheme and host before opening them.

## Related

- [App contracts: Files](./app-contract-files.md)
- [Live dependencies and failure handling](./live-dependencies.md)
