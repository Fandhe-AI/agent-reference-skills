# AriaLabelConfig

Configuration object for customizing all ARIA labels used throughout React Flow, enabling localization and domain-specific accessibility text.

## 型定義

```typescript
type AriaLabelConfig = {
  node?: {
    a11yDescription?: {
      default?: string;
      keyboardDisabled?: string;
      ariaLiveMessage?: (params: { direction: string; x: number; y: number }) => string;
    };
  };
  edge?: {
    a11yDescription?: {
      default?: string;
    };
  };
  controls?: {
    ariaLabel?: string;
    zoomIn?: { ariaLabel?: string };
    zoomOut?: { ariaLabel?: string };
    fitView?: { ariaLabel?: string };
    interactive?: { ariaLabel?: string };
  };
  minimap?: {
    ariaLabel?: string;
  };
  handle?: {
    ariaLabel?: string;
  };
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `node.a11yDescription.default` | `string` | Default keyboard instructions for node selection and deletion |
| `node.a11yDescription.keyboardDisabled` | `string` | Instructions shown when keyboard controls are disabled |
| `node.a11yDescription.ariaLiveMessage` | `(params) => string` | Dynamic message announced when a node is moved |
| `edge.a11yDescription.default` | `string` | Instructions for edge selection and removal |
| `controls.ariaLabel` | `string` | Label for the controls panel |
| `controls.zoomIn.ariaLabel` | `string` | Label for the zoom-in button |
| `controls.zoomOut.ariaLabel` | `string` | Label for the zoom-out button |
| `controls.fitView.ariaLabel` | `string` | Label for the fit-view button |
| `controls.interactive.ariaLabel` | `string` | Label for the interactivity toggle button |
| `minimap.ariaLabel` | `string` | Label for the MiniMap component |
| `handle.ariaLabel` | `string` | Label for connection handles |

## 使用例

```tsx
import { ReactFlow, AriaLabelConfig } from '@xyflow/react';

const ariaLabels: AriaLabelConfig = {
  node: {
    a11yDescription: {
      default: 'ノードを選択するにはEnterまたはスペースを押してください。削除するにはDeleteを押してください。',
    },
  },
  controls: {
    zoomIn: { ariaLabel: '拡大' },
    zoomOut: { ariaLabel: '縮小' },
    fitView: { ariaLabel: '全体表示' },
  },
};

<ReactFlow
  nodes={nodes}
  edges={edges}
  ariaLabelConfig={ariaLabels}
/>
```

## 注意点

- ライブラリはデフォルトで英語のラベルを提供する
- 日本語化などローカライズが必要な場合にこの型を使用する
- `ariaLiveMessage` はノード移動時に動的に生成されるスクリーンリーダー向けメッセージ
