---
source: https://opencode.ai/docs/build/plugins/gui/#link-handlers
---

# LinkHandler

`LinkHandler` opens local file or custom links that users click in messages or composer chips.

## Signature / Usage

`LinkHandler` opens local file or custom links that users click in messages or composer chips. The handler with the
highest `priority` whose `match` returns true opens the link.

```ts
import { LinkHandler } from "@opencode/plugin/gui"

ctx.add(LinkHandler, {
  priority: 10,
  match: (link) => link.href.endsWith(".acme"),
  open: (link) => openAcmeFile(link.href, link.session),
  exists: (link) => acmeFileExists(link.href),
})
```

- `href` is the target: a path, a URL, or a `file://` link.
- `origin` is the plugin that produced the linked item.
- `exact` means the path is a known workspace file, not a guess from text.
- A `background` link must not switch the narrow-screen view.
- `base` is the workspace-relative directory the link was written in.
- Without `exists`, `ctx.links.exists` answers `false`, so text never looks like a link the handler cannot open.

#### Reference

```ts
interface LinkHandler {
  priority?: number
  match(link: Link): boolean
  open(link: Link): void
  exists?(link: Link): boolean | Promise<boolean>
}

interface Link {
  href: string
  origin?: string
  exact?: boolean
  background?: boolean
  base?: string
  session?: SessionRef
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- `link.href` is text from a message and is untrusted; validate its scheme and path before opening it.

## Related

- [System and environment](./system-environment.md)
- [Code blocks](./code-block.md)
