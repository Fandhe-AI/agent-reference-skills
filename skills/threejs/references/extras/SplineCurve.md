# SplineCurve

A curve representing a 2D spline through a series of points. Extends `Curve`.

## Signature / Usage

```js
const curve = new THREE.SplineCurve( [
	new THREE.Vector2( -10, 0 ),
	new THREE.Vector2( -5, 5 ),
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 5, -5 ),
	new THREE.Vector2( 10, 0 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const splineObject = new THREE.Line( geometry, material );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `points` | Array\<Vector2\> | `[]` | Array of 2D points defining the curve |

## Notes

- `isSplineCurve` is a readonly type-testing flag.
- 2D counterpart to `CatmullRomCurve3`; used e.g. by `Path.splineThru()`.

## Related

- [CatmullRomCurve3](./CatmullRomCurve3.md)
- [Path](./Path.md)
