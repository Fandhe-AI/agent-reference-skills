# types

| Name | Description | Path |
|------|-------------|------|
| Align | Union type for specifying the alignment of `NodeToolbar` relative to its associated node. | [Align.md](./Align.md) |
| AriaLabelConfig | Configuration object for customizing all ARIA labels used throughout React Flow, enabling localization and domain-specific accessibility text. | [AriaLabelConfig.md](./AriaLabelConfig.md) |
| BackgroundVariant | Enum defining the available background pattern options for the `<Background />` component. | [BackgroundVariant.md](./BackgroundVariant.md) |
| ColorMode | Union type controlling the color theme of the React Flow diagram. | [ColorMode.md](./ColorMode.md) |
| Connection | The minimal description of an edge between two nodes. Used during edge creation and as the basis for the `Edge` type. | [Connection.md](./Connection.md) |
| ConnectionLineComponent | A React component type for rendering a custom connection line during edge creation (while the user is dragging from a handle). | [ConnectionLineComponent.md](./ConnectionLineComponent.md) |
| ConnectionLineComponentProps | Props passed to a custom connection line component during edge creation (while the user drags from a handle). | [ConnectionLineComponentProps.md](./ConnectionLineComponentProps.md) |
| ConnectionLineType | An enum defining the visual style of the connection line rendered while creating new edges. | [ConnectionLineType.md](./ConnectionLineType.md) |
| ConnectionMode | An enum controlling how connections between nodes can be established. | [ConnectionMode.md](./ConnectionMode.md) |
| ConnectionState | A discriminated union representing the current state of an in-progress connection (edge creation) interaction. Retrieved via the `useConnection` hook. | [ConnectionState.md](./ConnectionState.md) |
| CoordinateExtent | Represents a bounding box defined by two corner points: top-left and bottom-right. Used to constrain node movement or define viewport boundaries. | [CoordinateExtent.md](./CoordinateExtent.md) |
| DefaultEdgeOptions | Default property values applied to all newly created edges. Passed via the `defaultEdgeOptions` prop on `<ReactFlow />`. | [DefaultEdgeOptions.md](./DefaultEdgeOptions.md) |
| DeleteElements | Function type for removing nodes and edges from a React Flow graph. Automatically handles connected edges and child node cleanup. | [DeleteElements.md](./DeleteElements.md) |
| Edge | Represents a connection (edge) between two nodes in a React Flow graph. | [Edge.md](./Edge.md) |
| EdgeChange | A discriminated union of all possible ways an edge can change. Used with the `onEdgesChange` callback to update flow state. | [EdgeChange.md](./EdgeChange.md) |
| EdgeMarker | Configures a visual marker (arrow or other decoration) at the start or end of an edge. | [EdgeMarker.md](./EdgeMarker.md) |
| EdgeMouseHandler | A callback type for handling mouse events on edges. Receives the mouse event and the edge that triggered it. | [EdgeMouseHandler.md](./EdgeMouseHandler.md) |
| EdgeProps | The props type for custom edge components. Use this type when implementing custom edges. | [EdgeProps.md](./EdgeProps.md) |
| EdgeTypes | A registry that maps edge type identifier strings to their corresponding React components. | [EdgeTypes.md](./EdgeTypes.md) |
| FitViewOptions | Options for customizing the behavior of the `fitView` method, including animation, zoom constraints, and target nodes. | [FitViewOptions.md](./FitViewOptions.md) |
| Handle | Type representing the attributes of a connection handle on a node, including its position, dimensions, and connection type. | [Handle.md](./Handle.md) |
| HandleConnection | Extends the base `Connection` type with an `edgeId` field. Represents a connection that is associated with a specific edge. | [HandleConnection.md](./HandleConnection.md) |
| InternalNode | Extends `Node` with additional internal properties that React Flow uses for rendering and state management. Returned by certain React Flow functions and callbacks. | [InternalNode.md](./InternalNode.md) |
| IsValidConnection | A validation function type that determines whether a connection between nodes is valid. | [IsValidConnection.md](./IsValidConnection.md) |
| KeyCode | Type for specifying keyboard key codes or combinations used to trigger interactions (e.g., node deletion, multi-selection). | [KeyCode.md](./KeyCode.md) |
| MarkerType | An enum that defines the available marker (arrow) styles for the start and end of edges. | [MarkerType.md](./MarkerType.md) |
| MiniMapNodeProps | Props for custom node components rendered inside the `MiniMap` component. | [MiniMapNodeProps.md](./MiniMapNodeProps.md) |
| Node | A node in a React Flow graph. Contains all essential information React Flow requires to manage and render a node. | [Node.md](./Node.md) |
| NodeChange | A discriminated union of all possible ways a node can change. Used with the `onNodesChange` callback to update flow state. | [NodeChange.md](./NodeChange.md) |
| NodeConnection | Extends the basic `Connection` type by adding an `edgeId` property that references the associated edge. | [NodeConnection.md](./NodeConnection.md) |
| NodeHandle | Defines handle properties for server-side rendering (SSR). Since React Flow cannot measure DOM nodes on the server, explicit handle position and dimension information must be provided. | [NodeHandle.md](./NodeHandle.md) |
| NodeMouseHandler | A callback type for handling mouse events on nodes. Receives the mouse event and the node that triggered it. | [NodeMouseHandler.md](./NodeMouseHandler.md) |
| NodeOrigin | A tuple defining the origin (anchor point) of a node, controlling how it is positioned relative to its coordinates. | [NodeOrigin.md](./NodeOrigin.md) |
| NodeProps | The props type for custom node components. Use this type when implementing custom nodes. | [NodeProps.md](./NodeProps.md) |
| NodeTypes | A registry that maps node type identifier strings to their corresponding React components. | [NodeTypes.md](./NodeTypes.md) |
| OnBeforeDelete | 削除前に呼び出されるコールバック型。削除を許可・拒否・フィルタリングできる非同期関数。 | [OnBeforeDelete.md](./OnBeforeDelete.md) |
| OnConnect | 新しいコネクションが作成されたときに呼び出されるコールバック型。 | [OnConnect.md](./OnConnect.md) |
| OnConnectEnd | コネクション操作が完了またはキャンセルされたときに呼び出されるコールバック型。 | [OnConnectEnd.md](./OnConnectEnd.md) |
| OnConnectStart | ノード間のコネクション作成を開始したときに呼び出されるコールバック型。 | [OnConnectStart.md](./OnConnectStart.md) |
| OnDelete | ノードまたはエッジが削除されたときに呼び出されるコールバック型。 | [OnDelete.md](./OnDelete.md) |
| OnEdgesChange | エッジへの変更（追加・削除・選択など）が発生したときに呼び出されるコールバック型。 | [OnEdgesChange.md](./OnEdgesChange.md) |
| OnEdgesDelete | エッジが削除されたときに呼び出されるコールバック型。 | [OnEdgesDelete.md](./OnEdgesDelete.md) |
| OnError | React Flow 内でエラーが発生したときに呼び出されるコールバック型。 | [OnError.md](./OnError.md) |
| OnInit | ReactFlow コンポーネントの初期化完了時に呼び出されるコールバック型。 | [OnInit.md](./OnInit.md) |
| OnMove | ビューポートが移動（パン・ズーム）するたびに呼び出されるコールバック型。 | [OnMove.md](./OnMove.md) |
| OnNodeDrag | ノードがドラッグされているときに呼び出されるコールバック型。 | [OnNodeDrag.md](./OnNodeDrag.md) |
| OnNodesChange | ノードへの変更（移動・選択・追加・削除など）が発生したときに呼び出されるコールバック型。 | [OnNodesChange.md](./OnNodesChange.md) |
| OnNodesDelete | ノードが削除されたときに呼び出されるコールバック型。 | [OnNodesDelete.md](./OnNodesDelete.md) |
| OnReconnect | A callback type invoked when an existing edge is reconnected to a different node or handle. | [OnReconnect.md](./OnReconnect.md) |
| OnSelectionChangeFunc | ノードまたはエッジの選択状態が変化したときに呼び出されるコールバック型。 | [OnSelectionChangeFunc.md](./OnSelectionChangeFunc.md) |
| PanelPosition | Union type for positioning UI panels (MiniMap, Controls, etc.) within the React Flow viewport. Supports corner and center-edge positions. | [PanelPosition.md](./PanelPosition.md) |
| PanOnScrollMode | Enum that controls the directional panning behavior of the viewport when the user scrolls. | [PanOnScrollMode.md](./PanOnScrollMode.md) |
| Position | Enum for specifying the side of a node where handles and edges connect. Less precise than `PanelPosition`, used primarily for edges and handles. | [Position.md](./Position.md) |
| ProOptions | Configuration options for React Flow Pro subscription settings, primarily controlling the attribution badge display. | [ProOptions.md](./ProOptions.md) |
| ReactFlowInstance | Object providing methods to programmatically query and manipulate flow state. Accessed via the `useReactFlow` hook or the `onInit` callback. | [ReactFlowInstance.md](./ReactFlowInstance.md) |
| ReactFlowJsonObject | A JSON-compatible representation of an entire React Flow diagram, including nodes, edges, and viewport state. Used for persistence and restoration. | [ReactFlowJsonObject.md](./ReactFlowJsonObject.md) |
| Rect | Represents a rectangle in two-dimensional space with both dimensions and a position. | [Rect.md](./Rect.md) |
| ResizeParams | Type representing the positional and dimensional parameters emitted during node resize events from the `<NodeResizer />` component. | [ResizeParams.md](./ResizeParams.md) |
| SelectionDragHandler | Callback type for handling drag events when multiple selected nodes are moved together. | [SelectionDragHandler.md](./SelectionDragHandler.md) |
| SelectionMode | Enum controlling how nodes are selected when drawing a selection rectangle — whether partial overlap or full containment is required. | [SelectionMode.md](./SelectionMode.md) |
| SnapGrid | A two-element tuple defining the horizontal and vertical grid spacing for node snapping. | [SnapGrid.md](./SnapGrid.md) |
| Viewport | Represents the current view state of a React Flow canvas, tracking both position and zoom level within the internal coordinate system. | [Viewport.md](./Viewport.md) |
| XYPosition | Represents a two-dimensional coordinate position using x and y numeric values. All positions in React Flow are stored in this format. | [XYPosition.md](./XYPosition.md) |
| ZIndexMode | Union type specifying how React Flow automatically manages z-index (stacking order) of nodes and edges. | [ZIndexMode.md](./ZIndexMode.md) |
