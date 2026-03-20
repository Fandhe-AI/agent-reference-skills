# Edges Examples

## Custom Edges

削除ボタン付きエッジ、双方向エッジ、セルフ接続エッジの3種類のカスタムエッジ実装例。

### コード例

```tsx
// エッジタイプの登録
const edgeTypes = {
  bidirectional: BiDirectionalEdge,
  selfconnecting: SelfConnectingEdge,
  buttonedge: ButtonEdge,
};

// 削除ボタン付きエッジ
export default function ButtonEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });
  const { setEdges } = useReactFlow();
  const onEdgeClick = () =>
    setEdges((edges) => edges.filter((edge) => edge.id !== id));

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <button
          style={{ transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)` }}
          onClick={onEdgeClick}
        >
          ×
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
```

### ポイント

- `edgeTypes` オブジェクトでカスタムエッジを登録して `ReactFlow` に渡す
- `BaseEdge` でパスとマーカーを簡単にレンダリングできる
- `EdgeLabelRenderer` でインタラクティブなコントロールをエッジ上に配置できる
- 双方向エッジは `useStore` で対向エッジを検出してパスの曲率を調整
- セルフ接続エッジはカスタムの二次ベジェパスを使用

---

## Edge Types

React Flow の4種類の組み込みエッジタイプ: `default` (bezier)、`straight`、`step`、`smoothstep`。

### コード例

```tsx
const initialEdges = [
  {
    id: '1',
    type: 'straight',
    source: '1',
    target: '2',
    label: 'straight',
  },
  {
    id: '2',
    type: 'step',
    source: '2',
    target: '3',
    label: 'step',
  },
  {
    id: '3',
    type: 'smoothstep',
    source: '3',
    target: '4',
    label: 'smoothstep',
  },
  {
    id: '4',
    type: 'bezier',
    source: '4',
    target: '5',
    label: 'bezier',
  },
];
```

### ポイント

- `type` プロパティでエッジの外観を指定する
- 同一フロー内で異なるエッジタイプを混在させられる
- `label` プロパティでエッジにテキストラベルを付けられる

---

## Edge Label Renderer

HTML divをSVGエッジの上にレンダリングするポータルコンポーネント。SVGの制約を超えたリッチなインタラクションが可能になる。

### コード例

```tsx
import { EdgeLabelRenderer, BaseEdge, getBezierPath } from '@xyflow/react';

const CustomEdge: FC<EdgeProps<Edge<{ label: string }>>> = ({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
```

### ポイント

- `<EdgeLabelRenderer>` はポータルとして動作し、SVG外に子要素をレンダリングする
- `getBezierPath()` が返す座標で CSS transform を使って正確に位置を合わせる
- マウスインタラクションが必要なラベルには `pointer-events: all` を設定する
- 通常の HTML/CSS スタイリングが SVG の制約なしに使える

---

## Edge Toolbar

エッジの上に固定表示されるツールバー。ズームに関わらずスケールが変わらない。

### コード例

```tsx
export function EdgeWithButton(props: EdgeProps) {
  const [edgePath, centerX, centerY] = getBezierPath(props);
  const { deleteElements, getEdges } = useReactFlow();

  const deleteEdge = () => {
    const edge = getEdges().find((e) => e.id === props.id);
    if (edge) deleteElements({ edges: [edge] });
  };

  return (
    <>
      <BaseEdge id={props.id} path={edgePath} />
      <EdgeToolbar edgeId={props.id} x={centerX} y={centerY} isVisible>
        <button onClick={deleteEdge}>Centered Button</button>
      </EdgeToolbar>
    </>
  );
}
```

### ポイント

- `getBezierPath()` でエッジのセンター座標を取得する
- `EdgeToolbar` の `x` と `y` props でビューポート基準の絶対位置を指定
- `isVisible` prop でツールバーの表示状態を制御
- ツールバーコンテンツはズームレベルに影響されない

---

## Floating Edges

固定ハンドルではなく、ノードの位置に合わせて接続点が動くエッジ。

### コード例

```tsx
function FloatingEdge({ id, source, target, markerEnd, style }) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });

  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}
```

### ポイント

- `getEdgeParams()` ヘルパーでノード間の交点を計算して動的に接続位置を決定
- ノードの中心から中心への直線とノード境界の交点を計算する
- `'floating'` エッジタイプとして `edgeTypes` に登録する
- 接続作成中のビジュアルフィードバック用に `FloatingConnectionLine` も実装する

---

## Simple Floating Edges

ノードの上下左右どちらかにエッジを接続させるシンプルな実装。

### コード例

```tsx
// ノードの相対位置から接続側を決定
const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);
const [edgePath] = getBezierPath({
  sourceX: sx, sourceY: sy, sourcePosition: sourcePos,
  targetX: tx, targetY: ty, targetPosition: targetPos
});
```

### ポイント

- ノード中心間の水平・垂直距離を比較してどの辺に接続するか決定
- `useInternalNode` でノードの内部情報とハンドル座標を取得
- 固定ハンドル位置不要のフレキシブルなエッジルーティングを実現

---

## Animating Edges

SVG 要素のアニメーション（animateMotion）または Web Animations API を使ったノードアニメーションの2アプローチ。

### コード例

```tsx
// アプローチ1: SVG animateMotion
export function AnimatedSVGEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <circle r="10" fill="#ff0073">
        <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}
```

### ポイント

- アニメーション中のノードは `draggable: false` を設定してアニメーションパスが壊れないようにする
- アニメーションパスとアニメーションロジックは別々の `useEffect` で管理する（エッジパス変更時のスムーズな継続のため）
- `getSmoothStepPath` または `getBezierPath` で SVG パスを生成してアニメーションターゲットにする

---

## Custom Connection Line

接続作成中に表示されるラインをカスタマイズする。ソースハンドルに応じて外観を変えることも可能。

### コード例

```tsx
// ConnectionLine.jsx
import { useConnection } from '@xyflow/react';

export default ({ fromX, fromY, toX, toY }) => {
  const { fromHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={fromHandle.id}
        strokeWidth={1.5}
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke={fromHandle.id} />
    </g>
  );
};

// App.jsx
<ReactFlow connectionLineComponent={ConnectionLine} onConnect={onConnect} />
```

### ポイント

- `connectionLineComponent` prop にカスタムコンポーネントを渡す
- `useConnection()` フックでハンドル情報にアクセスしてスタイルをカスタマイズ
- コンポーネントは SVG パスや要素でビジュアルフィードバックを提供する

---

## Delete Edge on Drop

エッジをドラッグしてハンドルなしでペインにドロップしたとき、そのエッジを削除する。

### コード例

```tsx
const DeleteEdgeDrop = () => {
  const edgeReconnectSuccessful = useRef(true);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);
};
```

### ポイント

- `useRef` で再接続の成功/失敗を追跡する
- `onReconnectStart`: ドラッグ開始時に成功フラグを `false` に設定
- `onReconnect`: 有効な接続時のみフラグを `true` に設定
- `onReconnectEnd`: 再接続失敗時（フラグが false）にエッジを削除

---

## Edge Intersection

ドラッグしたノードがエッジと重なったとき、そのエッジを分割してノードを中間に挿入する。

### コード例

```tsx
// エッジの検出 (onNodeDrag 内)
const edgeFound = document
  .elementsFromPoint(centerX, centerY)
  .find((el) => el.classList.contains('react-flow__edge-interaction'))
  ?.parentElement;

// ノードドラッグ停止時にエッジを分割
// onNodeDragStop で元エッジをドロップノードまでに再接続し、
// ドロップノードから元ターゲットへの新エッジを作成
```

### ポイント

- `defaultEdgeOptions: { interactionWidth: 75 }` でエッジの検出領域を広げる
- `document.elementsFromPoint()` でドラッグ中のノード下のエッジを特定
- `react-flow__edge-interaction` クラスでエッジ要素を識別する
- ドラッグ中はオーバーラップしたエッジを `stroke: 'black'` でハイライト

---

## Markers

エッジの端点にマーカー（矢印など）を設定する。カスタム SVG マーカーも作成可能。

### コード例

```tsx
const defaultEdges = [
  {
    id: 'A->B',
    source: 'A',
    target: 'B',
    markerEnd: { type: MarkerType.Arrow },
    label: 'default arrow',
  },
  {
    id: 'B->G',
    source: 'B',
    target: 'G',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#FF0072',
    },
  },
];

// カスタムマーカーの参照
const activeMarkerEnd = selected ? 'url(#selected-marker)' : markerEnd;
```

### ポイント

- `MarkerType.Arrow` と `MarkerType.ArrowClosed` が組み込みマーカータイプ
- `width`/`height`/`color`/`orient` でマーカー外観をカスタマイズ
- カスタムマーカーは SVG `<defs>` 内に定義して `"url(#markerId)"` で参照
- エッジの選択状態に応じてマーカーを動的に切り替えられる

---

## Multi Connection Line

選択された複数ノードから同時に接続ラインを表示して一括接続する。

### コード例

```tsx
const onConnect = useCallback(
  ({ source, target }) => {
    return setEdges((eds) =>
      nodes
        .filter((node) => node.id === source || node.selected)
        .reduce(
          (eds, node) => addEdge({ source: node.id, target }, eds),
          eds,
        ),
    );
  },
  [nodes],
);
```

### ポイント

- `onConnect` でソースノードと選択されたノード全てからエッジを作成する
- `ConnectionLine` コンポーネントで選択された全ノードからの接続ラインを描画
- `getInternalNode()` と `internalsSymbol` を使ってハンドル境界と位置を取得（内部 API）
- このハンドラがないと1本のエッジしか作成されない

---

## Reconnect Edge

既存エッジをドラッグして別のハンドルに再接続できるようにする。

### コード例

```tsx
const onReconnect = useCallback(
  (oldEdge, newConnection) =>
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
  [],
);
```

エッジの再接続可能方向を制御:

```tsx
// ソース側のみ再接続可能
{ id: '1', source: 'a', target: 'b', reconnectable: 'source' }
// ターゲット側のみ再接続可能
{ id: '2', source: 'b', target: 'c', reconnectable: 'target' }
```

### ポイント

- `onReconnect` ハンドラを定義しないとエッジはドラッグ不可
- `reconnectEdge()` ユーティリティで再接続後のエッジ状態を更新する
- `edgesReconnectable` prop (デフォルト: true) でグローバルに再接続を制御
- 個別エッジの `reconnectable` プロパティで `boolean` または `'source'`/`'target'` を設定可能

---

## Temporary Edges

接続ラインをリリースしたとき、ゴーストノードに繋がる未完成エッジを作成する。ユーザーが後でエッジをピックアップして接続を完成できる。

### コード例

```tsx
const onConnectEnd = useCallback(
  (event, connectionState) => {
    if (connectionState.isValid || connectionState.fromHandle.type === 'target') {
      return;
    }
    const id = `ghost-${Date.now()}`;
    const { clientX, clientY } =
      'changedTouches' in event ? event.changedTouches[0] : event;
    const newNode = {
      id,
      type: 'ghost',
      position: screenToFlowPosition({ x: clientX, y: clientY }),
      data: {},
    };
    const newEdge = {
      id: `${connectionState.fromNode.id}->${id}`,
      source: connectionState.fromNode.id,
      target: id,
      reconnectable: 'target',
    };
    setNodes((nodes) => nodes.concat(newNode));
    setEdges((edges) => addEdge(newEdge, edges));
  },
  [setNodes, setEdges, screenToFlowPosition],
);
```

### ポイント

- ゴーストノードは 5x5px の不可視ノードとして接続終了点に配置される
- 一時エッジは `reconnectable: 'target'` で再度ピックアップ可能にする
- 再接続が完了またはエッジが削除されたとき、ゴーストノードを削除する
- タッチとマウス両方のイベントをサポート

---

## Editable Edge

ドラッグ可能なコントロールポイントでエッジパスを変形できるルータブルなエッジ。

### ポイント

- カスタムエッジコンポーネントとドラッグ可能なコントロールポイントで実装
- スペースキーで自由描画モードに切り替えられるカスタム接続ライン
- 中間ポイントの管理でエッジパスをリアルタイムに変形できる
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要
