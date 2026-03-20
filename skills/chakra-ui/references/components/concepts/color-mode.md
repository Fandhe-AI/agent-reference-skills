# Color Mode

Chakra UI supports light and dark color modes via `next-themes` integration.

## Setup

The CLI snippet adds the color mode provider automatically:

```bash
npx @chakra-ui/cli snippet add color-mode
```

## How It Works

- Chakra uses CSS custom properties (design tokens) that automatically change based on the active mode
- Built on `next-themes` for persistence and system preference detection
- The `ColorModeProvider` component wraps the app and manages mode state

## Color Tokens

Both modes define semantic color tokens:

| Token | Usage |
|-------|-------|
| `bg` | Background |
| `bg.subtle` | Subtle background |
| `bg.muted` | Muted background |
| `fg` | Foreground / text |
| `fg.muted` | Muted text |
| `fg.subtle` | Subtle text |
| `border` | Border color |

## Notes

- All Chakra UI components automatically adapt to the active color mode
- User's color mode preference is persisted in `localStorage`
- System preference (`prefers-color-scheme`) is respected by default
- Custom themes can extend the token system for additional semantic colors

## Related

- [Overview](./overview.md)
- [Server Components](./server-components.md)
