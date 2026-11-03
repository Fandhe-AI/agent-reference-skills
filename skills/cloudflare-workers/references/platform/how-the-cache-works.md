---
source: https://developers.cloudflare.com/workers/reference/how-the-cache-works/
---

# How the Cache works

How Workers interact with a zone's Cloudflare cache via `fetch()` and the Cache API, and how to purge cached assets.

## Signature / Usage

Decision flow for single-file purge of assets cached by a Worker (mermaid, as in the source):

```
flowchart TD
accTitle: Single file purge  assets cached by a worker
accDescr: This diagram is meant to help choose how to purge a file.
A("You have a Worker script that runs on <code>https://</code><code>example.com/hello</code> <br> and this Worker makes a <code>fetch</code> request to <code>https://</code><code>notexample.com/hello</code>.") --> B(Is <code>notexample.com</code> <br> an active zone on Cloudflare?)
    B -- Yes --> C(Is <code>https://</code><code>notexample.com/</code> <br> proxied through Cloudflare?)
    B -- No  --> D(Purge <code>https://</code><code>notexample.com/hello</code> <br> from the original <code>example.com</code> zone.)
    C -- Yes --> E(Do you own <br> <code>notexample.com</code>?)
    C -- No --> F(Purge <code>https://</code><code>notexample.com/hello</code> <br> from the original <code>example.com</code> zone.)
    E -- Yes --> G(Purge <code>https://</code><code>notexample.com/hello</code> <br> from the <code>notexample.com</code> zone.)
    E -- No --> H(Sorry, you can not purge the asset. <br> Only the owner of <code>notexample.com</code> can purge it.)
```

## Options / Props

| Approach | Behavior |
| --- | --- |
| `fetch()` | Reads through the matching zone's cache; applies Cloudflare cache settings; cannot modify or inspect objects before they reach the cache; `CF-Cache-Status: HIT` shows a filled cache. Recommended when the Worker acts as middleware. Compatible with tiered caching. |
| Cache API `caches.default` | The cache shared with `fetch()`; useful to override already-cached content. |
| Cache API `caches.open(name)` | Namespaced cache separate from `fetch()`'s (async). |

## Notes

- Workers run before the cache and can modify assets returned from it.
- To cache responses from the Worker itself so Cloudflare returns them without executing the Worker, see https://developers.cloudflare.com/workers/cache/.
- The Cache API is local to a data center and not compatible with tiered caching: `match`, `put`, and `delete` act only on the local data center.
- Purging: `cache.delete` purges only locally. Global purge uses Cloudflare cache purge options (Purge Everything works for all assets; purge by `Cache-Tag` works if you set `Cache-Tag` via `response.headers.append()` before `put()`; `cache.match()` responses do not include `Cache-Tag`). A URL using a custom cache key set by a Worker cannot be purged; use a custom key via Cache Rules instead.
- Single-file purge targets the URL in the Worker's `fetch` request (`https://notexample.com/hello`), not the end-user URL (`https://example.com/hello`).
- Browser cache is controlled by `Cache-Control` on the returned `Response`.
- The Cache API is the only option to customize caching when the project has no backend; for Worker-as-middleware use `fetch`.
- The only fenced block in the source is an untagged mermaid diagram, reproduced above.

## Related

- [limits.md](./limits.md)
- [../web-apis/README.md](../web-apis/README.md)
