---
source: https://docs.flutter.dev/platform-integration/web/web-images
---

# Display images on the web

The web supports the standard `Image` widget and the more advanced `dart:ui` `Image` class. Because browsers run untrusted code safely, there are limitations compared to mobile and desktop; this page covers CORS workarounds.

## Signature / Usage

In-memory, asset, and same-origin network images need no extra effort; display them with `Image.memory`, `Image.asset`, or `Image.network`.

```dart
Image.network('https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg')
```

## Background

The web offers several methods for displaying images:

- The built-in `<img>` and `<picture>` HTML elements: fit among other HTML elements, use browser caching, built-in image optimization and memory management; safely display images from arbitrary sources.
- The `drawImage` method on `<canvas>`: good when the image must fit within other canvas content; gives control over sizing and, when CORS allows, reading pixels back.
- A custom image codec that renders to a WebGL canvas: highest degree of control (read pixels, custom algorithms, GLSL hardware acceleration).

## CORS

By default one site is not allowed to make HTTP requests to another site using XHR or `fetch`. On the web, Flutter renders graphics using WebGL or WebGPU. WebGL requires access to raw image bytes, which requires servers to be configured with CORS headers. If CORS is not enabled on the image server, Flutter automatically falls back to rendering cross-origin images using HTML `<img>` elements.

## Solutions

| Situation | Approach |
| --- | --- |
| Bytes in memory, asset, or same-origin | `Image.memory`, `Image.asset`, or `Image.network`; no extra effort |
| You control the CDN | Host images in a CORS-enabled CDN; for example, Firebase site hosting allows a custom `Access-Control-Allow-Origin` header in `firebase.json` |
| No control over the origin server | Use a CORS proxy (for example CloudFlare Workers or Firebase Functions); the intermediate server needs sufficient access to load the images |

## Notes

- The snippet is the `Image.network` example from the official `Image` API page (https://api.flutter.dev/flutter/widgets/Image-class.html); the web-images page itself shows no code.
- A CORS proxy works when the original image server serves images publicly but is not configured with the correct CORS headers.
- For web loading speed, the source points to the Flutter blog post "Best practices for optimizing Flutter web loading speed".
- `Image` here is the Flutter widget (Dart); distinct from same-named components in react / nextjs-app (next/image) and other UI skills.

## Related

- [Build and release a web app](./deploy-web.md)
- [Web performance](./web-performance.md)
