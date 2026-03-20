# Aspect Ratios

Predefined proportional relationship tokens between width and height for consistent media sizing.

## Tokens

| Token | Value | Use Case |
|-------|-------|----------|
| `square` | 1/1 | Equal width and height |
| `landscape` | 4/3 | Wider than tall format |
| `portrait` | 3/4 | Taller than wide format |
| `wide` | 16/9 | Standard widescreen / video |
| `ultrawide` | 18/5 | Extra-wide panoramic format |
| `golden` | 1.618/1 | Golden ratio proportion |

## Usage

```tsx
<Box aspectRatio="wide" width="full" />
<Box aspectRatio="square" width="200px" />
```

## Notes

- Tokens are accessible via `theme.tokens.aspectRatios`
- Applied via the CSS `aspect-ratio` property

## Related

- [Sizes](./sizes.md)
