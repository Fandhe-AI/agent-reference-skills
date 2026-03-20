# Breakpoints

Predefined screen size tokens for responsive design using min-width media queries.

## Tokens

| Token | Value | Media Query |
|-------|-------|-------------|
| `sm` | 480px | `@media screen (min-width >= 480px)` |
| `md` | 768px | `@media screen (min-width >= 768px)` |
| `lg` | 1024px | `@media screen (min-width >= 1024px)` |
| `xl` | 1280px | `@media screen (min-width >= 1280px)` |
| `2xl` | 1536px | `@media screen (min-width >= 1536px)` |

## Usage

```tsx
// Responsive prop syntax
<Box fontSize={{ base: "sm", md: "md", lg: "lg" }} />
<Box display={{ base: "none", md: "block" }} />
```

## Notes

- Breakpoints are configured via `theme.breakpoints`
- Available as CSS variables: `--chakra-breakpoints-sm`, `--chakra-breakpoints-md`, etc.

## Related

- [Customization — Breakpoints](../customization/breakpoints.md)
- [Sizes](./sizes.md)
