# tiles

| Name | Description | Path |
|------|-------------|------|
| TileService | Bound service tile providers extend; onTileRequest/onTileResourcesRequest, lifecycle events, manifest declaration. | [tile-service.md](./tile-service.md) |
| TileBuilders.Tile / RequestBuilders / ResourceBuilders.Resources | Core data objects: Tile, TileRequest, ResourcesRequest, Resources builders. | [tile-builders.md](./tile-builders.md) |
| DimensionBuilders | dp/sp/em/degrees/expand/weight/wrap dimension factories. | [dimensions.md](./dimensions.md) |
| ColorBuilders / TypeBuilders | ColorProp/argb and StringProp/FloatProp/StringLayoutConstraint value wrappers. | [color-and-type.md](./color-and-type.md) |
| LayoutElementBuilders (Box/Column/Row/Text/Image/Spacer/Arc) | Low-level ProtoLayout layout primitives. | [layout-elements.md](./layout-elements.md) |
| ModifiersBuilders | Clickable, Background, Padding, Border, Semantics modifiers. | [modifiers.md](./modifiers.md) |
| materialScope / primaryLayout / text / buttonGroup | Material3 DSL entry points and full-screen layout template. | [material3-layout.md](./material3-layout.md) |
| Material3 buttons | button/textButton/iconButton/imageButton/avatarButton/compactButton/edge buttons. | [material3-buttons.md](./material3-buttons.md) |
| Material3 cards and progress indicators | card/titleCard/appCard/dataCard variants, circularProgressIndicator. | [material3-cards-progress.md](./material3-cards-progress.md) |
| ActionBuilders (LaunchAction / LoadAction) | Tap actions, clickable IDs, and state-updating interactions. | [actions-and-interactivity.md](./actions-and-interactivity.md) |
| Updating tiles | freshnessIntervalMillis, TileService.getUpdater().requestUpdate(), timeline validity windows. | [updating-tiles.md](./updating-tiles.md) |
| Platform data binding | DynamicBuilders and PlatformHealthSources streaming data, state-backed dynamic values. | [platform-data.md](./platform-data.md) |
| Tile preview and debugging | @Preview, tiles-tooling, adb debug broadcasts. | [tile-preview-debugging.md](./tile-preview-debugging.md) |
