# Watch Face Designer (Figma plugin) basics

Create a Wear OS watch face by drawing a Figma frame and assigning Watch Face Designer behaviors to layers (hands, digital time, user-provided photos).

## Signature / Usage

Digital time: create a Figma text layer, enter this template as its content, then set **Behavior** to "Digital time" in the Watch Face Designer window.

```text
Hh:Mm:Ss
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Frame size | 450 x 450 units | Recommended for Wear OS; required for export to Watch Face Studio. Other sizes work too. |
| Frame fill | color | Black recommended for a battery-efficient watch face. |
| Frame name | string | Becomes the watch face name shown on users' watches. |
| Behavior: Static | layer behavior | Default; decoration only. |
| Behavior: Second hand | layer behavior | Rectangle layer rotates once per second; its bottom edge should sit on the watch face center and be horizontally centered at the start of a minute. Minute / hour hands are made similarly. |
| Behavior: Digital time | layer behavior | Text layer rendered from a template; the sidebar template guide lists available characters (for example `a` = AM/PM, used with "hour format" for 12-hour time). |
| Behavior: User-provided photo | layer behavior | Slot for a user photo; the layer image is the fallback default. |
| Photo selection: Gallery | option | User selects multiple photos; the watch cycles through them. |
| Change photo: On tap | option | Photo changes when the user taps the layer. |
| Change photo: On wrist raise | option | Photo changes every third wrist raise; not adjustable in Watch Face Designer (use the Watch Face Format `changeAfterEvery` attribute for finer control). |

## Notes

- This is the Figma-plugin based watch face authoring tool for Wear OS, distinct from Wear OS Watch Face Format XML authored by hand and from Android Studio projects.
- Any Figma font can be used for digital time; it is exported and bundled automatically. Each font has its own redistribution license terms.
- User-provided photos make the watch face available only on watches running Wear OS 6 or higher.
- A bottom slider previews different times of day; the **Reset** button (bottom-left) returns the preview to the current time.
- Figma's Snap to Geometry (on by default) shows red guidelines to help align hands.
- Source: https://developer.android.com/training/wearables/watch-face-designer/basics (page fetched 2026-10; no version pin on the site).

## Related

- [watch-face-designer-advanced](./watch-face-designer-advanced.md)
- [watch-face-designer-export](./watch-face-designer-export.md)
- [images](./images.md)
