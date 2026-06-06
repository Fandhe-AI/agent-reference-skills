# Source

Represents the data source of a texture, decoupling data definition from texture configuration. Allows multiple `Texture` instances to share the same underlying data.

## Signature / Usage

```js
const source = new THREE.Source(imageData);
// Assign to a texture's source property
texture.source = source;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | any | `null` | The texture data (Image, canvas, TypedArray, etc.) |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | any | — | The data definition of the texture |
| `dataReady` | boolean | `true` | When `false`, GPU memory is allocated but data is not transferred |
| `id` | number (readonly) | — | Unique ID |
| `isSource` | boolean (readonly) | `true` | Type-testing flag |
| `needsUpdate` | boolean | `false` | Set to `true` to trigger GPU texture re-upload |
| `uuid` | string (readonly) | — | UUID |
| `version` | number (readonly) | `0` | Increments each time `needsUpdate` is set to `true` |

## Methods

| Signature | Description |
|-----------|-------------|
| `.getSize(target)` | Write source dimensions into `target` (Vector2 or Vector3) and return it |
| `.toJSON(meta)` | Serialize to JSON |

## Notes

- Sharing a single `Source` across multiple textures allows different sampling parameters on the same data.
- `Texture#source` provides access to the underlying `Source` instance.

## Related

- [Texture](./Texture.md)
