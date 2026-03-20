# InternalNode

Extends `Node` with additional internal properties that React Flow uses for rendering and state management. Returned by certain React Flow functions and callbacks.

## 型定義

```typescript
type InternalNode<NodeType extends Node = Node> = NodeType & {
  measured: {
    width?: number;
    height?: number;
  };
  internals: {
    positionAbsolute: XYPosition;
    z: number;
    userNode: NodeType;
    handleBounds?: NodeHandleBounds;
    bounds?: Rect;
  };
};
```

## プロパティ

`Node` の全プロパティに加え、以下の内部プロパティを持つ:

| Name | Type | Description |
|------|------|-------------|
| `measured` | `{ width?: number; height?: number }` | React Flow が計測したノードの実際の寸法 |
| `measured.width` | `number` | Measured width of the node |
| `measured.height` | `number` | Measured height of the node |
| `internals` | `object` | Internal rendering state |
| `internals.positionAbsolute` | `XYPosition` | Absolute position on the canvas (accounts for parent offsets) |
| `internals.z` | `number` | Computed z-index used for rendering |
| `internals.userNode` | `NodeType` | Reference to the original user-provided node data |
| `internals.handleBounds` | `NodeHandleBounds` | Bounding boxes of all handles on the node |
| `internals.bounds` | `Rect` | Overall bounding box of the node |

## 注意点

- `InternalNode` はユーザーが直接生成するものではなく、React Flow が内部的に管理・生成する
- `useInternalNode` フックや一部のコールバック（例: `ConnectionLineComponentProps.fromNode`）で `InternalNode` が返される
- カスタムノードコンポーネントを実装する際は `NodeProps` を使用し、`InternalNode` は不要

## 関連

- [./Node.md](./Node.md)
- [./NodeProps.md](./NodeProps.md)
- [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md)
