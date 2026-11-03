---
source: https://developers.cloudflare.com/sandbox/commands/follow-a-background-process/
---

# Follow a background process

Read the output of a background process while it runs, from a request other than the one that started it, and wait until it prints a line such as `ready`. Builds on the scripts, `run()`, `status()` and routes of the run-background-processes page.

## Signature / Usage

Durable Object method that sends the process output as server-sent events (fragment of `MyContainer`; runs `tail`/`cat` inside the disposable sandbox container, never on the host):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async follow(id: string, stream: "stdout" | "stderr"): Promise<Response | undefined> {
		const status = await this.status(id);

		if (!status) {
			return undefined;
		}

		const path = `${ROOT}/${id}/${stream}.log`;
		const argv =
			status.state === "running"
				? ["tail", "-n", "+1", "-F", "--pid", `${status.pid}`, path]
				: ["cat", path];
		const process = await this.ctx.container!.exec(argv, { stderr: "ignore" });
		const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();

		const send = (event: string, data: unknown) =>
			writer.write(
				encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
			);

		let exited = false;
		const markExited = () => {
			exited = true;
		};
		process.exitCode.then(markExited, markExited);

		// Signaling a process that has exited records an internal error.
		const stop = () => {
			if (!exited) process.kill();
		};

		// Stop following when the client disconnects.
		writer.closed.catch(stop);

		// Detect a disconnected client while the log is quiet.
		const heartbeat = setInterval(() => {
			writer.write(encoder.encode(": keep-alive\n\n")).catch(() => {});
		}, 5_000);

		const pump = async () => {
			try {
				for await (const text of process.stdout!.pipeThrough(
					new TextDecoderStream(),
				)) {
					await send(stream, text);
				}
				const ended = await this.status(id);
				const exitCode = ended?.state === "exited" ? ended.exitCode : null;
				await send("exit", { exitCode });
				await writer.close();
			} catch (error) {
				stop();
				// End the response, so a connected client does not wait forever.
				await writer.abort(error).catch(() => {});
			} finally {
				clearInterval(heartbeat);
			}
		};

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

In the `logs` branch of the Worker route, before `sandbox.logs()`:

```ts
if (url.searchParams.has("follow")) {
	const response = await sandbox.follow(id, stream);
	return response ?? new Response("Not found", { status: 404 });
}
```

Wait for a log line (script run inside the sandbox; `CURRENT` is defined in the run-background-processes page):

```ts
// Prints the first matching line and exits with 0. Exits with 3 when the
// process ends without printing one, 4 when there is no such process, and
// 5 when the process was lost, for example in an earlier instance.
const WAIT = `${CURRENT}
dir=$1; pattern=$2
[ -d "$dir" ] || exit 4
while :; do
  exited=false; [ -e "$dir/exit-code" ] && exited=true
  if ! $exited && [ -e "$dir/pid" ] && ! { current "$dir" && kill -0 "$pid" 2>/dev/null; }; then
    sleep 0.1; [ -e "$dir/exit-code" ] || exit 5; exited=true
  fi
  line=$(grep -h -m 1 -E -e "$pattern" "$dir/stdout.log" "$dir/stderr.log" 2>/dev/null | head -n 1)
  [ -n "$line" ] && { printf '%s\\n' "$line"; exit 0; }
  $exited && exit 3
  sleep 0.2
done`;
```

Call it after `startProcess()` (the pattern is an extended regular expression):

```ts
const ready = await sandbox.waitForLog(id, "^ready", 30_000);
```

## Notes

- `follow()` sends the output so far, then new output until the process exits and `tail --pid` stops. Events are named after the stream with a JSON-encoded chunk (part of a line or several lines), then an `exit` event with the exit code, or `null` when none was recorded. Read it with `EventSource` as in the stream-command-output page. A disconnected client is noticed only when a write fails, which the 5-second keep-alive comment forces; without it `tail` runs until the process exits.
- `waitForLog(id, pattern, timeoutMs)` (omitted for length) runs `run(container, ["timeout", "--kill-after=5", `${timeoutMs / 1000}`, "sh", "-c", WAIT, "sh", `${ROOT}/${id}`, pattern])` and maps exit codes: `0` matched (stdout line), `3` exited, `4` unknown ID (returns `undefined`), `5` lost, `124` or `137` timed out; anything else throws. Result: `{ "state": "matched", "line": "ready" }`; other states `exited`, `lost`, `timed-out`.
- A process still running when an earlier instance stopped is `lost` even if its log matches, because `current()` checks the boot ID. Do not pipe `tail -F` into `grep -m 1`: `tail` keeps running until the next line.
- Test: `curl "<workers.dev URL>/processes/ticker/logs?follow" --no-buffer`; add `stream=stderr` for standard error.

## Related

- [Run background processes](./run-background-processes.md)
- [Stream command output](./stream-command-output.md)
- [Run a server in the background](./run-a-server-in-the-background.md)
