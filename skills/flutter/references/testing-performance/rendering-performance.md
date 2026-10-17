---
source: https://docs.flutter.dev/perf/rendering-performance
---

# Improving rendering performance

How to measure and evaluate your app's rendering performance.

## Signature / Usage

```plaintext
Profile with an app built in profile mode (not the default debug mode).
Pitfall 1: rebuilding far more of the UI than expected each frame.
Pitfall 2: building a large list of children directly, rather than using a ListView.
```

Rendering animations is one of the most cited topics of interest when it comes to measuring performance. Flutter applications are performant by default, so you only need to avoid common pitfalls to achieve excellent performance.

## General advice

If you see janky (non-smooth) animations, make **sure** that you are profiling performance with an app built in _profile_ mode. The default Flutter build creates an app in _debug_ mode, which is not indicative of release performance.

A couple common pitfalls:

- Rebuilding far more of the UI than expected each frame. To track widget rebuilds, see "Show performance data" (Android Studio page).
- Building a large list of children directly, rather than using a `ListView`.

## Mobile-only advice

Do you see noticeable jank on your mobile app, but only on the first run of an animation? To avoid this, make sure you're using Flutter's default graphic renderer, Impeller.

## Web-only advice

The following series of articles cover what the Flutter Material team learned when improving performance of the Flutter Gallery app on the web:

- Optimizing performance in Flutter web apps with tree shaking and deferred loading
- Improving perceived performance with image placeholders, precaching, and disabled navigation transitions
- Building performant Flutter widgets

## Notes

- To use DevTools for debugging performance issues, see "Using the Performance view".
- The page text says "Thanks in part to Flutter's Skia engine"; the rendering engine page states Impeller is now the default on iOS and Android API 29+ and, as of Flutter 3.47, on macOS, Linux, and Windows.

## Related

- [Performance best practices](./performance-best-practices.md)
- [Flutter performance profiling](./ui-performance.md)
- [Impeller rendering engine](./impeller.md)
