---
source: https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/
---

# Testing

Set up and debug Workers tests with Vitest and `@cloudflare/vitest-plugin`. Details: see [../references/vitest-integration/vitest-overview.md](../references/vitest-integration/vitest-overview.md). For Vitest itself, see the vitest skill.

## Install Vitest and the plugin

```sh
npm i -D vitest@^4.1.0 @cloudflare/vitest-plugin
```

The plugin requires Vitest 4.1 or later, a compatibility date of `2022-10-31` or later, and the ES modules format.

## Minimal vitest.config.ts

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

## Generate Env and runtime types for tests

```sh
npx wrangler types
```

Then add `"@cloudflare/vitest-plugin/types"` to the `types` array of `test/tsconfig.json` and include the `wrangler types` output file.

## Run the tests

```sh
npm run test
```

## Debug tests with the inspector

```sh
vitest --inspect --no-file-parallelism
```

Attach a debugger to port `9229`. For another port:

```sh
vitest --inspect=3456 --no-file-parallelism
```

## Notes

- `npm run test` appears in the official isolation-and-concurrency page ("if we run `npm run test`, we see that the tests will pass"); it assumes your project defines a `test` script. The docs give no other run command.
- Source: https://developers.cloudflare.com/workers/testing/vitest-integration/isolation-and-concurrency/
