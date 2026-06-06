# Creating Text

Seven approaches for adding text to a three.js scene, ranging from simple HTML overlays to 3D geometry.

## Signature / Usage

### Option 5: Procedural 3D Text (TextGeometry)

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const loader = new FontLoader();
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
  const geometry = new TextGeometry('Hello three.js!', {
    font: font,
    size: 80,
    depth: 5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});
```

### Option 1: DOM + CSS (Simplest)

```html
<div id="info" style="position:absolute;top:10px;width:100%;text-align:center;z-index:100;">
  Description
</div>
```

## Options / Props

### TextGeometry parameters

| Name | Type | Description |
|------|------|-------------|
| font | THREE.Font | Font instance loaded via FontLoader |
| size | number | Size of the text |
| depth | number | Extrusion depth (thickness) |

## Notes

- **Seven methods** in order of complexity: DOM+CSS, CSS2DRenderer/CSS3DRenderer, Canvas texture, 3D model import, TextGeometry, Bitmap fonts (BMFonts), Troika text.
- `TextGeometry` requires a `THREE.Font` instance; JSON fonts are distributed with three.js under `examples/fonts/`.
- **BMFont** libraries (e.g., `three-bmfont-text`) support word-wrapping, kerning, and SDF rendering for high-quality results at scale.
- **`troika-three-text`** package supports `.TTF`/`.WOFF` directly, adds strokes/shadows, and runs font parsing in a Web Worker.
- DOM + CSS is the easiest and fastest approach; use it for HUD-style text.

## Related

- [Loading 3D Models](./loading-3d-models.md)
- [Libraries and Plugins](./libraries-and-plugins.md)
