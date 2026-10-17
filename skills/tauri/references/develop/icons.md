---
source: https://v2.tauri.app/develop/icons/
---

# App Icons

Tauri ships with a default iconset based on its logo, which is not what you want when shipping. The `icon` command takes an input file (`./app-icon.png` by default) and creates all icons needed for the various platforms.

## Signature / Usage

```sh
npm run tauri icon
cargo tauri icon
```

```console
> pnpm tauri icon --help

Generate various icons for all major platforms

Usage: pnpm run tauri icon [OPTIONS] [INPUT]

Arguments:
  [INPUT]  Path to the source icon (squared PNG or SVG file with transparency) [default: ./app-icon.png]

Options:
  -o, --output <OUTPUT>        Output directory. Default: 'icons' directory next to the tauri.conf.json file
  -v, --verbose...             Enables verbose logging
  -p, --png <PNG>              Custom PNG icon sizes to generate. When set, the default icons are not generated
      --ios-color <IOS_COLOR>  The background color of the iOS icon - string as defined in the W3C's CSS Color Module Level 4 <https://www.w3.org/TR/css-color-4/> [default: #fff]
  -h, --help                   Print help
  -V, --version                Print version
```

Desktop icons are placed in `src-tauri/icons` by default and included in the built app automatically. To source icons from a different location, edit `tauri.conf.json`:

```json
{
  "bundle": {
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ]
  }
}
```

Mobile icons are placed directly into the Xcode and Android Studio projects.

### Creating icons manually

- `icon.icns`: macOS. The required layer sizes and names for the `icns` file are described in the Tauri repo (`tooling/cli/src/helpers/icns.json` on the `1.x` branch).
- `icon.ico`: Windows. Must include layers for 16, 24, 32, 48, 64 and 256 pixels. For optimal display of the ICO image in development, the 32px layer should be the first layer.
- `*.png`: Linux. Width == height, RGBA (RGB + Transparency), 32 bit per pixel (8 bit per channel). Commonly expected desktop sizes are 32, 128, 256 and 512 pixels. Recommended to at least match the output of `tauri icon`: `32x32.png`, `128x128.png`, `128x128@2x.png` and `icon.png`.
- `Square*Logo.png` and `StoreLogo.png`: currently unused but intended for AppX / MS Store targets.

#### Android

PNG icons with the same requirements in different sizes, placed directly in the Android Studio project under `src-tauri/gen/android/app/src/main/res/`:

| Directory | `ic_launcher.png` and `ic_launcher_round.png` | `ic_launcher_foreground.png` |
| --- | --- | --- |
| `mipmap-hdpi/` | 72x72px | 162x162px |
| `mipmap-mdpi/` | 48x48px | 108x108px |
| `mipmap-xhdpi/` | 96x96px | 216x216px |
| `mipmap-xxhdpi/` | 144x144px | 324x324px |
| `mipmap-xxxhdpi/` | 192x192px | 432x432px |

If `tauri icon` cannot be used, Android Studio's Image Asset Studio is recommended.

#### iOS

PNG icons with the same requirements but without transparency, placed in the Xcode project at `src-tauri/gen/apple/Assets.xcassets/AppIcon.appiconset/`. Expected icons:

- 20px in 1x, 2x, 3x, with an extra icon
- 29px in 1x, 2x, 3x, with an extra icon
- 40px in 1x, 2x, 3x, with an extra icon
- 60px in 2x, 3x
- 76px in 1x, 2x
- 83.5px in 2x
- 512px in 2x saved as `AppIcon-512@2x.png`

File names use the format `AppIcon-{size}x{size}@{scaling}{extra}.png`. For the 20px icons this means 20x20, 40x40 and 60x60 named `AppIcon-20x20@1x.png`, `AppIcon-20x20@2x.png`, `AppIcon-20x20@3x.png`, and `2x` additionally saved as `AppIcon-20x20@2x-1.png` (the "extra icon").

## Notes

- Upstream table lists 49x49px for `mipmap-hdpi`; corrected to 72x72px (1.5x mdpi).
- Some icon types may be used on platforms other than those listed (especially `png`), so include all icons even if building for a subset of platforms.

## Related

- [Bundle config](../config/bundle-config.md)
- [icon CLI command](../cli/icon.md)
