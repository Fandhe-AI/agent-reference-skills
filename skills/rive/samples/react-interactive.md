# React Interactive

Use @rive-app/react-canvas with useRive and useStateMachineInput to build an interactive animation that responds to user events.

```javascript
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: "button.riv",
    stateMachines: "Button State",
    autoplay: true,
  });

  const isHoverInput = useStateMachineInput(rive, "Button State", "isHover");

  const onMouseEnter = () => {
    if (isHoverInput) isHoverInput.value = true;
  };

  const onMouseLeave = () => {
    if (isHoverInput) isHoverInput.value = false;
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <RiveComponent />
    </div>
  );
}
```

## Notes

- `useRive` が返す `RiveComponent` をそのまま JSX に配置すると、canvas のマウント・リサイズ・クリーンアップが自動で管理される
- `useStateMachineInput` は `rive` が準備完了するまで `null` を返す。操作前に null チェックが必要
- `rive.play()` / `rive.pause()` を `RiveComponent` の `onMouseEnter` / `onMouseLeave` に直接渡すことで再生制御も可能
- `useDevicePixelRatio`（デフォルト `true`）により HiDPI 環境での鮮明なレンダリングが自動で有効になる
