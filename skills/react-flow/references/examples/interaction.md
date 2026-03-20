# Interaction Examples

## Drag and Drop

サイドバーからノードをドラッグしてフローペインにドロップして新規ノードを作成する。HTML5 DnD API、Pointer Events API、Neodrag ライブラリの3アプローチを紹介。

### コード例

```tsx
// Pointer Events API アプローチ（推奨）
const onDragStart = useCallback(
  (event: React.PointerEvent<HTMLDivElement>, onDrop: OnDropAction) => {
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setIsDragging(true);
    setDropAction(onDrop);
  },
  [setIsDragging, setDropAction]
);

const onDragEnd = useCallback(
  (event: PointerEvent) => {
    const elementUnderPointer = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
    const isDroppingOnFlow = elementUnderPointer?.closest('.react-flow');

    if (isDroppingOnFlow) {
      const flowPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      dropAction?.({ position: flowPosition });
    }
    setIsDragging(false);
  },
  [screenToFlowPosition, setIsDragging, dropAction]
);
```

### ポイント

- `screenToFlowPosition()` でビューポート座標をフローキャンバス座標に変換する
- `.react-flow` コンテナ内にドロップされたか確認してからノードを作成する
- `setPointerCapture()` でデバイスを問わず信頼性の高いドラッグトラッキングを実現
- Pointer Events API はマウスとタッチのクロスデバイス互換で推奨
- `DnDProvider` でドラッグ状態をグローバル管理し `useDnD()` でアクセス

---

## Context Menu

ノードを右クリックしたときにコンテキストメニューを表示し、複製・削除などの操作を提供する。

### コード例

```tsx
// 右クリックハンドラ
const onNodeContextMenu = useCallback(
  (event, node) => {
    event.preventDefault();
    const pane = ref.current.getBoundingClientRect();
    setMenu({
      id: node.id,
      top: event.clientY < pane.height - 200 && event.clientY,
      left: event.clientX < pane.width - 200 && event.clientX,
      right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
      bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
    });
  },
  [setMenu]
);

// メニューコンポーネント内
const duplicateNode = useCallback(() => {
  const node = getNode(id);
  addNodes({
    ...node,
    id: `${node.id}-copy`,
    position: { x: node.position.x + 50, y: node.position.y + 50 },
  });
}, [id, getNode, addNodes]);
```

### ポイント

- `event.preventDefault()` でブラウザのネイティブコンテキストメニューを無効化
- ビューポート境界を考慮して top/left/right/bottom で位置を計算しメニューがはみ出ないようにする
- `onPaneClick` でペインクリック時にメニューを閉じる
- `getNode()`、`addNodes()`、`setNodes()`、`setEdges()` を組み合わせてノード操作を実装

---

## Save and Restore

フロー図の状態を localStorage に保存し、リロード後に復元する。

### コード例

```tsx
const flowKey = 'example-flow';

const onSave = useCallback(() => {
  if (rfInstance) {
    const flow = rfInstance.toObject();
    localStorage.setItem(flowKey, JSON.stringify(flow));
  }
}, [rfInstance]);

const onRestore = useCallback(() => {
  const restoreFlow = async () => {
    const flow = JSON.parse(localStorage.getItem(flowKey));
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  };
  restoreFlow();
}, [setNodes, setViewport]);
```

### ポイント

- `rfInstance.toObject()` でノード・エッジ・ビューポートを含むシリアライズ可能なオブジェクトに変換
- `localStorage` に JSON.stringify して保存する
- 復元時はノード・エッジとビューポート座標をデフォルト値付きで復元する

---

## Undo and Redo

スナップショットベースのアプローチでフロー編集の undo/redo を実装する。

### ポイント

- カスタム `useUndoRedo` フックで過去と未来の状態スタックを管理
- 各ノード/エッジの変更時にフロー状態全体のスナップショットを作成
- Ctrl+Z（undo）と Ctrl+Shift+Z（redo）のキーボードショートカットをサポート
- ノード移動、ノード/エッジの追加・削除をトラッキング
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Copy and Paste

選択したノードとエッジをコピー・ペーストする機能の実装。

### ポイント

- Shift + クリック + ドラッグで複数ノードを選択できる
- 選択ノードとそれらに繋がるエッジを一緒にコピーする
- ペースト時は適切なオフセット位置に複製要素を配置する
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Computing Flows

`useNodesData`、`useNodeConnections`、`updateNodeData` を使ってノード間でデータを計算・受け渡しするフローを構築する。

### コード例

```tsx
// UppercaseNode - 接続されたノードのテキストを大文字に変換
function UppercaseNode({ id }: NodeProps) {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({ handleType: 'target' });
  const nodesData = useNodesData<MyNode>(connections[0]?.source);
  const textNode = isTextNode(nodesData) ? nodesData : null;

  useEffect(() => {
    updateNodeData(id, { text: textNode?.data.text.toUpperCase() });
  }, [textNode]);
  // ...
}
```

### ポイント

- `useNodesData` で接続されたノードのデータを取得する
- `useNodeConnections` でハンドルタイプ指定の接続情報を取得する
- `useEffect` で入力データの変化を監視し `updateNodeData` で出力を更新
- カスタム型ガードで型安全なデータフローを実現

---

## Connection Events

接続とエッジ再接続プロセス中に発火するイベントの順序を理解する。

### コード例

```tsx
const Flow = () => {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      onConnectStart={onConnectStart}
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      onReconnectStart={onReconnectStart}
      onReconnect={onReconnect}
      onReconnectEnd={onReconnectEnd}
    />
  );
};
```

### ポイント

- **新規接続フロー**: `onConnectStart` → `onConnect` → `onConnectEnd`
- **エッジ再接続フロー**: `onReconnectStart` → `onConnectStart` → `onReconnect` → `onConnectEnd` → `onReconnectEnd`
- `onConnect` は有効なハンドルにリリースされたときのみ発火
- `onConnectEnd` は成功・失敗に関わらず常に発火する

---

## Contextual Zoom

現在のズームレベルに応じてノードの表示内容を動的に切り替える。

### コード例

```tsx
// ズームセレクター
const zoomSelector = (s) => s.transform[2] >= 0.9;

// カスタムノード内
function ZoomNode({ data }) {
  const showContent = useStore(zoomSelector);
  return showContent ? data.content : <Placeholder />;
}
```

### ポイント

- `useStore` フックとセレクターでズーム状態を監視する（`s.transform[2]` がズームレベル）
- ズームアウト時にスケルトン UI（グレーのバー）でビジュアル階層を維持
- 手動イベントハンドラなしにビューポート状態に応じてレスポンシブな UI を実現

---

## Prevent Cycles

DFS（深さ優先探索）でグラフの循環を検出し、循環を生む接続を防ぐ。

### コード例

```tsx
const isValidConnection = useCallback(
  (connection) => {
    const nodes = getNodes();
    const edges = getEdges();
    const target = nodes.find((node) => node.id === connection.target);

    const hasCycle = (node, visited = new Set()) => {
      if (visited.has(node.id)) return false;
      visited.add(node.id);
      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    if (target.id === connection.source) return false;
    return !hasCycle(target);
  },
  [getNodes, getEdges],
);
```

### ポイント

- `isValidConnection` prop で接続前にバリデーションを実行
- `getOutgoers()` ユーティリティで下流ノードを辿って DFS を実行
- `useCallback` と `getNodes`/`getEdges` で最新のグラフ状態を参照
- ソースとターゲットが同一の場合の自己ループも明示的に防ぐ

---

## Touch Device

モバイルデバイスでのタッチによるノード接続をサポートする。2つのハンドルを順にタップして接続を作成する。

### コード例

```tsx
const TouchDeviceFlow = () => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      className="touch-flow"
      fitView
    >
      <Background />
    </ReactFlow>
  );
};
```

```css
/* ハンドルを大きくしてタッチしやすくする */
.touch-flow .react-flow__handle {
  width: 20px;
  height: 20px;
}
```

### ポイント

- `connectOnClick` prop はデフォルトで有効（タッチ接続を無効化したい場合は `false` に）
- ハンドルを 20x20px 以上に拡大してタッチターゲットを確保する
- 接続状態中にバウンスアニメーションでビジュアルフィードバックを提供
- 2ステップ接続: 1つ目のハンドルをタップ、次に接続先ハンドルをタップ

---

## Validation

`isValidConnection` prop を使って、特定のノード間のみ接続を許可する。

### コード例

```tsx
const isValidConnection = (connection) => connection.target === 'B';

const CustomInput = () => (
  <>
    <div>Only connectable with B</div>
    <Handle type="source" position={Position.Right} />
  </>
);

<ReactFlow
  nodes={nodes}
  edges={edges}
  onConnect={onConnect}
  isValidConnection={isValidConnection}
  nodeTypes={nodeTypes}
/>
```

### ポイント

- `isValidConnection` コールバックが `true` を返したときのみ接続が許可される
- `connection` オブジェクトの `target`/`source`/`sourceHandle`/`targetHandle` でバリデーションを行う
- カスタムノードにはドラッグ可能な `Handle` コンポーネントが最低1つ必要

---

## Helper Lines

ノードドラッグ時に他のノードとの水平・垂直アライメントを示すガイドラインを表示する。

### ポイント

- ドラッグしたノードが他のノードと水平・垂直に揃ったとき自動検出
- ビューポートのズームやパンに応じて正確なガイドラインを表示
- スナッピング機構でノードを整列位置に自動吸着
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Collaborative

Yjs と WebSocket を使ってリアルタイムで複数ユーザーが同時に編集できるコラボレーティブフロー。

### ポイント

- Yjs (CRDT) と y-websocket でリアルタイム状態同期を実装
- React Flow の状態管理と Yjs のコラボレーション技術を組み合わせる
- URL にルーム ID を含めてルームを共有する
- 右クリックでノードを追加でき、変更は接続中の全クライアントにリアルタイムで伝播
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要
