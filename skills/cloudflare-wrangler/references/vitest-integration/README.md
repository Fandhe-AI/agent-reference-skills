# vitest-integration

| Name | Description | Path |
|------|-------------|------|
| Testing overview | Choose between the Workers Vitest integration (unit) and createTestHarness (integration); Miniflare sandbox warning | [testing-overview.md](./testing-overview.md) |
| Vitest integration overview | cloudflareTest plugin running Vitest inside the Workers runtime; vitest-pool-workers relationship | [vitest-overview.md](./vitest-overview.md) |
| Write your first test | Install, configure, types, unit and integration tests | [write-your-first-test.md](./write-your-first-test.md) |
| Configuration | cloudflareTest(), CloudflareTestOptions, buildPagesASSETSBinding, readD1Migrations, inject | [configuration.md](./configuration.md) |
| Test APIs | cloudflare:workers and cloudflare:test helpers: env, exports, Durable Objects, D1, Secrets Store, Workflows | [test-apis.md](./test-apis.md) |
| Isolation and concurrency | Per-file storage isolation, module caches, injected nodejs_compat flags | [isolation-and-concurrency.md](./isolation-and-concurrency.md) |
| Known issues | Coverage, fake timers, WebSockets, ctx.exports, module resolution workarounds | [known-issues.md](./known-issues.md) |
| Debugging | vitest --inspect and VS Code launch configuration | [debugging.md](./debugging.md) |
| Mock outbound requests | @msw/cloudflare HTTP and WebSocket mocking | [mock-outbound-requests.md](./mock-outbound-requests.md) |
| Recipes and examples | Index of vitest-plugin-examples fixture projects | [recipes.md](./recipes.md) |
| Migrate to Vitest plugin | vitest-pool-workers to vitest-plugin codemod and manual rename | [migrate-to-vitest-plugin.md](./migrate-to-vitest-plugin.md) |
| Migrate from Vitest 3 to Vitest 4 | pool-workers v0.12.x to v0.13.x, cloudflareTest plugin model | [migrate-from-vitest-3-to-vitest-4.md](./migrate-from-vitest-3-to-vitest-4.md) |
| Migrate from unstable_dev | unstable_dev to exports.default.fetch() | [migrate-from-unstable-dev.md](./migrate-from-unstable-dev.md) |
| Migrate from Miniflare 2 | Miniflare 2 test environments to cloudflareTest and cloudflare:test helpers | [migrate-from-miniflare-2.md](./migrate-from-miniflare-2.md) |
