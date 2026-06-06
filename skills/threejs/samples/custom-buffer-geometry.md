# Custom Geometry with BufferGeometry

BufferGeometry と BufferAttribute を使ってカスタムメッシュを手動で構築する。

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 三角形1枚を定義する最小例
const geometry = new THREE.BufferGeometry();

// 頂点座標 (x, y, z) × 3頂点
const positions = new Float32Array([
   0.0,  1.0, 0.0,  // 頂点0
  -1.0, -1.0, 0.0,  // 頂点1
   1.0, -1.0, 0.0,  // 頂点2
]);

// 法線ベクトル (x, y, z) × 3頂点 — ライティングに必要
const normals = new Float32Array([
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
]);

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

// インデックスで面を構成（省略時は順番通りに三角形を構成）
geometry.setIndex([0, 1, 2]);

geometry.computeBoundingSphere();

const material = new THREE.MeshStandardMaterial({ color: 0xff6644, side: THREE.DoubleSide });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2, 4, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Notes

- `BufferAttribute` の第2引数 `itemSize` は1頂点あたりの要素数（位置・法線は `3`、UV は `2`）
- 法線を自動計算したい場合は `geometry.computeVertexNormals()` を呼ぶ（インデックスあり前提）
- 頂点を更新した後は `attribute.needsUpdate = true` をセットしてバッファを再アップロードする
- UV 座標を追加する場合は `geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))` を追加する
