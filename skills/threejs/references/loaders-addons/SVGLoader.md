# SVGLoader

Loads an SVG file and converts its paths into Three.js `Shape` objects for use with `ShapeGeometry` or extrusion.

## Signature / Usage

```js
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

const loader = new SVGLoader();
const data = await loader.loadAsync( 'data/sample.svg' );
const group = new THREE.Group();

for ( const path of data.paths ) {
    const shapes = path.toShapes();
    const material = new THREE.MeshBasicMaterial( { color: path.color, side: THREE.DoubleSide } );
    for ( const shape of shapes ) {
        const mesh = new THREE.Mesh( new THREE.ShapeGeometry( shape ), material );
        group.add( mesh );
    }
}
scene.add( group );
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultDPI` | number | `90` | DPI used for unit conversion |
| `defaultUnit` | string | `'px'` | Default unit (`'mm'`, `'cm'`, `'in'`, `'pt'`, `'pc'`, `'px'`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load SVG from URL |
| `loadAsync(url, onProgress)` | Promise\<SVGResult\> | Promise-based load |
| `parse(text)` | Object | Parse raw SVG text; returns `{ paths, xml }` |
| `SVGLoader.createShapes(shapePath)` | Shape[] | **Deprecated since r185** (use `shapePath.toShapes()`). Convert a shape path to Three.js Shape array |
| `SVGLoader.createFillMaterial(shapePath)` | MeshBasicMaterial | Creates a material for rendering the fill of the given path; `null` if the path has no fill |
| `SVGLoader.createStrokeMaterial(shapePath)` | MeshBasicMaterial | Creates a material for rendering the stroke of the given path; `null` if the path has no stroke |
| `SVGLoader.getStrokeStyle(...)` | Object | Create a stroke style descriptor from SVG properties |
| `SVGLoader.pointsToStroke(...)` | BufferGeometry | Build stroke geometry from Vector2 points |
| `SVGLoader.pointsToStrokeWithBuffers(...)` | number | Write stroke geometry into existing buffer arrays |

## Notes

- `SVGLoader.createShapes()` is deprecated in r185; use `shapePath.toShapes()` instead (https://github.com/mrdoob/three.js/pull/33503).
- Migration (r186 → r187): `Loader` gained `priority` and `cache` (HTTP cache mode) with `setPriority()` / `setCache()`; `SVGLoader` forwards them to its internal `FileLoader` (https://github.com/mrdoob/three.js/pull/34936)
- r187: `href` is also read without the `xlink` namespace, and path commands following a closing `Z` without `M` start a new subpath at the initial point.
- Source: https://threejs.org/docs/pages/SVGLoader.html (three.js r187, `examples/jsm/loaders/SVGLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [Loader](../loaders/Loader.md)
