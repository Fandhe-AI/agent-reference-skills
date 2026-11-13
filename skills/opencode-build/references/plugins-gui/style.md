---
source: https://opencode.ai/docs/build/plugins/gui/#styles
---

# Style

`Style` injects a CSS string into the document while the contribution is active.

## Signature / Usage

```ts
import { Style } from "@opencode/plugin/gui"
import css from "./panel.css?inline"

ctx.add(Style, css)
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Theme](./theme.md)
- [Registries](./registries.md)
