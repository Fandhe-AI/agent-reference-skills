# Refs

Ways to access the underlying HTML elements rendered by Ark UI components, illustrated with the Slider component.

## Signature / Usage

```tsx
import { useRef } from 'react'
import { Slider } from '@ark-ui/react/slider'

function Example() {
  const ref = useRef<HTMLDivElement>(null)
  return <Slider.Root ref={ref} />
}
```

## Notes

- React: create a ref with `useRef` and pass it directly to the component's `ref` prop, same as any native React element.
- Solid: assign a ref via a callback function, or use a signal created with `createSignal` for reactive access.
- Vue: use the `ref` prop and access the underlying DOM node through the ref's `$el` property.
- Svelte 5: use the `bind:ref` directive for template-level, reactively-bound ref access.
- Ark UI keeps a consistent ref API for the Root component (and other parts) across all supported frameworks, adapted to each framework's native ref conventions.

## Related

- [Component State](./component-state.md)
- [Forms](./forms.md)
