---
source: https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/
---

# Build a coding agent runner

A Worker runs a coding agent (Claude Code in this tutorial) on a GitHub repository in a Linux sandbox. You send a prompt, the agent edits the repository inside the sandbox, and you read its changes as a diff. Model credentials stay in your Worker; the sandbox can reach only your AI Gateway and `github.com`.

## Signature / Usage

`src/outbound.ts` allows two destinations over HTTPS only and adds the gateway token outside the sandbox:

```ts
import { WorkerEntrypoint } from "cloudflare:workers";

const gatewayHost = "gateway.ai.cloudflare.com";

export class Outbound extends WorkerEntrypoint<Env> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const gatewayPath = `/v1/${this.env.AI_GATEWAY_ACCOUNT_ID}/${this.env.AI_GATEWAY_ID}`;

		if (url.protocol !== "https:") {
			return new Response(`${url.hostname} is reachable only over HTTPS\n`, {
				status: 403,
			});
		}

		if (
			url.hostname === gatewayHost &&
			(url.pathname === gatewayPath ||
				url.pathname.startsWith(`${gatewayPath}/`))
		) {
			const headers = new Headers(request.headers);
			headers.delete("x-api-key");
			headers.set(
				"cf-aig-authorization",
				`Bearer ${this.env.AI_GATEWAY_TOKEN}`,
			);
			return fetch(new Request(request, { headers }));
		}

		if (url.hostname === "github.com") {
			return fetch(request);
		}

		return new Response(
			`${url.hostname} is not reachable from this sandbox\n`,
			{ status: 403 },
		);
	}
}
```

`src/sandbox.ts` (excerpt of the `AgentSandbox` Durable Object; commands run inside the disposable sandbox container, never on the host; the helpers `taskScript`, `trustEnv`, `run()`, `taskStatus()` and the full file are on the official page):

```ts
export class AgentSandbox extends DurableObject<Env> {
	// ...

	startTask(prompt: string): Promise<"started" | "busy"> {
		return this.ctx.blockConcurrencyWhile(async () => {
			await this.startSandbox();

			if ((await this.taskStatus()).state === "running") {
				return "busy";
			}

			await this.files.remove(taskDirectory, { recursive: true, force: true });
			await this.files.mkdir(taskDirectory);

			await this.container.exec(
				[
					"/bin/sh",
					"-c",
					taskScript,
					"agent",
					taskDirectory,
					...this.agentCommand(prompt),
				],
				{
					cwd: repositoryDirectory,
					env: { ...trustEnv, ...this.agentEnv() },
					stdout: "ignore",
					stderr: "ignore",
				},
			);

			this.ctx.storage.kv.put(taskKey, "started");
			await this.ctx.storage.setAlarm(Date.now() + taskCheckInterval);
			return "started";
		});
	}

	async readDiff(): Promise<CommandResult> {
		await this.startSandbox();

		return this.run(
			["/bin/sh", "-c", "git add --intent-to-add . && git diff HEAD"],
			repositoryDirectory,
			{},
		);
	}

	private async setUpSandbox(): Promise<void> {
		if (!this.container.running) {
			this.ctx.storage.kv.delete(taskKey);
			this.container.start({
				image: this.container.images.agent,
				instance: "standard-1",
				enableInternet: false,
			});
		}

		try {
			await this.container.interceptAllOutboundHttp(this.ctx.exports.Outbound);
			await this.container.interceptOutboundHttps(
				"*",
				this.ctx.exports.Outbound,
			);
			await this.container.setInactivityTimeout(inactivityTimeout);
		} catch (error) {
			// The next request starts a new container.
			await this.container.destroy();
			throw error;
		}
	}
}
```

## Notes

- Project layout: `Dockerfile` (see the claude-code page), `wrangler.jsonc` (`nodejs_compat`, vars `AI_GATEWAY_ACCOUNT_ID` / `AI_GATEWAY_ID` / `MODEL`, `secrets.required: ["AI_GATEWAY_TOKEN"]`, container class `AgentSandbox` with image `agent`, Durable Object binding `SANDBOX`), `src/outbound.ts`, `src/sandbox.ts`, `src/index.ts`. Prerequisites: an authenticated AI Gateway with a token that has the **Run** permission, Anthropic credentials in the gateway, your account ID, and Docker running for `wrangler deploy`. Install `@cloudflare/sandbox` and `zod`; the `cloudflare/sandbox` image tag must match the package version.
- The sandbox cannot download packages at run time (no direct Internet), so install everything the agent needs in the image. Pin the agent version: flags and event format change between releases.
- Containers re-signs HTTPS traffic from the container with a Cloudflare CA so `Outbound` can read it; `trustEnv` points Node.js, Git, curl and OpenSSL at `/etc/cloudflare/certs/cloudflare-containers-ca.crt`. Replacing the system trust store with that one certificate works only because `Outbound` receives every HTTPS request; if you copy this to a class that intercepts some hostnames only, add the certificate to the system trust store instead. Interception ends with the container, so `startSandbox()` registers it on every start; concurrent requests wait on the same setup call, and a failed setup stops the container.
- `Outbound` allows HTTPS only (a plain HTTP request would send the token unencrypted) and 403s everything else, so the agent cannot install npm packages or fetch web pages. Each destination you add is another way for data to leave the sandbox.
- A task runs in the background with `setsid`, output to files (piped output would get `SIGPIPE` and stop the agent), files in `/workspace/task` outside the repository so they stay out of the diff; an alarm every minute checks the task and keeps the container running. States: `running`, `succeeded`, `failed`, `lost` (ended without an exit code or container stopped), `none`. The outcome comes from the `is_error` field of the final `result` event, validated with Zod because the events file comes from the sandbox. `kill -0` runs through `sh` because the slim image has no `kill` binary; the boot ID in the pid file makes a task running at snapshot time `lost`.
- `--dangerously-skip-permissions` (see claude-code page) is acceptable here only because of the sandbox limits. Authenticate callers of the Worker before sharing it. Sandbox routes are `/sandboxes/<name>/repository`, `/task`, `/diff` (see the claude-code page for example requests). The agent itself is covered by the anthropic-claude-code skill; Containers outbound interception in the `containers` category of this skill. AI Gateway: cloudflare-ai skill (ai-gateway; https://developers.cloudflare.com/ai-gateway/).

## Related

- [Claude Code in a sandbox](./claude-code.md)
- [Coding agents in a sandbox](./coding-agents-overview.md)
- [Run background processes](./run-background-processes.md)
- [Sandbox security](./sandbox-security.md)
