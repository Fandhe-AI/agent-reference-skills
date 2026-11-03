---
source: https://developers.cloudflare.com/sandbox/commands/open-a-terminal-in-the-browser/
---

# Open a terminal in the browser

Expose a live shell in a Linux sandbox on a web page. The page runs xterm.js and connects over a WebSocket to a shell in a tmux session; the shell keeps running when the page reloads or the connection drops.

## Signature / Usage

`Dockerfile` with tmux (the image runs in the disposable sandbox container):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends tmux \
	&& rm -rf /var/lib/apt/lists/*

# Scroll back with the mouse wheel, and keep more history.
RUN printf 'set -g mouse on\nset -g history-limit 50000\n' > /etc/tmux.conf

CMD ["sleep", "infinity"]
```

Named image `terminal` in `wrangler.jsonc` (`"images": { "terminal": { "dockerfile": "./Dockerfile" } }` inside the `containers` entry). Durable Object handler (fragment of `MyContainer`; add the constructor that calls `container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS)` when the container is already running, with `const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;`):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async fetch(request: Request): Promise<Response> {
		const container = this.ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		if (request.headers.get("Upgrade") !== "websocket") {
			return new Response("Expected a WebSocket upgrade", { status: 426 });
		}

		// tmux session names cannot contain "." or ":".
		const url = new URL(request.url);
		const session = url.searchParams.get("session") || "main";

		if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(session)) {
			return new Response("Invalid session name", { status: 400 });
		}

		if (!container.running) {
			container.start({
				image: container.images.terminal,
				// Block commands in the terminal from reaching the Internet
				enableInternet: false,
			});
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		// Attach to the tmux session, or create it. The session keeps the shell
		// running after this WebSocket closes.
		// Runs inside the disposable sandbox container, never on the host.
		const abort = new AbortController();
		const tmux = await container.exec(
			["tmux", "new-session", "-A", "-s", session],
			{
				// Run the tmux client attached to a pseudo-terminal.
				pty: {
					cols: Number(url.searchParams.get("cols")) || 80,
					rows: Number(url.searchParams.get("rows")) || 24,
				},
				env: { TERM: "xterm-256color" },
				cwd: "/root",
				signal: abort.signal,
			},
		);

		const [client, server] = Object.values(new WebSocketPair());

		// Receive binary messages as ArrayBuffer instead of Blob.
		server.binaryType = "arraybuffer";

		// Keep this Durable Object in memory while the terminal is open.
		server.accept();

		const stdin = tmux.stdin!.getWriter();

		// Listeners must not throw. An exception closes the socket without running
		// the `close` listener, which leaves the tmux client running.
		server.addEventListener("message", (event) => {
			if (typeof event.data === "string") {
				try {
					const { cols, rows } = JSON.parse(event.data);
					tmux.resize(cols, rows);
				} catch {
					// Ignore malformed resize messages so the terminal keeps running.
				}
			} else {
				stdin.write(new Uint8Array(event.data)).catch(() => {});
			}
		});

		let exited = false;
		const markExited = () => {
			exited = true;
		};
		tmux.exitCode.then(markExited, markExited);

		// Stop the tmux client when the browser disconnects. The session and its
		// shell keep running.
		server.addEventListener("close", () => {
			// Signaling a process that has exited raises an error.
			if (!exited) abort.abort();
		});

		const forward = async () => {
			for await (const chunk of tmux.stdout!) {
				server.send(chunk);
			}

			server.close(1000, `Terminal closed with code ${await tmux.exitCode}`);
		};

		void forward().catch(() => server.close(1011, "Terminal output failed"));

		return new Response(null, { status: 101, webSocket: client });
	}
}
```

Worker route that serves the page (`page` is the HTML terminal page, omitted here) and passes the WebSocket to the sandbox:

```ts
const page = `[... HTML from step 4 ...]`;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/(terminal)?$/.exec(url.pathname);

		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate the caller first; derive the name from that identity.
		const sandbox = env.MY_CONTAINER.getByName(match[1]);

		if (match[2]) {
			return sandbox.fetch(request);
		}

		return new Response(page, {
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
	},
} satisfies ExportedHandler<Env>;
```

End a session without a browser (`=` matches the exact session name):

```ts
await container.exec(["tmux", "kill-session", "-t", `=${session}`]);
```

## Notes

- The HTML page (not reproduced above because the source page is about 50 lines; the Worker's `page` placeholder stands for it) loads `@xterm/xterm@6.0.0` and `@xterm/addon-fit@0.11.0` from jsDelivr, opens `new WebSocket(url)` to `<page URL>terminal?session=...&cols=...&rows=...` with `binaryType = "arraybuffer"`, sends keystrokes as binary messages and window sizes as JSON text `{cols, rows}`, and prints the close reason on disconnect. In production install the two npm packages and serve them with Workers static assets. A deployable example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/terminal-workspace.
- Each WebSocket gets its own tmux client; `tmux new-session -A` attaches or creates the session. The handler uses `accept()`, not the Hibernation WebSocket API, because hibernation would discard the tmux client's process handle. A terminal keeps the sandbox running because an accepted WebSocket keeps the Durable Object active (see sandbox-lifetime). The 5-minute timeout lets a reloaded page re-attach.
- The shell runs as `root`. The `exec()` `user` option (for example `"1000:1000"`) changes the Linux user but does not limit what the shell can read or change. Anyone who opens the page gets a root shell in the named sandbox: authenticate callers and derive the sandbox name from the identity (see sandbox-security).
- To run another interactive command (for example a coding agent CLI) append it after the session name: `["tmux", "new-session", "-A", "-s", session, "claude"]`; install it in the `Dockerfile`. The agent needs model network access, which `enableInternet: false` blocks; route and allow-list its hostnames with `interceptOutboundHttps()` (Containers API; see the `containers` category of this skill). The agent itself is covered by the anthropic-claude-code skill.
- `exec()` options (`pty`, `env`, `cwd`, `signal`, `user`) are documented in the `containers` category of this skill.

## Related

- [Stream command output](./stream-command-output.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
- [Sandbox security](./sandbox-security.md)
- [Run Claude Code in a sandbox](./claude-code.md)
