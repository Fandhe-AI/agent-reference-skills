# Imports

Three.js のよく使う import パターン

## コアライブラリの import

```js
import * as THREE from 'three';
```

## OrbitControls の import

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

## GLTFLoader の import

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

## DRACOLoader の import

```js
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
```

## WebGPU レンダラーの import

```js
import * as THREE from 'three/webgpu';
```

## TSL（Three.js Shading Language）の import

```js
import * as TSL from 'three/tsl';
```

## CDN 経由での import map 設定（HTML）

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
  }
}
</script>

<script type="module">
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
</script>
```

`<version>` は実際のバージョン（例: `v0.170.0`）に置き換える。
