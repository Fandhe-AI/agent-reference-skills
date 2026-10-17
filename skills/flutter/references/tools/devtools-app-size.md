---
source: https://docs.flutter.dev/tools/devtools/app-size
---

# Use the app size tool

Analyze the total size of your app: view a single snapshot of "size information" in the Analysis tab, or compare two snapshots in the Diff tab.

## Signature / Usage

Generate a Flutter size analysis file with `--analyze-size`:

```console
flutter build <your target platform> --analyze-size
```

```console
flutter build apk --analyze-size --target-platform=android-arm64
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
app-release.apk (total compressed)                               6 MB
...
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
A summary of your APK analysis can be found at: build/apk-code-size-analysis_01.json
```

Import the printed JSON (here `build/apk-code-size-analysis_01.json`) into the app size tool.

## What is "size information"?

Size data for Dart code, native code, and non-code elements (application package, assets, fonts). For Dart, the AOT compiler tree-shakes unused or unreachable code in profile or release mode only (debug builds are JIT compiled); the result is the collection of packages, libraries, classes, and functions in the binary with their byte sizes.

## How to use it

If DevTools is connected to a running app, open the "App Size" tab; otherwise open it from the landing page after launching DevTools.

| Tab | Description |
| --- | --- |
| Analysis | Inspect one snapshot. Drag and drop an app size file and click "Analyze Size". Treemap and table show hierarchical size data (rectangle area proportional to size; select a cell to re-root, use the breadcrumb navigator to go up). Dominator tree and call graph show code attribution (why code is included). |
| Diff | Compare "old" and "new" size files generated from two versions of the same app; drag and drop and click **Analyze Diff**. Treemap and tree table show only differing data. |

Dominator tree vs call graph: a node `a` dominates `b` if every path to `b` goes through `a`. For `package:a` importing `package:b` and `package:c`, both importing `package:d`:

```plaintext
package:a
|__ package:b
|   |__ package:d
|__ package:c
    |__ package:d
```

the dominator tree is:

```plaintext
package:a
|__ package:b
|__ package:c
|__ package:d
```

and the call graph links `package:d` to its direct callers `package:b` and `package:c`. Use the dominator tree to understand the root cause why code is included; use the call graph to understand all call paths to and from code.

## Notes

- See the App size performance page ("Breaking down the size") for more.

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [flutter: The Flutter command-line tool](./flutter-cli.md)
