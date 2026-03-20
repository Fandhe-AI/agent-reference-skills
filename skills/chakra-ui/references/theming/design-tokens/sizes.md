# Sizes

Standardized dimension tokens for widths, heights, and other dimensional properties.

## Numeric Scale (0.5 – 96)

Ranges from `0.5` (0.125rem / 2px) through `96` (24rem / 384px).

## Named Sizes

| Token | Value |
|-------|-------|
| `max` | max-content |
| `min` | min-content |
| `fit` | fit-content |
| `prose` | 60ch |
| `full` | 100% |
| `dvh` | 100dvh |
| `svh` | 100svh |
| `lvh` | 100lvh |
| `dvw` | 100dvw |
| `svw` | 100svw |
| `lvw` | 100lvw |
| `vw` | 100vw |
| `vh` | 100vh |

## Fractional Sizes

Fraction-based tokens from `1/2` through `11/12` for flexible grid and layout proportions.

## Breakpoint Sizes

| Token | Value |
|-------|-------|
| `breakpoint-sm` | 480px |
| `breakpoint-md` | 768px |
| `breakpoint-lg` | 1024px |
| `breakpoint-xl` | 1280px |
| `breakpoint-2xl` | 1536px |

## Semantic Named Sizes (3xs – 8xl)

| Token | Value |
|-------|-------|
| `3xs` | 14rem |
| `2xs` | 16rem |
| `xs` | 20rem |
| `sm` | 24rem |
| `md` | 28rem |
| `lg` | 32rem |
| `xl` | 36rem |
| `2xl` | 42rem |
| `3xl` | 48rem |
| `4xl` | 56rem |
| `5xl` | 64rem |
| `6xl` | 72rem |
| `7xl` | 80rem |
| `8xl` | 90rem |

## Usage

```tsx
<Box width="full" maxWidth="prose" />
<Box height="dvh" />
<Box width="1/2" />
```

## Related

- [Spacing](./spacing.md)
- [Customization — Sizes](../customization/sizes.md)
