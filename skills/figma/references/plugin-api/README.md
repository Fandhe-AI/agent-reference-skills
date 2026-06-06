# Plugin API

| Name | Description | Path |
|------|-------------|------|
| manifest | `manifest.json` structure — required and optional fields | [manifest.md](./manifest.md) |
| editor-types | Editor environments: figma, figjam, dev, slides, buzz | [editor-types.md](./editor-types.md) |
| figma (global object) | Main entry point — node creation, styles, events, sub-APIs | [figma-global.md](./figma-global.md) |
| figma.ui | Iframe UI management — show, hide, resize, messaging | [figma-ui.md](./figma-ui.md) |
| figma.viewport | Canvas viewport control — center, zoom, bounds | [figma-viewport.md](./figma-viewport.md) |
| figma.clientStorage | Local persistent key-value storage (5 MB, per-plugin) | [figma-clientStorage.md](./figma-clientStorage.md) |
| figma.variables | Variables and VariableCollections — create, bind, import | [figma-variables.md](./figma-variables.md) |
| figma.codegen | Dev Mode codegen — generate callbacks and preferences | [figma-codegen.md](./figma-codegen.md) |
| figma.payments | Payment gating — status, checkout, token generation | [figma-payments.md](./figma-payments.md) |
| figma.teamLibrary | Team library variable collections and import | [figma-teamLibrary.md](./figma-teamLibrary.md) |
| figma.parameters | Quick-action parameter input and autocomplete | [figma-parameters.md](./figma-parameters.md) |
| figma.annotations | Annotation category management | [figma-annotations.md](./figma-annotations.md) |
| figma.timer | FigJam timer control (FigJam only) | [figma-timer.md](./figma-timer.md) |
| figma.util | Color/paint helpers and markdown normalization | [figma-util.md](./figma-util.md) |
| figma.constants | FigJam color palettes | [figma-constants.md](./figma-constants.md) |
| figma.textreview | Text review plugin lifecycle — enable/disable | [figma-textreview.md](./figma-textreview.md) |
| global fetch() | Network fetch in plugin sandbox — restrictions and usage | [global-fetch.md](./global-fetch.md) |
| DocumentNode | Document root — pages, findAll | [node-document.md](./node-document.md) |
| PageNode | Page — selection, guides, events, loadAsync | [node-page.md](./node-page.md) |
| FrameNode | Layout container — auto-layout, grid, prototyping | [node-frame.md](./node-frame.md) |
| GroupNode | Semantic grouping — auto-resizes to children | [node-group.md](./node-group.md) |
| ComponentNode | Reusable component — properties, instances, slots | [node-component.md](./node-component.md) |
| ComponentSetNode | Variant container — defaultVariant, property definitions | [node-component-set.md](./node-component-set.md) |
| InstanceNode | Component instance — swapComponent, setProperties, detach | [node-instance.md](./node-instance.md) |
| TextNode | Text layer — characters, range styling, font loading | [node-text.md](./node-text.md) |
| VectorNode | General shape — vectorNetwork, vectorPaths, outlineStroke | [node-vector.md](./node-vector.md) |
| BooleanOperationNode | Boolean set operations — union, subtract, intersect, exclude | [node-boolean-operation.md](./node-boolean-operation.md) |
| Shape Nodes | RectangleNode, EllipseNode, PolygonNode, StarNode, LineNode | [node-shapes.md](./node-shapes.md) |
| FigJam Nodes | SectionNode, StickyNode, ConnectorNode | [node-section-sticky-connector.md](./node-section-sticky-connector.md) |
| Slides Nodes | SlideGridNode, SlideRowNode, SlideNode | [node-slides.md](./node-slides.md) |
| Other Node Types | SliceNode, EmbedNode, MediaNode, TableNode, WidgetNode, CodeBlockNode, RemovedNode, HighlightNode, ShapeWithTextNode, StampNode, WashiTapeNode, TextPathNode, TransformGroupNode, InteractiveSlideElementNode, SlotNode | [node-other.md](./node-other.md) |
| Shared Node Properties | Properties and methods shared across node types (mixins) | [node-properties.md](./node-properties.md) |
| Data Types | RGB/RGBA, Paint, Effect, LayoutGrid, Transform, Constraints, ExportSettings, Variable, Image, FontName | [data-types.md](./data-types.md) |
