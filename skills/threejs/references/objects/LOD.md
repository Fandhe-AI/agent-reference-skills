# LOD

Level of Detail object. Displays different meshes based on distance from the camera to optimize rendering performance.

Inherits from: EventDispatcher → Object3D → LOD

## Signature / Usage

```js
const lod = new THREE.LOD();

lod.addLevel(highDetailMesh, 0);    // show when distance < 10
lod.addLevel(medDetailMesh, 10);    // show when distance >= 10
lod.addLevel(lowDetailMesh, 50);    // show when distance >= 50

scene.add(lod);

// In animation loop:
lod.update(camera);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `autoUpdate` | boolean | If `true`, the renderer calls `update()` automatically (default: `true`) |
| `isLOD` | boolean (readonly) | Always `true`; used for type testing |
| `levels` | Array | Array of `{ distance, hysteresis, object }` entries sorted by distance |

## Methods

- `addLevel(object, distance?, hysteresis?): this` — adds an object to display when camera is `distance` or farther away
- `getCurrentLevel(): number` — returns the index of the currently active level
- `getObjectForDistance(distance): Object3D | null` — returns the visible object for a given distance
- `removeLevel(distance): boolean` — removes the level at the given distance; returns `true` if found
- `update(camera): void` — updates which level is visible based on camera distance
- `toJSON(): Object` — serializes the LOD to JSON

## Notes

- Levels are sorted in ascending order by distance; the closest (0) shows highest detail.
- If `autoUpdate` is `true`, calling `update()` manually in the render loop is not necessary.
- `hysteresis` (0–1) adds a threshold to prevent flickering at the transition distance.

## Related

- [Mesh.md](./Mesh.md)
