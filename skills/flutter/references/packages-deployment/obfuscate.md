---
source: https://docs.flutter.dev/deployment/obfuscate
---

# Obfuscate Dart code

How to remove function and class names from your Dart binary. Obfuscation hides function and class names in compiled Dart code, replacing each symbol with another symbol, making reverse engineering harder.

## Signature / Usage

```console
$ flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory>
```

`<build-target>` is the build target (for example `apk`); `<symbols-directory>` is where the SYMBOLS file is placed (for example `out/android`). Back up the SYMBOLS file after building; you need it to de-obfuscate stack traces.

### Read an obfuscated stack trace

Find the matching SYMBOLS file (for example a crash from an Android arm64 device needs `app.android-arm64.symbols`), then:

```console
$ flutter symbolize \
   -i <stack-trace-file> \
   -d <obfuscated-symbols-file>
```

For example `<obfuscated-symbols-file>` is `out/android/app.android-arm64.symbols`. Run `flutter symbolize -h` for more.

### Read an obfuscated name

Generate a JSON obfuscation map, for example `["MaterialApp", "ex", "Scaffold", "ey"]` where `ex` is the obfuscated name of `MaterialApp`:

```console
$ flutter build <build-target> \
   --obfuscate \
   --split-debug-info=/<symbols-directory> \
   --extra-gen-snapshot-options=--save-obfuscation-map=/<obfuscation-map-file>
```

### Caveat

Code that relies on matching specific class, function, or library names will fail. For example, this won't work in an obfuscated binary:

```dart
expect(foo.runtimeType.toString(), equals('Foo'));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--obfuscate` | flag | Obfuscate the Dart code. Release builds only. |
| `--split-debug-info=/<dir>` | path | Directory for the SYMBOLS file (symbol map). |
| `--extra-gen-snapshot-options=--save-obfuscation-map=/<file>` | option | Write a JSON obfuscation map (array of original and obfuscated name pairs). |

Supported build targets: `aar`, `apk`, `appbundle`, `ios`, `ios-framework`, `ipa`, `linux`, `macos`, `macos-framework`, `windows`. Check with `flutter build <build-target> -h` that `--obfuscate` and `--split-debug-info` are listed; if not, install a newer Flutter.

## Notes

- Flutter's code obfuscation works only on a release build.
- It is a **poor security practice** to store secrets in an app. Obfuscation does _not_ encrypt resources nor protect against reverse engineering; it only renames symbols.
- Web apps don't support obfuscation. A web app can be minified; the web compiler minifies release builds.
- On Windows x64, the build generates a PDB file (`app.windows-x64.pdb`) instead of a SYMBOLS file; back up the PDB, and note `flutter symbolize` doesn't support PDB files (load the PDB in a Windows debugger such as WinDbg).
- Enum names are not obfuscated currently.
- Obfuscation and R8 minification can considerably extend the compile time of an Android build.

## Related

- [Build and release an Android app](./deploy-android.md)
- [Build and release an iOS app](./deploy-ios.md)
