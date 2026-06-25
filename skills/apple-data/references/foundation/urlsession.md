# URLSession

A class that coordinates network data-transfer tasks. Supports data, download, upload, and WebSocket tasks with both async/await and delegate-based APIs.

## Signature / Usage

```swift
// Simple async fetch
let (data, response) = try await URLSession.shared.data(from: url)

// Custom session
let config = URLSessionConfiguration.default
config.timeoutIntervalForRequest = 30
let session = URLSession(configuration: config, delegate: myDelegate, delegateQueue: nil)

// POST request
let (responseData, _) = try await session.upload(for: request, from: body)
```

## Options / Props

| Initializer / Method / Property | Description |
|---------------------------------|-------------|
| `URLSession.shared` (static) | Singleton for simple requests |
| `init(configuration:)` | Session with custom configuration |
| `init(configuration:delegate:delegateQueue:)` | Session with delegate |
| `data(from:)` | `async` fetch data from a URL |
| `data(for:)` | `async` fetch data using a `URLRequest` |
| `download(from:)` | `async` download file to disk |
| `upload(for:from:)` | `async` upload `Data` body |
| `upload(for:fromFile:)` | `async` upload from file URL |
| `bytes(from:)` | `async` stream of bytes (`URL.AsyncBytes`) |
| `webSocketTask(with:)` | Create a WebSocket task |
| `dataTask(with:completionHandler:)` | Callback-based data task |
| `downloadTask(with:completionHandler:)` | Callback-based download |
| `uploadTask(with:from:completionHandler:)` | Callback-based upload |
| `finishTasksAndInvalidate()` | Complete running tasks then invalidate |
| `invalidateAndCancel()` | Cancel all tasks and invalidate |
| `getAllTasks(completionHandler:)` | Enumerate all tasks |
| `configuration` | The session's `URLSessionConfiguration` |
| `delegate` | Session delegate |

**`URLSessionConfiguration` presets:** `.default`, `.ephemeral` (no disk cache/cookies), `.background(withIdentifier:)` (background transfers)

## Notes

- Available iOS 7.0+, macOS 10.9+.
- Thread-safe; tasks can be created from any thread.
- Sessions hold a strong reference to their delegate; call `invalidateAndCancel()` or `finishTasksAndInvalidate()` to break the retain cycle.
- App Transport Security (ATS) enforces HTTPS by default on iOS 9+ / macOS 10.11+.
- Supports HTTP/1.1, HTTP/2, HTTP/3.

## Related

- [URLRequest](./urlrequest.md)
- [URL](./url.md)
- [Data](./data.md)
