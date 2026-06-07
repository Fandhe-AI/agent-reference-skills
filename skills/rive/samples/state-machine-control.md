# State Machine Control

Control State Machine inputs (boolean / number / trigger) from code using the web JS runtime.

```javascript
import { Rive } from "@rive-app/canvas";

const r = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();

    // Retrieve all inputs for a named state machine
    const inputs = r.stateMachineInputs("bumpy");

    // Trigger input — fires a one-shot transition
    const bumpTrigger = inputs.find((i) => i.name === "bump");
    bumpTrigger.fire();

    // Number input — set an arbitrary numeric value
    const levelInput = inputs.find((i) => i.name === "level");
    levelInput.value = 42;

    // Boolean input — toggle a state
    const isActiveInput = inputs.find((i) => i.name === "isActive");
    isActiveInput.value = true;
  },
});

// Monitor state changes
r.on("statechange", (event) => {
  console.log("current state:", event.data[0]);
});
```

## Notes

- `stateMachineInputs(name)` は State Machine がロードされた後（`onLoad` 以降）に呼び出す
- Trigger は `.fire()` で発火し、状態遷移を一度だけ起こす。Number/Boolean は `.value` プロパティへの代入で制御する
- 入力名は Rive エディター上で設定した名前と一致させる必要がある（大文字・小文字を区別する）
- `statechange` イベントで現在のステート名を取得でき、UI との同期やデバッグに使用する
