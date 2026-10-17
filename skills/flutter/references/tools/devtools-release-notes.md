---
source: https://docs.flutter.dev/tools/devtools/release-notes/release-notes-2.60.0
---

# DevTools 2.60.0 release notes

Release notes for Dart and Flutter DevTools version 2.60.0 (the latest DevTools release covered by this skill).

## Signature / Usage

DevTools ships with the Flutter SDK; upgrade Flutter to get it:

```console
$ flutter upgrade
```

## General updates

- Fixed an issue where DevTools could get stuck in a disconnected state (such as after a Mac goes to sleep) by adding a manual "Reconnect" button to the disconnected screen (#9838).
- Resolved several memory leaks (#9857).
- Fixed a bug where highlighted search matches in tables were unreadable in dark mode because the highlight color had become fully opaque (#9863).
- Rejected absolute paths in DevTools server file reads so they stay within the `~/.flutter-devtools/` directory and can't resolve to arbitrary files on disk (#9844).
- Validated the `devtoolsOptionsUri` parameter in the extension enabled-state handler so it must be a `file:` URI named `devtools_options.yaml`, preventing the DevTools server from writing to arbitrary file paths (#9834).

## Inspector updates

- Fixed an issue where the Inspector error badge count would improperly increase or disappear during navigation (#9524).

## Performance updates

- Fixed a bug where the selected feature tab wasn't restored when loading exported Performance data (#9861).

## Network profiler updates

- Fixed the Network tab search field becoming disabled after clearing all requests, so the search query can now be edited at any time (#9855).

## Deep links tool updates

- Only validate deep links when connected to a Flutter app (#8081).

## Notes

- Issue and PR numbers refer to the `flutter/devtools` repository. The complete list of changes is in the DevTools git log at tag `v2.60.0`.
- Older DevTools release notes are not covered by this skill.

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [Use the Flutter inspector](./devtools-inspector.md)
- [Use the Performance view](./devtools-performance.md)
- [Use the Network View](./devtools-network.md)
- [Validate deep links](./devtools-deep-links.md)
- [DevTools extensions](./devtools-extensions.md)
