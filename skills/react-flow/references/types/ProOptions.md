# ProOptions

Configuration options for React Flow Pro subscription settings, primarily controlling the attribution badge display.

## 型定義

```typescript
type ProOptions = {
  account?: string;
  hideAttribution?: boolean;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `account` | `string` | Account identifier for Pro subscribers |
| `hideAttribution` | `boolean` | Whether to hide the React Flow attribution badge |

## 使用例

```tsx
import { ReactFlow } from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  proOptions={{ hideAttribution: true }}
/>
```

## 注意点

- デフォルトでは React Flow のアトリビューションバッジ（プロジェクトへのリンク）がフローの隅に表示される
- Pro サブスクリプションの有無にかかわらず `hideAttribution: true` でバッジを非表示にできる
- アトリビューションを削除する前に [removing attribution ガイド](https://reactflow.dev/learn/troubleshooting/remove-attribution) を確認することを推奨
