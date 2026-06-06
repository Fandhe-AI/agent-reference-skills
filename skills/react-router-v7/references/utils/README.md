# utils

| Name | Description | Path |
|------|-------------|------|
| createContext | Creates a type-safe context slot for passing arbitrary values through the request lifecycle. | [createContext.md](./createContext.md) |
| createCookie | Creates a logical container for managing a browser cookie from the server. | [createCookie.md](./createCookie.md) |
| createCookieSessionStorage | Creates a `SessionStorage` implementation that stores **all session data inside the cookie itself**. | [createCookieSessionStorage.md](./createCookieSessionStorage.md) |
| createMemorySessionStorage | Creates a `SessionStorage` implementation that stores session data **in application memory**. | [createMemorySessionStorage.md](./createMemorySessionStorage.md) |
| createRoutesStub | Creates a minimal router context for unit-testing reusable components that depend on React Router hooks. | [createRoutesStub.md](./createRoutesStub.md) |
| data | Returns data from a loader or action together with custom HTTP headers or a status code. | [data.md](./data.md) |
| generatePath | Returns a path string with dynamic params interpolated into a route pattern. | [generatePath.md](./generatePath.md) |
| href | Returns a fully resolved URL pathname by interpolating params into a route path pattern. | [href.md](./href.md) |
| isRouteErrorResponse | A TypeScript type-guard that returns `true` when the given error is an `ErrorResponse`. | [isRouteErrorResponse.md](./isRouteErrorResponse.md) |
| redirect | Creates an HTTP redirect `Response` with a `Location` header. | [redirect.md](./redirect.md) |
| redirectDocument | Creates an HTTP redirect `Response` that forces a **full document reload** at the new location. | [redirectDocument.md](./redirectDocument.md) |
| replace | Creates a redirect `Response` that performs `history.replaceState` instead of `history.pushState`. | [replace.md](./replace.md) |
| Sessions and Cookies | Conceptual overview of how React Router manages sessions and cookies on the server. | [sessions-and-cookies.md](./sessions-and-cookies.md) |
