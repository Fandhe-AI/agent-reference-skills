# DefaultEdgeOptions

Default property values applied to all newly created edges. Passed via the `defaultEdgeOptions` prop on `<ReactFlow />`.

## 型定義

```typescript
type DefaultEdgeOptions = {
  type?: string;
  animated?: boolean;
  hidden?: boolean;
  deletable?: boolean;
  selectable?: boolean;
  data?: Record<string, unknown>;
  markerStart?: EdgeMarkerType;
  markerEnd?: EdgeMarkerType;
  zIndex?: number;
  ariaLabel?: string;
  interactionWidth?: number;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  labelShowBg?: boolean;
  labelBgStyle?: CSSProperties;
  labelBgPadding?: [number, number];
  labelBgBorderRadius?: number;
  style?: CSSProperties;
  className?: string;
  reconnectable?: boolean | HandleType;
  focusable?: boolean;
  ariaRole?: AriaRole;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `type` | `string` | Default edge type key |
| `animated` | `boolean` | Enable animation on all edges by default |
| `hidden` | `boolean` | Default visibility state |
| `deletable` | `boolean` | Whether edges can be deleted by default |
| `selectable` | `boolean` | Whether edges can be selected by default |
| `data` | `Record<string, unknown>` | Default custom data payload |
| `markerStart` | `EdgeMarkerType` | Default marker at the beginning of edges |
| `markerEnd` | `EdgeMarkerType` | Default marker at the end of edges |
| `zIndex` | `number` | Default stacking order |
| `ariaLabel` | `string` | Default accessible label |
| `interactionWidth` | `number` | Default width of the invisible hit area |
| `label` | `ReactNode` | Default label content |
| `labelStyle` | `CSSProperties` | Default label styles |
| `labelShowBg` | `boolean` | Show background behind label by default |
| `labelBgStyle` | `CSSProperties` | Default label background styles |
| `labelBgPadding` | `[number, number]` | Default label background padding |
| `labelBgBorderRadius` | `number` | Default label background border radius |
| `style` | `CSSProperties` | Default inline styles for edges |
| `className` | `string` | Default CSS class names |
| `reconnectable` | `boolean \| HandleType` | Whether edges can be reconnected by default |
| `focusable` | `boolean` | Whether edges can receive focus by default |
| `ariaRole` | `AriaRole` | Default ARIA role (defaults to `"group"`) |

## 使用例

```tsx
import { ReactFlow, MarkerType } from '@xyflow/react';

const defaultEdgeOptions = {
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
};

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultEdgeOptions={defaultEdgeOptions}
    />
  );
}
```

## 注意点

- 全プロパティはオプション。指定した値のみデフォルトとして使用される
- 個別エッジのプロパティが `defaultEdgeOptions` より優先される
- `reconnectable` プロパティは `ReactFlow` コンポーネントの `edgesReconnectable` プロパティより優先される

## 関連

- [./Edge.md](./Edge.md)
- [./EdgeMarker.md](./EdgeMarker.md)
- [./MarkerType.md](./MarkerType.md)
