---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/
---

# Debugging

Debug Workers tests with Vitest and `@cloudflare/vitest-plugin` by opening the inspector and attaching a debugger.

## Signature / Usage

Run Vitest and attach a debugger to port `9229`:

```sh
vitest --inspect --no-file-parallelism
```

Custom port:

```sh
vitest --inspect=3456 --no-file-parallelism
```

Or in the Vitest configuration file:

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			// ...
		}),
	],
	test: {
		inspector: {
			port: 3456,
		},
	},
});
```

VS Code breakpoint debugging (`.vscode/launch.json`):

```json
{
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "Open inspector with Vitest",
			"program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
			"console": "integratedTerminal",
			"args": ["--inspect=9229", "--no-file-parallelism"]
		},
		{
			"name": "Attach to Workers Runtime",
			"type": "node",
			"request": "attach",
			"port": 9229,
			"cwd": "/",
			"resolveSourceMapLocations": null,
			"attachExistingChildren": false,
			"autoAttachChildProcesses": false
		}
	],
	"compounds": [
		{
			"name": "Debug Workers tests",
			"configurations": [
				"Open inspector with Vitest",
				"Attach to Workers Runtime"
			],
			"stopAll": true
		}
	]
}
```

## Notes

- Select **Debug Workers tests** in the **Run & Debug** panel to open an inspector with Vitest and attach to the Workers runtime, then add breakpoints in test files.
- The default inspector port is `9229`.

## Related

- [configuration.md](./configuration.md)
- [isolation-and-concurrency.md](./isolation-and-concurrency.md)
