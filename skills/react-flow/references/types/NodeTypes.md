# NodeTypes

A registry that maps node type identifier strings to their corresponding React components.

## 型定義

```typescript
type NodeTypes = {
  [key: string]: React.ComponentType<NodeProps>;
};
```

## 使用例

```tsx
import { ReactFlow, type NodeProps, type NodeTypes } from '@xyflow/react';

function TextNode({ data }: NodeProps) {
  return <div className="text-node">{data.label}</div>;
}

function ImageNode({ data }: NodeProps) {
  return <img src={data.src} alt={data.alt} />;
}

// Define outside the component or memoize to avoid unnecessary re-renders
const nodeTypes: NodeTypes = {
  text: TextNode,
  image: ImageNode,
};

export default function Flow() {
  const nodes = [
    { id: '1', type: 'text', position: { x: 0, y: 0 }, data: { label: 'Hello' } },
    { id: '2', type: 'image', position: { x: 200, y: 0 }, data: { src: '/img.png', alt: 'img' } },
  ];

  return <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />;
}
```

## 注意点

- キーはノードの `type` プロパティに対応する文字列
- 値は `NodeProps` を受け取る React コンポーネント
- `nodeTypes` オブジェクトはコンポーネントの外で定義するか `useMemo` でメモ化すること。そうしないと毎レンダリング時に再生成されノードが再マウントされる
- 組み込みタイプ (`"default"`, `"input"`, `"output"`, `"group"`) は `nodeTypes` を定義した場合でも引き続き利用可能（ただし同名のキーで上書きされる）

## 関連

- [./NodeProps.md](./NodeProps.md)
- [./Node.md](./Node.md)
