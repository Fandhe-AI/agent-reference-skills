# CodeBlock

A syntax-highlighted code block component. Requires a syntax highlighting adapter (Shiki or Highlight.js). Composed of `CodeBlock.Root`, `CodeBlock.Header`, `CodeBlock.Content`, `CodeBlock.Code`, `CodeBlock.CodeText`, `CodeBlock.CopyTrigger`, etc.

## Import

```tsx
import { CodeBlock, createShikiAdapter } from "@chakra-ui/react"
```

## Usage

```tsx
"use client"
import type { HighlighterGeneric } from "shiki"

const shikiAdapter = createShikiAdapter<HighlighterGeneric<any, any>>({
  async load() {
    const { createHighlighter } = await import("shiki")
    return createHighlighter({
      langs: ["tsx", "html", "bash", "json"],
      themes: ["github-dark"],
    })
  },
  theme: "github-dark",
})

export function MyCodeBlock() {
  return (
    <CodeBlock.AdapterProvider value={shikiAdapter}>
      <CodeBlock.Root code={`console.log("hello")`} language="tsx">
        <CodeBlock.Content>
          <CodeBlock.Code>
            <CodeBlock.CodeText />
          </CodeBlock.Code>
        </CodeBlock.Content>
      </CodeBlock.Root>
    </CodeBlock.AdapterProvider>
  )
}
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | The code string to display |
| `language` | `string` | — | Programming language for syntax highlighting |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Font size |
| `maxLines` | `number` | — | Collapse code after this many lines |
| `defaultColorScheme` | `"dark" \| "light"` | `"dark"` | Fallback color scheme |
| `copyTimeout` | `number` | `1000` | Copy button reset delay (ms) |
| `onCopy` | `() => void` | — | Called when code is copied |
| `meta` | `CodeBlockHighlightMeta` | — | Highlight metadata (line numbers, highlights, diffs) |

### meta options

| Option | Type | Description |
|--------|------|-------------|
| `showLineNumbers` | `boolean` | Show line numbers |
| `highlightLines` | `number[]` | Lines to highlight |
| `focusedLineNumbers` | `number[]` | Lines to focus (dims others) |
| `addedLineNumbers` | `number[]` | Lines marked as added (diff) |
| `removedLineNumbers` | `number[]` | Lines marked as removed (diff) |
| `wordWrap` | `boolean` | Enable word wrapping |
| `colorScheme` | `"dark" \| "light"` | Override color scheme |

## Notes

- Requires `"use client"` directive (the adapter uses dynamic imports)
- `CodeBlock.AdapterProvider` should be placed as high as needed to share the adapter
- Use `createHighlightJsAdapter` for Highlight.js instead of Shiki
- `CodeBlock.CopyTrigger` + `CodeBlock.CopyIndicator` for copy button
- `CodeBlock.CollapseTrigger` + `CodeBlock.Overlay` for max-lines collapsing

## Related

- [Code](./code.md)
