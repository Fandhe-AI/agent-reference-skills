# CSS-in-JS

Using CSS-in-JS libraries in Client Components under the App Router requires a three-step opt-in: a style registry, `useServerInsertedHTML`, and a wrapping Client Component.

## Signature / Usage

```tsx filename="lib/registry.tsx"
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement()
    sheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `compiler.styledComponents` (`next.config.js`) | `boolean` | Enables `styled-components` compiler support |
| `useServerInsertedHTML(callback)` | hook (`next/navigation`) | Injects collected styles into `<head>` before hydration content that uses them |

## Notes

- Supported in Client Components: ant-design, chakra-ui, @fluentui/react-components, kuma-ui, @mui/material, @mui/joy, pandacss, styled-jsx, styled-components, stylex, tamagui, tss-react, vanilla-extract. Emotion support is in progress.
- `styled-jsx` in Client Components requires v5.1.0+ and its own `StyleRegistry`/`createStyleRegistry()` pattern.
- The style registry is intentionally a Client Component at the top of the tree — this avoids regenerating styles on every server render and keeps them out of the Server Component payload.
- During streaming, styles from each chunk are collected and appended; after hydration, the library takes over normally for further dynamic styles.

## Related

- [Tailwind CSS v3](./tailwind-v3-css.md)
- [Sass](./sass.md)
