---
source: https://docs.flutter.dev/platform-integration/web/faq
---

# Web FAQ

Gotchas and differences when writing or running web apps in Flutter.

## Signature / Usage

Conditional import for web-specific implementations (for WebAssembly check `dart.library.js_interop`, not `dart.library.js` or `dart.library.html`):

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

## Questions

| Question | Answer |
| --- | --- |
| Ideal scenarios? | App-centric experiences: Progressive Web Apps, Single Page Apps, existing Flutter mobile apps. Not suitable for static, text-rich, flow-based websites (you can embed interactive experiences into them). |
| SEO? | Flutter web prioritizes performance, fidelity, and consistency; output does not align with what search engines need to index. For static or document-like content use Jaspr (Dart, DOM-based) or HTML, separating the Flutter app from landing/marketing/help pages. |
| Hot reload? | Yes (see Building a web application). |
| Supported browsers? | Chrome, Safari, Edge, Firefox (mobile and desktop). For debugging: Chrome (macOS, Windows, Linux) and Edge (Windows). |
| IDEs? | Select Chrome or Edge as the target device in Android Studio/IntelliJ and VS Code; the device pulldown includes Chrome (web) for all channels. |
| `dart:io`? | No; the file system is not accessible from the browser. Use the `http` package; the browser (not the app) controls the headers on an HTTP request. |
| Concurrency? | Dart isolates are not currently supported in Flutter web. Web workers can be a workaround, though not built in. |
| `Platform.is`? | No. Importing `dart:io` is possible but any `Platform.isXYZ` throws `UnsupportedError`; importing `dart:io` in a package (except through conditional imports) makes pub.dev score the package as not supporting the web. Use `kIsWeb` in apps, or the `os_detect` package in packages. |
| Deploy? | See Build and release a web app. |

### Stale app after deployment

Browser and CDN cache per `Cache-Control` (for example 3600 caches for 1 hour). To defeat caching, append a build ID to links or rename files:

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

### Cache headers on Firebase Hosting

By default Firebase Hosting sets `Cache-Control: max-age=3600` on static files, so browsers can serve stale `index.html`, `flutter_bootstrap.js`, or manifest files for up to an hour. To force revalidation and avoid caching missing assets (`404.html`):

```json
{
  "hosting": {
    "public": "build/web",
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0, must-revalidate"
          }
        ]
      },
      {
        "source": "404.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0, must-revalidate"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "!(/assets/**|/canvaskit/**|/icons/**|/main.dart.*)",
        "destination": "/index.html"
      }
    ]
  }
}
```

The rewrite exclusion ensures requests for missing assets or compiled entry points return a real `404` rather than `index.html` with `200 OK`; the `404.html` rule prevents the CDN from caching 404 responses under wildcard TTLs.

## Notes

- Flutter does not currently support appending build IDs to resources automatically.
- Flutter no longer generates or manages a caching service worker by default (newer versions write a self-cleaning stub to remove legacy service workers). For offline support or advanced caching, configure a service worker yourself using standard web tooling or third-party solutions such as Workbox.
- Flutter web (Dart) differs from React / Next.js on SEO and rendering model (react, nextjs-app skills); Firebase Hosting config here is not the Vercel deployment config (vercel skill).

## Related

- [Web support for Flutter](./overview.md)
- [Wasm](./wasm.md)
- [Build and release a web app](./deploy-web.md)
