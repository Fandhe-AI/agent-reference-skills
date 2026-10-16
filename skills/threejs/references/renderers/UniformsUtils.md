# UniformsUtils

Provides utility functions for managing uniforms.

## Signature / Usage

```js
UniformsUtils.clone( src: Object ) : Object
UniformsUtils.merge( uniforms: Array ) : Object
```

## Options / Props

| Name | Description |
|------|-------------|
| `.clone( src: Object ) : Object` | Clones the given uniform definitions by deep-copy. If a uniform value refers to an object like a Vector3 or Texture, the cloned uniform refers to a new object reference. Returns the cloned uniforms. |
| `.merge( uniforms: Array ) : Object` | Merges an array of uniform definition objects into a single object. Uses `cloneUniforms()` internally, so the merged result is a deep copy. Returns the merged uniforms. |

## Notes

- Module with static methods (page `module-UniformsUtils`).
- Exposed on the `UniformsUtils` object as `clone` / `merge` (aliases of the module functions `cloneUniforms` / `mergeUniforms` in `src/renderers/shaders/UniformsUtils.js`; the official docs page lists the function names). `UniformsUtils.cloneUniforms()` / `UniformsUtils.mergeUniforms()` do not exist.
- Source: https://threejs.org/docs/pages/module-UniformsUtils.html (three.js r186, `src/renderers/shaders/UniformsUtils.js`)

## Related

- [WebGLRenderer](./WebGLRenderer.md)
