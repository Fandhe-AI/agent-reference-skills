# Routers

Hono ships multiple router implementations. The default `SmartRouter` automatically selects the fastest available router for the registered routes at startup.

## Router Types

| Router | Algorithm | Best For |
|--------|-----------|----------|
| `RegExpRouter` | Compiles all routes into one large RegExp for single-pass matching | General use — fastest in most scenarios |
| `TrieRouter` | Trie-tree traversal, no linear loops | Full pattern coverage where RegExpRouter is unsupported |
| `SmartRouter` | Delegates to the fastest router detected at startup | Default Hono config (wraps RegExpRouter + TrieRouter) |
| `LinearRouter` | Linear scan, no compilation step | Cold-start-sensitive environments (e.g., per-request initialization) |
| `PatternRouter` | Minimal pattern matching | Bundle-size-critical deployments (adds ~5.38 KiB gzipped) |

## Notes

- **RegExpRouter** converts route patterns into a single regular expression, outperforming tree-based algorithms in most cases. It does not support every possible routing pattern.
- **TrieRouter** handles all routing patterns and is significantly faster than Express, but slower than RegExpRouter.
- **SmartRouter** evaluates registered routes once at startup and selects the optimal router — Hono's default pairs it with `RegExpRouter` and `TrieRouter`.
- **LinearRouter** skips string compilation entirely, making it ~2.1x faster than alternatives in scenarios where the app is re-initialized per request.
- **PatternRouter** is the smallest router option; a full Hono app using only PatternRouter fits under 15 KB (5.38 KiB gzipped).

## Related

- [Benchmarks](./benchmarks.md)
- [Middleware](./middleware.md)
