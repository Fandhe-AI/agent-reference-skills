# Cascade Layers

Chakra UI implements CSS cascade layers to provide predictable style override behavior and prevent specificity conflicts.

## Overview

Chakra defines four layers matching Panda CSS conventions:

| Layer | Purpose |
|-------|---------|
| `@layer reset` | Preflight / CSS resets |
| `@layer base` | Global styles from `globalCss` config |
| `@layer tokens` | Design tokens and semantic tokens |
| `@layer recipes` | Component recipe styles |

Styles in later layers override earlier ones based on layer priority rather than selector specificity.

## Usage

```tsx
// Layers are enabled by default — no configuration required.
// To disable layers:
import { createSystem, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  disableLayers: true,
})
export default createSystem(config)
```

## Notes

- Cascade layers were introduced in v3.x to improve reconciliation times
- The layer order allows smoother co-existence with Panda CSS in the same project
- Setting `disableLayers: true` opts out entirely

## Related

- [Overview](./overview.md)
- [Chakra Factory](./chakra-factory.md)
