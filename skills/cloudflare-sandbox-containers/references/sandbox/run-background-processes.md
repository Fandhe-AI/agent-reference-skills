---
source: https://developers.cloudflare.com/sandbox/commands/run-background-processes/
---

# Run background processes

Start a process that outlives the request (a build, test suite, or agent task), then check, read, and stop it from later requests. The `exec()` process object belongs to the request that started it, so later requests manage the process through files (process ID, output, exit code) on the instance disk.

## Signature / Usage

Shell scripts (all strings below run inside the disposable sandbox container, never on the host):

```ts
const ROOT = "/var/lib/processes";
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

// Runs the command in its own process group. Records its process ID when
// it starts and its exit code when it ends.
const RUN = `dir=$1; shift
setsid sh -c 'echo "$$ $(cat /proc/sys/kernel/random/boot_id)" >"$0/pid"; exec "$@"' \\
	"$dir" "$@" >"$dir/stdout.log" 2>"$dir/stderr.log"
echo "$?" >"$dir/exit-code.tmp" && mv "$dir/exit-code.tmp" "$dir/exit-code"`;

// Defines current(), which reads the process ID in a directory into $pid
// when the process started in this instance.
const CURRENT = `current() {
	read -r pid boot 2>/dev/null <"$1/pid" &&
		[ "$boot" = "$(cat /proc/sys/kernel/random/boot_id)" ]
}`;

// Prints the state of the process that owns the directory.
const STATUS = `${CURRENT}
dir=$1
if [ ! -d "$dir" ]; then echo missing
elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
elif [ ! -e "$dir/pid" ]; then echo starting
elif current "$dir" && kill -0 "$pid" 2>/dev/null; then echo "running $pid"
elif [ -e "$dir/exit-code" ]; then echo "exited $(cat "$dir/exit-code")"
else echo lost
fi`;

type Status =
	| { state: "starting" | "lost" }
	| { state: "running"; pid: number }
	| { state: "exited"; exitCode: number };

async function run(container: Container, argv: string[]) {
	const process = await container.exec(argv);
	const output = await process.output();

	return {
		exitCode: output.exitCode,
		stdout: new TextDecoder().decode(output.stdout),
	};
}
```

Durable Object methods (fragments of `MyContainer`; the constructor re-applies `setInactivityTimeout` as in the sandbox-package page):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async startProcess(id: string, argv: string[]): Promise<boolean> {
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

		// mkdir fails when another process already uses the ID.
		const dir = `${ROOT}/${id}`;
		await run(container, ["mkdir", "-p", ROOT]);
		const created = await run(container, ["mkdir", dir]);

		if (created.exitCode !== 0) {
			return false;
		}

		// Ignoring the output lets the process outlive this request.
		await container.exec(["sh", "-c", RUN, "sh", dir, ...argv], {
			stdout: "ignore",
			stderr: "ignore",
		});

		// exec() returns before the process records its ID. Wait for it, so
		// a request that follows the output right away finds it running.
		for (let i = 0; i < 50; i++) {
			if ((await this.status(id))?.state !== "starting") break;
			await scheduler.wait(100);
		}

		await this.ctx.storage.put(`process:${id}`, argv);
		await this.ctx.storage.setAlarm(Date.now() + 60_000);
		return true;
	}

	async status(id: string): Promise<Status | undefined> {
		const container = this.ctx.container;

		if (!container?.running) {
			return undefined;
		}

		const { stdout } = await run(container, [
			"sh",
			"-c",
			STATUS,
			"sh",
			`${ROOT}/${id}`,
		]);
		const [state, value] = stdout.trim().split(" ");

		if (state === "running") {
			return { state, pid: Number(value) };
		}

		if (state === "exited") {
			return { state, exitCode: Number(value) };
		}

		if (state === "starting" || state === "lost") {
			return { state };
		}

		return undefined;
	}

	async stop(id: string): Promise<boolean> {
		const status = await this.status(id);

		if (status?.state !== "running") {
			return false;
		}

		// `kill` is a shell built-in. A negative ID signals the process group.
		const { exitCode } = await run(this.ctx.container!, [
			"sh",
			"-c",
			'kill -s TERM -- "$1"',
			"sh",
			`-${status.pid}`,
		]);
		return exitCode === 0;
	}

	async alarm(): Promise<void> {
		let running = false;

		for (const [key, argv] of await this.ctx.storage.list<string[]>({
			prefix: "process:",
		})) {
			const id = key.slice("process:".length);
			const status = await this.status(id);

			if (status?.state === "running" || status?.state === "starting") {
				running = true;
			} else {
				console.log({ event: "process.ended", id, argv, status });
				await this.ctx.storage.delete(key);
			}
		}

		if (running) {
			await this.ctx.storage.setAlarm(Date.now() + 60_000);
		}
	}
}
```

Worker routes (the command is fixed by the Worker; process IDs are restricted to path-safe characters):

```ts
const command = [
	"sh",
	"-c",
	"echo ready; for i in $(seq 1 300); do echo tick $i; sleep 1; done",
];

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/processes\/([a-z0-9-]{1,63})(\/logs)?$/.exec(
			url.pathname,
		);

		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		const [, id, logs] = match;
		// In production authenticate the caller and derive the name from it.
		const sandbox = env.MY_CONTAINER.getByName("sandbox");

		if (logs) {
			const stream =
				url.searchParams.get("stream") === "stderr" ? "stderr" : "stdout";
			const output = await sandbox.logs(id, stream);
			return output === undefined
				? new Response("Not found", { status: 404 })
				: new Response(output);
		}

		if (request.method === "POST") {
			return (await sandbox.startProcess(id, command))
				? new Response(null, { status: 201 })
				: new Response("The process ID is in use", { status: 409 });
		}

		if (request.method === "DELETE") {
			return (await sandbox.stop(id))
				? new Response(null, { status: 202 })
				: new Response("The process is not running", { status: 409 });
		}

		const status = await sandbox.status(id);
		return status
			? Response.json(status)
			: new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Also required (omitted above for length): a `logs(id, stream)` method that returns `undefined` when `status(id)` is undefined, otherwise `cat ${ROOT}/${id}/${stream}.log` via `run()` (`(await run(this.ctx.container!, ["cat", path])).stdout`). Behavior with `curl <URL>/processes/ticker --request POST`: `201`, a repeated POST `409`; status `{ "state": "running", "pid": 354 }`; after `DELETE` (202) the status is `{ "state": "exited", "exitCode": 143 }` (128 plus the signal number).
- `setsid` puts the command in a new process group so stopping the group also stops its children (unless a child moves to its own group). The exit code is written to a temp file and renamed so readers never see a partial file. Do not use `&`: shell background jobs ignore `SIGINT`.
- Files live under `/var/lib/processes` on the instance disk; logs grow until the process ends and writes fail when the disk is full, so delete old directories or send output to a mounted bucket.
- The recorded boot ID changes per instance; a snapshot restores the file but process IDs are reused, so `current()` ignores IDs from another instance and a process running at snapshot time becomes `lost`. `lost` also means the recording script was killed (for example `SIGKILL`).
- A running process does not keep the container running: the alarm checks every minute and each alarm keeps it running; the container stops 10 minutes after the alarm finds the last process ended. A Durable Object has one alarm: merge into an existing `alarm()` and set the earliest time needed. The `process.ended` log goes to Workers Logs; replace it with your own follow-up.
- The Worker route is unauthenticated in the official example and uses one shared sandbox name; authenticate callers before use (see sandbox-security). The Durable Object alarm API belongs to the cloudflare-stateful skill.

## Related

- [Follow a background process](./follow-a-background-process.md)
- [Run a server in the background](./run-a-server-in-the-background.md)
- [Stream command output](./stream-command-output.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
