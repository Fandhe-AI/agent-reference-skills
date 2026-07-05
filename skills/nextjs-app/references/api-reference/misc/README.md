# Misc

| Name | Description | Path |
| --- | --- | --- |
| Adapters | Build deployment adapters integrating the Next.js build/runtime model with platforms | [adapters.md](./adapters.md) |
| Adapters: Configuration | Configure `adapterPath` / `NEXT_ADAPTER_PATH` to use a custom adapter | [adapters-configuration.md](./adapters-configuration.md) |
| Creating an Adapter | Implement the `NextAdapter` interface (`modifyConfig`, `onBuildComplete`) | [adapters-creating-an-adapter.md](./adapters-creating-an-adapter.md) |
| Adapters API Reference | `modifyConfig` and `onBuildComplete` signatures and context fields | [adapters-api-reference.md](./adapters-api-reference.md) |
| Testing Adapters | Validate adapters with the Next.js e2e deploy test harness | [adapters-testing-adapters.md](./adapters-testing-adapters.md) |
| Routing with @next/routing | Reproduce Next.js route matching in an adapter via `resolveRoutes` | [adapters-routing-with-next-routing.md](./adapters-routing-with-next-routing.md) |
| Implementing PPR in an Adapter | Seed and resume Partial Prerendering shells/postponed state | [adapters-implementing-ppr-in-an-adapter.md](./adapters-implementing-ppr-in-an-adapter.md) |
| Runtime Integration | How build-time adapters and runtime cache interfaces work together | [adapters-runtime-integration.md](./adapters-runtime-integration.md) |
| Invoking Entrypoints | Invoke Node.js and Edge build entrypoints with adapter runtime context | [adapters-invoking-entrypoints.md](./adapters-invoking-entrypoints.md) |
| Output Types | All build output types (`pages`, `appPages`, `prerenders`, ...) exposed to adapters | [adapters-output-types.md](./adapters-output-types.md) |
| Routing Information | Routing phases and route fields exposed in `onBuildComplete` | [adapters-routing-information.md](./adapters-routing-information.md) |
| Adapters Use Cases | Common deployment adapter implementation patterns | [adapters-use-cases.md](./adapters-use-cases.md) |
| Edge Runtime | API reference for the limited Web-standard Edge Runtime used in Proxy | [edge-runtime.md](./edge-runtime.md) |
| Turbopack | Rust-based incremental bundler, default in Next.js, configuration and feature support | [turbopack.md](./turbopack.md) |
