# EdgesGeometry

A helper geometry that extracts and renders the edges of another geometry based on a face-normal angle threshold. Used with `LineSegments` to display edge outlines.

## Signature / Usage

```js
const geometry = new THREE.BoxGeometry();
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges );
scene.add( line );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `geometry` | BufferGeometry | `null` | The source geometry from which edges are extracted |
| `thresholdAngle` | number | `1` | Minimum angle (degrees) between adjacent face normals for an edge to be rendered |

## Notes

- An edge is included only when the angle between the normals of the two adjoining faces exceeds `thresholdAngle`.
- Serialization/deserialization of `EdgesGeometry` is not currently supported.
- Inherits from `BufferGeometry`.

## Related

- [WireframeGeometry](./WireframeGeometry.md)
