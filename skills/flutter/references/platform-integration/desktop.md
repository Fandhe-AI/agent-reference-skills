---
source: https://docs.flutter.dev/platform-integration/desktop
---

# Desktop support for Flutter

Flutter provides support for compiling a native Windows, macOS, or Linux desktop app, including plugins.

## Signature / Usage

```console
$ flutter create my_app
$ cd my_app
C:\> flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

Release builds:

```console
PS C:\> flutter build windows
$ flutter build macos
$ flutter build linux
```

Add desktop support to an existing project (run from the root project directory; change `platforms` to add only specific platforms):

```console
$ flutter create --platforms=windows,macos,linux .
```

## Options / Props

`flutter config` flags to disable a platform (for example `flutter config --no-enable-ios`):

| Flag |
| --- |
| `--no-enable-windows-desktop` |
| `--no-enable-linux-desktop` |
| `--no-enable-macos-desktop` |
| `--no-enable-web` |
| `--no-enable-android` |
| `--no-enable-ios` |

## Notes

- Set up desktop devtools for your target (Linux / macOS / Windows setup pages, `#set-up-tooling`). If `flutter doctor` reports problems for a platform you do not develop for, ignore the warnings or disable that platform with `flutter config`.
- After enabling desktop support, restart your IDE so it detects the new device. Creating a new application in the IDE creates iOS, Android, web, and desktop versions; select **windows (desktop)**, **macOS (desktop)**, or **linux (desktop)** from the device pulldown.
- If you do not supply `-d`, `flutter run` lists available targets to choose from.
- Plugins: to use a plugin that supports desktop, follow the steps in "using packages"; Flutter adds the necessary native code to your project automatically.
- Writing a plugin: keep federation in mind (separate packages per platform set combined into one plugin; for example `url_launcher_windows` behind `url_launcher`). You can add a platform implementation to any endorsed federated plugin on pub.dev if you coordinate with the original author.
- Platform-specific build pages: Building Windows / macOS / Linux apps with Flutter (`/platform-integration/{windows,macos,linux}/building`).
- Samples named in the source: Wonderous, Flokk, Photo Search app (`desktop_photo_search` in the samples repo).
- This page covers Flutter desktop targets. Native Windows development belongs to windows-app-sdk and related windows-* skills; macOS native development to apple-appkit.

## Related

- [overview](./overview.md)
- [windows-external-windows](./windows-external-windows.md)
- [macos-platform-views](./macos-platform-views.md)
