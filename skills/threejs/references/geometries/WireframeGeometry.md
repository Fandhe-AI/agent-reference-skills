# WireframeGeometry

A helper geometry that converts any `BufferGeometry` into a wireframe representation. Used with `LineSegments` to render all edges.

## Signature / Usage

```js
const geometry = new THREE.SphereGeometry();
const wireframe = new THREE.WireframeGeometry( geometry );
const line = new THREE.LineSegments( wireframe );
line.material.depthWrite = false;
line.material.opacity = 0.25;
line.material.transparent = true;
scene.add( line );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `geometry` | BufferGeometry | `null` | The source geometry to convert to wireframe |

## Notes

- Unlike `EdgesGeometry`, `WireframeGeometry` renders every triangle edge regardless of face angle.
- Serialization/deserialization is not currently supported.
- Inherits from `BufferGeometry`.

## Related

- [EdgesGeometry](./EdgesGeometry.md)
