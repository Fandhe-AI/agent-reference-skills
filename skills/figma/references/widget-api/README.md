# Widget API

| Name | Description | Path |
|------|-------------|------|
| Overview | Component-based Widget API: components, functions, hooks; destructuring pattern | [overview.md](./overview.md) |
| Manifest | `manifest.json` fields: name, widgetApi, main, documentAccess, editorType, networkAccess | [manifest.md](./manifest.md) |
| Setup Guide | tsconfig.json, jsxFactory, project structure, development workflow | [setup-guide.md](./setup-guide.md) |
| How Widgets Run | Execution model: sync rendering vs async state-update code, lifecycle | [how-widgets-run.md](./how-widgets-run.md) |
| Widget State & Multiplayer | useSyncedState vs useSyncedMap for concurrent multi-user scenarios | [widget-state-and-multiplayer.md](./widget-state-and-multiplayer.md) |
| Figma and FigJam Widgets | editorType, editor differences, FigJam-only features | [figma-figjam-widgets.md](./figma-figjam-widgets.md) |
| Handling User Events | onClick, WidgetClickEvent, async handlers, iframes | [handling-user-events.md](./handling-user-events.md) |
| Using the Plugin API | Plugin API in event handlers and useEffect; figma.showUI; restrictions | [using-the-plugin-api.md](./using-the-plugin-api.md) |
| Managing Multiple Widgets | findWidgetNodesByWidgetId, widgetSyncedState, cloneWidget | [managing-multiple-widgets.md](./managing-multiple-widgets.md) |
| register | Main entry point; registers the widget functional component | [register.md](./register.md) |
| waitForTask | Keeps widget alive for async operations (data fetching) | [waitForTask.md](./waitForTask.md) |
| colorMapToOptions | Converts FigJam color palette to color-selector options (FigJam only) | [colorMapToOptions.md](./colorMapToOptions.md) |
| useSyncedState | Persistent synced state hook; key-value, JSON-serializable, last-writer-wins | [useSyncedState.md](./useSyncedState.md) |
| useSyncedMap | Synced key-value map; per-key last-writer-wins for multiplayer merging | [useSyncedMap.md](./useSyncedMap.md) |
| useEffect | Side-effect hook for data fetching, event listeners, Plugin API access | [useEffect.md](./useEffect.md) |
| usePropertyMenu | Property menu: action, dropdown, color-selector, separator, link items | [usePropertyMenu.md](./usePropertyMenu.md) |
| useWidgetId | Returns node ID of the current widget instance for Plugin API use | [useWidgetId.md](./useWidgetId.md) |
| useStickable | Makes widget stick to nodes like a FigJam stamp (FigJam only) | [useStickable.md](./useStickable.md) |
| useStickableHost | Callback when stickables attach/detach from the widget (FigJam only) | [useStickableHost.md](./useStickableHost.md) |
| AutoLayout | Frame with auto layout; direction, spacing, padding, alignment, sizing | [AutoLayout.md](./AutoLayout.md) |
| Frame | Non-autolayout frame; children positioned with x/y coordinates | [Frame.md](./Frame.md) |
| Text | Text display; fontFamily, fontSize, fontWeight, fill, alignment, href | [Text.md](./Text.md) |
| Input | Editable text; value, onTextEditEnd, placeholder, inputBehavior | [Input.md](./Input.md) |
| Rectangle | Shape without children; fill, stroke, cornerRadius | [Rectangle.md](./Rectangle.md) |
| Ellipse | Ellipse/circle with optional arcData for pie/donut segments | [Ellipse.md](./Ellipse.md) |
| Image | Rectangle with image fill; src (URL, data URI, or ImagePaint) | [Image.md](./Image.md) |
| SVG | Renders raw SVG string on the canvas | [SVG.md](./SVG.md) |
| Line | Straight line; length, stroke, strokeCap, rotation | [Line.md](./Line.md) |
| Span | Mixed text styling inside Text; inherits parent props | [Span.md](./Span.md) |
| Fragment | Renders children without a wrapper node (like React Fragment) | [Fragment.md](./Fragment.md) |
