# React Flow — Types

## Node 関連

| Name | Description | Path |
|------|-------------|------|
| `Node` | ノードのデータ構造 | [./Node.md](./Node.md) |
| `NodeChange` | ノードの変更イベント（位置、選択、追加、削除等） | [./NodeChange.md](./NodeChange.md) |
| `NodeConnection` | ノードの接続情報 | [./NodeConnection.md](./NodeConnection.md) |
| `NodeHandle` | ノードのハンドル情報 | [./NodeHandle.md](./NodeHandle.md) |
| `NodeMouseHandler` | ノードのマウスイベントハンドラ | [./NodeMouseHandler.md](./NodeMouseHandler.md) |
| `NodeOrigin` | ノードの原点位置（左上/中央等） | [./NodeOrigin.md](./NodeOrigin.md) |
| `NodeProps` | カスタムノードコンポーネントに渡される Props | [./NodeProps.md](./NodeProps.md) |
| `NodeTypes` | ノードタイプとコンポーネントのマッピング | [./NodeTypes.md](./NodeTypes.md) |
| `InternalNode` | 内部ノード（計算済み寸法・位置を含む） | [./InternalNode.md](./InternalNode.md) |
| `MiniMapNodeProps` | MiniMap のカスタムノードに渡される Props | [./MiniMapNodeProps.md](./MiniMapNodeProps.md) |

## Edge 関連

| Name | Description | Path |
|------|-------------|------|
| `Edge` | エッジのデータ構造 | [./Edge.md](./Edge.md) |
| `EdgeChange` | エッジの変更イベント（選択、追加、削除等） | [./EdgeChange.md](./EdgeChange.md) |
| `EdgeMarker` | エッジの矢印マーカー設定 | [./EdgeMarker.md](./EdgeMarker.md) |
| `EdgeMouseHandler` | エッジのマウスイベントハンドラ | [./EdgeMouseHandler.md](./EdgeMouseHandler.md) |
| `EdgeProps` | カスタムエッジコンポーネントに渡される Props | [./EdgeProps.md](./EdgeProps.md) |
| `EdgeTypes` | エッジタイプとコンポーネントのマッピング | [./EdgeTypes.md](./EdgeTypes.md) |
| `DefaultEdgeOptions` | デフォルトのエッジオプション | [./DefaultEdgeOptions.md](./DefaultEdgeOptions.md) |
| `MarkerType` | マーカーの種類（矢印、矢印閉じ等） | [./MarkerType.md](./MarkerType.md) |
| `OnReconnect` | エッジ再接続のイベントハンドラ | [./OnReconnect.md](./OnReconnect.md) |

## Connection 関連

| Name | Description | Path |
|------|-------------|------|
| `Connection` | 接続情報（ソース/ターゲットのノードとハンドル） | [./Connection.md](./Connection.md) |
| `ConnectionLineComponent` | カスタム接続線コンポーネント | [./ConnectionLineComponent.md](./ConnectionLineComponent.md) |
| `ConnectionLineComponentProps` | 接続線コンポーネントに渡される Props | [./ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md) |
| `ConnectionLineType` | 接続線の種類（ベジェ、ステップ、直線等） | [./ConnectionLineType.md](./ConnectionLineType.md) |
| `ConnectionMode` | 接続モード（Strict / Loose） | [./ConnectionMode.md](./ConnectionMode.md) |
| `ConnectionState` | 進行中の接続操作の状態 | [./ConnectionState.md](./ConnectionState.md) |
| `IsValidConnection` | 接続のバリデーション関数 | [./IsValidConnection.md](./IsValidConnection.md) |
| `HandleConnection` | ハンドルの接続情報 | [./HandleConnection.md](./HandleConnection.md) |

## イベントハンドラ

| Name | Description | Path |
|------|-------------|------|
| `OnBeforeDelete` | 削除前のバリデーションハンドラ | [./OnBeforeDelete.md](./OnBeforeDelete.md) |
| `OnConnect` | 接続完了時のハンドラ | [./OnConnect.md](./OnConnect.md) |
| `OnConnectEnd` | 接続操作終了時のハンドラ | [./OnConnectEnd.md](./OnConnectEnd.md) |
| `OnConnectStart` | 接続操作開始時のハンドラ | [./OnConnectStart.md](./OnConnectStart.md) |
| `OnDelete` | 削除完了時のハンドラ | [./OnDelete.md](./OnDelete.md) |
| `OnEdgesChange` | エッジ変更時のハンドラ | [./OnEdgesChange.md](./OnEdgesChange.md) |
| `OnEdgesDelete` | エッジ削除時のハンドラ | [./OnEdgesDelete.md](./OnEdgesDelete.md) |
| `OnError` | エラー発生時のハンドラ | [./OnError.md](./OnError.md) |
| `OnInit` | React Flow 初期化完了時のハンドラ | [./OnInit.md](./OnInit.md) |
| `OnMove` | ビューポート移動時のハンドラ | [./OnMove.md](./OnMove.md) |
| `OnNodeDrag` | ノードドラッグ時のハンドラ | [./OnNodeDrag.md](./OnNodeDrag.md) |
| `OnNodesChange` | ノード変更時のハンドラ | [./OnNodesChange.md](./OnNodesChange.md) |
| `OnNodesDelete` | ノード削除時のハンドラ | [./OnNodesDelete.md](./OnNodesDelete.md) |
| `OnSelectionChangeFunc` | 選択変更時のハンドラ | [./OnSelectionChangeFunc.md](./OnSelectionChangeFunc.md) |

## ビュー関連

| Name | Description | Path |
|------|-------------|------|
| `Viewport` | ビューポートの状態（x, y, zoom） | [./Viewport.md](./Viewport.md) |
| `XYPosition` | 2D 座標（x, y） | [./XYPosition.md](./XYPosition.md) |
| `Position` | 方向（Top, Bottom, Left, Right） | [./Position.md](./Position.md) |
| `Rect` | 矩形領域（x, y, width, height） | [./Rect.md](./Rect.md) |
| `CoordinateExtent` | 座標の範囲制限 | [./CoordinateExtent.md](./CoordinateExtent.md) |
| `FitViewOptions` | fitView メソッドのオプション | [./FitViewOptions.md](./FitViewOptions.md) |
| `PanelPosition` | パネルの配置位置 | [./PanelPosition.md](./PanelPosition.md) |
| `PanOnScrollMode` | スクロールによるパン操作のモード | [./PanOnScrollMode.md](./PanOnScrollMode.md) |
| `SnapGrid` | スナップグリッドの設定 | [./SnapGrid.md](./SnapGrid.md) |

## その他

| Name | Description | Path |
|------|-------------|------|
| `Align` | アライメント（中央揃え等） | [./Align.md](./Align.md) |
| `AriaLabelConfig` | ARIA ラベルの設定 | [./AriaLabelConfig.md](./AriaLabelConfig.md) |
| `BackgroundVariant` | 背景パターンの種類（Dots, Lines, Cross） | [./BackgroundVariant.md](./BackgroundVariant.md) |
| `ColorMode` | カラーモード（light, dark, system） | [./ColorMode.md](./ColorMode.md) |
| `DeleteElements` | 要素削除の設定 | [./DeleteElements.md](./DeleteElements.md) |
| `Handle` | ハンドルの型定義 | [./Handle.md](./Handle.md) |
| `KeyCode` | キーコードの型定義 | [./KeyCode.md](./KeyCode.md) |
| `ProOptions` | React Flow Pro のオプション | [./ProOptions.md](./ProOptions.md) |
| `ReactFlowInstance` | React Flow インスタンスのメソッドと状態 | [./ReactFlowInstance.md](./ReactFlowInstance.md) |
| `ReactFlowJsonObject` | フローの JSON シリアライゼーション形式 | [./ReactFlowJsonObject.md](./ReactFlowJsonObject.md) |
| `ResizeParams` | リサイズ操作のパラメータ | [./ResizeParams.md](./ResizeParams.md) |
| `SelectionDragHandler` | 選択範囲ドラッグのハンドラ | [./SelectionDragHandler.md](./SelectionDragHandler.md) |
| `SelectionMode` | 選択モード（Partial / Full） | [./SelectionMode.md](./SelectionMode.md) |
| `ZIndexMode` | z-index の管理モード | [./ZIndexMode.md](./ZIndexMode.md) |
