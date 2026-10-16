# Post-Processing with RenderPipeline

WebGPURenderer で RenderPipeline・`pass()`・`bloom()` を組み合わせてポストプロセスを適用する。

```javascript
import * as THREE from 'three/webgpu';
import { pass } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( - 5, 2.5, - 3.5 );

const renderer = new THREE.WebGPURenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const renderPipeline = new THREE.RenderPipeline( renderer );

const scenePass = pass( scene, camera );
const scenePassColor = scenePass.getTextureNode( 'output' );

const bloomPass = bloom( scenePassColor );

renderPipeline.outputNode = scenePassColor.add( bloomPass );

function animate() {

	renderPipeline.render(); // renderer.render( scene, camera ) の代わり

}
```

## Notes

- 出典は r186 の `webgpu_postprocessing_bloom` 例と Post-Processing with WebGPURenderer マニュアル。例中の `Inspector` / `toInspector()` / MSAA 用 `config` は省略している
- `RenderPipeline` は `EffectComposer` を置き換える。import は `three/webgpu`（`three` ではない）で、`pass` は `three/tsl`、エフェクトノードは `three/addons/tsl/display/` から読み込む
- `bloomPass.threshold.value` / `.strength.value` / `.radius.value` で実行時にパラメーターを変更できる
- `PostProcessing` は r183 で `RenderPipeline` に改名（Migration Guide 182 → 183）。WebGLRenderer 向けは `post-processing-effect-composer` を参照
- ポストプロセス使用時、トーンマッピングと色空間変換はチェーン末尾で自動適用される（無効化は `renderPipeline.outputColorTransform = false`）
