---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/
---

# Isolation and concurrency

How the Workers Vitest integration runs tests, isolates them from each other, and imports modules.

## Signature / Usage

Make test files share storage (for example integration tests that depend on shared state):

```sh
vitest --max-workers=1 --no-isolate
```

Snippet taken from https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/ (flags quoted in prose: "use the Vitest flags `--max-workers=1 --no-isolate`").

## Notes

Run sequence:

1. Read and evaluate the configuration file using Node.js.
2. Run any `globalSetup` files using Node.js.
3. Collect and sequence test files.
4. For each Vitest project, depending on its configured isolation and concurrency, start one or more `workerd` processes, each running one or more Workers.
5. Run `setupFiles` and test files in `workerd` using the appropriate Workers.
6. Watch for changes and re-run test files using the same Workers if the configuration has not changed.

Isolation model:

- Storage isolation is per test file. Writes to storage during a test file are not visible to other test files.
- Workers and their module caches are reused between test runs where possible. A copy of all auxiliary `workers` exists in each `workerd` process.
- Test files run concurrently by default.

Modules:

- Each Worker has its own module cache; Vitest invalidates parts of it at the start of each run based on changed files.
- The plugin automatically injects the `nodejs_compat`, `no_nodejs_compat_v2` and `export_commonjs_default` compatibility flags (minimal setup that lets Vitest run). If you already define a Node.js compatibility flag, the plugin does not add those flags.

Caution: because `nodejs_compat` is enabled by default in tests, a Worker may behave differently when deployed. If your configuration has no `nodejs_compat` / `nodejs_compat_v2` flag and you import a Node.js module, tests may pass but deploying (REST API or Wrangler upload) will error. If you use unsupported Node.js globals (e.g. `process`), upload succeeds but production code can fail. Either avoid Node.js APIs or add the `nodejs_compat` flag to your Wrangler configuration.

The docs' contrived example (config without `nodejs_compat`, `src/index.ts` using `process`, test passing):

```typescript
export default {
	async fetch(request, env, ctx): Promise<Response> {
		process.env.TEST = "test";
		return new Response(process.env.TEST);
	},
} satisfies ExportedHandler<Env>;
```

```typescript
it('responds with "test"', async () => {
	const response = await exports.default.fetch("https://example.com/");
	expect(await response.text()).toMatchInlineSnapshot(`"test"`);
});
```

- Docs inconsistency: the original JSONC example contains a `# no nodejs_compat flags here` line (not valid JSONC comment syntax) and the flag is written as `\[`no_nodejs_compat_v2`]` without a link; the exact injected flag set is as stated above.

## Related

- [configuration.md](./configuration.md)
- [known-issues.md](./known-issues.md)
