# Instanced Meshes with InstancedMesh

InstancedMesh を使って多数の同一ジオメトリを1ドローコールで描画する。

```typescript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

// 1000 個のキューブを1回のドローコールで描画
const COUNT = 1000;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x44aaff });

const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // 毎フレーム更新する場合

scene.add(instancedMesh);

// 変換行列の構成に再利用するオブジェクト（GC 削減）
const matrix = new THREE.Matrix4();
const position = new THREE.Vector3();
const quaternion = new THREE.Quaternion();
const scale = new THREE.Vector3();

for (let i = 0; i < COUNT; i++) {
  position.set(
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 60,
    (Math.random() - 0.5) * 60,
  );
  quaternion.setFromEuler(
    new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
  );
  scale.setScalar(Math.random() * 0.8 + 0.4);

  matrix.compose(position, quaternion, scale);
  instancedMesh.setMatrixAt(i, matrix);
}

// 全インスタンスのセット後に needsUpdate をセット
instancedMesh.instanceMatrix.needsUpdate = true;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Notes

- `InstancedMesh(geometry, material, count)` の `count` は上限値。実際に表示するインスタンス数は `instancedMesh.count` で後から変更できる
- 毎フレーム行列を更新する場合は `setUsage(THREE.DynamicDrawUsage)` でバッファヒントを設定する
- 各インスタンスの色を個別に設定するには `setColorAt(index, color)` を使い、更新後に `instanceColor.needsUpdate = true` をセットする
- `matrix.compose(position, quaternion, scale)` はループ内でのオブジェクト生成を避けるため、変数を事前に確保して再利用する
