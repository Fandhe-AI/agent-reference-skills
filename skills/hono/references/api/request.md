# HonoRequest

Wrapper around the standard `Request` object, accessible via `c.req` in handlers. Provides typed helpers for extracting path params, query strings, headers, and request bodies.

## Signature / Usage

```ts
// Accessed through the Context object
app.get('/user/:id', (c) => {
  const id = c.req.param('id')
  return c.text(id)
})
```

## Methods

### param()

Retrieve path parameters.

```ts
param(key: string): string
param(): Record<string, string>
```

```ts
const id = c.req.param('id')
const { id, commentId } = c.req.param()
```

### query()

Retrieve query string parameters.

```ts
query(key: string): string | undefined
query(): Record<string, string>
```

```ts
const q = c.req.query('q')
const { q, limit } = c.req.query()
```

### queries()

Retrieve multiple values for the same query key (e.g. `?tags=A&tags=B`).

```ts
queries(key: string): string[]
```

```ts
const tags = c.req.queries('tags')  // ['A', 'B']
```

### header()

Retrieve request headers.

```ts
header(name: string): string | undefined
header(): Record<string, string>
```

```ts
const ua = c.req.header('User-Agent')
```

When called without arguments, all returned keys are **lowercase**.

### parseBody()

Parse `multipart/form-data` or `application/x-www-form-urlencoded` bodies.

```ts
parseBody(options?: { all?: boolean; dot?: boolean }): Promise<Record<string, string | File | (string | File)[]>>
```

```ts
const body = await c.req.parseBody()
const body = await c.req.parseBody({ all: true })   // handle duplicate field names
const body = await c.req.parseBody({ dot: true })   // foo.bar → { foo: { bar: ... } }
```

Use the `foo[]` field name suffix to receive multiple files as an array.

### json()

Parse a JSON request body.

```ts
json<T = unknown>(): Promise<T>
```

```ts
const data = await c.req.json<{ name: string }>()
```

### text()

Parse a plain-text request body.

```ts
text(): Promise<string>
```

### arrayBuffer()

Parse the request body as an `ArrayBuffer`.

```ts
arrayBuffer(): Promise<ArrayBuffer>
```

### blob()

Parse the request body as a `Blob`.

```ts
blob(): Promise<Blob>
```

### formData()

Parse the request body as a `FormData` object.

```ts
formData(): Promise<FormData>
```

### valid()

Retrieve data that has been validated by a validator middleware.

```ts
valid(target: 'form' | 'json' | 'query' | 'header' | 'cookie' | 'param'): Record<string, unknown>
```

```ts
const { title, body } = c.req.valid('form')
```

### cloneRawRequest()

Clone the raw `Request` object after the body has been consumed.

```ts
cloneRawRequest(): Request
```

Useful when you need to pass the original request to another function after reading the body.

## Properties

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | Full request URL including protocol and query string |
| `path` | `string` | Pathname portion of the URL (no query string) |
| `method` | `string` | HTTP method in uppercase (e.g. `GET`) |
| `raw` | `Request` | The underlying Web API `Request` object |
| `matchedRoutes` | `RouteData[]` | Array of matched routes with `handler`, `method`, `path` — deprecated in v4.8.0 |
| `routePath` | `string` | Registered route pattern (e.g. `/posts/:id`) — deprecated in v4.8.0 |

## Notes

- `matchedRoutes` and `routePath` are deprecated since v4.8.0; use Route Helper instead
- `parseBody()` requires the content-type to be `multipart/form-data` or `application/x-www-form-urlencoded`
- `cloneRawRequest()` is necessary when passing the request downstream after body consumption, since `Request.body` is a one-time-read stream

## Related

- [context.md](./context.md)
- [routing.md](./routing.md)
