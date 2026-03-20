# Transitions Style Props

JSX style props for controlling element transitions and animations.

## Props

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `transition` | `transition` | — |
| `transitionTimingFunction` | `transition-timing-function` | `easings` |
| `transitionDuration` | `transition-duration` | `durations` |
| `transitionDelay` | `transition-delay` | `durations` |
| `transitionProperty` | `transition-property` | — |
| `animation` | `animation` | `animations` |
| `animationName` | `animation-name` | `animations` |

## Examples

```tsx
// Basic transition
<Box
  bg="red.400"
  _hover={{ bg: "red.500" }}
  transition="background 0.2s ease-in-out"
/>

// With individual props
<Box
  bg="red.400"
  _hover={{ bg: "red.500" }}
  transitionProperty="background"
  transitionDuration="fast"
  transitionTimingFunction="ease-in-out"
/>

// Animation token
<Box animation="bounce" />
<Box animationName="spin" transitionDuration="slowest" />
```

## Token Values

**Easings:** `ease-in`, `ease-out`, `ease-in-out`, `ease-in-smooth`

**Durations:**

| Token | Value |
|-------|-------|
| `fastest` | 50ms |
| `faster` | 100ms |
| `fast` | 150ms |
| `moderate` | 200ms |
| `slow` | 300ms |
| `slower` | 400ms |
| `slowest` | 500ms |

**Built-in animations:** `spin`, `ping`, `pulse`, `bounce`

## Related

- [Transforms Style Props](./transforms.md)
- [Animation Styles](../compositions/animation-styles.md)
