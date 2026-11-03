---
source: https://developers.cloudflare.com/sandbox/commands/run-a-server-in-the-background/
---

# Run a server in the background

Start a server that runs until the container stops (a development server, tunnel, or code kernel). The Durable Object starts it on first use, waits until it answers, and starts it again in each new container.

## Signature / Usage

Helpers (all shell strings run inside the disposable sandbox container, never on the host):

```ts
const SERVERS = "/var/lib/servers";
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

// Defines current(), which reads the process ID in a directory into $pid
// when the process started in this instance.
const CURRENT = `current() {
	read -r pid boot 2>/dev/null <"$1/pid" &&
		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
}`;

// Starts the server unless it already runs. The server runs in its own
// process group, and writes its process ID and output to its directory.
const SERVE = `${CURRENT}
dir=$1; shift
current "$dir" && kill -0 "$pid" 2>/dev/null && exit 0
mkdir -p "$dir" && rm -f "$dir/pid"
setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
	"$dir" "$@" >"$dir/log" 2>&1`;

// Prints the end of the log and exits with 0 when the server has exited.
const EXITED = `${CURRENT}
current "$1" || exit 1
kill -0 "$pid" 2>/dev/null && exit 1
tail -n 20 "$1/log"`;

// Stops the process group, with SIGKILL if the server still runs after
// 10 seconds. Once the server exits, removes its process ID.
const STOP = `${CURRENT}
current "$1" || exit 0
kill -s TERM -- "-$pid" 2>/dev/null
timeout 10 sh -c 'while kill -0 "$0" 2>/dev/null; do sleep 0.1; done' "$pid" ||
	kill -s KILL -- "-$pid" 2>/dev/null
while kill -0 "$pid" 2>/dev/null; do sleep 0.1; done
rm -f "$1/pid"`;

type ServerOptions = { cwd?: string; env?: Record<string, string> };

async function startServer(
	container: Container,
	dir: string,
	argv: string[],
	options: ServerOptions = {},
): Promise<void> {
	// Ignoring the output lets the server outlive this request.
	await container.exec(["sh", "-c", SERVE, "sh", dir, ...argv], {
		...options,
		stdout: "ignore",
		stderr: "ignore",
	});
}

async function serverExited(
	container: Container,
	dir: string,
): Promise<string | undefined> {
	const check = await container.exec(["sh", "-c", EXITED, "sh", dir]);
	const output = await check.output();

	return output.exitCode === 0
		? new TextDecoder().decode(output.stdout)
		: undefined;
}

async function waitForServer(
	container: Container,
	dir: string,
	port: number,
	timeoutMs: number,
): Promise<Fetcher> {
	const server = container.getTcpPort(port);
	const deadline = Date.now() + timeoutMs;

	while (Date.now() < deadline) {
		try {
			const response = await server.fetch("http://server/", {
				signal: AbortSignal.timeout(1_000),
			});
			await response.body?.cancel();
			return server;
		} catch {
			const log = await serverExited(container, dir);

			if (log !== undefined) {
				throw new Error(`The server exited: ${log}`);
			}

			await scheduler.wait(500);
		}
	}

	throw new Error("The server did not answer in time");
}

async function stopServer(container: Container, dir: string): Promise<void> {
	const stop = await container.exec(["sh", "-c", STOP, "sh", dir]);
	const exitCode = await stop.exitCode;

	if (exitCode !== 0) {
		throw new Error(`Stopping the server failed with exit code ${exitCode}`);
	}
}
```

Durable Object methods (fragment of `MyContainer`; the constructor re-applies `setInactivityTimeout` when the container is already running, as in the sandbox-package page):

```ts
const WEB = `${SERVERS}/web`;
const WEB_PORT = 8080;
const WEB_SERVER = [
	"node",
	"--eval",
	`require("node:http")
		.createServer((req, res) => res.end("hello from the server\\n"))
		.listen(${WEB_PORT})`,
];

export class MyContainer extends DurableObject<Env> {
	// ...

	// The server start that requests in progress share
	private starting?: Promise<Fetcher>;

	async fetchServer(request: Request): Promise<Response> {
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
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		this.starting ??= startServer(container, WEB, WEB_SERVER)
			.then(() => waitForServer(container, WEB, WEB_PORT, 30_000))
			.finally(() => {
				this.starting = undefined;
			});
		const server = await this.starting;
		return server.fetch(request);
	}

	async stopWeb(): Promise<void> {
		const container = this.ctx.container;

		if (container?.running) {
			await stopServer(container, WEB);
		}
	}
}
```

Adapted (not in the official docs): the forwarded request drops the caller's `Cookie` and `Authorization` headers so they never reach code in the sandbox; see Notes.

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== "/server") {
			return new Response("Not found", { status: 404 });
		}

		// In production authenticate the caller and derive the name from it.
		const sandbox = env.MY_CONTAINER.getByName("sandbox");

		if (request.method === "DELETE") {
			await sandbox.stopWeb();
			return new Response(null, { status: 202 });
		}

		// getTcpPort() accepts only http:// URLs.
		const forward = new Request("http://container/", request);
		forward.headers.delete("Cookie");
		forward.headers.delete("Authorization");
		return sandbox.fetchServer(forward);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: the official route forwards the request with all caller headers; the two `headers.delete()` lines were added so credentials of the caller are not exposed to untrusted code in the sandbox. The official route is also unauthenticated and uses one shared sandbox name.
- `SERVE` starts nothing when the server in the directory already runs; a new container (which has no server) gets one, including after a Durable Object restart. The recorded boot ID makes `current()` ignore process IDs restored from a snapshot. `setsid` puts the server in its own process group so `STOP` also stops its children; do not use `&` (background jobs ignore `SIGINT`).
- `waitForServer()` treats any HTTP response as ready and throws with the log tail if the server exits first. The log grows until the server stops; keep output small or send it to a mounted bucket.
- Requests that arrive together share one start (`this.starting`); a second `SERVE` before the process ID is recorded would start a second server that fails on the port and overwrites the process ID file.
- A running server does not keep the container running; requests through the Durable Object do. When the inactivity timeout ends, the container and the server stop.
- If the sandbox runs one server and keeps no needed files, make the server the main process instead (see the previews page). Test: `curl <workers.dev URL>/server` prints `hello from the server`; `--request DELETE` returns `202`.
- `getTcpPort()` is documented in the `containers` category of this skill.

## Related

- [Run background processes](./run-background-processes.md)
- [Preview a web application](./preview-a-web-application.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
