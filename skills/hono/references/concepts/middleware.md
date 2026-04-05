# Middleware

A **Handler** is a primitive that receives a `Request` and returns a `Response`. **Middleware** is executed before and/or after the Handler, wrapping it in an onion-layer structure to handle cross-cutting concerns.

## Signature / Usage

```ts
// Registering middleware with app.use()
app.use(async (c, next) => {
  const start = Date.now()
  await next()                                     // proceed to next middleware / handler
  const elapsed = Date.now() - start
  c.res.headers.set("X-Response-Time", `${elapsed}ms`)
})
```

## Notes

- Middleware is registered via `app.use()` and receives a `Context` object (`c`) and a `next` function
- The `await next()` call passes control to the next layer; code after it runs on the way back out (post-handler)
- Follows an **onion model**: request flows in through each middleware layer, hits the handler, then flows back out in reverse order
- Built-in and third-party middleware is available; custom middleware can be created for any cross-cutting concern (auth, logging, caching, CORS, etc.)

## Related

- [Routers](./routers.md)
- [Developer Experience](./developer-experience.md)
