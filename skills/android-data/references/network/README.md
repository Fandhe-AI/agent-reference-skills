# network

| Name | Description | Path |
|------|-------------|------|
| Permissions and Main Thread Restriction | INTERNET/ACCESS_NETWORK_STATE permissions and the NetworkOnMainThreadException rule. | [permissions-and-threading.md](./permissions-and-threading.md) |
| Network Security Configuration | Declarative `network_security_config.xml` for trust anchors, cleartext policy, and pinning. | [network-security-config.md](./network-security-config.md) |
| ConnectivityManager | System service for reading active network state and registering connectivity callbacks. | [connectivitymanager.md](./connectivitymanager.md) |
| NetworkCapabilities | Transport and capability flags (Wi-Fi/cellular, validated internet, metered) for a Network. | [networkcapabilities.md](./networkcapabilities.md) |
| ConnectivityManager.NetworkCallback | Callback for observing network availability/capabilities/link-property changes. | [network-callback.md](./network-callback.md) |
| Data Saver (restrictBackgroundStatus) | Respecting the user's Data Saver preference on metered networks. | [data-saver.md](./data-saver.md) |
| Cronet | Chromium network stack as an Android library; Google's recommended HTTP client. | [cronet.md](./cronet.md) |
| UrlRequest / UrlRequest.Callback | Cronet's async request object and response streaming callback. | [cronet-urlrequest.md](./cronet-urlrequest.md) |
| CronetInterceptor (cronet-okhttp) | OkHttp interceptor that routes OkHttp/Retrofit traffic through Cronet. | [cronet-okhttp-interceptor.md](./cronet-okhttp-interceptor.md) |
| Retrofit | Type-safe HTTP client interface (Square) built on OkHttp, with suspend function support. | [retrofit.md](./retrofit.md) |
| OkHttp | HTTP client (Square) with connection pooling, HTTP/2, and interceptors. | [okhttp.md](./okhttp.md) |
| kotlinx.serialization Retrofit Converter | Retrofit Converter.Factory backed by kotlinx.serialization Json. | [kotlinx-serialization-converter.md](./kotlinx-serialization-converter.md) |
| HttpsURLConnection / HttpURLConnection | Built-in legacy HTTP(S) client; superseded by Cronet/Retrofit/OkHttp for new code. | [httpurlconnection.md](./httpurlconnection.md) |
| Caching, Timeouts, Error Handling, and Retries | Cross-cutting resilience practices: timeouts, caching, error surfacing, WorkManager retry. | [caching-and-retry.md](./caching-and-retry.md) |
