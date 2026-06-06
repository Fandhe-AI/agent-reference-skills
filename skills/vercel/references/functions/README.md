# Vercel Functions References

| Name | Description | Path |
|------|-------------|------|
| Overview | Introduction to Vercel Functions: lifecycle, entrypoints, and key concepts | [overview.md](./overview.md) |
| Fluid Compute | Hybrid execution model with optimized concurrency, bytecode caching, and failover | [fluid-compute.md](./fluid-compute.md) |
| Node.js Runtime | Full Node.js API access, TypeScript support, helper methods, and server entrypoints | [node-js-runtime.md](./node-js-runtime.md) |
| Edge Runtime | V8-based runtime executing closest to users; supported APIs and limitations | [edge-runtime.md](./edge-runtime.md) |
| Runtimes | All official and community runtimes, bundle size limits, and feature comparison | [runtimes.md](./runtimes.md) |
| Configuring Functions | Overview of runtime, region, duration, and memory configuration methods | [configuring-functions.md](./configuring-functions.md) |
| Regions | Region list, plan limits, per-function overrides, and failover configuration | [regions.md](./regions.md) |
| Maximum Duration | Max duration limits by plan, configuration per framework/runtime | [max-duration.md](./max-duration.md) |
| Memory and CPU | Memory/CPU types (Standard/Performance), plan limits, dashboard configuration | [memory.md](./memory.md) |
| Limitations | All limits: memory, duration, bundle size, payload, file descriptors, env vars | [limitations.md](./limitations.md) |
| Routing Middleware | Pre-request code for redirects, rewrites, geolocation, and header manipulation | [routing-middleware.md](./routing-middleware.md) |
| ISR | Incremental Static Regeneration: stale-while-revalidate caching with CDN integration | [isr.md](./isr.md) |
| Image Optimization | Dynamic image transformation, CDN caching, remote/local patterns, pricing | [image-optimization.md](./image-optimization.md) |
| Streaming | Streaming responses from Node.js, Edge, and Python runtimes; AI SDK integration | [streaming.md](./streaming.md) |
| Usage and Pricing | Fluid compute billing: Active CPU, Provisioned Memory, Invocations, regional rates | [usage-and-pricing.md](./usage-and-pricing.md) |
