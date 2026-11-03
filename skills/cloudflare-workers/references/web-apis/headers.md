---
source: https://developers.cloudflare.com/workers/runtime-apis/headers/
---

# Headers

All HTTP request and response headers are available through the Headers API.

## Signature / Usage

When a header name possesses multiple values, those values are concatenated as a single, comma-delimited string. `Headers.get` always returns a string or `null`, except for `Set-Cookie`, which requires `Headers.getAll`.

```js
let headers = new Headers();

headers.get('x-foo'); //=> null

headers.set('x-foo', '123');
headers.get('x-foo'); //=> "123"

headers.set('x-foo', 'hello');
headers.get('x-foo'); //=> "hello"

headers.append('x-foo', 'world');
headers.get('x-foo'); //=> "hello, world"
```

## Notes

Differences from the web standard (intentional, reflecting the server-side nature of Workers):

- `getAll()`: although obsolete in browsers, Workers still provides `Headers.getAll` for the `Set-Cookie` header, because cookies often contain date strings with commas. Using `getAll` with any other header name throws an error.
- `Set-Cookie` handling: due to RFC 6265 prohibiting folding multiple `Set-Cookie` headers into one, `Headers.append` sets multiple `Set-Cookie` response headers instead of appending to the existing one.
- `USVString` return type: `Headers.get` returns a `USVString` instead of the `ByteString` specified by the web standard. For most scenarios this has no noticeable effect.
- Workers type definitions (`@cloudflare/workers-types` or `wrangler types`) define a `Headers` type with `getAll()`, which is not directly compatible with the `lib.dom.d.ts` `Headers`; type assertions may be needed.
- Cloudflare sets a number of its own custom headers on incoming requests and outgoing responses; see the Cloudflare HTTP headers reference (https://developers.cloudflare.com/fundamentals/reference/http-headers/).

`Set-Cookie` example (from the same page):

```js
const headers = new Headers();

headers.append("Set-Cookie", "cookie1=value_for_cookie_1; Path=/; HttpOnly;");
headers.append("Set-Cookie", "cookie2=value_for_cookie_2; Path=/; HttpOnly;");

console.log(headers.getAll("Set-Cookie"));
// Array(2) [ cookie1=value_for_cookie_1; Path=/; HttpOnly;, cookie2=value_for_cookie_2; Path=/; HttpOnly; ]
```

## Related

- [Request](./request.md)
- [Response](./response.md)
- [Fetch](./fetch.md)
