# Kbd

Represents keyboard input or a keyboard shortcut key.

## Import

```tsx
import { Kbd } from "@chakra-ui/react"
```

## Usage

```tsx
<Kbd>Shift + Tab</Kbd>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"raised" \| "outline" \| "subtle" \| "plain"` | `"raised"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Font size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `kbd` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

- `variant="raised"` — 3D raised appearance (default)
- `variant="outline"` — border only
- `variant="subtle"` — light background
- `variant="plain"` — no decoration

## Notes

- Renders as `<kbd>` element for semantic correctness
- Use multiple `Kbd` components for key combinations: `<Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>`
- Common modifier keys: `⌘`, `⌥`, `⇧`, `⌃`

## Related

- [Code](./code.md)
- [Text](./text.md)
