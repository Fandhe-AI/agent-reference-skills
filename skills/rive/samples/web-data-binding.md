# Web Data Binding

Auto-bind the default view model instance, then read, write, and observe its properties from the web JS runtime.

```html
<canvas id="canvas" width="500" height="500"></canvas>
```

```javascript
import { Rive } from "@rive-app/canvas";

let numberProperty;

const r = new Rive({
    src: "my_file.riv", // .riv with a default view model matching the property names below
    canvas: document.getElementById("canvas"),
    autoplay: true,
    autoBind: true,
    onLoad: () => {
        // Access the current instance that was auto-bound
        let vmi = r.viewModelInstance;

        // Numbers: read, write
        numberProperty = vmi.number("My Number Property");
        const numberValue = numberProperty.value;
        numberProperty.value = 10;

        // Strings
        const stringProperty = vmi.string("My String Property");
        stringProperty.value = "Hello, Rive!";

        // Booleans
        const booleanProperty = vmi.boolean("My Boolean Property");
        booleanProperty.value = true;

        // Triggers
        const triggerProperty = vmi.trigger("My Trigger Property");
        triggerProperty.trigger();

        // Observe
        numberProperty.on((event) => {
            console.log(event.data);
        });
    }
});

// Call when done: unsubscribe and release the runtime
function dispose() {
    numberProperty?.off();
    r.cleanup();
}
```

## Notes

- 原文の snippet は `on()` の直後に `off()` を呼ぶが、購読は利用中に維持し、破棄時（`dispose`）に `off()` で解除する形へ変えた
- `autoBind: true` は artboard の default view model の default instance を state machine と artboard の両方へ bind する。bind 済みインスタンスは `onLoad` 内で `r.viewModelInstance` から取得する
- プロパティは名前（`vmi.number("name")`）またはパス（`vmi.number("A/B/C")`）で参照する。値の変更は state machine / artboard が advance するまで bound 要素に反映されない
- 手動で bind する場合は `autoBind: false`（既定）にして `r.bindViewModelInstance(vmi)` を呼ぶ。複数インスタンスは `set` 系メソッドで staged した後に `bind()` を 1 回だけ呼ぶ
- `src` の `my_file.riv` はプレースホルダー。プロパティ名は実際の .riv の view model に合わせる。`stateMachine`（単数形、v2.41.0 以降）の指定を推奨する

Source: https://rive.app/docs/runtimes/web/data-binding (fetched 2026-10)
