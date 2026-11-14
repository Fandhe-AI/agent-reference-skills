---
source: https://developers.cloudflare.com/containers/guides/execute-commands/
---

# Execute commands

Use `exec()` to start another process inside a running container. The examples call `exec()` on `this.ctx.container` inside a class that extends `DurableObject`.

## Signature / Usage

`exec()` does not start a stopped container; it waits for a container that is still starting. The examples below call a `startContainer()` method that starts the container when it is not running:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	startContainer() {
		const container = this.ctx.container;
		if (!container.running) {
			// With the `default` scheduling policy, call `container.start()` without options.
			container.start({
				image: container.images.base,
				enableInternet: false,
			});
		}
		return container;
	}
}
```

Run a process after startup (`output()` buffers standard output and standard error as separate `ArrayBuffer` values):

Adapted (not in the official docs): `startAndPrepare()` shares one preparation promise between concurrent callers, skips the work once preparation succeeded while the container still runs, and destroys the container when `prepare.js` fails so the next call starts and prepares again (the official version returns early whenever `running` is true).

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	#prepared = false;
	#preparing;

	startAndPrepare() {
		if (this.#prepared && this.ctx.container.running) {
			return Promise.resolve();
		}
		this.#preparing ??= this.#prepare().finally(() => {
			this.#preparing = undefined;
		});
		return this.#preparing;
	}

	async #prepare() {
		const container = this.ctx.container;
		if (!container.running) {
			this.#prepared = false;
			container.start({
				image: container.images.base,
				enableInternet: false,
			});
		}

		const process = await container.exec(["node", "scripts/prepare.js"]);
		const output = await process.output();
		const decoder = new TextDecoder();

		if (output.exitCode !== 0) {
			await container.destroy();
			throw new Error(
				`Container preparation failed: ${decoder.decode(output.stderr)}`,
			);
		}

		console.log(decoder.decode(output.stdout));
		this.#prepared = true;
	}
}
```

Read standard output as a stream in an RPC method:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async readVersion() {
		const container = this.startContainer();

		const process = await container.exec(["node", "--version"]);
		const stdout = process.stdout
			? await new Response(process.stdout).text()
			: "";
		const exitCode = await process.exitCode;

		return { pid: process.pid, stdout, exitCode };
	}
}
```

Send standard input from a `ReadableStream`; `stdout: "ignore"` discards output:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async importData(data) {
		const container = this.startContainer();

		const stdin = new ReadableStream({
			start(controller) {
				controller.enqueue(new TextEncoder().encode(data));
				controller.close();
			},
		});
		const process = await container.exec(["cat"], {
			stdin,
			stdout: "ignore",
		});
		const output = await process.output();

		return {
			stdoutBytes: output.stdout.byteLength,
			exitCode: output.exitCode,
		};
	}
}
```

Write standard input over time with `stdin: "pipe"` (close the writer to send EOF):

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async concatenateInput() {
		const container = this.startContainer();

		const process = await container.exec(["cat"], {
			stdin: "pipe",
		});
		const writer = process.stdin?.getWriter();

		if (!writer) {
			throw new Error("Standard input is unavailable");
		}

		const encoder = new TextEncoder();
		await writer.write(encoder.encode("first\n"));
		await writer.write(encoder.encode("second\n"));
		await writer.close();

		const output = await process.output();
		return new TextDecoder().decode(output.stdout);
	}
}
```

Omitting `stdin` closes it immediately, so `cat` exits:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async verifyEndOfFile() {
		const container = this.startContainer();

		const process = await container.exec(["cat"]);
		const output = await process.output();

		return {
			stdoutBytes: output.stdout.byteLength,
			exitCode: output.exitCode,
		};
	}
}
```

Set the process context with `cwd` and `env`:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async inspectWorkspace() {
		const container = this.startContainer();

		const process = await container.exec(
			[
				"sh",
				"-c",
				'printf "%s:%s:%s" "$PWD" "$MODE" "$EXTRA_VALUE"; printf "diagnostic" >&2',
			],
			{
				cwd: "/workspace",
				env: {
					MODE: "inspection",
					EXTRA_VALUE: "added",
				},
			},
		);
		const output = await process.output();
		const decoder = new TextDecoder();

		return {
			stdout: decoder.decode(output.stdout),
			stderr: decoder.decode(output.stderr),
		};
	}
}
```

Combine standard error into standard output:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async readCombinedOutput() {
		const container = this.startContainer();

		const process = await container.exec(
			[
				"bash",
				"-lc",
				'printf "standard output\n"; printf "standard error\n" >&2',
			],
			{
				stdout: "pipe",
				stderr: "combined",
			},
		);
		const output = await process.output();

		return new TextDecoder().decode(output.stdout);
	}
}
```

Nonzero exit codes resolve `exitCode` and do not reject:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async runCheck() {
		const container = this.startContainer();

		const process = await container.exec(
			[
				"sh",
				"-c",
				'printf "not captured"; printf "check failed\n" >&2; exit 7',
			],
			{ stdout: "ignore" },
		);
		const output = await process.output();

		return {
			exitCode: output.exitCode,
			stdoutBytes: output.stdout.byteLength,
			stderr: new TextDecoder().decode(output.stderr),
		};
	}
}
```

Stream large output (drain `stdout` and `stderr` concurrently):

```js
import { DurableObject } from "cloudflare:workers";

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

export class MyContainer extends DurableObject {
	async generateLargeOutput() {
		const container = this.startContainer();

		const process = await container.exec([
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

Return standard output over RPC:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async streamCommandOutput() {
		const container = this.startContainer();

		const process = await container.exec(
			["sh", "-c", 'printf "starting\n"; run-report'],
			{ stderr: "combined" },
		);

		return process.stdout;
	}
}
```

Request termination after a delay with `kill()`:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async runWithTimeout() {
		const container = this.startContainer();

		const process = await container.exec(["sleep", "120"]);
		const timer = setTimeout(() => process.kill(), 30_000);

		try {
			return await process.exitCode;
		} finally {
			clearTimeout(timer);
		}
	}
}
```

Stop a command together with the processes it starts (the image must include GNU coreutils `timeout`):

```js
const process = await container.exec([
	"timeout",
	"--kill-after=5",
	"30",
	"bash",
	"-c",
	"npm test",
]);
const output = await process.output();

// 124 when the command times out, or 137 if timeout also sends SIGKILL.
console.log(output.exitCode);
```

Run several `exec()` operations in one RPC method:

```js
import { DurableObject } from "cloudflare:workers";

export class MyContainer extends DurableObject {
	async runDiagnostics() {
		const container = this.startContainer();

		const commands = [
			["uname", "-a"],
			["node", "--version"],
		];
		const decoder = new TextDecoder();
		const results = [];

		for (const command of commands) {
			const process = await container.exec(command);
			const output = await process.output();
			results.push({
				command,
				exitCode: output.exitCode,
				stdout: decoder.decode(output.stdout),
				stderr: decoder.decode(output.stderr),
			});
		}

		return results;
	}
}
```

## Options / Props

Options of `exec()` shown on this page (full contract in durable-object-container.md):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `stdin` | `ReadableStream` \| `"pipe"` | closed (EOF) | A stream sends existing data; `"pipe"` with `process.stdin.getWriter()` writes over time; close the writer to send EOF. |
| `stdout` | `"pipe"` \| `"ignore"` | `"pipe"` | `"ignore"` discards output; `output()` then returns an empty buffer. |
| `stderr` | `"pipe"` \| `"ignore"` \| `"combined"` | `"pipe"` | `"combined"` requires `stdout: "pipe"`; `process.stderr` is then `undefined` and `output.stderr` is an empty `ArrayBuffer`. |
| `cwd` | string | — | Working directory. |
| `env` | Record<string, string> | — | The process receives only these variables plus `PATH`; it does not inherit the `env` option of `start()` or image variables. `PATH` comes from the `env` option of `start()`, or from the image when `start()` does not set it. |
| `user` | string | image user | Numeric Linux user and group IDs as `uid:gid`. Read the `exec()` section of the API reference before relying on it to restrict a process. |

## Notes

- Adapted from the official docs: `startAndPrepare()` shares one preparation promise, does not report success before `prepare.js` finishes, and destroys the container on a failed preparation so a later call retries (previously a retry was skipped while the container kept running).
- Source: https://developers.cloudflare.com/containers/guides/execute-commands/ (cloudflare-docs production 34d908a, fetched 2026-11-14).
- Commands run inside the container, never on the host.
- `exec()` does not start a stopped container, but waits for one that is still starting. In RPC methods ensure the container is running before calling `exec()`.
- Arguments go directly to the executable with no shell and no implicit pipes, redirects, globbing or expansion. Use `["bash", "-lc", "<COMMAND>"]` if Bash exists in the image, or `["sh", "-c", "<COMMAND>"]` for a POSIX shell. Pass untrusted values as separate arguments, never interpolated into a shell string.
- A nonzero exit code resolves `exitCode` normally and does not reject. The merged stream of `stderr: "combined"` has no ordering guarantee between source streams.
- `output()` buffers both streams in memory. Streaming and `output()` are alternatives: `output()` throws `TypeError` if either stream has started being consumed, and a second `output()` call also throws `TypeError`. The returned `pid` identifies the new process and `exitCode` resolves when it exits.
- Passing a byte-oriented `ReadableStream` (underlying source `type: "bytes"`, for example a `Request` body) over RPC as `stdin` avoids buffering; RPC transfers ownership, so the calling Worker cannot read it afterwards. See Streams over RPC in the Workers docs.
- Returning `process.stdout` over RPC transfers ownership to the caller, preserves flow control, and requires the caller to consume or cancel it; otherwise backpressure can pause a process that keeps writing. It transfers output, not the `ExecProcess` handle; define a separate protocol for completion metadata or process control.
- `exec()` has no built-in timeout. `kill()` without an argument queues `SIGTERM` (15); another signal can be passed. A process can handle or ignore a signal, so this is not a hard deadline: observe completion through `exitCode` and do not infer a specific exit code from a signal.
- `kill()` signals only the process `exec()` started; its children (for example commands in a `bash -c` script) keep running after `exitCode` resolves, and `output()` waits for them. Under `timeout --kill-after=5 30`, `timeout` sends `SIGTERM` to its process group after 30 seconds (unless a process moved to its own group, for example with `setsid`) and `SIGKILL` five seconds later; the exit code is 124 on timeout, or 137 if `SIGKILL` was also sent.
- Keep `exec()` calls in the Durable Object that controls the container. One RPC method can perform several `exec()` operations to reduce caller-to-Durable Object round trips.
- Omitted from the official page: the "Pass an RPC stream to standard input" example that writes an unauthenticated request body to `/tmp/upload.bin` through `tee` (anyone reaching the Worker could write into the container). If you build one, authenticate the caller first. The official page also shows each example in TypeScript; only the JavaScript versions are kept here.
- Migration: the deprecated `Container` class from `@cloudflare/containers` is replaced by `this.ctx.container` in a `DurableObject`; see api-comparison.md.

## Related

- [Durable Object Container API](./durable-object-container.md)
- [Get started](./get-started.md)
