# Sprite

A 2D plane that always faces the camera (billboarding). Rendered with `SpriteMaterial`.

Inherits from: EventDispatcher → Object3D → Sprite

## Signature / Usage

```js
const map = new THREE.TextureLoader().load('sprite.png');
const material = new THREE.SpriteMaterial({ map });
const sprite = new THREE.Sprite(material);
sprite.scale.set(2, 2, 1);
scene.add(sprite);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `material` | SpriteMaterial | Controls the sprite's texture, color, and opacity |
| `center` | Vector2 | Pivot point for rotation/scaling (default: `(0.5, 0.5)` — center) |
| `isSprite` | boolean (readonly) | Always `true`; used for type testing |

## Methods

- `raycast(raycaster, intersects): void` — intersection test against the sprite's billboard plane
- `copy(source): this` — copies properties from another Sprite

## Notes

- Sprites are always camera-aligned; they do not respond to `rotation` in the usual sense.
- `center` is in `[0,1]` UV space: `(0,0)` is bottom-left, `(1,1)` is top-right.
- Use `scale.set(w, h, 1)` to control displayed size in world units.
- For many sprites with per-instance attributes, `Points` with a `PointsMaterial` map is more performant.

## Related

- [Points.md](./Points.md)
