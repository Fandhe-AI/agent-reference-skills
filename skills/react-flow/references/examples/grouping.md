# Grouping Examples

## Selection Grouping

複数ノードを選択してグループ化し、グループを解除する動的なグルーピング機能。

### ポイント

- Shift + クリックで複数ノードを選択する
- 選択中にツールバーが表示され、「Group Nodes」ボタンでグループ化できる
- 選択したグループに対して「Ungroup」ボタンで子ノードを分離できる
- グループノードはリサイズ可能で、子ノードの移動に合わせてサイズが自動調整される
- グループノードは `NodeResizer` を使ってリサイズ機能を実装
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Parent Child Relation

ノードをグループノードの上にドラッグして動的に親子関係を確立・解除する。

### ポイント

- ノードをグループノードの上にドラッグすると子ノードとして付着する
- 絶対座標から親相対座標への変換が必要（座標系の変換処理が重要）
- NodeToolbar の「Detach」ボタンで親子関係を解除できる
- ドラッグ操作中は親子関係の状態を追跡して管理する
- **Pro example**: フルソースコードは React Flow Pro サブスクリプションが必要

---

## Sub Flows

ネストされたグラフとノードのグルーピングを `parentId` と `extent: 'parent'` で実装する。

### コード例

```tsx
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 0' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Group A' },
    position: { x: 100, y: 100 },
    style: { width: 200, height: 200 },
    type: 'group',
  },
  {
    id: '2a',
    data: { label: 'Node A.1' },
    position: { x: 10, y: 50 },
    parentId: '2',
  },
  {
    id: '4a',
    data: { label: 'Node B.1' },
    position: { x: 15, y: 65 },
    parentId: '4',
    extent: 'parent',
  },
];
```

### ポイント

- `type: 'group'` でコネクションハンドルなしのコンテナノードを作成する
- `parentId` プロパティで親ノードを指定して子ノードを定義する
- `extent: 'parent'` で子ノードのドラッグを親ノードの範囲内に制限する
- 多段ネスト（グループ内グループ）もサポートされている
- グループノードの `style` で幅・高さを設定する
