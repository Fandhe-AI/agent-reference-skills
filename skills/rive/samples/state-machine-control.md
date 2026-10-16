# State Machine Control

Control State Machine inputs (boolean / number / trigger) from code using the web JS runtime.

```javascript
import { Rive } from "@rive-app/canvas";

const r = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachine: "bumpy",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();

    // Retrieve all inputs for a named state machine (deprecated API)
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

// Monitor state changes (EventType.StateChange is deprecated)
r.on("statechange", (event) => {
  console.log("current state:", event.data[0]);
});
```

## Notes

- `stateMachine`（単数形、web v2.41.0 以降）を使う。複数形 `stateMachines` は v2.41.0 で deprecated
- `stateMachineInputs()` は deprecated（公式の Deprecated 節で data binding への移行を推奨）。動作はするが、新規は data binding（`web-data-binding.md`）を優先する
- `stateMachineInputs(name)` は `onLoad` 以降に呼び出す。ロード前は `undefined`。Trigger は `.fire()`、Number / Boolean は `.value` 代入で制御し、入力名は大文字・小文字を区別する
- `statechange` イベントの購読も v2.41.0 で deprecated（one-time の警告あり）。`on()` 自体は deprecated ではない
