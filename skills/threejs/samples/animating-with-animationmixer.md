# Animating with AnimationMixer

GLTF モデルに含まれるアニメーションクリップを AnimationMixer で再生する。

```typescript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// delta time の計測に Timer を使う（Clock は r183 で非推奨）
const timer = new THREE.Timer();
timer.connect(document); // Page Visibility API を使い、非アクティブ後の巨大な delta を避ける

let mixer: THREE.AnimationMixer | null = null;

const loader = new GLTFLoader();
loader.load('/models/animated.glb', (gltf) => {
  scene.add(gltf.scene);

  // モデルに対して Mixer を作成
  mixer = new THREE.AnimationMixer(gltf.scene);

  // 最初のクリップを再生
  if (gltf.animations.length > 0) {
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
  }

  // 名前でクリップを取得する場合
  // const clip = THREE.AnimationClip.findByName(gltf.animations, 'Walk');
  // mixer.clipAction(clip).play();
});

function animate(timestamp: number) {
  requestAnimationFrame(animate);

  timer.update(timestamp); // 先に内部状態を更新してから問い合わせる
  const delta = timer.getDelta();
  // Mixer に経過秒数を渡してアニメーションを進める
  mixer?.update(delta);

  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
```

## Notes

- `THREE.Clock` は r183 で非推奨（Migration Guide 182 → 183）。`Timer` は `THREE` 名前空間から直接使える（r179 でコアへ移動）
- `timer.update(timestamp)` は 1 ステップに 1 回、`getDelta()` / `getElapsed()` の前に呼ぶ。`timestamp` はミリ秒で `requestAnimationFrame` の引数を渡す（省略時は `performance.now`）
- `timer.connect(document)` は任意。r174 以降 Page Visibility API は自動では使われない
- `mixer.clipAction(clip)` は同一クリップに対して常に同じ `AnimationAction` インスタンスを返す
- `action.fadeOut(0.5)` / `action.fadeIn(0.5)` でクロスフェード遷移が可能
- モデルを `scene` から除去するときは `mixer.stopAllAction()` と `mixer.uncacheRoot(model)` でリソースを解放する
