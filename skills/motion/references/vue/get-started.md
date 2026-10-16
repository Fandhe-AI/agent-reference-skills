# Get started with Motion for Vue

Install Motion for Vue (`motion-v`) and animate elements with the `<motion />` component. Includes the Nuxt module and `unplugin-vue-components` resolver for auto-import.

## Signature / Usage

```bash
npm install motion-v
```

Nuxt (`nuxt.config.ts`), auto-imports all components:

```ts
export default defineNuxtConfig({
  modules: ['motion-v/nuxt'],
})
```

`unplugin-vue-components` (Vite):

```ts
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        MotionResolver()
      ],
    }),
  ],
})
```

Basic usage:

```vue
<motion.button :initial="{ scale: 0 }" :animate="{ scale: 1 }" />
```

## Options / Props

| Prop | Description |
|------|-------------|
| `animate` | Target values; the component animates when they change. |
| `initial` | Starting values on enter; `false` disables the initial animation. |
| `transition` | Configures the animation (e.g. `{ duration: 2 }`). |
| `whileHover` / `whilePress` | Gesture states (also focus and drag); events like `@hoverStart`. |
| `whileInView` | Scroll-triggered state when entering/leaving the viewport. |
| `layout` / `layoutId` | Layout animations; `layoutId` animates between different elements. |
| `exit` | Exit animation, available inside `<AnimatePresence>`. |

```vue
<motion.div
  :whileHover="{ scale: 1.1 }"
  :whilePress="{ scale: 0.95 }"
  @hoverStart="() => console.log('hover started!')"
/>
```

```vue
<AnimatePresence>
  <motion.div v-if="show" key="box" :exit="{ opacity: 0 }" />
</AnimatePresence>
```

```vue
<script setup>
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
```

## Notes

- The Nuxt module and the unplugin resolver auto-import components from `motion-v`. Auto-import currently does not support the `<motion />` component; import it manually.
- Motion for Vue has a hybrid engine capable of hardware accelerated animations. Every feature of vanilla Motion is also compatible for advanced use-cases.
- Scroll-linked animations use `MotionValue`s via `useScroll`; scroll-triggered use `whileInView`.
- Hover events are not triggered by touch screen taps.
- A standard CSS transition remains a lightweight choice for simple self-contained effects.

## Related

- [motion](./motion.md)
- [overview](./overview.md)
- [gestures](./gestures.md)
- [scroll-animations](./scroll-animations.md)
- [layout-animations](./layout-animations.md)
- [animate-presence](./animate-presence.md)
- [transitions](./transitions.md)
