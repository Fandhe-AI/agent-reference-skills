# NextRequest

`NextRequest` extends the Web Request API with additional convenience methods, primarily for Proxy/middleware and Route Handlers.

## Signature / Usage

```ts
// Given incoming request /home
request.cookies.set('show-banner', 'false')
request.nextUrl.pathname // '/home'
```

## Options / Props

### `cookies`

| Method | Description |
| --- | --- |
| `set(name, value)` | Sets a cookie on the request. |
| `get(name)` | Returns the (first) cookie value, or `undefined`. |
| `getAll(name?)` | Returns all matching cookies, or all cookies if no name given. |
| `delete(name)` | Deletes the cookie; returns `true` if deleted. |
| `has(name)` | Returns whether the cookie exists. |
| `clear()` | Removes all cookies from the request. |

### `nextUrl`

| Property | Type | Description |
| --- | --- | --- |
| `basePath` | `string` | The configured base path of the URL. |
| `buildId` | `string \| undefined` | The build identifier of the application. |
| `pathname` | `string` | URL pathname. |
| `searchParams` | `Object` | URL search parameters. |

## Notes

- Extends the native `URL` API via `nextUrl` with Next.js-specific properties.
- Internationalization properties from the Pages Router are not available in the App Router.
- `ip` and `geo` properties were removed in `v15.0.0`.

## Related

- [NextResponse](./NextResponse.md)
- [cookies](./cookies.md)
