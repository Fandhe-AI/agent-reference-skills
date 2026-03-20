# Nodes Examples

## Custom Node

Create custom React components that function as nodes within a React Flow diagram. The classic example is a color picker node that updates the canvas background dynamically.

### コード例

```tsx
// Register custom node types
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

// Custom node component
export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>Custom Color Picker: <strong>{data.color}</strong></div>
      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />
      <Handle type="source" position={Position.Right} />
    </>
  );
});

// Pass to ReactFlow
<ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} />
```

### ポイント

- `Handle` コンポーネントで接続ポイントを設置する (target/source)
- `data` prop でコールバックや状態を渡してインタラクティブにする
- インタラクティブ要素には `nodrag` クラスを付与してドラッグを防ぐ
- `nodeTypes` オブジェクトでカスタムノードを登録してから `<ReactFlow>` に渡す

---

## Drag Handle

特定の要素のみをドラッグハンドルとして機能させ、ノードの移動を制限する。

### コード例

```tsx
// ノード設定
const initialNodes = [
  {
    id: '2',
    type: 'dragHandleNode',
    dragHandle: '.drag-handle__custom',
    position: { x: 200, y: 200 },
  },
];

// カスタムノードコンポーネント
function DragHandleNode() {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="drag-handle__label">
        Only draggable here →
        <span className="drag-handle__custom" />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
```

### ポイント

- ノードの `dragHandle` プロパティに CSS セレクター (例: `'.drag-handle__custom'`) を設定する
- そのセレクターに合致する要素のみがドラッグ可能になる
- ドラッグハンドル内で更にドラッグを無効にしたい要素には `nodrag` クラスを使う

---

## Node Resizer

カスタムノードにリサイズ機能を追加する。3つのアプローチを示す: 常時表示、選択時のみ表示、カスタムアイコン付き。

### コード例

```tsx
import { Handle, Position, NodeResizer } from '@xyflow/react';

// 基本的な NodeResizer
const ResizableNode = ({ data }) => {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

// カスタムアイコン付きリサイズコントロール
const CustomNode = ({ data }) => {
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
};
```

### ポイント

- `<NodeResizer />`: デフォルトのリサイズ UI（ドラッグハンドル付き）
- `isVisible` prop: ノード選択状態に基づいて表示を制御
- `<NodeResizeControl />`: カスタムアイコン/コントロールを使いたい場合
- `minWidth`/`minHeight`: リサイズの最小サイズ制約を設定

---

## Node Toolbar

選択されたノードの隣にツールバーを表示するコンポーネント。ズームに関わらずスケールが変わらず常に視認できる。

### コード例

```tsx
function NodeWithToolbar({ data }) {
  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
        align={data.align}
      >
        <button>cut</button>
        <button>copy</button>
        <button>paste</button>
      </NodeToolbar>
      <div>{data?.label}</div>
    </>
  );
}
```

### ポイント

- `isVisible`: `undefined` にするとノード選択時のみ表示される
- `position`: ノードの上下左右に配置 (Top / Right / Bottom / Left)
- `align`: ポジションに対するアライメント (start / center / end)
- ツールバーコンテンツはズームに影響されないため常にクリアに表示される

---

## Add Node on Edge Drop

接続ラインをペインにドロップしたとき（有効なターゲットなし）に新しいノードを作成する。

### コード例

```tsx
const onConnectEnd = useCallback(
  (event, connectionState) => {
    if (!connectionState.isValid) {
      const id = getId();
      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;
      const newNode = {
        id,
        position: screenToFlowPosition({ x: clientX, y: clientY }),
        data: { label: `Node ${id}` },
        origin: [0.5, 0.0],
      };
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) =>
        eds.concat({ id, source: connectionState.fromNode.id, target: id })
      );
    }
  },
  [screenToFlowPosition]
);
```

### ポイント

- `connectionState.isValid` が `false` のとき、有効なターゲットなしでドロップされたことを検知
- `screenToFlowPosition()` でマウス座標をフローキャンバス座標に変換する
- マウスとタッチイベント両方を `changedTouches` の確認で処理する
- `origin: [0.5, 0]` でドロップ位置にノードを中央揃えにする

---

## Connection Limit

`isConnectable` prop を使ってハンドルの接続数を制限する。

### コード例

```tsx
import { Handle, useNodeConnections } from '@xyflow/react';

const CustomHandle = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};

// 使用例: 接続を1つに制限
const CustomNode = () => {
  return (
    <div>
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
      />
      <div>← Only one edge allowed</div>
    </div>
  );
};
```

### ポイント

- `useNodeConnections` フックでハンドルの現在の接続数を取得する
- 接続数を上限と比較して `isConnectable` を動的に制御する
- `connectionCount` prop で再利用可能なカスタムハンドルを作れる

---

## Delete Middle Node

チェーン中間のノードを削除したとき、前後のノードを再接続して `a→b→c` から `b` 削除後に `a→c` にする。

### コード例

```tsx
const onNodesDelete = useCallback(
  (deleted) => {
    let remainingNodes = [...nodes];
    setEdges(
      deleted.reduce((acc, node) => {
        const incomers = getIncomers(node, remainingNodes, acc);
        const outgoers = getOutgoers(node, remainingNodes, acc);
        const connectedEdges = getConnectedEdges([node], acc);

        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({
            id: `${source}->${target}`,
            source,
            target,
          }))
        );

        remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);
        return [...remainingEdges, ...createdEdges];
      }, edges)
    );
  },
  [nodes, edges]
);
```

### ポイント

- `getIncomers`/`getOutgoers` ユーティリティで削除ノードの上流・下流を特定
- `getConnectedEdges` で削除ノードに繋がる全エッジを取得
- `flatMap` パターンで全 incomers と outgoers 間の新エッジを生成

---

## Easy Connect

小さなハンドルではなくノード全体を接続ハンドルとして機能させる。

### コード例

```tsx
import { Handle, Position, useConnection } from '@xyflow/react';

export default function CustomNode({ id }) {
  const connection = useConnection();
  const isTarget = connection.inProgress && connection.fromNode.id !== id;

  return (
    <div className="customNode">
      <div className="customNodeBody">
        {!connection.inProgress && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
          />
        )}
        {(!connection.inProgress || isTarget) && (
          <Handle
            className="customHandle"
            position={Position.Left}
            type="target"
            isConnectableStart={false}
          />
        )}
      </div>
    </div>
  );
}
```

### ポイント

- ノードボディ全体を覆う不可視の `Handle` (opacity: 0) を使う
- `useConnection()` フックで接続状態を監視し、ハンドルを条件付きレンダリング
- ソースノードと異なるか確認してセルフ接続を防ぐ
- ノード移動を維持するために明示的なドラッグハンドルが必要

---

## Intersections

ノードドラッグ中に他のノードとの重なりを検出してハイライトする。

### コード例

```tsx
const BasicFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const { getIntersectingNodes } = useReactFlow();

  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        className: intersections.includes(n.id) ? 'highlight' : '',
      }))
    );
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={initialEdges}
      onNodesChange={onNodesChange}
      onNodeDrag={onNodeDrag}
      selectNodesOnDrag={false}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};
```

### ポイント

- `useReactFlow()` から `getIntersectingNodes()` を取得する
- `onNodeDrag` コールバック内で重なりを検出し、CSS クラスを動的に付与
- `selectNodesOnDrag={false}` でドラッグ中の選択を防ぎ、交差検出に集中

---

## Proximity Connect

ノードが近づいたとき自動的にエッジを作成する。ドラッグ中は点線でプレビューを表示。

### コード例

```tsx
const MIN_DISTANCE = 150;

const getClosestEdge = useCallback((node) => {
  const { nodeLookup } = store.getState();
  const internalNode = getInternalNode(node.id);

  const closestNode = Array.from(nodeLookup.values()).reduce(
    (res, n) => {
      if (n.id !== internalNode.id) {
        const dx =
          n.internals.positionAbsolute.x -
          internalNode.internals.positionAbsolute.x;
        const dy =
          n.internals.positionAbsolute.y -
          internalNode.internals.positionAbsolute.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < res.distance && d < MIN_DISTANCE) {
          res.distance = d;
          res.node = n;
        }
      }
      return res;
    },
    { distance: Number.MAX_VALUE, node: null }
  );

  return closestNode.node ? createEdgeObject(closestNode.node, node) : null;
}, []);

const onNodeDrag = useCallback((_, node) => {
  const closeEdge = getClosestEdge(node);
  setEdges((es) => {
    const nextEdges = es.filter((e) => e.className !== 'temp');
    if (closeEdge && !edgeExists(nextEdges, closeEdge)) {
      closeEdge.className = 'temp';
      nextEdges.push(closeEdge);
    }
    return nextEdges;
  });
}, [getClosestEdge, setEdges]);
```

### ポイント

- ユークリッド距離でノード中心間の近接度を計算する
- `className: 'temp'` を付与した一時エッジでドラッグ中のプレビューを表示
- 一時エッジは `.temp .react-flow__edge-path { stroke-dasharray: 5 5; }` で点線表示
- `onNodeDragStop` で一時エッジを確定またはクリア

---

## Rotatable Node

D3 ドラッグを使って CSS transform でノードを回転させる。

### コード例

```tsx
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';

export default function RotatableNode({ id, sourcePosition, targetPosition, data }) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!rotateControlRef.current) return;
    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });
    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <div ref={rotateControlRef} className="rotatable-node__handle nodrag" />
        <div>{data?.label}</div>
        <Handle position={sourcePosition} type="source" />
        <Handle position={targetPosition} type="target" />
      </div>
    </>
  );
}
```

### ポイント

- d3-drag と d3-selection ライブラリで回転コントロールのドラッグ処理を実装
- `useUpdateNodeInternals()` を呼び出してノード回転時のハンドル位置を再計算
- 回転コントロールに `nodrag` クラスを付与して React Flow のドラッグと競合を防ぐ

---

## Node Position Animation

異なるグラフレイアウト間でノードを滑らかにアニメーションさせる。

### ポイント

- カスタム `useAnimatedNodes` フックで再利用可能なアニメーションロジックを実装
- 線形補間でノード位置をトゥイーンする
- `d3-timer` ライブラリでアニメーションタイミングを管理
- 水平・垂直レイアウト切り替えをサポート
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Stress Test

大量のノードとエッジを一度にレンダリングするパフォーマンステスト。

### コード例

```tsx
const StressFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updatePos = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        position: {
          x: Math.random() * 1500,
          y: Math.random() * 1500,
        },
      }))
    );
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      minZoom={0}
    >
      <MiniMap />
      <Controls />
      <Background />
      <Panel position="top-right">
        <button onClick={updatePos}>change pos</button>
      </Panel>
    </ReactFlow>
  );
};
```

### ポイント

- `initialElements(15, 30)` で 450+ ノードの大規模データセットを生成
- `updatePos` でランダムにノード位置を変更してレンダリングパフォーマンスをテスト
- `minZoom={0}` で全ノードを俯瞰できるズームレベルを許可

---

## Shapes

異なる幾何学的形状（円、ダイヤモンド、六角形など）を持つカスタムノードを描画する。

### ポイント

- 形状タイプに基づいて異なる SVG パスを描画する統一 Shape コンポーネントを使用
- ノードデータで形状を設定: `{ type: 'shape', data: { type: 'diamond', color: '#ff0071' }}`
- 単一ノードタイプで複数の形状バリアントを管理
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Update Node

ノードのプロパティを動的に更新する。更新のたびに新しい配列オブジェクトを作成することが必要。

### コード例

```tsx
const UpdateNode = () => {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [nodeName, setNodeName] = useState('Node 1');

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          return {
            ...node,
            data: { ...node.data, label: nodeName },
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);
};
```

### ポイント

- ノードデータを更新するにはスプレッド演算子で**新しいオブジェクト**を作成する（直接ミューテートは不可）
- ラベル変更、スタイル変更、ノードの表示/非表示の3パターンを示す
- `useEffect` で状態変化を監視してノード配列を更新する
