# Directives

| Name | Description | Path |
|------|-------------|------|
| use cache | Mark a route, component, or function as cacheable (Cache Components feature) | [use-cache.md](./use-cache.md) |
| use cache: private | Cache functions that access runtime request APIs, no cross-request server cache; client router keeps it in browser memory for the stale time | [use-cache-private.md](./use-cache-private.md) |
| use cache: remote | Persistent, shared caching via remote cache handlers | [use-cache-remote.md](./use-cache-remote.md) |
| use client | Declare an entry point for Client Components (React; top of file only, before imports) | [use-client.md](./use-client.md) |
| use server | Designate a function/file as server-side; define Server Functions (React; file or function level, must be async) | [use-server.md](./use-server.md) |
