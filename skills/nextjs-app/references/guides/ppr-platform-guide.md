# Partial Prerendering (PPR) Platform Guide

Guide for platform engineers implementing PPR support: PPR combines a static HTML shell with streamed dynamic content, from basic origin rendering to optimized CDN integration.

## Signature / Usage

At build time, Next.js produces per PPR-route: a static HTML shell (with Suspense fallbacks), an opaque `postponedState` blob, and an RSC payload for static portions. At request time, the shell is served immediately and dynamic portions resume and stream using the postponed state.

Resume protocol (CDN-to-origin): send `POST` with header `next-resume: 1` and the `postponedState` blob as the request body; the server renders only the deferred Suspense boundaries.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `renderingMode: 'PARTIALLY_STATIC'` | adapter output field | Identifies PPR routes in `outputs.prerenders` |
| `fallback.postponedState` | string (opaque) | Must be passed through unmodified; altering it produces incorrect dynamic output |
| `next-resume` header | `'1'` | Tells the handler to skip the shell and render only dynamic portions |
| `x-next-resume-state-length` | header | Byte length of the postponed-state prefix when combined with a Server Action body |
| `requestMeta.onCacheEntryV2` | adapter hook | Observes cache updates (new shell + postponed state pairs) to propagate to storage |

## Notes

- Shell and `postponedState` must be stored and updated atomically — serving a new shell with an old postponed state (or vice versa) produces incorrect dynamic content.
- Origin-only implementation works on any platform supporting streaming HTTP responses (this is what `next start` does by default); no extra infrastructure required.
- CDN Shell + Origin Compute: CDN serves the cached shell at edge latency, sends a resume request to origin in parallel, then concatenates shell + streamed dynamic content into one response.
- Adapter-based invocation can bypass HTTP entirely by passing `requestMeta: { postponed: postponedState }` as the third argument to the handler.
- Implementation checklist: read PPR outputs at build (`onBuildComplete`), serve cached shell at request time, resume dynamic rendering via the protocol, handle cache updates atomically, and support graceful degradation to full server render if postponed state is stale/unavailable.

## Related

- [Streaming](./streaming.md)
- [Prefetching](./prefetching.md)
