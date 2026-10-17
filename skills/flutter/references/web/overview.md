---
source: https://docs.flutter.dev/platform-integration/web
---

# Web support for Flutter

Flutter delivers the same experiences on the web as on mobile. Dart and Flutter can compile to WebAssembly, so iOS, Android, and the browser can be built from the same codebase.

## Signature / Usage

```console
$ flutter create . --platforms web
$ flutter run -d chrome
$ flutter build web --wasm
```

## How it works

Adding web support to Flutter involved implementing Flutter's core drawing layer on top of standard browser APIs, in addition to compiling Dart to JavaScript, instead of the ARM machine code used for mobile applications. Using a combination of DOM, Canvas, and WebAssembly, Flutter provides a portable, high-quality, and performant user experience across modern browsers. The core drawing layer is implemented completely in Dart, and Dart's optimized JavaScript compiler compiles the Flutter core and framework along with your application into a single, minified source file that can be deployed to any web server.

## What types of apps can I build?

| Scenario | Description |
| --- | --- |
| Single Page Application | Complex standalone web apps rich with graphics and interactive content, reaching end users on a wide variety of devices. |
| Existing mobile applications | A browser-based delivery model for existing Flutter mobile apps. |

## Notes

- Not every HTML scenario is ideally suited for Flutter. Text-rich, flow-based, static content such as blog articles benefits from the document-centric model of the web; Flutter can still embed interactive experiences into such sites.
- For a traditional DOM-based website in Dart, the community package Jaspr supports static websites (Dart but not Flutter; SEO works as in a traditional website).
- Flutter web (Dart compiled to JavaScript / Wasm, widgets rendered by the Flutter engine) is distinct from DOM-based JS frameworks such as React and Next.js (see the nextjs-app and react skills) and from hosting platforms such as Vercel (see the vercel skill).

## Related

- [Building a web application with Flutter](./building.md)
- [Web development configuration file](./web-dev-config-file.md)
- [Web FAQ](./web-faq.md)
- [Build and release a web app](./deploy-web.md)
