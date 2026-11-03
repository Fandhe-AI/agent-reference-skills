---
source: https://developers.cloudflare.com/workers/static-assets/redirects/
---

# Redirects

Declare redirects in a plain text `_redirects` file (no extension) in the static assets directory. The file is parsed by Workers and not served as an asset.

## Signature / Usage

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

## Options / Props

| Field | Type | Description |
|-------|------|-------------|
| `source` | string (required) | A file path. May include wildcards (`*`) and placeholders. Fragments in the source are not evaluated. |
| `destination` | string (required) | A file path or external link. May include fragments, query strings, splats, and placeholders. |
| `code` | number (optional, default 302) | Status code. |

Advanced redirect support:

| Feature | Support | Example |
|---------|---------|---------|
| Redirects (301, 302, 303, 307, 308) | Yes | `/home / 301` |
| Rewrites (other status codes) | No | `/blog/* /blog/404.html 404` |
| Splats | Yes | `/blog/* /posts/:splat` |
| Placeholders | Yes | `/blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug` |
| Query Parameters | No | `/shop id=:id /blog/:id 301` |
| Proxying | Yes | `/blog/* /news/:splat 200` |
| Domain-level redirects | No | `workers.example.com/* workers.example.com/blog/:splat 301` |
| Redirect by country or language | No | `/ /us 302 Country=us` |
| Redirect by cookie | No | `/\* /preview/:splat 302 Cookie=preview` |

## Notes

- One redirect per line, otherwise it is ignored. Lines starting with `#` are comments.
- Limits: 2,000 static redirects and 100 dynamic redirects (2,100 total); each declaration is limited to 1,000 characters.
- Order matters: the top-most redirect for the same source wins. Static redirects should appear before dynamic redirects. Redirects are always followed, even when an asset matches.
- Redirects are NOT applied to requests served by your Worker code; apply them manually in the Worker or use Bulk Redirects (https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/).
- Redirects execute before headers; if both match, the redirect wins.
- Splat (`*`): greedy, one per URL, referenced as `:splat`. Placeholder (`:name`, `:[A-Za-z]\w*`): each referenced once; matches all characters except the delimiter.

```txt
/movies/:title /media/:title
```

- Proxying (status 200) supports only relative URLs on your site, not external domains. Only the first matching redirect applies: with the rules below, `/a` renders `/b` and `/b` renders `/c`, but `/a` does not render `/c`.

```plaintext
/a /b 200
/b /c 200
```

- Proxied pages can hurt SEO; add a canonical `Link` header in `_headers`:

```txt
/about/faq/*
  Link: </about/faqs>; rel="canonical"
```

- Beyond 2,100 rules use Bulk Redirects. If both apply, Bulk Redirects run in front of your Worker: Bulk Redirects `abc.com` to `xyz.com` plus `_redirects` `xyz.com` to `foo.com` ends at `foo.com`.

## Related

- [Headers](./headers.md)
- [Migrate from Pages](./migrate-from-pages.md)
