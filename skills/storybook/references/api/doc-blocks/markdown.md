# Markdown

A doc block that imports and displays plain markdown content within MDX files.

## Import

```ts
import { Markdown } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `string` | The markdown-formatted string to parse and display |
| `options` | `object` | Configuration options passed to the underlying `markdown-to-jsx` library |

## Usage

```tsx
import ReadMe from './README.md?raw';
import { Markdown } from '@storybook/addon-docs/blocks';

# A header

<Markdown>{ReadMe}</Markdown>
```

## Notes

- Always use the `?raw` suffix when importing `.md` files to prevent MDX2 from evaluating them as JSX
- MDX2 has stricter syntax rules than plain markdown; curly braces and angle brackets can cause parse errors when not wrapped
- Direct markdown string content in MDX gets wrapped in `<p>` tags automatically; the `Markdown` block avoids this issue

## Related

- [unstyled.md](./unstyled.md)
