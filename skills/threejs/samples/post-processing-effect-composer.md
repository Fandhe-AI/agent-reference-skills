# Post-Processing with EffectComposer

EffectComposer にパスを積み重ねてポストプロセスエフェクトを適用する（UnrealBloomPass の例）。

```typescript
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.5, 4),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x226699, emissiveIntensity: 2 }),
));
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// EffectComposer を作成
const composer = new EffectComposer(renderer);

// 1番目: シーンをそのままレンダリング（必須）
composer.addPass(new RenderPass(scene, camera));

// 2番目: Bloom エフェクト
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.2,   // strength  — ブルームの強さ
  0.4,   // radius    — ぼかしの広がり
  0.1,   // threshold — 発光判定の輝度しきい値
);
composer.addPass(bloomPass);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight); // Composer にも伝える
});

function animate() {
  requestAnimationFrame(animate);
  composer.render(); // renderer.render() の代わりに composer.render() を呼ぶ
}

animate();
```

## Notes

- `RenderPass` は常に最初のパスとして追加する。これが基本レンダリングを担う
- `renderer.render()` は呼ばず、`composer.render()` のみを呼ぶ
- リサイズ時は `composer.setSize()` も忘れずに呼ぶ
- 他のパス例: `OutputPass`（色空間変換）、`SSAOPass`（環境遮蔽）、`OutlinePass`（輪郭線）など
