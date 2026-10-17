# functions

| Name | Description | Path |
|------|-------------|------|
| Bun Runtime (Beta) | Bun runtime (Beta, all plans) for Vercel Functions: an all-in-one JavaScript runtime alternative to Node.js. Configured with `bunVersion` in `vercel.json`. | [bun-runtime.md](./bun-runtime.md) |
| Concurrency Scaling | Vercel automatically scales functions based on demand to handle traffic surges. Available on all plans. | [concurrency-scaling.md](./concurrency-scaling.md) |
| Configuring Functions | Configure runtime, region, maximum duration, and memory for Vercel Functions via function code, `vercel.json`, or the dashboard. | [configuring-functions.md](./configuring-functions.md) |
| Container Runtime (Beta) | Run any code and library on Vercel Functions with an OCI container image built from a `Dockerfile.vercel` file. Available on all plans (Beta). Uses Active CPU pricing. | [container-runtime.md](./container-runtime.md) |
| Edge Runtime | Built on V8; runs in isolated environments without containers or VMs. Executes closest to the user by default. Migration to Node.js is recommended for improved performance and reliability. | [edge-runtime.md](./edge-runtime.md) |
| Fluid Compute | A hybrid execution model blending serverless flexibility with server-like concurrency. Multiple invocations share a single function instance, reducing cold starts, lowering latency, and saving compute costs. | [fluid-compute.md](./fluid-compute.md) |
| @vercel/functions API Reference | Helper methods from the `@vercel/functions` package (Node.js) for Vercel Functions. | [functions-api-reference.md](./functions-api-reference.md) |
| Go Runtime | Go runtime (Beta, all plans) deploys a Go HTTP server on Vercel. The Go Framework Preset works with standard `net/http` and frameworks such as `chi` or `gin`. | [go-runtime.md](./go-runtime.md) |
| Image Optimization | Dynamically transforms and caches images on the Vercel CDN to reduce file size while maintaining quality. Works with Next.js `Image` component, Nuxt, Astro, and other frameworks. | [image-optimization.md](./image-optimization.md) |
| Incremental Static Regeneration (ISR) | A caching strategy combining static content speed with server-side rendering flexibility. Serves cached responses while regenerating content in the background on a schedule or via API trigger (stale-while-revalidate). | [isr.md](./isr.md) |
| Vercel Functions Limits | All limits for Vercel Functions using the Node.js runtime. | [limitations.md](./limitations.md) |
| Configuring Maximum Duration | The maximum duration defines how long a function can run before Vercel terminates it with a 504 `FUNCTION_INVOCATION_TIMEOUT` error. Default is 300s; configurable up to plan limits. | [max-duration.md](./max-duration.md) |
| Configuring Memory and CPU | Determines how much memory and CPU a function can use. Configurable via the dashboard (Pro/Enterprise only); not configurable in `vercel.json`. | [memory.md](./memory.md) |
| Node.js Runtime | Runs Node.js HTTP servers or individual functions written in JavaScript or TypeScript. Provides full Node.js API access, high RAM/CPU, and bundles up to 250 MB. | [node-js-runtime.md](./node-js-runtime.md) |
| Vercel Functions Overview | Run server-side code on Vercel without managing servers. Functions scale automatically to user demand, handle API/database connections, and offer enhanced concurrency via fluid compute. | [overview.md](./overview.md) |
| Python Runtime | Runs ASGI and WSGI applications on Vercel. Vercel detects supported Python frameworks (FastAPI, Flask, Django) and runs the app as Vercel Functions. | [python-runtime.md](./python-runtime.md) |
| Configuring Regions for Vercel Functions | Functions should execute close to their data source to minimize latency. Default region is `iad1` (Washington D.C., USA) for all new projects. | [regions.md](./regions.md) |
| Routing Middleware | Code that executes before a request is processed, enabling personalization, redirects, rewrites, geolocation-based routing, and header manipulation. Per the current docs, the `runtime` option defaults to `nodejs` (the older Edge-by-default wording is superseded). | [routing-middleware.md](./routing-middleware.md) |
| Ruby Runtime (Beta) | Ruby runtime (Beta, all plans) compiles Ruby Vercel Functions that define a single HTTP handler from `.rb` files within an `/api` directory at the project root. | [ruby-runtime.md](./ruby-runtime.md) |
| Runtimes | Runtimes transform source code into Vercel Functions. Each runtime provides different APIs, performance characteristics, and trade-offs. | [runtimes.md](./runtimes.md) |
| Rust Runtime (Beta) | Rust runtime (Beta, all plans) for high-performance, memory-safe functions. Runs on Fluid compute. Each file in `api/` becomes a function. | [rust-runtime.md](./rust-runtime.md) |
| Streaming | Send response data in chunks as they are processed, rather than waiting for the full response. Particularly useful for AI/LLM responses where output is available incrementally. | [streaming.md](./streaming.md) |
| Usage and Pricing (Fluid Compute) | Vercel Functions on fluid compute are priced on three dimensions: Active CPU, Provisioned Memory, and Invocations. Active CPU pauses billing during I/O; Provisioned Memory bills continuously while an instance handles requests. | [usage-and-pricing.md](./usage-and-pricing.md) |
| Vercel Python SDK (vercel.functions) | Python helper APIs for Vercel Functions, provided by the `vercel` package. | [vercel-sdk-python.md](./vercel-sdk-python.md) |
| Wasm Runtime | Use WebAssembly (compiled from C, Go, Rust, etc.) in Vercel Functions or Routing Middleware when the runtime is `edge`, `nodejs`, or `bun`. | [wasm-runtime.md](./wasm-runtime.md) |
| WebSockets | Vercel Functions can serve WebSocket connections (Beta, all plans) for realtime features such as AI streaming, chat, and collaboration. | [websockets.md](./websockets.md) |
