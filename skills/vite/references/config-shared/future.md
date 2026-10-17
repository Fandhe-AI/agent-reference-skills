---
source: https://vite.dev/config/shared-options#future
---

# future

Opt in to future breaking changes to prepare for the next major version of Vite.

## Signature / Usage

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  future: {
    // Record<string, 'warn' | undefined>; keys are listed on the Breaking Changes page
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `future` | `Record<string, 'warn' \| undefined>` | Flags enabling future breaking changes. |

## Notes

- The list may be updated, added, or removed at any time as new features are developed.
- See the Breaking Changes page for the possible options.

## Related

- Breaking changes
