---
source: https://r3f.docs.pmnd.rs/api/objects#attach
---

# attach (Dealing with non-scene objects)

Non-Object3D primitives (geometries, materials, etc.) can be put into the render tree as well, taking the same properties and constructor arguments they normally would. They become managed, reactive and auto-disposed. They are not technically part of the scene, but they "attach" to a parent which is. Use `attach` to bind objects to their parent; if the attached object unmounts it is taken off its parent automatically.

## Signature / Usage

```jsx
<mesh>
  <meshBasicMaterial attach="material" />
  <boxGeometry attach="geometry" />
```

All objects extending `THREE.Material` receive `attach="material"`, and all objects extending `THREE.BufferGeometry` receive `attach="geometry"`, so you do not have to type it out:

```jsx
<mesh>
  <meshBasicMaterial />
  <boxGeometry />
```

Deep nesting through piercing (adds a buffer-attribute to `geometry.attributes.position`, then the buffer geometry to `mesh.geometry`):

```jsx
<mesh>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" args={[v, 3]} />
```

More examples:

```jsx
// Attach bar to foo.a
<foo>
  <bar attach="a" />

// Attach bar to foo.a.b and foo.a.b.c (nested object attach)
<foo>
  <bar attach="a-b" />
  <bar attach="a-b-c" />

// Attach bar to foo.a[0] and foo.a[1] (array attach is just object attach)
<foo>
  <bar attach="a-0" />
  <bar attach="a-1" />

// Attach bar to foo via explicit add/remove functions
<foo>
  <bar attach={(parent, self) => {
    parent.add(self)
    return () => parent.remove(self)
  }} />

// The same as a one liner
<foo>
  <bar attach={(parent, self) => (parent.add(self), () => parent.remove(self))} />
```

Real-world use-case: attaching to nested objects, for instance a shadow-camera:

```diff
- <directionalLight
-   castShadow
-   position={[2.5, 8, 5]}
-   shadow-mapSize={[1024, 1024]}
-   shadow-camera-far={50}
-   shadow-camera-left={-10}
-   shadow-camera-right={10}
-   shadow-camera-top={10}
-   shadow-camera-bottom={-10}
- />
+ <directionalLight castShadow position={[2.5, 8, 5]} shadow-mapSize={[1024, 1024]}>
+   <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
+ </directionalLight>
```

Arrays must have explicit order, for instance multi-materials:

```jsx
<mesh>
  {colors.map((color, index) => <meshBasicMaterial key={index} attach={`material-${index}`} color={color} />}
</mesh>
```

## Notes

- Migration (v8 → v9): side-effects such as attach and constructor effects (e.g. controls adding event listeners) no longer fire repeatedly without proper cleanup during Suspense.
- Materials, geometries and cameras are three.js classes; see the threejs skill for their APIs.

## Related

- [Piercing into nested properties](./piercing-nested-properties.md)
- [Disposal](./disposal.md)
