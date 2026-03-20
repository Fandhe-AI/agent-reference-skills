# Focus Ring

Declarative style props for focus state indicators that maintain accessibility without manually configuring focus styles on every component.

## Overview

Chakra UI provides two focus ring props:

| Prop | Selector | Behavior |
|------|----------|----------|
| `focusRing` | `:focus`, `[data-focus]` | Applies on any focus event |
| `focusVisibleRing` | `:focus-visible`, `[data-focus-visible]` | Applies only on keyboard focus |

Both props accept three position values: `"outside"`, `"inside"`, `"mixed"`.

## Usage

```tsx
// Focus ring (any focus)
<chakra.button px="4" py="2" focusRing="outside">
  Click me
</chakra.button>

// Focus visible ring (keyboard only — recommended for accessibility)
<chakra.button px="4" py="2" focusVisibleRing="outside">
  Click me
</chakra.button>

// Inside ring
<chakra.input focusVisibleRing="inside" />

// Mixed
<chakra.button focusVisibleRing="mixed">Mixed ring</chakra.button>
```

## Notes

- `focusVisibleRing` is preferred for most interactive elements: it applies focus indicators for keyboard users but not for mouse clicks, improving visual experience without sacrificing accessibility
- These props eliminate the need to manually set `outline` or `box-shadow` focus overrides per component

## Related

- [Conditional Styles](../concepts/conditional-styles.md)
- [Interactivity Style Props](../style-props/interactivity.md)
