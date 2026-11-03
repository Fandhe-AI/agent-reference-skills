# samples

| Name | Description | Path |
| --- | --- | --- |
| Vite React SPA with an API Worker | Adapt a Vite React project to the Cloudflare Vite plugin, add an API Worker, then build, preview, and deploy. | [vite-react-spa-api.md](./vite-react-spa-api.md) |
| Vite Cloudflare Environments (staging / production) | Select a Wrangler environment at Vite dev or build time with `CLOUDFLARE_ENV`, or map Vite modes to environments. | [vite-cloudflare-environments.md](./vite-cloudflare-environments.md) |
| Vitest Unit and Integration Tests | Configure `@cloudflare/vitest-plugin` and write a unit test (`worker.fetch`) and an integration test (`exports.default.fetch`). | [vitest-first-test.md](./vitest-first-test.md) |
| Vitest Mock Outbound Requests with MSW | Mock a Worker's outbound `fetch()` with `@msw/cloudflare` in Vitest tests. | [vitest-mock-outbound-requests.md](./vitest-mock-outbound-requests.md) |
| Vitest D1 Migrations | Read D1 migrations in Node.js at config time and pass them to tests as a test-only binding. | [vitest-d1-migrations.md](./vitest-d1-migrations.md) |
| Vitest Scheduled, Queue, and Durable Object Tests | Call `scheduled()` and `queue()` handlers directly and inspect a Durable Object with `runInDurableObject`. | [vitest-scheduled-queue-durable-objects.md](./vitest-scheduled-queue-durable-objects.md) |
| Vitest Workflow Introspection | Disable sleeps, mock an event, and await completion of a Workflow instance in a test. | [vitest-workflow-introspection.md](./vitest-workflow-introspection.md) |
| Miniflare Dispatch Events Programmatically | Start Miniflare from Node.js, dispatch a fetch, and fire `scheduled` and `queue` events. | [miniflare-dispatch-events.md](./miniflare-dispatch-events.md) |
| Miniflare Tests with node:test | Test a plain JavaScript Worker through `dispatchFetch()` using Node's built-in test runner. | [miniflare-node-test.md](./miniflare-node-test.md) |
| createTestHarness First Test | Run a Worker from its Wrangler config in a local server and assert on `server.fetch()`. | [test-harness-first-test.md](./test-harness-first-test.md) |
| createTestHarness Prepare Test State | Apply D1 migrations, seed rows, and mock an outbound `fetch()` in harness tests. | [test-harness-prepare-state.md](./test-harness-prepare-state.md) |
| Deploy a Worker with GitHub Actions | Deploy on every push to `main` using the official `cloudflare/wrangler-action`. | [github-actions-deploy.md](./github-actions-deploy.md) |
| Local Secrets with .dev.vars | Provide secrets for local development with `.dev.vars` (or `.env`), including per-environment files. | [dev-vars-secrets.md](./dev-vars-secrets.md) |
| Remote Bindings in Local Development | Run the Worker locally but connect selected bindings to real resources, per environment. | [remote-bindings.md](./remote-bindings.md) |
| Gradual Deployment with Smoke Test | Upload a new version, split traffic, and target a specific version with a version override. | [gradual-deployment.md](./gradual-deployment.md) |
