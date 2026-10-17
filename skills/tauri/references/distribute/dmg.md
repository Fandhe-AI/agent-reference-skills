---
source: https://v2.tauri.app/distribute/dmg/
---

# DMG

The DMG (Apple Disk Image) format is a common macOS installer file that wraps your App Bundle in a user-friendly installation window with the app icon and the Applications folder icon. It is the most common installation method for macOS applications distributed outside the App Store.

## Signature / Usage

```sh
cargo tauri build --bundles dmg
```

## Options / Props

| Config key (`bundle > macOS > dmg > ...`) | Description |
| --- | --- |
| `background` | Custom background image file (png / jpg / gif) for the installation window |
| `windowSize` | `{ "width", "height" }`; default window size is 660x400 |
| `windowPosition` | `{ "x", "y" }` initial window position |
| `appPosition` | `{ "x", "y" }` position of the app icon |
| `applicationFolderPosition` | `{ "x", "y" }` position of the Applications folder icon |

```json
{
  "bundle": {
    "macOS": {
      "dmg": {
        "background": "./images/background.png",
        "windowSize": {
          "width": 800,
          "height": 600
        },
        "windowPosition": {
          "x": 400,
          "y": 400
        },
        "appPosition": {
          "x": 180,
          "y": 220
        },
        "applicationFolderPosition": {
          "x": 480,
          "y": 220
        }
      }
    }
  }
}
```

(The source shows each option in a separate snippet; they are merged here.)

## Notes

- Run `tauri build` on a Mac.
- The official example uses `"./images/"` (a directory); `background` expects an image file path (png / jpg / gif), so a concrete file path is used here.
- Known issue: icon sizes and positions are not applied when creating DMGs on CI/CD platforms (tauri-apps/tauri#1731).
- GUI apps on macOS and Linux do not inherit `$PATH` from shell dotfiles; see the `fix-path-env-rs` crate.
- This page covers only distribution outside the App Store; see the App Bundle and App Store guides for other options.

## Related

- [macos-application-bundle](./macos-application-bundle.md)
- [app-store](./app-store.md)
- [sign-macos](./sign-macos.md)
