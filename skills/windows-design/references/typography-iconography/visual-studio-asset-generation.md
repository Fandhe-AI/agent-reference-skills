# Generate App Icons Using Visual Studio

Visual Studio's Manifest Designer (Package.appxmanifest → Visual Assets tab) can generate a full set of app icon and tile images from a single source image. It's a quick way to produce an initial asset set, but scales the source image to hit each required size rather than hand-crafting each one.

## Signature / Usage

1. Open a WinUI or UWP project in Visual Studio.
2. In **Solution Explorer**, double-click `Package.appxmanifest`.
3. Select the **Visual Assets** tab.
4. Click `...` next to **Source** and choose the source image (vector/Illustrator/PDF preferred; if using a bitmap, at least 400x400 px).
5. Configure **Display Settings** (short name, tile background color, splash screen background color).
6. Click **Generate**.

## Options / Props

| Setting | Detail |
|---------|--------|
| Source | Vector-based image, `.ai`, or PDF for best results; bitmap source must be at least 400x400 px |
| Short name | App name shown on medium/wide/large tiles, if enabled |
| Tile background | Hex or named color (e.g. `#464646`); default transparent; ignored on Windows versions with theme-aware Live Tiles |
| Splash screen background | Optional hex or named color for the splash screen |

## Notes

- Doesn't generate a badge logo by default — badge logos are meant to be unique per app, not derived from the main icon set.
- Hand-crafting each icon file (per App Icon Construction) produces a more consistent result than this generator, since Visual Studio only scales the one source image.

## Related

- [App Icon Construction](./app-icon-construction.md)
- [App Icons](./app-icons.md)
