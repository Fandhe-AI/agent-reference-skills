---
source: https://docs.flutter.dev/tools/devtools/extensions
---

# DevTools extensions

DevTools extensions are developer tools provided by third-party packages that are tightly integrated into the DevTools tooling suite. They are distributed as part of a pub package and dynamically loaded into DevTools when a user is debugging their app.

## Signature / Usage

If your app depends on a package that provides a DevTools extension, it shows up in a new tab when you open DevTools. Enablement states are stored in `devtools_options.yaml` in the root of the project (similar to `analysis_options.yaml`):

```yaml
description: This file stores settings for Dart & Flutter DevTools.
documentation: https://docs.flutter.dev/tools/devtools/extensions#configure-extension-enablement-states
extensions:
  - provider: true
  - shared_preferences: true
  - foo: false
```

## Configure extension enablement states

- You must manually enable an extension before it loads for the first time; only enable extensions from a source you trust. A prompt appears the first time you open the extension; change the setting later from the DevTools Extensions dialog.
- If the extension requires a running application, the prompt and settings appear only once DevTools is connected to a running app.
- If `devtools_options.yaml` is checked into source control, anyone working on the project uses the same settings. If omitted (for example listed in `.gitignore`), options are configured separately for each user.

## Notes

- To build an extension, see "Build custom tooling in Flutter and Dart DevTools".

## Related

- [Build custom tooling in Flutter and Dart DevTools](./devtools-custom-tool.md)
- [Flutter and Dart DevTools](./devtools.md)
