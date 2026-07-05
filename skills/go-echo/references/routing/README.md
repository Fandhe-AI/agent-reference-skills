# routing

| Name | Description | Path |
| --- | --- | --- |
| Route Registration | Register routes with `GET`/`POST`/`PUT`/`DELETE`/`PATCH`/`HEAD`/`OPTIONS`/`Add` | [route-registration.md](./route-registration.md) |
| Any / Match | Register a handler for all methods (`Any`) or a specific set of methods (`Match`) | [any-match.md](./any-match.md) |
| Match Types | Static / param / wildcard pattern priority in the radix-tree router | [match-types.md](./match-types.md) |
| Path Parameters | Read `:param` and wildcard `*` segments via `c.Param`/`c.ParamOr`/`c.PathValues` | [path-parameters.md](./path-parameters.md) |
| Query Parameters | Read query string values via `c.QueryParam`/`QueryParams`/`QueryString`/`QueryParamsBinder` | [query-parameters.md](./query-parameters.md) |
| Groups | Group routes under a shared prefix and middleware with `e.Group()` | [groups.md](./groups.md) |
| Static Routes | Overview of file-serving routes (`Static`/`StaticFS`/`File`); full detail in `response` | [static-routes.md](./static-routes.md) |
| Named Routes / Reverse Routing | Name routes and regenerate URLs with `RouteInfo.Reverse`/`Routes.Reverse` | [named-routes-reverse.md](./named-routes-reverse.md) |
