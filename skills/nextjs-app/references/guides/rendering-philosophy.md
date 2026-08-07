# Rendering Philosophy

Next.js treats the boundary between static and dynamic rendering as a spectrum at the component level rather than a binary route-level choice, enabled by Partial Prerendering, Cache Components (`use cache`), and on-demand revalidation.

## Notes

- A single page can have a static shell that loads instantly plus dynamic sections that stream in as they resolve; a cached function can live inside a dynamic route; a static page can update without a redeploy.
- Benefits: faster perceived load times (static shell renders immediately), incremental caching (no upfront static/dynamic decision), granular caching (`use cache` per function, revalidate per tag).
- Trade-off vs. build-time prerendering (all static, zero runtime infra) and route-level boundaries (all-or-nothing per route): component-level boundaries move complexity from application code into the hosting platform.
- Infrastructure implications for hosting platforms: streaming (single response mixes static/dynamic content), cache coordination across instances (`revalidateTag()` / `revalidatePath()`), cache consistency (HTML and RSC payload must stay in sync), and PPR shell delivery at CDN latency.
- **Functional fidelity**: every Next.js feature works correctly, verified by the [adapter test suite](/docs/app/api-reference/adapters/testing-adapters) — binary pass/fail.
- **Performance fidelity**: features achieve optimal performance characteristics (e.g. PPR shell at CDN vs. origin latency) — a spectrum platforms differentiate on.
- Next.js runs as a Node.js server process; a single process handles every feature correctly, streaming is what enables progressive delivery of Server Components/PPR.

## Related

- [CDN Caching](./cdn-caching.md)
- [Streaming](./streaming.md)
- [Self-Hosting](./self-hosting.md)
