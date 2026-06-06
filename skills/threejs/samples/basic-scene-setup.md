# Basic Scene Setup

Scene + PerspectiveCamera + WebGLRenderer + OrbitControls の最小構成。

```typescript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update(); // enableDamping 使用時は必須
  renderer.render(scene, camera);
}

animate();
```

## Notes

- `OrbitControls` は `three/examples/jsm/controls/OrbitControls.js` からインポートする
- `enableDamping: true` を使う場合、アニメーションループ内で `controls.update()` を必ず呼ぶ
- `setPixelRatio(window.devicePixelRatio)` で HiDPI ディスプレイのぼやけを防ぐ
- `resize` イベントで `updateProjectionMatrix()` を呼ばないとアスペクト比が崩れる
