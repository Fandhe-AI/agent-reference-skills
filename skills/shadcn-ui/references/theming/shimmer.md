---
source: https://ui.shadcn.com/docs/utils/shimmer
---

# Shimmer

Utilities for adding a shimmer (sweeping highlight) effect to text elements. Pure CSS: text is painted with `background-clip: text` and the highlight sweeps in a seamless loop.

## Signature / Usage

Ships with the `shadcn` package, which `npx shadcn@latest init` imports in your global CSS. Otherwise:

```bash
npm install shadcn
```

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";
```

```tsx
<p className="shimmer text-muted-foreground">Generating response&hellip;</p>
```

Variants:

```tsx
<p className="shimmer shimmer-color-blue-500/60">Generating response&hellip;</p>
<p className="shimmer shimmer-color-[#378ADD]">Generating response&hellip;</p>
<p className="shimmer shimmer-duration-1000">Generating response&hellip;</p>
<p className="shimmer shimmer-spread-24">Generating response&hellip;</p>
<p className="shimmer shimmer-spread-[5rem]">Generating response&hellip;</p>
<p className="shimmer shimmer-angle-45">Generating response&hellip;</p>
<p className="shimmer shimmer-reverse">Generating response&hellip;</p>
<p className="shimmer shimmer-duration-1100 shimmer-once">Response generated.</p>
<p className="shimmer md:shimmer-none">Generating response&hellip;</p>
```

With Marker:

```tsx
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent className="shimmer">Thinking&hellip;</MarkerContent>
</Marker>
```

Older-browser guard:

```tsx
<p className="supports-[color:oklch(from_white_l_c_h)]:shimmer">
  Generating response&hellip;
</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `shimmer` | `background-clip: text;` `animation: tw-shimmer var(--shimmer-duration, 2s) linear infinite;` |
| `shimmer-once` | `animation-iteration-count: 1;` |
| `shimmer-reverse` | `animation-direction: reverse;` |
| `shimmer-none` | `--shimmer-image: none;` `--shimmer-text-fill: currentColor;` |
| `shimmer-color-<color>` | `--shimmer-color: <color>;` |
| `shimmer-color-[<value>]` | `--shimmer-color: <value>;` |
| `shimmer-color-<color>/<pct>` | `--shimmer-color: color-mix(in oklch, <color> <pct>, transparent);` |
| `shimmer-duration-<number>` | `--shimmer-duration: calc(<number> * 1ms);` |
| `shimmer-spread-<number>` | `--shimmer-spread: calc(var(--spacing) * <number>);` |
| `shimmer-spread-[<value>]` | `--shimmer-spread: <value>;` |
| `shimmer-angle-<number>` | `--shimmer-angle: calc(<number> * 1deg);` |

## Notes

- Built on `currentColor`: the highlight derives from the text color with no configuration, works on any color, and brightens automatically in dark mode.
- Defaults: duration `2000` ms (`2s`); spread `calc(3ch + 40px)`; angle `20` degrees.
- Requires relative color syntax and `color-mix()`. In older browsers the highlight gradient is dropped and the text can render transparent; guard with a `supports-*` variant.
- Reduced motion: the animation is disabled automatically and text renders normally.
- RTL: the sweep follows the reading direction with no extra classes; `shimmer-reverse` flips it manually.

## Related

- [scroll-fade](./scroll-fade.md)
- [RTL](./rtl.md)
