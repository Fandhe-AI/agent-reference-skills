# React Interactive

Use @rive-app/react-canvas with useRive and useStateMachineInput to build an interactive animation that responds to user events.

```javascript
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

export default function InteractiveButton() {
  const { rive, RiveComponent } = useRive({
    src: "button.riv",
    stateMachine: "Button State",
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

- `useStateMachineInput` は React v4.33.0 で deprecated（動作はするが、state machine inputs は将来のメジャーで削除予定）。新規は data binding を推奨
- `stateMachine`（単数形）を使う。複数形 `stateMachines` は deprecated（`stateMachine` に単一名を渡す）
- `useRive` が返す `RiveComponent` をそのまま JSX に配置すると、canvas のマウント・リサイズ・クリーンアップが自動で管理される
- `useStateMachineInput` は `rive` が準備完了するまで `null` を返す。操作前に null チェックが必要
