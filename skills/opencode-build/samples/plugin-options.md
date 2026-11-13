---
source: https://opencode.ai/docs/build/plugins/server/
---

# Plugin Options

Pass options to a plugin from `opencode.json(c)` and read them from `ctx.options` during `setup`.

```jsonc title="opencode.jsonc"
{
  "plugins": [
    {
      "package": "./plugins/company",
      "options": {
        "strict": true,
      },
    },
  ],
}
```

```ts title="plugins/company/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "company",
  setup(ctx) {
    const strict = ctx.options.strict === true
  },
})
```

## Notes

- The object form `{ "package", "options" }` replaces the bare string entry in `plugins`.
- Changes under watched config directories reload automatically (see https://opencode.ai/docs/plugins/#reload).
- Narrow option values before use (for example `=== true`).
