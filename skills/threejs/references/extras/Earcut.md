# Earcut

Implementation of the earcut polygon triangulation algorithm; a port of mapbox/earcut (https://github.com/mapbox/earcut).

## Signature / Usage

```js
new Earcut()

Earcut.triangulate( data : Array<number>, holeIndices : Array<number>, dim : number ) : Array<number>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array\<number\> | — | An array with 2D points |
| `holeIndices` | Array\<number\> | — | An array with indices defining holes |
| `dim` | number | `2` | Number of coordinates per vertex in the input array |

## Notes

- `triangulate()` returns an array representing the triangulated faces; each face is three consecutive numbers representing vertex indices.
- Source: https://threejs.org/docs/pages/Earcut.html (three.js r186, `src/extras/Earcut.js`)

## Related

- [ShapeUtils](./ShapeUtils.md)
- [Shape](./Shape.md)
