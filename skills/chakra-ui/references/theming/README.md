# Chakra UI v3 — Theming

## Concepts

| Name | Description | Path |
|------|-------------|------|
| `Overview` | Theming system architecture: defineConfig, createSystem, ChakraProvider | [./concepts/overview.md](./concepts/overview.md) |
| `Tokens` | Design token structure, categories, and configuration | [./concepts/tokens.md](./concepts/tokens.md) |
| `Semantic Tokens` | Context-specific tokens that reference base tokens with condition support | [./concepts/semantic-tokens.md](./concepts/semantic-tokens.md) |
| `Recipes` | Multi-variant single-element component style definitions | [./concepts/recipes.md](./concepts/recipes.md) |
| `Slot Recipes` | Multi-part component style definitions with coordinated slot variants | [./concepts/slot-recipes.md](./concepts/slot-recipes.md) |

## Design Tokens

| Name | Description | Path |
|------|-------------|------|
| `Animations` | Keyframe animation tokens and duration/easing values | [./design-tokens/animations.md](./design-tokens/animations.md) |
| `Aspect Ratios` | Predefined proportional dimension tokens (square, wide, golden, etc.) | [./design-tokens/aspect-ratios.md](./design-tokens/aspect-ratios.md) |
| `Breakpoints` | Responsive screen-size tokens (sm 480px through 2xl 1536px) | [./design-tokens/breakpoints.md](./design-tokens/breakpoints.md) |
| `Colors` | Raw color palettes (50–950 scales) and semantic adaptive color tokens | [./design-tokens/colors.md](./design-tokens/colors.md) |
| `Cursors` | Semantic cursor tokens for interactive UI elements | [./design-tokens/cursors.md](./design-tokens/cursors.md) |
| `Radii` | Border radius tokens from none (0) to full (9999px) | [./design-tokens/radii.md](./design-tokens/radii.md) |
| `Shadows` | Semantic box shadow tokens (xs through 2xl, inner, inset) | [./design-tokens/shadows.md](./design-tokens/shadows.md) |
| `Sizes` | Dimension tokens including numeric scale, named, fractional, and viewport units | [./design-tokens/sizes.md](./design-tokens/sizes.md) |
| `Spacing` | Padding, margin, and gap scale tokens (0.5 through 96) | [./design-tokens/spacing.md](./design-tokens/spacing.md) |
| `Typography` | Font family, size, weight, line height, and letter spacing tokens | [./design-tokens/typography.md](./design-tokens/typography.md) |
| `Z-Index` | Layering tokens from hide (-1) to max (2147483647) | [./design-tokens/z-index.md](./design-tokens/z-index.md) |

## Compositions

| Name | Description | Path |
|------|-------------|------|
| `Text Styles` | Typographic compositions combining font size, line height, and letter spacing | [./compositions/text-styles.md](./compositions/text-styles.md) |
| `Layer Styles` | Multi-property design compositions for fill and outline surface patterns | [./compositions/layer-styles.md](./compositions/layer-styles.md) |

## Customization

| Name | Description | Path |
|------|-------------|------|
| `Overview` | How to use defineConfig and createSystem to customize the styling engine | [./customization/overview.md](./customization/overview.md) |
| `Animations` | Add custom keyframes to the theme configuration | [./customization/animations.md](./customization/animations.md) |
| `Breakpoints` | Override or extend responsive breakpoint values | [./customization/breakpoints.md](./customization/breakpoints.md) |
| `Colors` | Add new color palettes and semantic color tokens | [./customization/colors.md](./customization/colors.md) |
| `Conditions` | Define custom CSS selector conditions for state-based styling | [./customization/conditions.md](./customization/conditions.md) |
| `CSS Variables` | Configure the cssVarsRoot and token variable structure | [./customization/css-variables.md](./customization/css-variables.md) |
| `Global CSS` | Add application-wide base styles via the globalCss option | [./customization/global-css.md](./customization/global-css.md) |
| `Recipes` | Extend existing component recipes or register new ones | [./customization/recipes.md](./customization/recipes.md) |
| `Sizes` | Add custom dimension tokens to the size scale | [./customization/sizes.md](./customization/sizes.md) |
| `Spacing` | Add custom spacing tokens to the spacing scale | [./customization/spacing.md](./customization/spacing.md) |
| `Utilities` | Define custom CSS shorthand properties mapped to tokens | [./customization/utilities.md](./customization/utilities.md) |
