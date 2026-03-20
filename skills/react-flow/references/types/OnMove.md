# OnMove

ビューポートが移動（パン・ズーム）するたびに呼び出されるコールバック型。

## 型定義

```typescript
type OnMove = (
  event: MouseEvent | TouchEvent | null,
  viewport: Viewport,
) => void;
```

`Viewport` 型の定義:

```typescript
type Viewport = {
  x: number;
  y: number;
  zoom: number;
};
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `event` | `MouseEvent \| TouchEvent \| null` | 移動をトリガーしたイベント。プログラムによる移動の場合は `null` |
| `viewport` | `Viewport` | 移動後のビューポート状態（x, y 座標とズームレベル） |

## 使用例

```tsx
import { ReactFlow, type OnMove } from '@xyflow/react';

export default function Flow() {
  const onMove: OnMove = (event, viewport) => {
    console.log(`ビューポート: x=${viewport.x}, y=${viewport.y}, zoom=${viewport.zoom}`);
  };

  return <ReactFlow onMove={onMove} />;
}
```

## 注意点

- ユーザー操作（マウス・タッチ）とプログラムによる移動（`setViewport` など）の両方でトリガーされる
- プログラムによる移動の場合、`event` は `null` になる
- 移動開始・終了を検知するには `onMoveStart` / `onMoveEnd` props を使用する
- ビューポートの変化を高頻度で処理するため、パフォーマンスに注意してスロットリングを検討する

## 関連

- [OnNodeDrag](./OnNodeDrag.md)
