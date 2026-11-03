---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/process/
---

# process

`node:process` APIs related to the current process, adapted for a serverless environment.

## Signature / Usage

```js
import { env, nextTick } from "node:process";

env["FOO"] = "bar";
console.log(env["FOO"]); // Prints: bar

nextTick(() => {
	console.log("next tick");
});
```

Populating `process.env` from the Worker `env`:

Adapted (not in the official docs): the handler now returns a `Response`; see Notes.

```js
import * as process from "node:process";

export default {
	fetch(req, env) {
		// Set process.env.FOO to the value of env.FOO if process.env.FOO is not already set
		// and env.FOO is a string.
		process.env.FOO ??= (() => {
			if (typeof env.FOO === "string") {
				return env.FOO;
			}
		})();
		return new Response("ok");
	},
};
```

Do not replace the whole `process.env` object:

Adapted (not in the official docs): the official example assigns `process.env = {}` through `import * as process`, which throws a `TypeError` because ES module namespace objects are immutable; the default-export object is used instead; see Notes.

```js
import process from "node:process";
import { env } from "node:process";

process.env === env; // true! they are the same object
process.env = {}; // replace the object! Do not do this!
process.env === env; // false! they are no longer the same object

// From this point forward, any changes to process.env will not be reflected in env,
// and vice versa!
```

## Notes

- Initially only `nextTick`, `env`, `exit`, `getBuiltinModule`, `platform` and `features` were supported on `process`; the `enable_nodejs_process_v2` flag extends this to most Node.js process features.
- `process.env`: there is no process-level environment, so by default it is an empty object. Values set are globally persistent for all Workers running in the same isolate and context (for example, the same Workers entry point). Setting a value coerces it to a string.
- With Node.js compatibility enabled and the `nodejs_compat_populate_process_env` flag set (enabled by default for compatibility dates on or after 2025-04-01), `process.env` contains configured environment variables, secrets, and version metadata.
- With Wrangler or the Cloudflare Vite plugin, `process.env.NODE_ENV` is statically replaced at build time and is not a runtime value.
- Alternative: import `env` from `cloudflare:workers` to access environment variables and all other bindings from anywhere in your code.
- Replacing the whole `process.env` object with the Cloudflare `env` object is strongly discouraged: previously set variables are lost and other Workers in the same isolate behave unexpectedly (named imports become inconsistent).
- Adapted from the official docs: the official snippets use `import * as process from "node:process"` for the replacement example. A module namespace object is immutable, so `process.env = {}` on it throws a `TypeError` and never replaces anything. Replacement is only possible on the default export object (`import process from "node:process"`), and a named import (`import { env } ...`) keeps the original binding, which is why the two diverge afterwards. Reading or mutating properties of `process.env` through the namespace import (`process.env.FOO ??= ...`) is fine. The fetch handler example also did not return a `Response`; `return new Response("ok")` was added.
- `process.nextTick()` is a wrapper for `queueMicrotask()`.
- Stdio: `process.stdout`, `process.stderr` and `process.stdin` are supported as streams. `stdin` is an empty readable stream. `stdout` / `stderr` are non-TTY writable streams that output to normal logging output with `stdout:` / `stderr:` prefixes. Writes are line-buffered until `\n` or the next microtask.
- `process.cwd()` is initialized to `/bundle`; `process.chdir()` changes it and is respected by FS operations when using `enable_nodejs_fs_module`.
- `process.hrtime` is available but provides an inaccurate timer for compatibility only.
- Node.js docs: https://nodejs.org/docs/latest/api/process.html

## Related

- [fs](./fs.md)
- [Node.js compatibility](./overview.md)
- [Compatibility flags (configuration category)](../configuration/README.md)
