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

// delta time の計測に Clock を使う
const clock = new THREE.Clock();

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

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  // Mixer に経過秒数を渡してアニメーションを進める
  mixer?.update(delta);

  renderer.render(scene, camera);
}

animate();
```

## Notes

- `clock.getDelta()` は前回呼び出しからの経過秒数を返す。毎フレーム1回だけ呼ぶ
- `mixer.clipAction(clip)` は同一クリップに対して常に同じ `AnimationAction` インスタンスを返す
- `action.fadeOut(0.5)` / `action.fadeIn(0.5)` でクロスフェード遷移が可能
- モデルを `scene` から除去するときは `mixer.stopAllAction()` と `mixer.uncacheRoot(model)` でリソースを解放する
