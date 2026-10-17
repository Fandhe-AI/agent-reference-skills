# objects

| Name | Description | Path |
|------|-------------|------|
| attach (Dealing with non-scene objects) | Non-Object3D primitives (geometries, materials, etc.) can be put into the render tree and are attached to a parent that is part of the scene. | [attach.md](./attach.md) |
| Constructor arguments (args) | In React Three Fiber, constructor arguments are always passed as an array via `args`. | [constructor-arguments.md](./constructor-arguments.md) |
| Declaring objects | You can use the entire three.js object catalogue and all its properties, declared instead of pre-built objects. | [declaring-objects.md](./declaring-objects.md) |
| Disposal | React Three Fiber calls `object.dispose()`, if present, on all unmounted objects, and this can be switched off with `dispose={null}`. | [disposal.md](./disposal.md) |
| Piercing into nested properties | To reach into nested attributes (for instance `mesh.rotation.x`), use dash-case. | [piercing-nested-properties.md](./piercing-nested-properties.md) |
| primitive (Putting already existing objects into the scene-graph) | The `primitive` placeholder puts an already existing object into the scene-graph. | [primitive.md](./primitive.md) |
| Shader material uniforms | `ShaderMaterial` and `RawShaderMaterial` keep the material's `uniforms` object stable by merging incoming uniforms into the existing target. | [shader-material-uniforms.md](./shader-material-uniforms.md) |
| Shortcuts (set / setScalar) | Properties whose underlying object has a `.set()` method can directly receive the same arguments that `set` takes. | [shortcuts.md](./shortcuts.md) |
| Using 3rd-party objects declaratively | The `extend` function extends React Three Fiber's catalogue of JSX elements with third-party classes. | [third-party-objects.md](./third-party-objects.md) |
