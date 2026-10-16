# Web Basic Setup

Load a .riv file onto a canvas element using @rive-app/canvas with minimal configuration and cleanup.

```html
<!-- index.html -->
<canvas id="canvas" width="500" height="500"></canvas>
```

```javascript
import { Rive } from "@rive-app/canvas";

const r = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  autoBind: true,
  stateMachine: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});

// Later, when the animation is no longer needed (e.g. on component unmount)
function dispose() {
  r.cleanup();
}
```

## Notes

- `resizeDrawingSurfaceToCanvas()` は `onLoad` コールバック内で呼び出し、デバイスピクセル比に合わせてレンダリングを鮮明にする
- `stateMachine`（単数形、web v2.41.0 以降）に State Machine 名を 1 つ渡す。複数形の `stateMachines` は v2.41.0 で deprecated（動作はするが one-time の警告を出し、将来のメジャーで削除予定）。`stateMachine` は `stateMachines` / `animations` より優先される
- `autoBind: true` は artboard の default ViewModelInstance を自動で data binding する（公式は `true` を推奨）。`stateMachineInputs()` は deprecated のため、入力制御は data binding を使う
- `autoplay: true` を省略するとアニメーションは停止状態で読み込まれる。`cleanup()` はロード完了後、不要になった時点（コンポーネント破棄時など）で呼び、メモリリソースを解放する
