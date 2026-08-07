# Transitions

The `transition` prop defines animation behavior through time-based (tween) or physics-based (spring) animation.

## Signature / Usage

```javascript
const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
```

```vue
<motion.div
  :animate="{ x: 100 }"
  :transition="transition"
/>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | `"tween"` | Animation type: `"tween"`, `"spring"`, or `"inertia"` |
| `duration` | number | `0.3` | Animation length in seconds |
| `ease` | string \| array \| function | — | Easing curve (linear, easeIn/Out, bezier array) |
| `delay` | number | `0` | Seconds before animation starts |
| `repeat` | number | `0` | Repetition count (`Infinity` for continuous) |
| `repeatType` | string | `"loop"` | How to repeat: loop, reverse, or mirror |
| `bounce` | number | `0.25` | Spring bounciness (0-1 range) |
| `stiffness` | number | `1` | Spring tension intensity |
| `damping` | number | `10` | Spring opposing force |

## Notes

- Each animated value can have independent transition settings via the `default` key.
- Physics-based spring properties (`stiffness`, `damping`, `mass`) override duration-based spring settings.
- Negative `delay` values shift the animation start point forward in time.
- `visualDuration` overrides standard `duration` for spring animations.

## Related

- [motion](./motion.md)
- [motion-config](./motion-config.md)
- [overview](./overview.md)
