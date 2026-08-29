---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# URL Building

Fastify supports both static and dynamic URLs. To register a parametric path, use a colon before the parameter name. For wildcard, use a star. Static routes are always checked before parametric and wildcard routes.

## Signature / Usage

```js
// parametric
fastify.get('/example/:userId', function (request, reply) {
  // curl ${app-url}/example/12345
  // userId === '12345'
  const { userId } = request.params;
  // your code here
})
fastify.get('/example/:userId/:postId', function (request, reply) {
  // curl ${app-url}/example/12345/abc.zHi
  // userId === '12345'
  // postId === 'abc.zHi'
  const { userId, postId } = request.params;
  // your code here
})

// wildcard
fastify.get('/example/*', function (request, reply) {})
```

Regular expression routes are supported, but slashes must be escaped. RegExp is also very expensive in terms of performance.

```js
// parametric with regexp
fastify.get('/example/:file(^\\d+).png', function (request, reply) {
  // curl ${app-url}/example/12345.png
  // file === '12345'
  const { file } = request.params;
  // your code here
})
```

It is possible to define more than one parameter within the same slash ("/"), using the dash ("-") as parameter separator:

```js
fastify.get('/example/near/:lat-:lng/radius/:r', function (request, reply) {
  // curl ${app-url}/example/near/15°N-30°E/radius/20
  // lat === "15°N"
  // lng === "30°E"
  // r ==="20"
  const { lat, lng, r } = request.params;
  // your code here
})
```

Multiple parameters with RegExp are also possible (any character not matched by the regular expression can be used as separator):

```js
fastify.get('/example/at/:hour(^\\d{2})h:minute(^\\d{2})m', function (request, reply) {
  // curl ${app-url}/example/at/08h24m
  // hour === "08"
  // minute === "24"
  const { hour, minute } = request.params;
  // your code here
})
```

The last parameter can be made optional by adding a question mark ("?") to the end of the parameter name:

```js
fastify.get('/example/posts/:id?', function (request, reply) {
  const { id } = request.params;
  // your code here
})
```

In this case, `/example/posts` and `/example/posts/1` are both valid. The optional param is `undefined` if not specified.

To include a colon in a path without declaring a parameter, use a double colon:

```js
fastify.post('/name::verb') // will be interpreted as /name:verb
```

## Notes

- Having a route with multiple parameters may negatively affect performance. Prefer a single parameter approach, especially on routes on the hot path of the application (see find-my-way).
- Security: Fastify (via find-my-way) percent-decodes route parameters and wildcards before they reach the handler. Encoded separators in a segment are decoded in the parameter value: for a route `/download/:file`, a request to `/download/..%2fsecret.txt` yields `request.params.file === '../secret.txt'`. Parameters are untrusted input — do not pass them to `path.join`, `fs` APIs, template engines, or redirects without validation or path containment. To serve files from a directory root, use `@fastify/static` instead of joining `request.params` into a filesystem path directly. See also Request.
- The upstream example names the second segment `secretToken`; it is renamed here because credentials must not travel in URL paths (they leak into access logs, proxies, and browser history) — carry them in the `Authorization` header or a validated cookie instead.

## Related

- [route-options.md](./route-options.md)
- [route-prefixing.md](./route-prefixing.md)
