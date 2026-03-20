# Shadows

Semantic shadow tokens for creating depth and visual hierarchy.

## Tokens

| Token | Description |
|-------|-------------|
| `xs` | Extra small shadow |
| `sm` | Small shadow |
| `md` | Medium shadow |
| `lg` | Large shadow |
| `xl` | Extra large shadow |
| `2xl` | Double extra large shadow |
| `inner` | Inset shadow effect |
| `inset` | Alternative inset shadow |

## Usage

```tsx
<Box shadow="md" />
<Box boxShadow="lg" />
```

## Notes

- Applied via CSS variables: `var(--chakra-shadows-md)`
- Shadows adapt between light and dark color schemes
- Custom shadows can be added as semantic tokens with `_light`/`_dark` conditions

## Custom Shadow Example

```tsx
export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      shadows: {
        custom: {
          value: {
            _light: "0 32px 56px 0 rgba(0, 0, 0, 0.25)",
            _dark: "0 32px 56px 0 rgba(0, 0, 0, 0.25)",
          },
        },
      },
    },
  },
})
```

## Related

- [Customization Overview](../customization/overview.md)
