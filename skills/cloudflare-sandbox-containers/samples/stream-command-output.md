---
source: https://developers.cloudflare.com/sandbox/commands/stream-command-output/
---

# Stream command output

Send stdout and stderr of a command in a sandbox container to a browser as server-sent events while it runs, report the exit code, and stop the command when the client disconnects.

## Signature / Usage

Durable Object method. The command runs inside the disposable sandbox container, never on the host:

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

Adapted (not in the official docs): the route authenticates the caller (fail-closed) and uses a fixed sandbox name instead of one taken from the URL; see Notes.

Worker route (the Worker chooses the command; the request never supplies one):

```ts
const build = [
	"sh",
	"-c",
	'for i in 1 2 3; do echo "step $i"; sleep 1; done; echo "warning: almost done" >&2; exit 3',
];

// Fail closed: reject when STREAM_TOKEN is unset or the header does not match.
function authorized(request: Request, env: Env): boolean {
	const expected = env.STREAM_TOKEN;
	if (!expected) return false;
	const encoder = new TextEncoder();
	const given = encoder.encode(request.headers.get("Authorization") ?? "");
	const wanted = encoder.encode(`Bearer ${expected}`);
	return (
		given.byteLength === wanted.byteLength &&
		crypto.subtle.timingSafeEqual(given, wanted)
	);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== "/build" || request.method !== "GET") {
			return new Response("Not found", { status: 404 });
		}
		if (!authorized(request, env)) {
			return new Response("Unauthorized", { status: 401 });
		}

		const sandbox = env.MY_CONTAINER.getByName("build");
		return sandbox.stream(build);
	},
} satisfies ExportedHandler<Env>;
```

Deploy, then stream (set the token with `npx wrangler secret put STREAM_TOKEN`):

```sh
curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/build --no-buffer --header "Authorization: Bearer ${STREAM_TOKEN}"
```

Events arrive about one second apart:

```txt
event: stdout
data: "step 1\n"

event: stdout
data: "step 2\n"

event: stdout
data: "step 3\n"

event: stderr
data: "warning: almost done\n"

event: exit
data: {"exitCode":3}
```

Time limit that also stops the processes the command starts (GNU coreutils `timeout`):

```ts
const build = ["timeout", "--kill-after=5", "60", "sh", "-c", "npm test"];
```

## Notes

- Adapted from the official docs: the official route takes the sandbox name from the URL and has no authentication. Here the route requires `STREAM_TOKEN` (rejects all requests when it is unset) and uses the fixed name `build`. For per-user sandboxes, derive the name from the authenticated identity, never from the raw URL. Add `STREAM_TOKEN: string` to `Env`.
- Browsers cannot send an `Authorization` header with `EventSource`; read the stream with `fetch()` and a body reader, or use a cookie-based session you verify in the Worker.
- Every GET on `/build` starts the command again. A client that reconnects automatically (`EventSource` does after a network error or an aborted stream) would rerun it, so close the `EventSource` on `error` as well as on `exit`, or use `fetch()` with a body reader, which does not reconnect.
- A disconnect signals only the process `exec()` started, with `SIGTERM`, which a command can ignore. The `timeout` form stops the command and the processes it starts in its process group (exit `124`, or `137` after `SIGKILL`).
- `stdout` and `stderr` events can hold part of a line or several lines: append the text. The `exit` event comes last; lines starting with `:` are comments.

## Related

- [Stream command output (reference)](../references/sandbox/stream-command-output.md)
- [Run tests from a Git repository](./run-tests-in-sandbox.md)
- [Execute commands](../references/containers/execute-commands.md)
- [Sandbox security](../references/sandbox/sandbox-security.md)
