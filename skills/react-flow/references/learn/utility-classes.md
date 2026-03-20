# Utility Classes

React Flow provides three built-in CSS utility classes to control how specific elements respond to drag, pan, and scroll events on the canvas. These are particularly useful inside custom nodes and edge labels.

## 詳細説明

| Class | Effect |
|-------|--------|
| `nodrag` | Prevents the element from triggering node drag and default node selection |
| `nopan` | Prevents viewport panning when clicking and dragging within the element |
| `nowheel` | Disables canvas scroll/pan when scrolling inside the element |

These class names can be customized through React Flow's configuration props if alternative names are preferred.

## コード例

```tsx
import { NodeProps } from '@xyflow/react';

// nodrag: use for inputs, buttons, sliders inside custom nodes
export default function CustomNode(props: NodeProps) {
  return (
    <div>
      <input className="nodrag" type="range" min={0} max={100} />
    </div>
  );
}

// nopan: use for areas that should not cause viewport movement
export default function CustomNode(props: NodeProps) {
  return (
    <div className="nopan">
      <p>fixed content that won't pan the canvas...</p>
    </div>
  );
}

// nowheel: use for scrollable content inside nodes
export default function CustomNode(props: NodeProps) {
  return (
    <div className="nowheel" style={{ overflow: 'auto', height: 200 }}>
      <p>Scrollable content inside node...</p>
      <p>More content...</p>
    </div>
  );
}
```

## 注意点

- `nodrag` はドラッグの抑制だけでなく、デフォルトのノード選択も抑制する
- `nopan` はマウスイベントのバブリングを止めてキャンバスのパンを防ぐ
- `nowheel` はノード内部のスクロールリストやコンテンツエリアに使用する
- `nodrag` と `nopan` はエッジラベル（`<EdgeLabelRenderer />` 内）のインタラクティブ要素にも必要（edge-labels.md 参照）
- カスタムノードにはデフォルトスタイルがないため、Tailwind CSS・CSS Modules など任意のスタイリング手法を使用できる

## 関連

- [custom-nodes.md](./custom-nodes.md)
- [edge-labels.md](./edge-labels.md)
- [theming.md](./theming.md)
