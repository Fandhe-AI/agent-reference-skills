# CatmullRomCurve3

A curve representing a Catmull-Rom spline through a series of 3D points. Extends `Curve`.

## Signature / Usage

```js
const curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( -10, 0, 10 ),
  new THREE.Vector3( -5, 5, 5 ),
  new THREE.Vector3( 0, 0, 0 ),
  new THREE.Vector3( 5, -5, 5 ),
  new THREE.Vector3( 10, 0, 10 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curveObject = new THREE.Line( geometry, material );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `points` | Array\<Vector3\> | `[]` | Array of 3D points defining the curve |
| `closed` | boolean | `false` | Whether the curve forms a closed loop |
| `curveType` | `'centripetal'` \| `'chordal'` \| `'catmullrom'` | `'centripetal'` | Type of curve interpolation |
| `tension` | number | `0.5` | Curve tension; only used when `curveType` is `'catmullrom'` |

## Notes

- `isCatmullRomCurve3` is a readonly type-testing flag.
- Commonly used for smooth camera paths and organic 3D shapes (e.g. as input to `TubeGeometry`).

## Related

- [Curve](./Curve.md)
- [SplineCurve](./SplineCurve.md)
- [TubeGeometry](../geometries/TubeGeometry.md)
