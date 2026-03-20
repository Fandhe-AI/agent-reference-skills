# Prose

A composition component that applies consistent typographic styling to raw HTML content (e.g., from a CMS or markdown renderer). Available as a snippet component.

## Import

```tsx
// After running: npx @chakra-ui/cli snippet add prose
import { Prose } from "@/components/ui/prose"
```

## Usage

```tsx
<Prose dangerouslySetInnerHTML={{ __html: htmlContent }} />
```

With React Markdown:

```tsx
import Markdown from "react-markdown"

<Prose>
  <Markdown>{markdownString}</Markdown>
</Prose>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"md" \| "lg"` | `"md"` | Font size scale |

Accepts all Chakra style props.

## Notes

- Not exported from `@chakra-ui/react` directly — requires the CLI snippet
- Styles `h1`–`h4`, `p`, `a`, `blockquote`, `code`, `pre`, `ul`, `ol`, `li`, `table`, `figure`, `img`, `kbd`
- Use `.not-prose` class on child elements to opt out of prose styling
- Works with `react-markdown`, `@mdx-js/react`, or raw HTML
- Sizes: `md` (14px base), `lg` (16px base)

## Related

- [Text](./text.md)
- [Heading](./heading.md)
- [Blockquote](./blockquote.md)
- [List](./list.md)
- [Code](./code.md)
