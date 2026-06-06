# PBR Material with MeshStandardMaterial

MeshStandardMaterial で物理ベースレンダリング（PBR）を設定し、適切なライトで照らす。

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// PBR マテリアル
const material = new THREE.MeshStandardMaterial({
  color: 0x888888,
  roughness: 0.3,   // 0: 鏡面  1: 拡散
  metalness: 0.8,   // 0: 非金属  1: 金属
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), material);
sphere.castShadow = true;
scene.add(sphere);

// 床（影受け）
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 1 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.2;
floor.receiveShadow = true;
scene.add(floor);

// 環境光（全体の底上げ）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// 指向性ライト（影を生成）
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
scene.add(dirLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Notes

- `MeshStandardMaterial` はライトが1つもないと真っ黒になる。`AmbientLight` を最低限追加する
- `roughness` / `metalness` にテクスチャを使う場合は `roughnessMap` / `metalnessMap` プロパティに `Texture` を渡す
- 影を有効にするには `renderer.shadowMap.enabled = true`、オブジェクトに `castShadow` / `receiveShadow`、ライトに `castShadow` が全て必要
- `outputColorSpace = THREE.SRGBColorSpace` を設定しないと色が暗く見える場合がある
