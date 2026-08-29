---
source: https://fastify.dev/docs/latest/Reference/Reply/
---

# Reply.redirect()

`.redirect(dest, [code])` redirects a request to the specified URL, with an optional status code.

## Signature / Usage

```js
reply.redirect('/home')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dest` | `string` | The URL to redirect to. Must be properly encoded using `encodeURI` or a module such as `encodeurl`; invalid URLs result in a 500 `TypeError` response. |
| `code` | `number` (optional) | The HTTP status code. Defaults to `302` if not already set via `.code()`. |

```js
// no reply.code() call: sets status code to 302 and redirects to /home
reply.redirect('/home')

// no reply.code() call: sets status code to 303 and redirects to /home
reply.redirect('/home', 303)

// reply.code() call: sets status code to 303 and redirects to /home
reply.code(303).redirect('/home')

// reply.code() call: redirect()'s code argument takes precedence -> 302
reply.code(303).redirect('/home', 302)
```

## Notes

- **v4 → v5** (see Migration Guide V5, `FSTDEP021`): `reply.redirect()` argument order changed from `reply.redirect(code, dest)` in v4 to `reply.redirect(dest, [code])` in v5 — URL first, status code second:
  ```js
  // v4
  reply.redirect(301, '/new-route')
  // v5
  reply.redirect('/new-route', 301)
  ```

## Related

- [reply-methods](./reply-methods.md)
- [reply-hijack-trailers](./reply-hijack-trailers.md)
