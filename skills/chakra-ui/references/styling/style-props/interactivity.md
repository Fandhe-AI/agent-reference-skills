# Interactivity Style Props

JSX style props for enhancing user interaction on elements.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `accentColor` | `accent-color` | `colors` |
| `appearance` | `appearance` | — |
| `caretColor` | `caret-color` | `colors` |
| `cursor` | `cursor` | — |
| `pointerEvents` | `pointer-events` | — |
| `resize` | `resize` | — |
| `scrollbar` | `scrollbar` | — |
| `scrollBehavior` | `scroll-behavior` | — |
| `userSelect` | `user-select` | — |
| `touchAction` | `touch-action` | — |

## Examples

```tsx
// Accent color for form controls
<chakra.input type="checkbox" accentColor="blue.500" />

// Remove default appearance
<chakra.select appearance="none" />

// Caret color in text input
<chakra.input caretColor="blue.500" />

// Pointer
<Box cursor="pointer" />
<Box pointerEvents="none">Non-interactive</Box>

// Textarea resize
<chakra.textarea resize="vertical" />

// Hidden scrollbar
<Box scrollbar="hidden" maxH="200px" overflowY="auto">
  Scrollable content
</Box>
```

## Related

- [Focus Ring](../compositions/focus-ring.md)
- [Conditional Styles](../concepts/conditional-styles.md)
