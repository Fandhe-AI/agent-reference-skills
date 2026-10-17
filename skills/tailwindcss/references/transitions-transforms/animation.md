---
source: https://tailwindcss.com/docs/animation
---

# animation

Utilities for animating elements with CSS animations.

## Signature / Usage

```html
<button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing…
</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `animate-spin` | `animation: var(--animate-spin); /* spin 1s linear infinite */` with `@keyframes spin { to { transform: rotate(360deg); } }` |
| `animate-ping` | `animation: var(--animate-ping); /* ping 1s cubic-bezier(0, 0, 0.2, 1) infinite */` with `@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }` |
| `animate-pulse` | `animation: var(--animate-pulse); /* pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite */` with `@keyframes pulse { 50% { opacity: 0.5; } }` |
| `animate-bounce` | `animation: var(--animate-bounce); /* bounce 1s infinite */` with `@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }` |
| `animate-none` | `animation: none;` |
| `animate-(<custom-property>)` | `animation: var(<custom-property>);` |
| `animate-[<value>]` | `animation: <value>;` |

## Notes

- `animate-spin`: linear spin animation, for loading indicators.
- `animate-ping`: scales and fades like a radar ping or ripple of water, useful for notification badges.
- `animate-pulse`: gently fades in and out, useful for skeleton loaders.
- `animate-bounce`: bounces up and down, useful for "scroll down" indicators.
- Supporting reduced motion: use the `motion-safe` and `motion-reduce` variants:

```html
<button type="button" class="bg-indigo-600 ..." disabled>
  <svg class="mr-3 size-5 motion-safe:animate-spin ..." viewBox="0 0 24 24">
    <!-- ... -->
  </svg>
  Processing
</button>
```

- Custom value: use the `animate-[<value>]` syntax (e.g. `animate-[wiggle_1s_ease-in-out_infinite]`); for CSS variables use `animate-(<custom-property>)`, shorthand for `animate-[var(<custom-property>)]`.

```html
<div class="animate-[wiggle_1s_ease-in-out_infinite] ...">
  <!-- ... -->
</div>
<div class="animate-(--my-animation) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="animate-none md:animate-spin ...">
  <!-- ... -->
</div>
```

- Customizing your theme: use the `--animate-*` theme variables, with `@keyframes` defined inside `@theme`, then use `animate-wiggle`:

```css
@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;

  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}
```

- JS animation libraries (Motion) are covered by the motion skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/animation.mdx` (fetched 2026-10-16).

## Related

- [transition-property](./transition-property.md)
- [transform](./transform.md)
