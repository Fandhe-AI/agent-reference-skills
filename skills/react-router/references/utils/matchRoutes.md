# matchRoutes

Matches the given routes to a location and returns the match data.

## Signature / Usage

```typescript
function matchRoutes<RouteObjectType extends RouteObject = RouteObject>(
  routes: RouteObjectType[],
  locationArg: Partial<Location> | string,
  basename = "/",
): RouteMatch<string, RouteObjectType>[] | null
```

```javascript
import { matchRoutes } from "react-router";

let routes = [{
  path: "/",
  Component: Root,
  children: [{
    path: "dashboard",
    Component: Dashboard,
  }]
}];

matchRoutes(routes, "/dashboard"); // [rootMatch, dashboardMatch]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `routes` | `RouteObjectType[]` | The array of route objects to match against |
| `locationArg` | `Partial<Location> \| string` | The location to match against, either a string path or a partial `Location` object |
| `basename` | `string` (default `"/"`) | Base path to strip from the location before matching |

Returns an array of matched routes in hierarchical order (parent routes before child routes), or `null` if no matches were found.

## Notes

- Available in **Framework Mode**, **Data Mode**, and **Declarative Mode** (all three modes)
- Useful for programmatically determining which routes match a given location

## Related

- [matchPath](./matchPath.md)
- [renderMatches](./renderMatches.md)
- [createRoutesFromElements](./createRoutesFromElements.md)
