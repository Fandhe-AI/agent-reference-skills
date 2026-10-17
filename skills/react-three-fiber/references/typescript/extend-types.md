---
source: https://r3f.docs.pmnd.rs/api/typescript#extend-usage
---

# Extend usage / Extending ThreeElements

react-three-fiber can also accept third-party elements and extend them into its internal catalogue. The catalogue teaches the underlying reconciler how to create fibers for these elements and treat them within the scene.

## Signature / Usage

```tsx
import { useRef, useEffect } from 'react'
import { GridHelper } from 'three'
import { extend } from '@react-three/fiber'

// Create our custom element
class CustomElement extends GridHelper {}

// Extend so the reconciler will learn about it
extend({ CustomElement })

<customElement />
```

You can then declaratively create custom elements with primitives, but TypeScript won't know about them nor their props:

```html
// error: 'customElement' does not exist on type 'JSX.IntrinsicElements'

<customElement />
```

### Extending ThreeElements

To define our element in JSX, use the `ThreeElement` interface to extend `ThreeElements`. This interface describes three.js classes that are available in the R3F catalog and can be used as native elements.

```tsx
import { useRef, useEffect } from 'react'
import { GridHelper } from 'three'
import { extend, ThreeElement } from '@react-three/fiber'

// Create our custom element
class CustomElement extends GridHelper {}

// Extend so the reconciler will learn about it
extend({ CustomElement })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    customElement: ThreeElement<typeof CustomElement>
  }
}

// react-three-fiber will create your custom component and TypeScript will understand it
<customElement />
```

You can shorten element definition by using the `extend` factory signature, which will automatically extend the element locally. This will also prevent namespace bleeding.

```tsx
// Create our custom element
class CustomElement extends GridHelper {}

// Extend so the reconciler will learn about it, types will be inferred
const Element = extend(CustomElement)

// react-three-fiber will create your custom component and TypeScript will understand it
<Element />
```

## Notes

- The official docs write `<customComponent />` here; the registered name is `customElement`.
- `GridHelper` is a three.js class; its API belongs to the threejs skill.

## Related

- [Accessing typed three-elements](./three-elements.md)
- [Extending three default elements](./extending-default-elements.md)
