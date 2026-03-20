# Theming

React Flow provides extensive styling capabilities. Developers can use inline style props, CSS class overrides, or CSS variables to fully customize the appearance of the canvas, nodes, edges, and controls.

## 詳細説明

### Default Styles

Import the full default stylesheet to get sensible defaults (padding, border radius, animated edges):

```ts
import '@xyflow/react/dist/style.css';
```

### Base Styles (for third-party CSS frameworks)

When using Tailwind CSS or other utility frameworks, import only the base styles (required for functionality):

```ts
import '@xyflow/react/dist/base.css';
```

Base styles are **mandatory** for React Flow to function correctly. Import Tailwind **after** React Flow's styles.

### Color Modes

React Flow supports three built-in color modes via the `colorMode` prop on `<ReactFlow />`:

| Value | Description |
|-------|-------------|
| `'light'` | Light theme |
| `'dark'` | Dark theme |
| `'system'` | Follows OS preference |

When active, React Flow adds a class to the `.react-flow` root element that enables mode-specific CSS rules.

### CSS Variables

Override CSS variables via the `.react-flow` selector:

| Variable | Default |
|----------|---------|
| `--xy-node-background-color-default` | `#fff` |
| `--xy-edge-stroke-default` | `#b1b1b7` |
| `--xy-handle-background-color-default` | `#1a192b` |
| `--xy-selection-background-color-default` | `rgba(0, 89, 220, 0.08)` |

### Common CSS Classes

| Class | Target |
|-------|--------|
| `.react-flow` | Outermost container |
| `.react-flow__node` | Individual nodes |
| `.react-flow__edge` | Individual edges |
| `.react-flow__handle` | Connection handles |
| `.react-flow__controls` | Control buttons |
| `.react-flow__background` | Background component |

## コード例

```tsx
// Inline style props
const styles = {
  background: 'red',
  width: '100%',
  height: 300,
};

export default function Flow() {
  return <ReactFlow style={styles} nodes={[]} edges={[]} />;
}

// CSS variable override
// In your CSS file:
// .react-flow {
//   --xy-node-background-color-default: #ff5050;
// }

// Dark mode CSS
// .dark .react-flow__node {
//   background: #777;
//   color: white;
// }

// Color mode prop
export default function Flow() {
  return <ReactFlow colorMode="dark" nodes={[]} edges={[]} />;
}

// Tailwind CSS in custom nodes
function CustomNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}
```

## 注意点

- 内部クラス（`.react-flow__*`）の一部は機能に必要なため、上書きすると予期しないバグが発生する場合がある
- Tailwind CSS を使う場合は `@xyflow/react/dist/base.css` を先にインポートし、Tailwind を後にインポートすること
- カスタムノードにはデフォルトスタイルが適用されない。CSS Modules・Tailwind・インラインスタイルなど任意の手法を使用できる
- `colorMode="system"` は OS のカラースキーム設定に追従する

## 関連

- [custom-nodes.md](./custom-nodes.md)
- [custom-edges.md](./custom-edges.md)
- [utility-classes.md](./utility-classes.md)
