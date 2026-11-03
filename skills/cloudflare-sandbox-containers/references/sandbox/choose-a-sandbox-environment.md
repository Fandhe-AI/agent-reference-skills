---
source: https://developers.cloudflare.com/sandbox/concepts/
---

# Choose a sandbox environment

Compare Containers (Linux image) and Dynamic Workers (JavaScript against methods your Worker provides) for running code you do not trust.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/sandbox/ (Dynamic Worker loading; the concept page itself has no code):

```ts
const sandbox = env.LOADER.load({
	compatibilityDate: "$today",
	mainModule: "code.js",
	modules: { "code.js": untrustedModule },
	globalOutbound: null,
});
const entrypoint = sandbox.getEntrypoint<CodeEntrypoint>("Code");
const result = await entrypoint.evaluate();
```

## Notes

- Container code can use everything in its Linux image: runtimes, packages, files, child processes. Use it when the code expects Linux (`npm test`, preview servers, compilers, native binaries).
- Dynamic Worker code can use Workers runtime APIs plus the modules, methods, and values your Worker passes in. It does not inherit your bindings, credentials, or data. It can reach the Internet unless `globalOutbound` is `null`. It cannot start child processes or load native add-ons; Node.js modules are implemented only in part.
- Use a Dynamic Worker when code only calls known methods. Your Worker decides what each method can reach (for example a `listPullRequests()` method that keeps the API token). Code Mode (cloudflare-agents skill, tools) uses this pattern.
- `load()` creates a new Dynamic Worker; `get()` with a stable ID lets the runtime reuse a warm one. Per-application storage uses Durable Object facets.
- Isolation: a Container runs in a Firecracker microVM with its own kernel and network; a Dynamic Worker runs in a V8 isolate sandbox with a process-level sandbox around it.
- Maintenance: with a Container you build and update the image and accept a cold start; with a Dynamic Worker you write each exposed method.
- One application can use both: scoped Dynamic Worker methods to answer repository questions, then a Container to run the test suite of a proposed patch.
- Containers platform details are in the `containers` category of this skill; Dynamic Workers are documented at https://developers.cloudflare.com/dynamic-workers/.

## Related

- [Sandboxes on Cloudflare](./overview.md)
- [Run a Linux command](./run-a-linux-command.md)
- [Run JavaScript in a Dynamic Worker](./run-javascript-dynamic-workers.md)
- [Sandbox security](./sandbox-security.md)
