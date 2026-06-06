# Loading a GLTF Model

GLTFLoader を使って .gltf / .glb ファイルをシーンに読み込む。

```typescript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const loader = new GLTFLoader();

loader.load(
  '/models/scene.gltf',
  (gltf) => {
    scene.add(gltf.scene);
  },
  (progress) => {
    if (progress.total > 0) {
      console.log(`Loading: ${((progress.loaded / progress.total) * 100).toFixed(0)}%`);
    }
  },
  (error) => {
    console.error('GLTFLoader error:', error);
  },
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Notes

- `gltf.scene` が読み込んだルートオブジェクト（`THREE.Group`）で、そのまま `scene.add()` できる
- `gltf.animations` に含まれるクリップは AnimationMixer で再生する（`animating-with-animationmixer.md` 参照）
- 大きなモデルは `DRACOLoader` を組み合わせて圧縮転送できる
- CORS エラーが出る場合はサーバーで適切なヘッダーを設定する
