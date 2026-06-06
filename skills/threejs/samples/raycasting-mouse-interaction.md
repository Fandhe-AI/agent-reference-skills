# Raycasting for Mouse Interaction

Raycaster でポインターイベントから 3D オブジェクトのヒット検出を行う。

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// クリック対象のメッシュを複数用意
const meshes: THREE.Mesh[] = [];
for (let i = 0; i < 5; i++) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x44aa88 }),
  );
  mesh.position.x = (i - 2) * 2;
  scene.add(mesh);
  meshes.push(mesh);
}

scene.add(new THREE.AmbientLight(0xffffff, 1));

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// NDC（正規化デバイス座標）に変換
function updatePointer(event: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

let hovered: THREE.Mesh | null = null;

renderer.domElement.addEventListener('pointermove', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(meshes);

  // ホバー解除
  if (hovered && hits[0]?.object !== hovered) {
    (hovered.material as THREE.MeshStandardMaterial).color.set(0x44aa88);
    hovered = null;
  }

  // ホバー開始
  if (hits.length > 0) {
    hovered = hits[0].object as THREE.Mesh;
    (hovered.material as THREE.MeshStandardMaterial).color.set(0xffcc00);
  }
});

renderer.domElement.addEventListener('click', (event) => {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(meshes);
  if (hits.length > 0) {
    console.log('clicked:', hits[0].object.name, 'at', hits[0].point);
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Notes

- NDC 変換式: `x = (clientX / width) * 2 - 1`、`y = -(clientY / height) * 2 + 1`
- `raycaster.setFromCamera()` は毎フレームではなくイベント時のみ呼べばよい
- `intersectObjects(objects, recursive)` の第2引数を `true` にすると子孫も含めて検索する
- `hits[0].point` は交差点のワールド座標、`hits[0].distance` はカメラからの距離
