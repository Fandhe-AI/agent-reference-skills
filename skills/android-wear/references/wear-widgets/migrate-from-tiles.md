# Migrating from Tiles to Widgets

Wear Widgets are positioned as the next step in the evolution of full-screen tiles: same carousel surface, but partial-height (2x1/2x2) and built on Remote Compose instead of ProtoLayout. A single service class can serve both, letting the system pick a tile or a widget depending on OS version and renderer support.

## Signature / Usage

Single-service strategy — one service class declares both intent-filter actions, so it keeps working as a tile on older Wear OS while upgrading to a widget where supported:

```xml
<service
    android:name=".snippets.widget.HelloWidgetService"
    android:exported="true"
    android:permission="com.google.android.wearable.permission.BIND_TILE_PROVIDER">

    <intent-filter>
        <action android:name="androidx.glance.wear.action.BIND_WIDGET_PROVIDER" />
        <!-- If you already have a Tile, omit the following line. -->
        <action android:name="androidx.wear.tiles.action.BIND_TILE_PROVIDER" />
    </intent-filter>
</service>
```

Keep the existing tile's service class name unchanged when adding the widget intent-filter, so the system upgrades the user's existing carousel slot in place rather than requiring a manual re-add.

## Options / Props

API mapping, ProtoLayout tiles → Remote Compose widgets:

| Tiles (ProtoLayout) | Widgets (Remote Compose) |
|---|---|
| `LayoutElementBuilders` (imperative builders) | Declarative `@RemoteComposable` functions |
| `Box` builder | `RemoteBox` |
| `Column` builder | `RemoteColumn` |
| `Text` builder | `RemoteText` |
| `Button` builder | `RemoteButton` |
| `TileService` | `GlanceWearWidgetService` |
| `onTileRequest()` callback | `GlanceWearWidget.provideWidgetData()` suspend function |
| `LoadAction` (full service round-trip) | `valueChange(...)` (renderer-local) / `pendingIntentAction { ... }` (hands off to app) |
| Full-screen layout (`mainSlot` + `bottomSlot`) | Partial-height container: `SMALL` (2x1) / `LARGE` (2x2), single `mainSlot`-equivalent content area, no dedicated action slot |
| `EdgeButton` fixed in `bottomSlot` | No equivalent — redesign as inline `RemoteButton`, whole-container `clickable()`, or content pivot |

## Notes

- Adapt the full-screen tile's `mainSlot` content into the widget's partial-height container; drop dense secondary layout that doesn't fit a glanceable 2x1/2x2 card.
- The widget provider XML's `group` attribute (`androidx.glance.wear.core.WearWidgetProviderInfo.group`) links a new widget declaration to an existing `TileService` so the system treats them as one logical surface and migrates the user's carousel slot automatically on Wear OS 7+, when running tile and widget as two separate services instead of one dual-intent-filter service.
- Renderer/OS behavior: Wear OS 3–6, and Wear OS 7 without partial-height support, fall back to showing the tile (or the widget rendered as a full-screen tile, when only a widget is declared); Wear OS 7 with partial-height support shows the widget. Test on both.
- Official migration sample: [Wear OS Samples — WearWidget](https://github.com/android/wear-os-samples/tree/main/WearWidget).
- Reason to migrate: Wear Widgets share the Glance/Remote Compose stack used for mobile home-screen widgets going forward, giving more expressive, Compose-consistent UI than ProtoLayout; ProtoLayout tiles remain supported but are the legacy surface.

## Related

- [glance-wear-widget-service](./glance-wear-widget-service.md)
- [remote-compose-layout](./remote-compose-layout.md)
- [remote-state-and-actions](./remote-state-and-actions.md)
