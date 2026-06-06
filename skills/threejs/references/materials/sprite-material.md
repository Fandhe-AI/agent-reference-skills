# SpriteMaterial

A material for rendering `Sprite` objects. Sprites always face the camera.

## Signature / Usage

```js
const map = new THREE.TextureLoader().load('textures/sprite.png');
const material = new THREE.SpriteMaterial({ map, color: 0xffffff });
const sprite = new THREE.Sprite(material);
sprite.scale.set(200, 200, 1);
scene.add(sprite);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Sprite color; modulates `map` |
| `map` | Texture | `null` | Color map; may include alpha |
| `alphaMap` | Texture | `null` | Grayscale opacity map |
| `rotation` | number | `0` | Sprite rotation in radians |
| `sizeAttenuation` | boolean | `true` | Scale sprite by camera depth (perspective only) |
| `fog` | boolean | `true` | Affected by fog |
| `transparent` | boolean | `true` | Always transparent (overridden from `Material`) |
| `isSpriteMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- `transparent` defaults to `true` (overrides base `Material` default)
- Only for use with the `Sprite` object; not for meshes
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
