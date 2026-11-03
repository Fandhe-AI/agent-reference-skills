---
source: https://developers.cloudflare.com/pages/functions/routing/
---

# Routing

Functions use file-based routing: the directory structure under `/functions` determines the routes. Square brackets create dynamic segments.

## Signature / Usage

```text
functions/
  index.js              -> example.com
  helloworld.js         -> example.com/helloworld
  fruits/index.js       -> example.com/fruits
  fruits/apple.js       -> example.com/fruits/apple
```

Single path segment (`/functions/users/[user].js`), value is a string:

```js
export function onRequest(context) {
	return new Response(context.params.user);
}
```

Multiple segments (`/functions/users/[[user]].js`), value is an array:

```js
export function onRequest(context) {
	return new Response(JSON.stringify(context.params.catchall));
}
```

For a file named `[[catchall]].js`, `/users/daniel/xyz/123` returns `["daniel", "xyz", "123"]`.

## Options / Props

### Dynamic route patterns

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `[name].js` | file name | — | Matches exactly one path segment (`/users/nevi` yes; `/users/nevi/foobar` no; `/profile/nevi` no). Value on `context.params.name` is a string. |
| `[[name]].js` | file name | — | Matches any depth after the directory (`/users/nevi`, `/users/daniel/xyz/123` yes; `/nevi` no). Value on `context.params.name` is an array. |

### Matching examples (`date.js`, `users/special.js`, `users/[user].js`, `users/[[catchall]].js`)

| Request | File |
|---------|------|
| /foo | Routes to a static asset if one is available. |
| /date | /date.js |
| /users/daniel | /users/[user].js |
| /users/nevi | /users/[user].js |
| /users/special | /users/special.js |
| /users/daniel/xyz/123 | /users/[[catchall]].js |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Trailing slash is optional: `/foo` and `/foo/` both route to `/functions/foo.js` or `/functions/foo/index.js`. If both `/functions/foo.js` and `/functions/foo/index.js` exist, both URLs route to `/functions/foo/index.js`.
- If no Function matches, the request falls back to a static asset if there is one; otherwise to the default Pages static routing ([serving-pages.md](../configuration/serving-pages.md)).
- More specific routes (fewer wildcards) take precedence over less specific ones.
- Once a project has Functions, all requests invoke the Function by default; use `_routes.json` to exclude static routes.

## Related

- [invocation-routes.md](./invocation-routes.md)
- [event-context.md](./event-context.md)
- [middleware.md](./middleware.md)
