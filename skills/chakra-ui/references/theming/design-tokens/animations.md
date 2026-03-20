# Animations

Pre-built keyframe animation tokens for common UI motion effects.

## Tokens

| Token | Effect |
|-------|--------|
| `spin` | Continuous 360° rotation |
| `pulse` | Opacity pulsing effect |
| `ping` | Scale with fade (notification badge) |
| `bounce` | Vertical bouncing motion |
| `fade-in` | Opacity 0 → 1 |
| `fade-out` | Opacity 1 → 0 |
| `scale-in` | Scale 0.95 → 1 |
| `scale-out` | Scale 1 → 0.95 |
| `slide-from-left` | Slide in from left (partial) |
| `slide-from-right` | Slide in from right (partial) |
| `slide-from-top` | Slide in from top (partial) |
| `slide-from-bottom` | Slide in from bottom (partial) |
| `slide-to-left` | Slide out to left (partial) |
| `slide-to-right` | Slide out to right (partial) |
| `slide-to-top` | Slide out to top (partial) |
| `slide-to-bottom` | Slide out to bottom (partial) |
| `slide-from-left-full` | Slide in from left edge (full) |
| `slide-from-right-full` | Slide in from right edge (full) |
| `slide-from-top-full` | Slide in from top edge (full) |
| `slide-from-bottom-full` | Slide in from bottom edge (full) |
| `slide-to-left-full` | Slide out to left edge (full) |
| `slide-to-right-full` | Slide out to right edge (full) |
| `slide-to-top-full` | Slide out to top edge (full) |
| `slide-to-bottom-full` | Slide out to bottom edge (full) |

## Duration Tokens

| Token | Value |
|-------|-------|
| `fastest` | 50ms |
| `faster` | 100ms |
| `fast` | 150ms |
| `moderate` | 200ms |
| `slow` | 300ms |
| `slower` | 400ms |
| `slowest` | 500ms |

## Easing Tokens

| Token | Description |
|-------|-------------|
| `ease-in` | Accelerating from zero velocity |
| `ease-out` | Decelerating to zero velocity |
| `ease-in-out` | Acceleration then deceleration |
| `ease-in-smooth` | Smooth acceleration |

## Usage

```tsx
<Box animation="spin 1s linear infinite" />
<Box animation="fade-in 0.2s ease-out" />
```

## Related

- [Customization — Animations](../customization/animations.md)
