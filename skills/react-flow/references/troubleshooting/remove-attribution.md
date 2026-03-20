# Remove Attribution

React Flow はデフォルトで画面左下に "React Flow" のアトリビューション（帰属表示）を表示する。このガイドではその削除方法を説明する。

## 詳細説明

React Flow は MIT ライセンスで提供されているが、開発チームは Pro サブスクリプションの収益によってライブラリを維持している。そのため、アトリビューションを削除する前に以下の点を確認すること。

**削除が許可されるケース:**

- React Flow Pro（[https://reactflow.dev/pro](https://reactflow.dev/pro)）を購入している場合
- 個人プロジェクト（商用利用なし）の場合 ― ただし、バグ報告・スクリーンショットの共有・GitHub へのスター付けで貢献することが求められる

**削除前に検討すること:**

組織で React Flow を使用して収益を得ている場合、Pro サブスクリプションを検討する。将来的に商用利用を開始した際は、アトリビューションを再追加するか Pro プランに加入することが求められる。

## コード例

`proOptions` prop に `hideAttribution: true` を渡す。

```tsx
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Please only hide the attribution if you are subscribed to React Flow Pro
// https://reactflow.dev/pro
const proOptions = { hideAttribution: true };

function Flow({ defaultNodes, defaultEdges }) {
  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      proOptions={proOptions}
    />
  );
}
```

## 注意点

- `proOptions` オブジェクトはコンポーネント外またはメモ化して渡すこと（毎レンダーで再生成しない）
- Pro サブスクリプション未加入で商用利用する場合、アトリビューションは削除しないこと
- 将来的に商用利用を開始した場合はアトリビューションを再追加するか Pro プランに加入すること

## 関連

- [./common-errors.md](./common-errors.md)
