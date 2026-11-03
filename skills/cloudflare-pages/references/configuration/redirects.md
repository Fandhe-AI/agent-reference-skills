---
source: https://developers.cloudflare.com/pages/configuration/redirects/
---

# Redirects

Declare URL redirects and 200-status proxying for Pages static assets in a `_redirects` file.

## Signature / Usage

Place a plain text `_redirects` file (no extension) in the build output directory. One redirect per line:

```txt
[source] [destination] [code?]
```

```txt
/home301 / 301
/home302 / 302
/querystrings /?query=string 301
/twitch https://twitch.tv
/trailing /trailing/ 301
/notrailing/ /nottrailing 301
/page/ /page2/#fragment 301
/blog/* https://blog.my.domain/:splat
/products/:code/:name /products?code=:code&name=:name
```

Placeholder:

```txt
/movies/:title /media/:title
```

Proxying (only the first matching rule applies: `/a` renders `/b`, `/b` renders `/c`, `/a` does not render `/c`):

```plaintext
/a /b 200
/b /c 200
```

Canonical `Link` header to pair with proxied pages (in `_headers`):

```txt
/about/faq/*
  Link: </about/faqs>; rel="canonical"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `source` | string | — | Required file path; may contain wildcards and placeholders; fragments are not evaluated. |
| `destination` | string | — | Required file path or external link; may contain fragments, query strings, splats, placeholders. |
| `code` | number | 302 | Optional status code. |

Feature support:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Redirects (301, 302, 303, 307, 308) | supported | 302 | `/home / 301` |
| Rewrites (other status codes) | not supported | — | `/blog/* /blog/404.html 404` |
| Splats | supported | — | `/blog/* /posts/:splat` |
| Placeholders | supported | — | `/blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug` |
| Query parameters | not supported | — | `/shop id=:id /blog/:id 301` |
| Proxying | supported | — | `/blog/* /news/:splat 200` |
| Domain-level redirects | not supported | — | `workers.example.com/* workers.example.com/blog/:splat 301` |
| Redirect by country or language | not supported | — | `/ /us 302 Country=us` |
| Redirect by cookie | not supported | — | `/\* /preview/:splat 302 Cookie=preview` |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages). Workers static assets supports `_redirects` natively with the same format and limits (see the cloudflare-workers skill, static-assets/redirects); the difference is which code path skips it: Pages Functions here, your Worker code there.
- Lines starting with `#` are comments; malformed lines are ignored.
- Limits: 2,000 static and 100 dynamic redirects (2,100 total); 1,000 characters per declaration. Order matters (top-most wins for the same source); put static redirects before dynamic ones; redirects are always followed even if an asset matches.
- `_redirects` is not applied to requests served by Pages Functions; move the behavior into the function route or exclude the route from Functions with `_routes.json`.
- Redirects run before headers; if a request matches both files the redirect wins.
- Splat `*` is greedy, one per URL, referenced as `:splat`. Placeholders `:[A-Za-z]\w*` are referenced once and match everything except the delimiter.
- Proxying supports only relative URLs on your site, not external domains. Proxied pages can hurt SEO; add the canonical `Link` header.
- Beyond 2,100 rules use Bulk Redirects, which run in front of your Pages project: Bulk `abc.com` to `xyz.com` plus `_redirects` `xyz.com` to `foo.com` ends at `foo.com`.
- `/notrailing/ /nottrailing` is spelled as in the official example.

## Related

- [Headers](./headers.md)
- [Serving Pages](./serving-pages.md)
