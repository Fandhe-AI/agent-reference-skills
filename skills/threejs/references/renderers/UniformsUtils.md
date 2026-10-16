# UniformsUtils

Provides utility functions for managing uniforms.

## Signature / Usage

```js
UniformsUtils.cloneUniforms( src: Object ) : Object
UniformsUtils.mergeUniforms( uniforms: Array ) : Object
```

## Methods

| Name | Description |
|------|-------------|
| `.cloneUniforms( src: Object ) : Object` | Clones the given uniform definitions by deep-copy. If a uniform value refers to an object like a Vector3 or Texture, the cloned uniform refers to a new object reference. Returns the cloned uniforms. |
| `.mergeUniforms( uniforms: Array ) : Object` | Merges an array of uniform definition objects into a single object. Uses `cloneUniforms()` internally, so the merged result is a deep copy. Returns the merged uniforms. |

## Notes

- Module with static methods (page `module-UniformsUtils`).
- Source: `src/renderers/shaders/UniformsUtils.js` (three.js r186).

## Related

- [WebGLRenderer](./WebGLRenderer.md)
