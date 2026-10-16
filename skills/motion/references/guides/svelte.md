# Motion in Svelte 5

Use Motion's JavaScript API in Svelte 5 for gestures, scroll, view and layout animations via `@attach`.

## Signature / Usage

```bash
npm install motion
```

```svelte
<script>
  import { animate, press } from "motion"

  function pressScale(element) {
    return press(element, () => {
      animate(element, { scale: 0.8 }, { type: "spring", stiffness: 1000 })

      return () => animate(element, { scale: 1 }, { type: "spring", stiffness: 500 })
    })
  }
</script>

<button {@attach pressScale}>Press me</button>
```

Animate on state change:

```svelte
<script>
  import { animate } from "motion"

  let isOpen = $state(false)
  let box

  $effect(() => {
    animate(
      box,
      { rotate: isOpen ? 180 : 0 },
      { type: "spring", visualDuration: 0.4, bounce: 0.3 }
    )
  })
</script>

<div class="box" bind:this={box}></div>
<button onclick={() => (isOpen = !isOpen)}>Toggle</button>
```

Scroll-linked and view animations:

```svelte
<script>
  import { animate, scroll } from "motion"

  function scrollProgress(element) {
    return scroll(animate(element, { scaleX: [0, 1] }, { ease: "linear" }))
  }
</script>

<div class="progress" {@attach scrollProgress}></div>
```

```svelte
<script>
  import { animateView } from "motion"
  import { flushSync } from "svelte"

  let isOn = $state(false)
  let handle

  function toggle() {
    animateView(() => {
      isOn = !isOn
      flushSync()
    }).add(handle)
  }
</script>
```

## Notes

- Attachments (`{@attach}`) need Svelte 5.29+; with earlier versions the same functions work as actions (`use:`).
- Gesture functions (`hover`, `press`) and `scroll` return cleanup functions, which attachments accept directly.
- `animateView` and `animateLayout` measure DOM before/after your update function; Svelte batches `$state` updates, so call `flushSync()` at the end of the function. `animateLayout(container, () => { ...; flushSync() })` animates elements with a `data-layout` attribute.
- `svelte/motion` (`Tween`, `Spring`) is Svelte's own module, distinct from `motion`; they can be combined.
- There is no official Svelte component API (no `motion` component like React/Vue). Community packages exist, e.g. `@humanspeak/svelte-motion`.
- Source: https://motion.dev/docs/svelte (fetched 2026-10).

## Related

- [Installation](./installation.md)
