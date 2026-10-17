---
source: https://docs.flutter.dev/tools/devtools/network
---

# Use the Network View

Inspect HTTP, HTTPS, and WebSocket traffic from your Dart or Flutter application. Works with all Flutter and Dart applications.

## Signature / Usage

Record network traffic from app startup by starting the app paused:

```console
$ flutter run --start-paused ...
$ dart run --pause-isolates-on-start --observe ...
```

Then open DevTools, go to the Network screen and ensure recording has started, and resume the app.

## What is recorded

All network traffic that originates from `dart:io` (like the `HttpClient` class) is logged, including the `dio` package. Traffic logged using the `http_profile` package is also recorded, including `cupertino_http`, `cronet_http`, and `ok_http`. For a web app that makes requests using the browser, use browser tools such as Chrome DevTools.

## How to use it

Recording starts immediately when the Network page opens; use **Pause** / **Resume** (upper left). Requests appear in the table (left) as "Pending" until a complete response is received; select one to view general and timing information plus request and response headers and bodies (some data is unavailable until the response is received).

## Options / Props

Filter keys (press the filter button right of the search bar):

| Name | Type | Description |
| --- | --- | --- |
| `method`, `m` | filter key | Matches the "Method" column. |
| `status`, `s` | filter key | Matches the "Status" column. |
| `type`, `t` | filter key | Matches the "Type" column. |

Text not paired with a key is queried against all categories (method, URI, status, type).

```plaintext
my-endpoint m:get t:json s:200
```

```plaintext
https s:404
```

## Notes

- HTTP and HTTPS requests are also surfaced in the Timeline as asynchronous timeline events.
- This is DevTools' network profiler for Dart `dart:io` traffic, distinct from browser devtools and from playwright network interception.

## Related

- [Use the Performance view](./devtools-performance.md)
- [Flutter and Dart DevTools](./devtools.md)
