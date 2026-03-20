# Whiteboard Examples

## Eraser

ノードとエッジを消しゴムでなぞるように削除するインタラクティブなツール。SVG パスとノード矩形の交差検出を使用。

### コード例

```tsx
export function Eraser() {
  const { screenToFlowPosition, deleteElements } = useReactFlow();
  const canvas = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TimestampedPoint[]>([]);

  function handlePointerDown(e: PointerEvent) {
    isDrawing.current = true;
    // ノード矩形とエッジサンプルポイントをキャッシュ
    nodeIntersectionData.current = nodes.map((node) => ({
      id: node.id,
      rect: { x, y, width, height },
    }));
  }

  function handlePointerMove(e: PointerEvent) {
    // スクリーン座標をフロー座標に変換
    const flowPoints = points.map(([x, y]) =>
      screenToFlowPosition({ x, y })
    );
    // ノードとエッジの交差を確認
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, toBeDeleted: intersects },
      }))
    );
  }

  function handlePointerUp(e: PointerEvent) {
    deleteElements({ nodes, edges });
  }
}
```

### ポイント

- `lineSegmentsIntersect()` で線分と矩形の衝突を正確に検出する
- エッジパスは SVG の `getPointAtLength()` でサンプルポイントを抽出してポリラインとして交差テスト
- `perfect-freehand` ライブラリで滑らかなストロークをキャンバスに描画する
- `toBeDeleted` フラグで削除前に視覚的フィードバック（透明度低下）を提供
- `nopan nodrag` クラス付きのフルスクリーンキャンバスオーバーレイでパン干渉を防止

---

## Lasso Selection

フリーハンドのなげなわ形状を描いて複数ノードを選択するホワイトボードスタイルのツール。

### コード例

```tsx
export function Lasso({ partial }: { partial: boolean }) {
  const { flowToScreenPosition, setNodes } = useReactFlow();
  const { width, height, nodeLookup } = useStore();
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointRef = useRef<[number, number][]>([]);

  // ポインターイベントでなげなわパスを描画
  // ctx.isPointInPath() でノードがパス内にあるか確認
  // 選択ロジック: full モードは全コーナーが内側、partial モードは任意のコーナーが内側
}
```

### ポイント

- HTML5 Canvas API でなげなわパスをリアルタイム描画
- `ctx.isPointInPath()` でどのノードがなげなわ内に含まれるか判定
- **partial モード**: ノードの任意の部分が重なれば選択
- **full モード**: ノード全体がなげなわ内に完全に含まれる場合のみ選択
- `perfect-freehand` ライブラリで滑らかなストローク描画
- `setNodes()` で選択状態を更新する

---

## Rectangle

ドラッグ操作でフロー上に矩形ノードを描画して追加するホワイトボードツール。

### コード例

```tsx
export function RectangleTool() {
  const [start, setStart] = useState<XYPosition | null>(null);
  const [end, setEnd] = useState<XYPosition | null>(null);
  const { screenToFlowPosition, getViewport, setNodes } = useReactFlow();

  function handlePointerUp() {
    if (!start || !end) return;
    const position = screenToFlowPosition(getPosition(start, end));
    const dimension = getDimensions(start, end, getViewport().zoom);

    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'rectangle',
        position,
        ...dimension,
        data: { color: getRandomColor() },
      },
    ]);
  }
}
```

### ポイント

- `onPointerDown`/`onPointerMove`/`onPointerUp` でドラッグ操作を検出
- `screenToFlowPosition()` でスクリーン座標をフロー座標に変換する
- 新しい矩形ノードには `crypto.randomUUID()` で一意な ID を生成
- `getViewport().zoom` で現在のズームレベルを考慮してノードサイズを計算する
- 「Rectangle Mode」と「Selection Mode」を切り替えるボタンを提供

---

## Freehand Draw

フリーハンドで描いた曲線がカスタムノードに変換されてフロー内でノードとして操作できる。

### ポイント

- マウスイベントで描画パスを記録してビューポート全体にキャプチャ
- `perfect-freehand` ライブラリで生の座標を滑らかな曲線に変換
- 描画完了後に SVG パスまたはカスタムノードとして永続化する
- スクリーン座標とフローキャンバス座標間の変換を処理する
- 描画はカスタムノードとして通常の React Flow スタイリングと操作が可能
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要
