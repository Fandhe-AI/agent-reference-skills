---
name: react-flow
description: >
  React Flow (ノードベース UI / フロー図ライブラリ for React) リファレンス。
  ReactFlow コンポーネント、Node, Edge, Handle, Viewport、
  カスタムノード / エッジ、Controls / MiniMap / Background、
  レイアウトアルゴリズム (dagre, elkjs)、ドラッグ&ドロップ、エッジ接続。
user-invocable: false
model: sonnet
---

# React Flow リファレンス

React Flow ライブラリの全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/react-flow/
  SKILL.md
  references/
    learn/
      README.md
      adding-interactivity.md
      accessibility.md
      built-in-components.md
      building-a-flow.md
      computing-flows.md
      custom-edges.md
      custom-nodes.md
      devtools-and-debugging.md
      edge-labels.md
      handles.md
      hooks-providers.md
      layouting.md
      multiplayer.md
      performance.md
      ssr-ssg-configuration.md
      state-management.md
      sub-flows.md
      terms-and-definitions.md
      testing.md
      the-viewport.md
      theming.md
      typescript.md
      uncontrolled-flow.md
      utility-classes.md
      whiteboard.md
    troubleshooting/
      README.md
      common-errors.md
      migrate-to-v10.md
      migrate-to-v11.md
      migrate-to-v12.md
      remove-attribution.md
    components/
      README.md
      ReactFlow.md
      ReactFlowProvider.md
      Background.md
      Controls.md
      ControlButton.md
      MiniMap.md
      Handle.md
      Panel.md
      BaseEdge.md
      EdgeLabelRenderer.md
      EdgeText.md
      EdgeToolbar.md
      NodeResizer.md
      NodeResizeControl.md
      NodeToolbar.md
      ViewportPortal.md
    hooks/
      README.md
      useReactFlow.md
      useNodes.md
      useEdges.md
      useNodesState.md
      useEdgesState.md
      useNodesData.md
      useNodesInitialized.md
      useNodeId.md
      useNodeConnections.md
      useHandleConnections.md
      useInternalNode.md
      useConnection.md
      useOnSelectionChange.md
      useOnViewportChange.md
      useViewport.md
      useStore.md
      useStoreApi.md
      useUpdateNodeInternals.md
      useKeyPress.md
    types/
      README.md
      Node.md
      NodeChange.md
      NodeConnection.md
      NodeHandle.md
      NodeMouseHandler.md
      NodeOrigin.md
      NodeProps.md
      NodeTypes.md
      InternalNode.md
      MiniMapNodeProps.md
      Edge.md
      EdgeChange.md
      EdgeMarker.md
      EdgeMouseHandler.md
      EdgeProps.md
      EdgeTypes.md
      DefaultEdgeOptions.md
      MarkerType.md
      OnReconnect.md
      Connection.md
      ConnectionLineComponent.md
      ConnectionLineComponentProps.md
      ConnectionLineType.md
      ConnectionMode.md
      ConnectionState.md
      IsValidConnection.md
      HandleConnection.md
      OnBeforeDelete.md
      OnConnect.md
      OnConnectEnd.md
      OnConnectStart.md
      OnDelete.md
      OnEdgesChange.md
      OnEdgesDelete.md
      OnError.md
      OnInit.md
      OnMove.md
      OnNodeDrag.md
      OnNodesChange.md
      OnNodesDelete.md
      OnSelectionChangeFunc.md
      Viewport.md
      XYPosition.md
      Position.md
      Rect.md
      CoordinateExtent.md
      FitViewOptions.md
      PanelPosition.md
      PanOnScrollMode.md
      SnapGrid.md
      Align.md
      AriaLabelConfig.md
      BackgroundVariant.md
      ColorMode.md
      DeleteElements.md
      Handle.md
      KeyCode.md
      ProOptions.md
      ReactFlowInstance.md
      ReactFlowJsonObject.md
      ResizeParams.md
      SelectionDragHandler.md
      SelectionMode.md
      ZIndexMode.md
    utils/
      README.md
      addEdge.md
      applyEdgeChanges.md
      applyNodeChanges.md
      getBezierPath.md
      getConnectedEdges.md
      getIncomers.md
      getNodesBounds.md
      getOutgoers.md
      getSimpleBezierPath.md
      getSmoothStepPath.md
      getStraightPath.md
      getViewportForBounds.md
      isEdge.md
      isNode.md
      reconnectEdge.md
    examples/
      README.md
      edges.md
      grouping.md
      interaction.md
      layout.md
      misc.md
      nodes.md
      styling.md
      whiteboard.md
  samples/
    README.md
    basic-flow.md
    interactive-flow.md
    custom-nodes.md
    custom-edges.md
    state-management-zustand.md
    auto-layout-dagre.md
    sub-flows.md
    computing-flows.md
    use-react-flow-hook.md
  scripts/
    README.md
    install.md
    testing.md
    ui-components.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| 基本概念・用語を理解したい | learn | [references/learn/README.md](references/learn/README.md) |
| フロー構築・インタラクション・カスタマイズ手順を知りたい | learn | [references/learn/README.md](references/learn/README.md) |
| カスタムノード / エッジ・レイアウト・SSR を実装したい | learn | [references/learn/README.md](references/learn/README.md) |
| エラー対応・バージョンマイグレーションを行いたい | troubleshooting | [references/troubleshooting/README.md](references/troubleshooting/README.md) |
| アトリビューション（帰属表示）を削除したい | troubleshooting | [references/troubleshooting/README.md](references/troubleshooting/README.md) |
| ReactFlow, Background, Controls, MiniMap 等コンポーネントの Props を調べたい | components | [references/components/README.md](references/components/README.md) |
| Handle, NodeResizer, EdgeToolbar, Panel 等 UI コンポーネントを使いたい | components | [references/components/README.md](references/components/README.md) |
| useReactFlow, useNodes, useEdges, useStore 等フックを使いたい | hooks | [references/hooks/README.md](references/hooks/README.md) |
| ビューポート操作・選択変化・接続状態を購読したい | hooks | [references/hooks/README.md](references/hooks/README.md) |
| Node, Edge, Connection, Viewport 等の型定義を調べたい | types | [references/types/README.md](references/types/README.md) |
| イベントハンドラ型・カスタムノード / エッジ Props 型を調べたい | types | [references/types/README.md](references/types/README.md) |
| addEdge, applyNodeChanges, getBezierPath 等ユーティリティを使いたい | utils | [references/utils/README.md](references/utils/README.md) |
| ノード / エッジのグラフ探索・パス生成を行いたい | utils | [references/utils/README.md](references/utils/README.md) |
| ドラッグ & ドロップ・グルーピング・ホワイトボード等の実装例を参照したい | examples | [references/examples/README.md](references/examples/README.md) |
| dagre / elkjs レイアウトやカスタムスタイリングの実装例を参照したい | examples | [references/examples/README.md](references/examples/README.md) |
| 典型的な使い方のサンプルコードを見たい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・テスト環境セットアップを知りたい | scripts | [scripts/README.md](scripts/README.md) |
