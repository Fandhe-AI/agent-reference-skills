---
source: https://developers.cloudflare.com/containers/guides/execute-commands/
---

# Execute commands

Use `exec()` to start another process inside a running container. The official examples call `this.ctx.container.exec()` inside a class extending `Container`; the same method exists on the Durable Object Container API.

## Signature / Usage

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	async onStart() {
		// Runs inside the container, never on the host.
		const process = await this.ctx.container.exec([
			"node",
			"scripts/prepare.js",
		]);
		const output = await process.output();
		const decoder = new TextDecoder();

		if (output.exitCode !== 0) {
			throw new Error(
				`Container preparation failed: ${decoder.decode(output.stderr)}`,
			);
		}

		console.log(decoder.decode(output.stdout));
	}
}
```

Streaming large output (drain stdout and stderr concurrently):

```js
import { Container } from "@cloudflare/containers";

async function countBytes(stream) {
	if (!stream) {
		return 0;
	}

	let bytes = 0;
	for await (const chunk of stream) {
		bytes += chunk.byteLength;
	}
	return bytes;
}

export class MyContainer extends Container {
	async generateLargeOutput() {
		if (!this.ctx.container.running) {
			await this.start();
		}

		// Runs inside the container, never on the host.
		const process = await this.ctx.container.exec([
			"sh",
			"-c",
			'i=0; while [ "$i" -lt 100000 ]; do printf "output %s\n" "$i"; printf "error %s\n" "$i" >&2; i=$((i + 1)); done',
		]);

		const [stdoutBytes, stderrBytes, exitCode] = await Promise.all([
			countBytes(process.stdout),
			countBytes(process.stderr),
			process.exitCode,
		]);

		return { stdoutBytes, stderrBytes, exitCode };
	}
}
```

Timeout with `kill()`:

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	async runWithTimeout() {
		if (!this.ctx.container.running) {
			await this.start();
		}

		// Runs inside the container, never on the host.
		const process = await this.ctx.container.exec(["sleep", "120"]);
		const timer = setTimeout(() => process.kill(), 30_000);

		try {
			return await process.exitCode;
		} finally {
			clearTimeout(timer);
		}
	}
}
```

## Options / Props

Topic index of option usage shown on this page (full option table in durable-object-container.md):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| stdin | ReadableStream \| "pipe" | closed (EOF) | A stream sends existing data; `"pipe"` plus `process.stdin.getWriter()` writes over time; close the writer to send EOF. |
| stdout | "pipe" \| "ignore" | `"pipe"` | `"ignore"` discards output; `output()` then returns an empty buffer. |
| stderr | "pipe" \| "ignore" \| "combined" | `"pipe"` | `"combined"` needs `stdout: "pipe"`; `process.stderr` is then `undefined` and `output.stderr` empty. |
| cwd | string | — | Working directory. |
| env | Record<string, string> | — | Only these variables, plus `PATH`, reach the process; pass values from `envVars` here explicitly. `PATH` comes from `envVars` or else the image. |
| user | string | image user | Numeric `uid:gid`. See the `exec()` caution before using it to restrict a process. |

## Notes

- Runs inside the container, never on the host: every command array and shell string on this page executes in the container, and the leading comments in the snippets above were added for that reason (not in the official docs).
- `exec()` does not start a stopped container; in RPC methods check `this.ctx.container.running` and call `await this.start()` (the `Container` class helper). The `onStart()` hook is the place to run startup commands.
- Arguments go directly to the executable with no shell. Use `["bash", "-lc", "<COMMAND>"]` (Bash in the image) or `["sh", "-c", "<COMMAND>"]` for pipes, redirects, globbing or expansion. Pass untrusted values as separate arguments, never interpolated into a shell string.
- A nonzero exit code resolves `exitCode` normally and does not reject. Combined output has no ordering guarantee between source streams.
- `output()` buffers both streams in memory; streaming and `output()` are alternatives, and a second `output()` call or one after consumption started throws `TypeError`. Returning `process.stdout` from an RPC method transfers ownership to the caller, which must consume or cancel it (otherwise backpressure can pause the process); it transfers output only, not the `ExecProcess` handle. Pass a byte-oriented `ReadableStream` (for example a `Request` body) over RPC as `stdin` to avoid buffering; the calling Worker cannot read it afterwards.
- `kill()` queues `SIGTERM` (15) and does not enforce a deadline. It signals only the started process, not its children (`output()` waits for them). To stop a command with the processes it starts, run it under GNU coreutils `timeout` (must exist in the image): `["timeout", "--kill-after=5", "30", "bash", "-c", "npm test"]`. After 30 seconds `timeout` sends `SIGTERM` to its process group (unless a child moved to its own group, for example with `setsid`) and `SIGKILL` five seconds later; the exit code is 124 on timeout, or 137 if `SIGKILL` was also sent.
- Keep `exec()` calls in the Durable Object that controls the container; one RPC method can perform several `exec()` operations to cut round trips.
- Omitted from the official page: the unauthenticated upload example that wrote the request body to `/tmp/upload.bin` through `tee` (anyone reaching the Worker could write into the container). If you build one, authenticate the caller first.

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Container class](./container-class.md)
