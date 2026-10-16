# TextureSource

Represents the data source of a texture. Decouples the data definition from the texture definition so the same data can be used with multiple texture instances.

## Signature / Usage

```js
const source = new THREE.TextureSource( data );
```

## Options / Props

Constructor parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | any | `null` | The data definition of a texture. |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | any | — | The data definition of a texture. |
| `dataReady` | boolean | `true` | Only relevant when `needsUpdate` is set to `true`. When `false`, the engine performs the memory allocation (if necessary) but does not transfer the data into GPU memory. |
| `id` | number (readonly) | — | The ID of the source. |
| `isTextureSource` | boolean (readonly) | `true` | Flag for type testing. |
| `needsUpdate` | boolean | `false` | When set to `true`, the engine allocates the memory for the texture (if necessary) and triggers the texture upload to the GPU the next time the source is used. |
| `uuid` | string (readonly) | — | The UUID of the source. |
| `version` | number (readonly) | `0` | Starts at `0` and counts how many times `needsUpdate` is set to `true`. |

## Methods

| Signature | Description |
|-----------|-------------|
| `.getSize( target : Vector2 \| Vector3 ) : Vector2 \| Vector3` | Writes the dimensions of the source into the given target vector and returns it. |
| `.toJSON( meta : Object \| string ) : Object` | Serializes the source into JSON. `meta` is optional serialization meta information. See `ObjectLoader#parse`. |

## Notes

- Documented in the three.js r186 docs as `TextureSource` with the type flag `isTextureSource`. The existing `Source.md` page in this category documents the same class under the name `Source` / `isSource`.
- Source: https://threejs.org/docs/pages/TextureSource.html (three.js r186, `src/textures/TextureSource.js`)

## Related

- [Source](./Source.md)
- [Texture](./Texture.md)
