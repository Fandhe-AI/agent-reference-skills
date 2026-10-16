---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# extend

Extends the native-object catalogue so three.js classes (or third-party classes) can be used as JSX elements.

## Signature / Usage

Declarations from `packages/fiber/src/core/extend.ts` (tag v9.8.2):

```ts
export type ConstructorRepresentation<T = any> = new (...args: any[]) => T

export interface Catalogue {
  [name: string]: ConstructorRepresentation
}

export function extend<T extends ConstructorRepresentation>(objects: T): React.ExoticComponent<ThreeElement<T>>
export function extend<T extends Catalogue>(objects: T): void
```

From the v9 migration guide (`docs/tutorials/v9-migration-guide.mdx`), catalogue form and factory form:

```tsx
extend({ OrbitControls })

<orbitControls args={[camera, gl.domElement]}>

// or,

const Controls = extend(OrbitControls)
<Controls args={[camera, gl.domElement]} />
```

## Notes

- Migration (v8 → v9): `extend` can now produce a component when a three.js class is passed to it individually instead of a catalog of named classes. This is backwards compatible and reduces TypeScript boilerplate and JSX collisions; libraries are recommended to migrate to this signature.
- Source behavior: the factory form registers the constructor under a generated numeric key and returns that key as the element type.
- The `@react-three/fiber` module's `ThreeElements` interface must be augmented for typed catalogue-form elements (see the TypeScript category).
- The three.js classes being registered are documented by the threejs skill.

## Related

- [other-exports](./other-exports.md)
