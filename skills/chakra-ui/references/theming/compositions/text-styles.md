# Text Styles

Pre-configured typographic compositions combining font size, line height, and letter spacing.

## Built-in Text Styles

| Style | Font Size | Line Height | Letter Spacing |
|-------|-----------|-------------|----------------|
| `xs` | 0.75rem (12px) | 1rem | — |
| `sm` | 0.875rem (14px) | 1.25rem | — |
| `md` | 1rem (16px) | 1.5rem | — |
| `lg` | 1.125rem (18px) | 1.75rem | — |
| `xl` | 1.25rem (20px) | 1.875rem | — |
| `2xl` | 1.5rem (24px) | 2rem | — |
| `3xl` | 1.875rem (30px) | 2.375rem | — |
| `4xl` | 2.25rem (36px) | 2.75rem | -0.025em |
| `5xl` | 3rem (48px) | 3.75rem | -0.025em |
| `6xl` | 3.75rem (60px) | 4.5rem | -0.025em |
| `7xl` | 4.5rem (72px) | 5.75rem | -0.025em |

## Usage

```tsx
<Text textStyle="md" />
<Heading textStyle="4xl" />
```

## Notes

- Styles from `4xl` and above include negative letter-spacing (-0.025em) to improve readability at display sizes
- All styles use the theme's body font family by default
- Text styles are categorized as "Compositions" alongside layer styles

## Related

- [Layer Styles](./layer-styles.md)
- [Typography](../design-tokens/typography.md)
