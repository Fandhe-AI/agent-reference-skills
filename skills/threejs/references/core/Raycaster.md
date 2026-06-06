# Raycaster

Performs raycasting to determine which 3D objects intersect a ray. Primarily used for mouse/pointer picking.

## Signature / Usage

```js
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointermove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// In render loop
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(scene.children);
if (intersects.length > 0) {
  console.log('Hit:', intersects[0].object.name);
}
```

## Constructor

```js
new Raycaster(origin?, direction?, near?, far?)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `origin` | Vector3 | — | Ray origin |
| `direction` | Vector3 | — | Normalized ray direction |
| `near` | number | `0` | Minimum hit distance (non-negative) |
| `far` | number | `Infinity` | Maximum hit distance |

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `camera` | Camera \| null | Camera for view-dependent objects (e.g., Sprites). Default: `null` |
| `far` | number | Maximum distance for results |
| `near` | number | Minimum distance for results |
| `ray` | Ray | The underlying ray |
| `layers` | Layers | Filter which objects are tested |
| `params` | Object | Per-type thresholds: `{ Line: { threshold }, Points: { threshold }, ... }` |

## Methods

| Method | Description |
|--------|-------------|
| `set(origin, direction)` | Update ray origin and direction |
| `setFromCamera(coords, camera)` | Build ray from NDC mouse coords and camera |
| `setFromXRController(controller)` | Build ray from a WebXR controller |
| `intersectObject(object, recursive?, intersects?)` | Test one object; returns sorted `Intersection[]` |
| `intersectObjects(objects, recursive?, intersects?)` | Test multiple objects; returns sorted `Intersection[]` |

## Intersection Object

```ts
{
  distance: number,        // Distance from ray origin
  distanceToRay?: number,  // Nearest ray distance (Points only)
  point: Vector3,          // World-space intersection point
  face: Object | null,     // Intersected face
  faceIndex: number,       // Face index
  object: Object3D,        // The hit object
  uv: Vector2,             // UV at intersection
  uv1: Vector2,            // Secondary UV
  normal: Vector3,         // Interpolated normal
  instanceId?: number      // InstancedMesh instance index
}
```

## Notes

- Results are sorted nearest-first; `intersects[0]` is the closest hit.
- Mesh faces must point toward the ray origin. Use `Material.side = THREE.DoubleSide` to hit back faces.
- Set `raycaster.layers` to match object layers to ignore hidden objects.
- `params.Line.threshold` and `params.Points.threshold` set hit proximity distance for non-mesh objects.

## Related

- [Layers](./Layers.md)
- [Object3D](./Object3D.md)
