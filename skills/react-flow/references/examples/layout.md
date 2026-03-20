# Layout Examples

## Dagre

dagre.js を使ってツリー構造のレイアウトを自動計算する。シンプルな階層グラフのレイアウトに適している。

### コード例

```tsx
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};
```

### ポイント

- 静的レイアウト: ノード/エッジ変更時は `getLayoutedElements` を再実行が必要
- dagre はノードを中心基準で配置するため、React Flow の左上基準に合わせて `width/2`、`height/2` をオフセットする
- `TB`（上→下）と `LR`（左→右）の方向切り替えをサポート
- ハンドルのソース/ターゲット位置もレイアウト方向に合わせて動的に設定

---

## ELKjs

Eclipse Layout Kernel (ELK) を使ったより高度な階層グラフレイアウト。dagre より多くの設定オプションを持つ。

### コード例

```tsx
import ELK from 'elkjs/lib/elk.bundled.js';

const elk = new ELK();

const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk.layout(graph).then((layoutedGraph) => ({
    nodes: layoutedGraph.children.map((node) => ({
      ...node,
      position: { x: node.x, y: node.y },
    })),
    edges: layoutedGraph.edges,
  }));
};
```

### ポイント

- [Eclipse ドキュメント](https://www.eclipse.org/elk/reference.html) で豊富なレイアウトオプションを参照できる
- ELKjs の出力（`x`, `y`）を React Flow の `position` プロパティに変換する
- ノードの幅・高さをハードコードして ELK の計算精度を確保する
- レイアウト計算は非同期（Promise）なのでレンダリング前に await する

---

## ELKjs Multiple Handles

複数のハンドル（ELK ではポートと呼ぶ）を使って ELKjs でエッジ交差を最小化したレイアウトを実現する。

### コード例

```tsx
// ノードデータの構造
data: {
  label: 'A',
  sourceHandles: [{ id: 'a-s-a' }, { id: 'a-s-b' }],
  targetHandles: [{ id: 'a-t-a' }],
}

// ELK 設定
ports: [...targetPorts, ...sourcePorts],
properties: {
  'org.eclipse.elk.portConstraints': 'FIXED_ORDER'
}

// ポートのサイド設定
// target: properties: { side: 'WEST' }
// source: properties: { side: 'EAST' }

const layoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.spacing.nodeNode': '40'
};
```

### ポイント

- ハンドル ID は `nodeId-source/target-id` の形式で構造化する
- `'org.eclipse.elk.portConstraints': 'FIXED_ORDER'` でポートの順序を固定する
- target ポートは `side: 'WEST'`、source ポートは `side: 'EAST'` に配置する
- `useLayoutNodes` フックで自動レイアウト計算とノード位置更新を管理

---

## Horizontal

ノードの `sourcePosition` と `targetPosition` を設定してフローの方向を制御する。水平・垂直・混合レイアウトを作れる。

### コード例

```tsx
const initialNodes = [
  {
    id: 'horizontal-1',
    sourcePosition: 'right',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: 'horizontal-2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
];
```

### ポイント

- `sourcePosition`/`targetPosition` で各ノードのハンドル位置を制御して流れの方向を決める
- `'left'`/`'right'`/`'top'`/`'bottom'` を組み合わせて混合レイアウトを作れる
- 異なる方向のノード間は `smoothstep` エッジタイプが柔軟なパスルーティングに適している

---

## Expand and Collapse

階層ツリー構造でノードの子要素を展開・折りたたむ機能を実装する。

### ポイント

- カスタム `useExpandCollapse` フックで表示ロジックを管理する
- 元のグラフ構造を維持しつつ表示すべきノードのみをレンダリング
- ノードデータに展開/折りたたみ状態を保持する
- dagre でレイアウトを自動再計算してノードの表示変更後に位置を更新
- 動的なノード追加と自動レイアウト更新をサポート
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Auto Layout

dagre、d3-hierarchy、elkjs の3種類のレイアウトエンジンを動的に切り替えられる `useAutoLayout` フックの実装。

### ポイント

- `useAutoLayout` フックは設定可能でアプリ間での再利用に設計されている
- dagre、d3-hierarchy、elkjs の3アルゴリズムをランタイムで切り替え比較可能
- 実際のアプリでは1つのレイアウトエンジンのみを選んで使用する
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Force Layout

d3-force を使った物理シミュレーションベースのレイアウト。新規ノードが既存ノードと重ならないように自動配置する。

### ポイント

- d3-force の物理シミュレーションでノード位置を自動最適化
- 新規追加ノードが既存ノードと重ならないことを保証
- フォース強度とノード間距離のパラメータをカスタマイズできる
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Dynamic Layouting

ユーザーがプレースホルダーをクリックしてノードを追加すると、d3-hierarchy で自動的にツリーレイアウトを再計算してノードをアニメーション付きで配置する。

### ポイント

- d3-hierarchy でツリー構造のノードレイアウトを自動計算
- グラフ変更時にリアルタイムでレイアウトを再計算
- ノードは CSS/transform ベースのアニメーションで新しい位置に滑らかに移動
- エッジ上の「+」ボタンでエッジの中間にノードを挿入できる
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Node Collisions

ノードドラッグ停止時に衝突検出アルゴリズムでノードの重なりを自動解消する。

### コード例

```tsx
const onNodeDragStop = useCallback(() => {
  setNodes((nds) =>
    resolveCollisions(nds, {
      maxIterations: Infinity,
      overlapThreshold: 0.5,
      margin: 15,
    }),
  );
}, [setNodes]);

// 衝突解消アルゴリズムの概要
export const resolveCollisions: CollisionAlgorithm = (
  nodes,
  { maxIterations = 50, overlapThreshold = 0.5, margin = 0 },
) => {
  const boxes = getBoxesFromNodes(nodes, margin);

  for (let iter = 0; iter <= maxIterations; iter++) {
    let moved = false;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        // 重なりを検出して最小オーバーラップ軸方向に分離
      }
    }
    if (!moved) break;
  }
};
```

### ポイント

- `onNodeDragStop` コールバックでユーザーのインタラクション後に衝突解消を実行
- `maxIterations`（反復制限）、`overlapThreshold`（感度）、`margin`（余白）を設定可能
- 繰り返し処理でカスケード衝突を解消し、重なりがなくなるまで継続
- 最小オーバーラップの軸方向にノードを分離して自然な動きを実現
