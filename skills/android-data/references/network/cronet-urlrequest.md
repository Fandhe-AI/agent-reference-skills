# UrlRequest / UrlRequest.Callback

Cronet's request object and callback interface for sending an individual asynchronous HTTP request and streaming its response.

## Signature / Usage

```kotlin
class MyUrlRequestCallback : UrlRequest.Callback() {
    override fun onRedirectReceived(request: UrlRequest, info: UrlResponseInfo, newLocationUrl: String) {
        request.followRedirect()
    }

    override fun onResponseStarted(request: UrlRequest, info: UrlResponseInfo) {
        request.read(ByteBuffer.allocateDirect(102400))
    }

    override fun onReadCompleted(request: UrlRequest, info: UrlResponseInfo, byteBuffer: ByteBuffer) {
        byteBuffer.clear()
        request.read(byteBuffer)
    }

    override fun onSucceeded(request: UrlRequest, info: UrlResponseInfo) {
        // request complete
    }
}

val executor: Executor = Executors.newSingleThreadExecutor()
val request: UrlRequest = cronetEngine
    .newUrlRequestBuilder("https://www.example.com", MyUrlRequestCallback(), executor)
    .build()
request.start()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cronetEngine.newUrlRequestBuilder(url, callback, executor)` | `UrlRequest.Builder` | — | Creates a request builder for the given URL. |
| `onRedirectReceived(request, info, newLocationUrl)` | override | — | Called on HTTP redirect; call `followRedirect()` or cancel. |
| `onResponseStarted(request, info)` | override | — | Called when headers arrive; start reading with `request.read(buffer)`. |
| `onReadCompleted(request, info, byteBuffer)` | override | — | Called as body chunks arrive; process and call `read()` again to continue. |
| `onSucceeded(request, info)` | override | — | Called when the request completes successfully. |
| `onFailed(request, info, error)` | override | — | Called when the request fails. |
| `onCanceled(request, info)` | override | — | Called when the request is canceled; release resources. |

## Notes

- HTTP status codes `4xx`/`5xx` are **not** treated as errors by Cronet; the response body should still be read via `onResponseStarted()` / `read()`.
- `request.start()` is asynchronous; all callback methods run on the supplied `Executor`.

## Related

- [Cronet](./cronet.md)
- [cronet-okhttp-interceptor](./cronet-okhttp-interceptor.md)
