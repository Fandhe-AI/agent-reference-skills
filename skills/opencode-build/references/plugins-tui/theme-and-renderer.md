---
source: https://opencode.ai/docs/build/plugins/cli/#theme-and-renderer
---

# Theme and renderer

Use semantic theme tokens with OpenTUI elements and pass `context.renderer` to renderer-specific helpers.

## Signature / Usage

Use semantic theme tokens with OpenTUI elements and pass `context.renderer` to renderer-specific helpers.

```tsx
const Status = () => <text fg={context.theme.text.base}>Ready</text>
const renderer = context.renderer
```

An OpenTUI resource that the renderer draws needs `context.renderer.nativeScene` as its owner. For example, `<markdown>`
and `<code>` need a `SyntaxStyle`. Destroy the resource when the renderer is idle, after the last frame that draws it.

```tsx
import { SyntaxStyle } from "@opentui/core"

const style = SyntaxStyle.fromStyles({ default: { fg: context.theme.text.base } }, context.renderer.nativeScene)
context.ui.slot({ append: "home.footer", render: () => <markdown content="Ready" syntaxStyle={style} /> })
return () => context.renderer.idle().then(() => style.destroy())
```

To read the layout style of a renderable, call the method with the Yoga Node getter's name, such as
`box.getPadding(Yoga.Edge.Bottom)` or `box.getMaxWidth()`. Host renderables are not part of the plugin API. Their
structure and styles can change in any release.

### Plugins built for OpenTUI 0.5

OpenCode runs plugins with its own OpenTUI. Since OpenTUI 0.6:

- `SyntaxStyle.create()`, `SyntaxStyle.fromStyles()`, `SyntaxStyle.fromTheme()`, `TextBuffer.create()`, and
  `EditBuffer.create()` take an owner as their last argument. `OptimizedBuffer.create()` takes it in the `owner` option.
  Pass `context.renderer.nativeScene`. OpenTUI 0.5 ignores the extra argument, so the plugin still runs on older
  OpenCode releases.
- `generateSyntax()` from `@opencode/theme/tui` takes the owner as its second argument:
  `generateSyntax(context.theme, context.renderer.nativeScene)`. Older `@opencode/theme` versions build the style
  without an owner, so update the package too.
- `getLayoutNode()` is removed. Replace `getLayoutNode().getMaxWidth()` and the other style getters with the
  renderable method of the same name, on OpenTUI 0.6.5 or later. Replace `getComputedLayout()` and the other computed
  position and size getters with `getLayout()`, and `markDirty()` with `invalidateIntrinsicSize()`. Computed padding,
  margin, and border have no replacement, and `getPadding(edge)` reads only the padding set for that edge. To restore a
  style that a getter reports as unset (`Unit.Undefined`), assign `undefined` to the property, on OpenTUI 0.6.6 or
  later.

The [OpenTUI 0.6.0 release notes](https://opentui.com/docs/releases/0.6.0) list every change.

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- Host renderables are not part of the plugin API; their structure and styles can change in any release.

## Related

- [solid-components.md](./solid-components.md)
- [slots.md](./slots.md)
- [markdown.md](./markdown.md)
