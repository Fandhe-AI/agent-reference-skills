# Framework Differences

Ark UI ships framework-specific packages that share the same component anatomy, props, and Zag.js-based state machine core, but differ in binding/reactivity syntax.

## Signature / Usage

```tsx
// React
import { Slider } from '@ark-ui/react/slider'
```

```vue
<!-- Vue -->
<script setup lang="ts">
import { Slider } from '@ark-ui/vue/slider'
import { ref } from 'vue'

const rootRef = ref<{ $el: HTMLDivElement } | null>(null)
</script>

<template>
  <Slider.Root ref="rootRef">{/* ... */}</Slider.Root>
</template>
```

```tsx
// Solid
import { Slider } from '@ark-ui/solid/slider'
import { createSignal } from 'solid-js'

export const MySlider = () => {
  const [rootRef, setRootRef] = createSignal<HTMLDivElement | null>(null)
  return <Slider.Root ref={setRootRef}>{/* ... */}</Slider.Root>
}
```

```svelte
<!-- Svelte -->
<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'

  let checked = $state(false)
</script>

<Checkbox.Root bind:checked>
  <Checkbox.Label>I agree to the terms</Checkbox.Label>
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

## Options / Props

| Framework | Package | Reactivity / Binding Style |
| --- | --- | --- |
| React | `@ark-ui/react` | Hooks (`useState`, `useRef`); props passed as JSX attributes |
| Vue | `@ark-ui/vue` | `<script setup>` with `ref()`; template `ref="name"` to access DOM nodes; components used as `<template>` tags. Controlled state follows Vue's standard `value` prop + update-event convention |
| Solid | `@ark-ui/solid` | Signals via `createSignal`; refs passed as setter functions (`ref={setRootRef}`) |
| Svelte | `@ark-ui/svelte` | Svelte 5 runes (`$state`); two-way binding via `bind:` directives (e.g. `bind:checked`, `bind:ref`) |

## Notes

- Component anatomy (e.g. `Checkbox.Root`, `Checkbox.Control`, `Checkbox.Indicator`, `Checkbox.HiddenInput`) and part/prop names are shared across all four frameworks; only the binding syntax around them differs.
- All frameworks are built on the same underlying [Zag.js](https://zagjs.com) finite state machines, so component behavior and accessibility semantics are consistent regardless of framework.
- Styling is framework-independent: all packages expose `data-scope` / `data-part` attributes for CSS targeting since Ark UI ships no default styles.
- The MCP server (`@ark-ui/mcp`) and LLMs.txt files can generate/reference code for any of the four frameworks; see [MCP Server](./mcp-server.md) and [LLMs.txt](./llms-txt.md).
- The Vue package uses `<script setup>` with `ref()`/`reactive()` for local state, as shown in the official Refs guide; official docs surfaced during this survey did not include a native `v-model` code sample for controlled components.

## Related

- [Getting Started](./getting-started.md)
- [About](./about.md)
