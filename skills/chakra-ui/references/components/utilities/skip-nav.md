# SkipNav

Provides an accessible keyboard-only link that allows users to skip repetitive navigation and jump directly to the main content.

## Import

```tsx
import { SkipNavLink, SkipNavContent } from "@chakra-ui/react"
```

## Usage

```tsx
<Box>
  <SkipNavLink>Skip to Content</SkipNavLink>

  {/* Navigation area */}
  <nav>...</nav>

  {/* Main content target */}
  <SkipNavContent>
    <main>Main content here</main>
  </SkipNavContent>
</Box>
```

## Props

### SkipNavLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `"chakra-skip-nav"` | ID linking `SkipNavLink` to `SkipNavContent` |

### SkipNavContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `"chakra-skip-nav"` | ID that matches the corresponding `SkipNavLink` |

## Notes

- `SkipNavLink` is visually hidden until focused via keyboard (Tab key), then becomes visible
- Place `SkipNavLink` as early as possible in the DOM, before the main navigation
- Use matching custom `id` props on both components when you have multiple skip links on a page
- Implements WCAG 2.1 success criterion 2.4.1 (Bypass Blocks)

## Related

- [VisuallyHidden](./visually-hidden.md)
