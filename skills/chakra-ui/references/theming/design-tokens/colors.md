# Colors

Color token palettes and semantic color tokens that adapt to light and dark modes.

## Raw Color Palettes

Each named palette provides shades from `50` (lightest) to `950` (darkest):

| Palette | Shades |
|---------|--------|
| `gray` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 |
| `red` | 50–950 |
| `orange` | 50–950 |
| `yellow` | 50–950 |
| `green` | 50–950 |
| `teal` | 50–950 |
| `blue` | 50–950 |
| `cyan` | 50–950 |
| `purple` | 50–950 |
| `pink` | 50–950 |
| `black` | alpha variants (50–950 opacity levels) |
| `white` | alpha variants (50–950 opacity levels) |

## Semantic Tokens

Semantic tokens automatically adapt to light/dark modes (recommended for use in components):

| Token | Light | Dark |
|-------|-------|------|
| `bg` | white | black |
| `bg.subtle` | gray.50 | gray.950 |
| `bg.muted` | gray.100 | gray.900 |
| `bg.emphasized` | gray.200 | gray.800 |
| `bg.inverted` | black | white |
| `fg` | primary text | primary text |
| `fg.muted` | secondary text | secondary text |
| `fg.subtle` | tertiary text | tertiary text |
| `border` | default border | default border |
| `border.muted` | muted border | muted border |
| `border.subtle` | subtle border | subtle border |
| `border.emphasized` | emphasized border | emphasized border |

## Usage

```tsx
// Raw token
<Box color="blue.500" bg="gray.100" />

// Semantic token (recommended)
<Box color="fg" bg="bg.subtle" borderColor="border" />
```

## Notes

- Use semantic tokens for automatic light/dark mode adaptation
- Raw palette tokens can be referenced in semantic token definitions

## Related

- [Semantic Tokens](../concepts/semantic-tokens.md)
- [Customization — Colors](../customization/colors.md)
