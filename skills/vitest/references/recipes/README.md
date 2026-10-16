# recipes

| Name | Description | Path |
|------|-------------|------|
| Domain Locators (Extending Browser Locators) | `locators.extend` (since 3.2.0) adds domain-specific locator methods while keeping auto-retry, strict-mode protection, and chaining of the locator API. Browser mode only. | [browser-locators.md](./browser-locators.md) |
| Cancellable Test Resources | Use the test context `signal` (since 3.2.0) so resources such as `fetch`, child processes, streams, and polling loops are released when Vitest cancels a test. | [cancellable.md](./cancellable.md) |
| Conditional Mocking with vi.when | `vi.when` (since 5.0.0) declares argument-specific mock behaviors via `.calledWith(...)` plus a `then*` action, replacing hand-written `mockImplementation` switch logic. | [conditional-mocking.md](./conditional-mocking.md) |
| Custom Assertion Helpers | `vi.defineHelper` (since 4.1.0) wraps a reusable assertion function so Vitest strips its internals from the stack and points failures at the calling test line. | [custom-assertions.md](./custom-assertions.md) |
| Database Transaction per Test | Wrap each test in a transaction that is rolled back when it finishes, so integration tests start from a clean state without per-test cleanup. Uses `aroundEach` (since 4.1.0) and a scoped fixture (since 3.2.0). | [db-transaction.md](./db-transaction.md) |
| Per-File Isolation Settings | Use `projects` to apply `isolate: false` to a unit suite while keeping the integration suite isolated. | [disable-isolation.md](./disable-isolation.md) |
| Auto-Cleanup with using | Declare spies and mocks with `using` instead of `const` so they are restored automatically when the block exits (Explicit Resource Management). Works for `vi.spyOn`, `vi.fn`, and `vi.doMock` (since 3.2.0). | [explicit-resources.md](./explicit-resources.md) |
| Parallel and Sequential Test Files | Split the suite into two `projects` so only files sharing an exclusive resource (fixed port, temp directory, database) run one at a time. | [parallel-sequential.md](./parallel-sequential.md) |
| Schema-Driven Assertions | `expect.schemaMatching` (since 4.0.0) is an asymmetric matcher that accepts any Standard Schema v1 object (Zod, Valibot, ArkType) and passes if the value conforms. | [schema-matching.md](./schema-matching.md) |
| Type Narrowing in Tests | `expect.assert` (since 4.0.0) throws at runtime and narrows the TypeScript type, replacing `as` casts, `!` assertions, and `toBeTruthy()` checks. | [type-narrowing.md](./type-narrowing.md) |
| Waiting for Async Conditions | Choose between `expect.poll`, `vi.waitFor`, and `vi.waitUntil` to retry on a fixed interval until a condition holds or a timeout elapses. | [wait-for.md](./wait-for.md) |
| Watching Non-Imported Files | `watchTriggerPatterns` (since 3.2.0) maps changes in files that tests do not `import` (templates, JSON fixtures, generated artifacts) to the tests that should rerun in watch mode. | [watch-templates.md](./watch-templates.md) |
