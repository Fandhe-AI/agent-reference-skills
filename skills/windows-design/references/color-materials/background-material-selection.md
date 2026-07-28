# Background material selection

Guidance for choosing which material (Mica, Mica Alt, Acrylic, or a solid layer brush) to use as an app's backdrop and content layers, based on Windows 11's two-layer layering-and-elevation system.

## Signature / Usage

```xaml
<!-- Base layer: Mica on the Window, content layer: LayerFillColorDefaultBrush -->
<Window.SystemBackdrop>
    <MicaBackdrop/>
</Window.SystemBackdrop>
```

## Options / Props

| Scenario | Recommended material |
|------|-------------|
| App/settings window backdrop (base layer) | Mica — prioritize showing it in the title bar via a transparent custom title bar. |
| Window backdrop with a tabbed title bar, or needing contrast between title bar and commanding areas | Mica Alt, with a commanding layer using `LayerOnMicaBaseAltFillColorDefaultBrush`. |
| Transient, light-dismiss surfaces (flyouts, context menus, popups) | Background acrylic. |
| In-app supporting UI / navigation panes that overlap scrolling content | In-app acrylic. |
| Large vertical panes that section off content without overlapping | Opaque background (avoid acrylic — prevents striping/seams). |
| Content layer sitting on a Mica/Mica Alt base | `LayerFillColorDefaultBrush` (standard pattern) or the same brush per card (card pattern). |
| Surface behind a modal dialog | Smoke (applied automatically by modal controls). |

## Notes

- Follows the Windows 11 two-layer system: a **base** layer (app foundation: menus, commands, navigation) and a **content** layer (the app's central experience), as described in Layering and elevation guidance.
- Don't apply more than one backdrop material to the same app, and don't apply backdrop material directly to a UI element — it only renders through transparent intervening layers.
- Don't place multiple acrylic panes edge-to-edge (visible seam) or use background acrylic across large background surfaces.
- All backdrop materials fall back to a solid color under High Contrast, low transparency settings, Battery Saver, or low-end hardware — design should remain legible in that fallback state.

## Related

- [Materials overview](./materials-overview.md)
- [Mica / Mica Alt](./mica.md)
- [Acrylic](./acrylic.md)
- [Smoke](./smoke.md)
