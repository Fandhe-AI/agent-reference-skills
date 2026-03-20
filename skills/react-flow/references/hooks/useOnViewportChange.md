# useOnViewportChange

パン・ズームなどのビューポート変化に対して開始・変化中・終了の各フェーズでコールバックを登録する。

## Signature

```ts
useOnViewportChange(callbacks: {
  onStart?: (viewport: Viewport) => void;
  onChange?: (viewport: Viewport) => void;
  onEnd?: (viewport: Viewport) => void;
}): void
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `onStart` | `(viewport: Viewport) => void` | ビューポートの変化が始まった時に呼ばれる |
| `onChange` | `(viewport: Viewport) => void` | ビューポートが変化するたびに呼ばれる |
| `onEnd` | `(viewport: Viewport) => void` | ビューポートの変化が終わった時に呼ばれる |

`Viewport` 型は `{ x: number; y: number; zoom: number }` を持つ。

## Returns

`void`

## 使用例

```tsx
import { useOnViewportChange } from '@xyflow/react';

function ViewportChangeLogger() {
  useOnViewportChange({
    onStart: (viewport) => console.log('start', viewport),
    onChange: (viewport) => console.log('change', viewport),
    onEnd: (viewport) => console.log('end', viewport),
  });

  return null;
}
```

## 注意点

- `<ReactFlowProvider>` または `<ReactFlow>` の子コンポーネント内でのみ使用可能
- 3つのコールバックはすべて省略可能

## 関連

- [useViewport.md](./useViewport.md)
- [useReactFlow.md](./useReactFlow.md)
