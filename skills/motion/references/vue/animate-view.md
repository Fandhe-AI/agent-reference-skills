# AnimateView

Animate elements between Vue views with enter, exit, update and shared element animations, powered by the native View Transitions API. Available via `motion-v` 2.5 and later.

## Signature / Usage

```vue
<script setup>
import { AnimateView, startTransition } from "motion-v"
import { ref } from "vue"

const show = ref(true)

function toggle() {
  startTransition(() => {
    show.value = !show.value
  })
}
</script>

<template>
  <button @click="toggle">Toggle</button>
  <AnimateView v-if="show">
    <div class="box" />
  </AnimateView>
</template>
```

Shared element animation: an exiting `AnimateView` and an entering one with the same `name` morph into each other.

```vue
<AnimateView :name="`card-${item.id}`" :transition="cardTransition">
  <div class="card-content" @click="open(item.id)" />
</AnimateView>
```

Direction-aware animation via `types`:

```ts
startTransition(
  () => {
    index.value = wrap(0, images.length, index.value + (direction === "next" ? 1 : -1))
  },
  { types: [direction] }
)
```

```vue
<AnimateView :enter="enterSlide" :exit="exitSlide" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| default slot | - | Content to animate. Adds no wrapper element; supports multiple root nodes. |
| `name` | string | Identifier for matching elements in shared element animations. Must be unique per view; omit when not matching. |
| `transition` | transition options | Default transition for all animation types. Accepts Motion transition options, including springs (`type: spring` imported from `motion-v`), per-value options and `layout` timing for size/position changes. |
| `enter` | object or function | Animation when the element enters the DOM. Default: browser fade-in. Object of values (optional `transition`), or function receiving transition types and returning values. |
| `exit` | object or function | Animation when the element leaves the DOM. Default: browser fade-out. Same forms as `enter`. |
| `update` | object or function | Animation when content, style, size or position changes. Default: browser crossfade plus size/position animation. Custom values replace the crossfade but keep size/position animation. |
| `share` | object or function | Animation when this element enters as another `AnimateView` with the same `name` exits. Set on the entering component. Custom values replace the crossfade. |
| `onAnimationStart` (`@animation-start`) | `(animation, type) => void` | Fires when an animation starts; receives animation controls and type (`"enter"`, `"exit"`, `"update"`, `"share"`). |
| `onAnimationComplete` (`@animation-complete`) | `(type) => void` | Fires when an animation finishes; receives the type. Not called for animations cancelled when the component unmounts mid-playback. |

### `startTransition(update, options?)`

Runs a state update inside a native view transition. Wraps `document.startViewTransition` and awaits Vue's `nextTick()` internally. Returns the native `ViewTransition` object (e.g. `transition?.finished.then(...)`).

| Option | Description |
|--------|-------------|
| `types` | Array of strings forwarded to functional `enter` / `exit` / `share` / `update` props. |
| `root` | Pass `{ root: true }` to keep the browser's default full-page crossfade. By default the document root is excluded from the transition. |

## Notes

- State changes must be wrapped in `startTransition` to trigger a view transition; changes outside it update the DOM without animation.
- `startTransition` returns `undefined` when the update is queued behind a playing transition (queued updates run together when it finishes), when the browser lacks View Transitions API support, or during SSR. The update still runs, without animation.
- Setting your own values within `enter` / `exit` / `share` / `update` disables the default opacity crossfade; pass `opacity` too to restore the fade (e.g. `:enter="{ opacity: 1, clipPath: [...] }"`).
- If more than one element has the same `name` before or after the transition, the animation fails.
- Built on Motion's mini `animate()`, so values like `clipPath` and CSS custom properties (e.g. `--wipe`) are animatable.
- View transitions snapshot old/new views as images and are not interruptible; best for page-level transitions. Layout animations are fully interruptible and better for micro-interactions and gesture-driven UI.
- Same declarative pairing as `layoutId` in layout animations, but the mechanism differs: `layoutId` uses FLIP; `AnimateView` morphs browser-rendered snapshots.
- Source: https://motion.dev/docs/vue-animate-view (fetched 2026-10).

## Related

- [layout-animations](./layout-animations.md)
- [transitions](./transitions.md)
- [animate-presence](./animate-presence.md)
