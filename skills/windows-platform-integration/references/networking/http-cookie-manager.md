# HttpCookieManager

Adds, deletes, or views the `HttpCookie` instances associated with an app.

## Signature / Usage

```csharp
using Windows.Web.Http;
using Windows.Web.Http.Filters;

var filter = new HttpBaseProtocolFilter();
HttpCookieManager cookieManager = filter.CookieManager;

var cookie = new HttpCookie("session", "contoso.com", "/") { Value = "abc123" };
cookieManager.SetCookie(cookie);

HttpCookieCollection cookies = cookieManager.GetCookies(new Uri("https://contoso.com"));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetCookies(Uri)` | method | Gets an `HttpCookieCollection` of cookies associated with the specified URI. |
| `SetCookie(HttpCookie)` | method | Adds or changes a cookie, sent on future requests. |
| `SetCookie(HttpCookie, Boolean)` | method | Adds or changes a cookie with control over whether it is restricted to the current request. |
| `DeleteCookie(HttpCookie)` | method | Deletes a cookie from the cookies associated with the app. |

## Notes

- Namespace: `Windows.Web.Http`. There is no public constructor; obtain an instance via the `CookieManager` property on `HttpBaseProtocolFilter`.

## Related

- [HttpClient](./http-client.md)
- [HttpBaseProtocolFilter](./http-base-protocol-filter.md)
