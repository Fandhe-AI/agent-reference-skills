---
source: https://ui.shadcn.com/docs/utils/scroll-fade
---

# Scroll Fade

Utilities for adding a scroll-aware fade effect to the edges of a scroll container, implemented with `mask-image` and CSS scroll-driven animations (no JavaScript).

## Signature / Usage

Ships with the `shadcn` package, which `npx shadcn@latest init` imports in your global CSS. Otherwise:

```bash
npm install shadcn
```

```css
@import "tailwindcss";
@import "shadcn/tailwind.css";
```

Add `scroll-fade` (or `scroll-fade-y`) to the scroll container, i.e. the element with `overflow-y-auto`:

```tsx
<div className="scroll-fade overflow-y-auto">{/* ... */}</div>
```

Horizontal, edge, size, and disable variants:

```tsx
<div className="flex scroll-fade-x overflow-x-auto">{/* ... */}</div>
<div className="scroll-fade-b overflow-y-auto">{/* ... */}</div>
<div className="scroll-fade overflow-y-auto scroll-fade-24">{/* ... */}</div>
<div className="scroll-fade overflow-y-auto scroll-fade-[15%]">{/* ... */}</div>
<div className="scroll-fade overflow-y-auto scroll-fade-b-8 scroll-fade-t-2">{/* ... */}</div>
<div className="scroll-fade overflow-y-auto md:scroll-fade-none">{/* ... */}</div>
<div className="scroll-fade overflow-y-auto [--scroll-fade-reveal:64px]">{/* ... */}</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scroll-fade` | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` `animation-timeline: scroll(self y);` |
| `scroll-fade-y` | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-block));` `animation-timeline: scroll(self y);` |
| `scroll-fade-x` | `mask-image: var(--scroll-fade-mask, var(--scroll-fade-inline));` `animation-timeline: scroll(self inline);` |
| `scroll-fade-t` | Fade mask on the top edge. `animation-timeline: scroll(self y);` |
| `scroll-fade-b` | Fade mask on the bottom edge. `animation-timeline: scroll(self y);` |
| `scroll-fade-l` | Fade mask on the left edge. `animation-timeline: scroll(self x);` |
| `scroll-fade-r` | Fade mask on the right edge. `animation-timeline: scroll(self x);` |
| `scroll-fade-s` | Fade mask on the start edge, mirrors in RTL. `animation-timeline: scroll(self inline);` |
| `scroll-fade-e` | Fade mask on the end edge, mirrors in RTL. `animation-timeline: scroll(self inline);` |
| `scroll-fade-<number>` | `--scroll-fade-size: calc(var(--spacing) * <number>);` |
| `scroll-fade-[<value>]` | `--scroll-fade-size: <value>;` |
| `scroll-fade-{t,b,s,e}-<number>` | `--scroll-fade-{t,b,s,e}-size: calc(var(--spacing) * <number>);` |
| `scroll-fade-{t,b,s,e}-[<value>]` | `--scroll-fade-{t,b,s,e}-size: <value>;` |
| `scroll-fade-none` | `--scroll-fade-mask: none;` |

## Notes

- Behavior: at rest the top edge is crisp and the bottom fades; mid-scroll both edges fade; at the end the bottom sharpens. With no overflow, no fade is shown.
- The mask fades the content itself (transparent to black), so it needs no background configuration. If the scroller sits in a card, put the background and border on a wrapper and `scroll-fade` on the inner scroller.
- Default fade depth is `12%` of the container, capped at `40px`. Easing distance is `--scroll-fade-reveal`, `96px` by default, independent of depth.
- Per-edge modifiers override `scroll-fade-<number>` on the edge they target. Use the logical `s` / `e` modifiers for horizontal scrollers so sizes mirror in RTL.
- `scroll-fade-x` follows reading direction: in RTL the crisp edge is the right edge and the fade is on the left. `scroll-fade-none` works in any class order.
- Fallback: browsers without scroll-driven animations get a static fade on both edges (or on the selected edge). A visible scrollbar fades with the content; pair with `no-scrollbar` (same package) to hide it.
- The `ScrollArea` and `MessageScroller` components can use `scroll-fade` on their scrollable viewport.

## Related

- [shimmer](./shimmer.md)
- [RTL](./rtl.md)
