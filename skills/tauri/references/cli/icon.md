---
source: https://v2.tauri.app/reference/cli/#icon
---

# tauri icon

Generate various icons for all major platforms.

## Signature / Usage

```sh
npm run tauri icon
cargo tauri icon
```

```text
Generate various icons for all major platforms

Usage: tauri icon [OPTIONS] [INPUT]

Arguments:
  [INPUT]
          Path to the source icon (squared PNG or SVG file with transparency) or a manifest file.

          The manifest file is a JSON file with the following structure: { "default": "app-icon.png", "bg_color": "#fff", "android_bg": "app-icon-bg.png", "android_fg": "app-icon-fg.png", "android_fg_scale": 85, "android_monochrome": "app-icon-monochrome.png" }

          All file paths defined in the manifest JSON are relative to the manifest file path.

          Only the `default` manifest property is required.

          The `bg_color` manifest value overwrites the `--ios-color` option if set.

          [default: ./app-icon.png]

Options:
  -o, --output <OUTPUT>
          Output directory. Default: 'icons' directory next to the tauri.conf.json file
  -v, --verbose...
          Enables verbose logging
  -p, --png <PNG>
          Custom PNG icon sizes to generate. When set, the default icons are not generated
      --ios-color <IOS_COLOR>
          The background color of the iOS icon - string as defined in the W3C's CSS Color Module Level 4 <https://www.w3.org/TR/css-color-4/>

          [default: #fff]
      --fit <FIT>
          How to fit a non-square source image into the square icon canvas, similar to the CSS `object-fit` property.

          When not set, a non-square source is rejected.

          Possible values:
          - cover:   Scale the source to fill the square, center-cropping the longer side (may clip content)
          - contain: Scale the source to fit inside the square, padding the shorter side with transparency
  -h, --help
          Print help (see a summary with '-h')
  -V, --version
          Print version
```

## Options / Props

| Option | Value | Description |
| --- | --- | --- |
| `[INPUT]` | default `./app-icon.png` | Path to the source icon (squared PNG or SVG with transparency) or a manifest JSON file (only `default` is required) |
| `-o, --output` | `<OUTPUT>` | Output directory. Default: 'icons' directory next to the tauri.conf.json file |
| `-v, --verbose...` | — | Enables verbose logging |
| `-p, --png` | `<PNG>` | Custom PNG icon sizes to generate. When set, the default icons are not generated |
| `--ios-color` | `<IOS_COLOR>`, default `#fff` | Background color of the iOS icon (CSS Color Module Level 4 string) |
| `--fit` | `<FIT>` | Fit a non-square source into the square canvas: `cover` or `contain`. When not set, a non-square source is rejected |

## Notes

- Usage line normalized from `pnpm-native run build icon`; see overview for details.
- Manifest keys named in the help text: `default`, `bg_color`, `android_bg`, `android_fg`, `android_fg_scale`, `android_monochrome`; paths are relative to the manifest file. `bg_color` overwrites `--ios-color` if set.
- Tauri CLI only. Not the Electron toolchain; see the electron skill for Electron.

## Related

- [overview](./overview.md)
