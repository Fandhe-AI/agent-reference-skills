# Highlight

Emphasizes specific words or phrases within a larger body of text by wrapping matches in `<mark>` tags.

## Signature / Usage

```tsx
import { Highlight } from '@ark-ui/react/highlight'

export const Basic = () => (
  <Highlight text="The quick brown fox jumps over the lazy dog" query="fox" />
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Full text content to process |
| `query` | `string \| string[]` | — | Term(s) to highlight |
| `exactMatch` | `boolean` | `false` | Match whole words only |
| `ignoreCase` | `boolean` | `false` | Case-insensitive matching |
| `matchAll` | `boolean` | `false` | Highlight every occurrence, not just the first |

## Notes

- Pass a `className` (`class` in Solid/Svelte/Vue) to style highlighted portions via the `mark` part.
- Supply an array of strings to `query` to highlight multiple terms at once.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Marquee](../components/display/marquee.md)
