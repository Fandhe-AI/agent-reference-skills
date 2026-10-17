---
source: https://docs.flutter.dev/tools/devtools/deep-links
---

# Validate deep links

The deep link view validates any deep links that are defined in your app. As of release 3.27, the deep link validator tool works for both Android and iOS.

## Signature / Usage

Open DevTools, click into the **Deep Links** tab, and import a Flutter project that contains deep links. The tool helps identify and troubleshoot errors in your mobile deep link setup, from website configuration to manifest files, and provides instructions on how to fix any issues.

```console
$ dart devtools
Serving DevTools at http://127.0.0.1:9100
```

## Notes

- The launch command above comes from the related official page https://docs.flutter.dev/tools/devtools/cli (see "Run DevTools from the command line"); the deep links page itself shows no code.
- DevTools 2.60.0: deep links are only validated when connected to a Flutter app (see "DevTools 2.60.0 release notes").
- This validates deep link configuration for Flutter apps; routing libraries (react-router, tanstack-router) and Jetpack Navigation (android-navigation) are separate skills.

## Related

- [Flutter and Dart DevTools](./devtools.md)
- [DevTools 2.60.0 release notes](./devtools-release-notes.md)
