# Title bar design

The title bar sits at the top of an app on the base layer. Its purpose is to let users identify the app via its title, move the window, and minimize, maximize, or close it. This page covers the visual and behavioral specification; API-level implementation (customizing/extending the title bar in code) lives in the app-development skills.

## Options / Props

| Element | Spec | Behavior |
|------|------|------|
| Bar | Height 32px (48px if it hosts a search box or person picture). Default background is Mica; all elements go semi-transparent when the window is inactive. Colors adapt to high contrast themes (via `SystemColors`) and light/dark mode. | Empty space and non-interactive elements (e.g. the title) are draggable. Right-click/press-and-hold on non-interactive space shows the system window menu. Double-click/tap toggles maximize/restore. |
| Icon | 16x16px, vertically centered (8px top/bottom margin at 32px bar height). Placed 16px from the leading edge (LTR: left, RTL: right), or 16px right of the back button if present. | Single-click/tap shows the system window menu. Double-click/tap closes the window. |
| Title | Placed 16px from the icon or back button (or 16px from the leading edge if neither is present). Uses Segoe UI Variable (fallback Segoe UI), *Caption* text style. Truncates with an ellipsis before the icon/caption buttons ever lose full visibility. Responds to text-scaling (may grow the bar height). | Right-click/press-and-hold shows the system window menu. Double-click/tap toggles maximize/restore. |
| Caption buttons (minimize/maximize/restore/close) | Segoe Fluent icon glyphs: minimize `E921` ChromeMinimize, maximize `E922` ChromeMaximize, restore `E923` ChromeRestore, close `E8BB` ChromeClose. Maximize/restore icons have rounded corners; buttons have full-bleed backplates. | Respond to rest / hover / pressed / active / inactive states. |
| Back button (optional) | Icon `E830` ChromeBack, 16x16px, vertically centered, full-bleed backplate. Placed left of the title (LTR), 16px from the leading edge and 16px from the next element. | Responds to rest / hover / pressed / active / inactive states. |
| Search box (optional) | Centered in the window; bumps bar height to 48px; must be responsive to window-size changes. | — |
| Person picture (optional) | Placed left of the caption buttons; bumps bar height to 48px. | — |
| Tabs (optional) | When tabs are the app's main element, they occupy the title bar space with caption buttons anchored to the right. | — |

## Notes

- This is the visual/behavioral design specification. For the API used to implement a custom title bar (`AppWindowTitleBar`, `ExtendsContentIntoTitleBar`, drag/passthrough regions), see the windows-app-sdk skill; for the WinUI 3 `TitleBar` control, see windows-winui-controls.
- Caption buttons remain system-drawn even in a fully custom title bar — interactive content cannot be placed under them, only background painted behind them.
- High contrast theming is covered further in the usability-accessibility category; Mica background is covered in the color-materials category.

## Related

- [Elevation and layering](./elevation-layering.md)
- [Design principles](./design-principles.md)
