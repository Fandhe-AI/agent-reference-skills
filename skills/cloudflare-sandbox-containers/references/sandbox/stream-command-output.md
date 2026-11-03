---
source: https://developers.cloudflare.com/sandbox/commands/stream-command-output/
---

# Stream command output

Send stdout and stderr of a command in a Linux sandbox to a browser as server-sent events while it runs, report the exit code, and signal the command when the client disconnects.

## Signature / Usage

Durable Object method (fragment of the `MyContainer` class):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async stream(argv: string[]): Promise<Response> {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		if (!container.running) {
			container.start({
				image: "cloudflare/debian-trixie",
				entrypoint: ["sleep", "infinity"],
				enableInternet: false,
			});
		}

		// Runs inside the disposable sandbox container, never on the host.
		const process = await container.exec(argv);
		const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();

		const send = (event: string, data: unknown) =>
			writer.write(
				encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
			);

		const forward = async (
			stream: ReadableStream<Uint8Array>,
			event: "stdout" | "stderr",
		) => {
			for await (const text of stream.pipeThrough(new TextDecoderStream())) {
				await send(event, text);
			}
		};

		let exited = false;
		const markExited = () => {
			exited = true;
		};
		process.exitCode.then(markExited, markExited);

		// Signaling a process that has exited records an internal error.
		const stop = () => {
			if (!exited) process.kill();
		};

		// Signal the process when the client disconnects.
		writer.closed.catch(stop);

		// Detect a disconnected client while the process writes nothing.
		const heartbeat = setInterval(() => {
			writer.write(encoder.encode(": keep-alive\n\n")).catch(() => {});
		}, 5_000);

		const pump = async () => {
			try {
				await Promise.all([
					forward(process.stdout!, "stdout"),
					forward(process.stderr!, "stderr"),
				]);
				await send("exit", { exitCode: await process.exitCode });
				await writer.close();
			} catch (error) {
				stop();
				// End the response, so a connected client does not wait forever.
				await writer.abort(error).catch(() => {});
			} finally {
				clearInterval(heartbeat);
			}
		};

		// Keep streaming after this method returns the response.
		void pump();

		return new Response(readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
			},
		});
	}
}
```

Worker route that streams a command your application chooses (not one read from the request):

```ts
const build = [
	"sh",
	"-c",
	'for i in 1 2 3; do echo "step $i"; sleep 1; done; echo "warning: almost done" >&2; exit 3',
];

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/build$/.exec(url.pathname);

		if (!match || request.method !== "GET") {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate the caller and derive the name from that identity in production.
		const sandbox = env.MY_CONTAINER.getByName(match[1]);
		return sandbox.stream(build);
	},
} satisfies ExportedHandler<Env>;
```

Browser client (`EventSource` reconnects when a stream ends, which would rerun the command, so it closes on `exit` and on `error`; an abnormal disconnect never reaches `exit`):

```js
const output = document.querySelector("pre");
const events = new EventSource("/sandboxes/ada/build");

for (const type of ["stdout", "stderr"]) {
	events.addEventListener(type, (event) => {
		output.textContent += JSON.parse(event.data);
	});
}

events.addEventListener("exit", (event) => {
	output.textContent += `\nExit code ${JSON.parse(event.data).exitCode}\n`;
	events.close();
});

// Adapted (not in the official docs): without this, EventSource reconnects after a
// network error or a server-side abort and the GET handler runs the command again.
events.addEventListener("error", () => {
	events.close();
});
```

Enforce a time limit (a disconnect signals only the process `exec()` started, not what an `sh -c` script spawns):

```ts
const build = ["timeout", "--kill-after=5", "60", "sh", "-c", "npm test"];
```

## Notes

- The method returns the response before the command finishes; `pump()` keeps writing, so the Durable Object must stay active while it streams (a streamed response counts as activity; see the sandbox-lifetime page).
- Events: `stdout` / `stderr` (JSON string data, possibly partial lines) and `exit` (`{"exitCode":3}`) last. Lines starting with `:` are comments. Both streams are read at the same time because an unread stream can block the process. `TextDecoderStream` keeps multi-byte characters intact.
- On disconnect the next write fails and `kill()` sends `SIGTERM`; a command can ignore it, so use `timeout` (exit `124`, or `137` after `SIGKILL`). A process that moves to its own process group (for example with `setsid`) keeps running.
- Every GET on this route starts the command again, so any client that reconnects automatically (`EventSource`) repeats side effects. Close it on `error` as in the client above; for commands with side effects or cost, split start (a POST that returns a run id) from log subscription (a GET keyed by that id that never starts a command).
- The Worker chooses the command; do not run argv read from untrusted requests. Test with `curl .../sandboxes/ada/build --no-buffer`.
- `exec()` and process streams are documented in the `containers` category of this skill.

## Related

- [Run background processes](./run-background-processes.md)
- [Run Python code](./run-python-code.md)
- [Sandbox security](./sandbox-security.md)
