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
  stateMachines: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});

// Cleanup when no longer needed
r.cleanup();
```

## Notes

- `resizeDrawingSurfaceToCanvas()` は `onLoad` コールバック内で呼び出し、デバイスピクセル比に合わせてレンダリングを鮮明にする
- `stateMachines` に State Machine 名を渡すと、State Machine が起動した状態でアニメーションが開始される
- `autoplay: true` を省略するとアニメーションは停止状態で読み込まれる
- `r.cleanup()` でメモリリソースを解放する。コンポーネントのアンマウント時・ページ離脱時に呼び出す
