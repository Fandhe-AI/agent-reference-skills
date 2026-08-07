# utils

| Name | Description | Path |
|------|-------------|------|
| createContext | Creates a type-safe context slot for passing arbitrary values through the request lifecycle. | [createContext.md](./createContext.md) |
| createCookie | Creates a logical container for managing a browser cookie from the server. | [createCookie.md](./createCookie.md) |
| createCookieSessionStorage | Creates a SessionStorage implementation that stores all session data inside the cookie itself. | [createCookieSessionStorage.md](./createCookieSessionStorage.md) |
| createMemorySessionStorage | Creates a SessionStorage implementation that stores session data in application memory. | [createMemorySessionStorage.md](./createMemorySessionStorage.md) |
| createPath | Creates a string URL path from the given pathname, search, and hash components. | [createPath.md](./createPath.md) |
| createRoutesFromElements | Converts JSX Route elements into route configuration objects that can be used with data routers. | [createRoutesFromElements.md](./createRoutesFromElements.md) |
| createRoutesStub | Creates a minimal router context for unit-testing reusable components that depend on React Router hooks. | [createRoutesStub.md](./createRoutesStub.md) |
| createSearchParams | Creates a URLSearchParams object with enhancement for arrays as values in object-form initializers. | [createSearchParams.md](./createSearchParams.md) |
| data | Returns data from a loader or action together with custom HTTP headers or a status code. | [data.md](./data.md) |
| generatePath | Returns a path string with dynamic params interpolated into a route pattern. | [generatePath.md](./generatePath.md) |
| href | Returns a resolved URL path for the specified route with the route's params percent-encoded. | [href.md](./href.md) |
| IsCookieFunction | A type definition for a function that type-guards whether a value is a React Router Cookie object. | [IsCookieFunction.md](./IsCookieFunction.md) |
| isCookie | Returns true if a value is a React Router Cookie object, and false otherwise. | [isCookie.md](./isCookie.md) |
| IsSessionFunction | A type definition for a function that type-guards whether a value is a React Router Session object. | [IsSessionFunction.md](./IsSessionFunction.md) |
| isSession | Returns true if a value is a React Router Session object, and false otherwise. | [isSession.md](./isSession.md) |
| isRouteErrorResponse | A TypeScript type-guard that returns true when the given error is an ErrorResponse from a route's loader or action. | [isRouteErrorResponse.md](./isRouteErrorResponse.md) |
| matchPath | Performs pattern matching on a URL pathname and returns information about the match. | [matchPath.md](./matchPath.md) |
| matchRoutes | Matches the given routes to a location and returns the match data. | [matchRoutes.md](./matchRoutes.md) |
| parsePath | Parses a string URL path into its separate pathname, search, and hash components. | [parsePath.md](./parsePath.md) |
| redirect | Creates an HTTP redirect Response with a Location header for use in loaders or actions. | [redirect.md](./redirect.md) |
| redirectDocument | Creates an HTTP redirect Response that forces a full document reload at the new location. | [redirectDocument.md](./redirectDocument.md) |
| renderMatches | Renders the result of matchRoutes into a React element. | [renderMatches.md](./renderMatches.md) |
| replace | Creates a redirect Response that performs history.replaceState instead of pushing a new history entry. | [replace.md](./replace.md) |
| resolvePath | Returns a resolved Path object relative to a given pathname. | [resolvePath.md](./resolvePath.md) |
| RouterContextProvider | Provides methods for writing and reading values in application context in a type-safe way. | [RouterContextProvider.md](./RouterContextProvider.md) |
| sessions-and-cookies | Conceptual overview of how React Router manages sessions and cookies on the server. | [sessions-and-cookies.md](./sessions-and-cookies.md) |
