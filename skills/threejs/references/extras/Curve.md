# Curve

Abstract base class for analytic curves that provides interpolation methods. Subclassed by `LineCurve`, `EllipseCurve`, `CatmullRomCurve3`, `CurvePath`, and others.

## Signature / Usage

```js
class CustomSinCurve extends THREE.Curve {
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin( 2 * Math.PI * t );
        const tz = 0;
        return optionalTarget.set( tx, ty, tz );
    }
}

const path = new CustomSinCurve( 10 );
const points = path.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curveObject = new THREE.Line( geometry, material );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `arcLengthDivisions` | number | `200` | Divisions used when calculating cumulative segment lengths; increase for very large curves |
| `needsUpdate` | boolean | `false` | Set to `true` after changing curve parameters to force arc length recalculation |
| `type` | string (readonly) | — | Type name used for serialization/deserialization |

## Methods

`getPoint(t, optionalTarget)` (abstract, must be implemented by subclasses), `getPointAt(u, optionalTarget)`, `getPoints(divisions)`, `getSpacedPoints(divisions)`, `getLength()`, `getLengths(divisions)`, `updateArcLengths()`, `getTangent(t, optionalTarget)`, `getTangentAt(u, optionalTarget)`, `computeFrenetFrames(segments, closed)`, `getUtoTmapping(u, distance)`, `clone()`, `copy(source)`, `toJSON()`, `fromJSON(json)`

## Notes

- Abstract base class; cannot be instantiated directly.
- `getPoint()` is abstract and must be implemented by every subclass.
- Call `updateArcLengths()` after modifying curve parameters so length-based sampling stays accurate.
- `computeFrenetFrames()` is used internally by `TubeGeometry` and `ExtrudeGeometry`.

## Related

- [CurvePath](./CurvePath.md)
- [Path](./Path.md)
- [TubeGeometry](../geometries/TubeGeometry.md)
- [ExtrudeGeometry](../geometries/ExtrudeGeometry.md)
