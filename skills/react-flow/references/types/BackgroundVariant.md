# BackgroundVariant

Enum defining the available background pattern options for the `<Background />` component.

## 型定義

```typescript
enum BackgroundVariant {
  Lines = 'lines',
  Dots = 'dots',
  Cross = 'cross',
}
```

## 値一覧

| Value | Description |
|-------|-------------|
| `BackgroundVariant.Lines` | Renders horizontal and vertical lines pattern |
| `BackgroundVariant.Dots` | Renders a dotted grid pattern |
| `BackgroundVariant.Cross` | Renders a cross/plus symbol pattern |

## 使用例

```tsx
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';

<ReactFlow nodes={nodes} edges={edges}>
  <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
</ReactFlow>
```

## 注意点

- enum としてインポートして使う方法（`BackgroundVariant.Lines`）と、文字列リテラルで直接指定する方法（`'lines'`）の両方が使える
- `<Background />` コンポーネントの `variant` prop に渡す

## 関連

- [ColorMode](./ColorMode.md)
