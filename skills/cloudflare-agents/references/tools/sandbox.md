---
source: https://developers.cloudflare.com/agents/tools/sandbox/
---

# Sandbox tool

Attach a Container to an agent's Durable Object so the model can run shell commands, build and test code, and keep files across turns inside an isolated Linux VM.

## Signature / Usage

Adapted (not in the official docs): comments added stating the command runs in the disposable container, never on the host; see Notes.

```ts
import { Think } from "@cloudflare/think";
import { routeAgentRequest } from "agents";
import { tool } from "ai";
import { createAI } from "agents/models/ai-sdk";
import { z } from "zod";

const MAX_OUTPUT_CHARS = 10_000;
// Keep the container for 10 minutes after the agent becomes inactive.
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class CodeAgent extends Think<Env> {
	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		// A restarted agent sets the timeout again.
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/moonshotai/kimi-k2.6",
		);
	}

	getSystemPrompt() {
		return "You are a coding assistant. Use run_command to work in your Debian Linux sandbox.";
	}

	// Offer only the sandbox tool, so the model does not use the workspace file tools.
	beforeTurn() {
		return { activeTools: ["run_command"] };
	}

	getTools() {
		return {
			run_command: tool({
				description:
					"Run a shell command in this agent's Debian Linux sandbox. The sandbox cannot reach the Internet.",
				inputSchema: z.object({
					command: z.string().describe("The command to run with bash -lc"),
				}),
				execute: ({ command }) => this.runCommand(command),
			}),
		};
	}

	private async runCommand(command: string) {
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

		// Runs inside the disposable container VM (no Internet), never on the host
		// or in the Worker. `timeout` stops the command and every process it started.
		const process = await container.exec([
			"timeout",
			"--kill-after=5",
			"60",
			"bash",
			"-lc",
			command,
		]);
		const output = await process.output();
		const decoder = new TextDecoder();

		return {
			exitCode: output.exitCode,
			stdout: decoder.decode(output.stdout).slice(-MAX_OUTPUT_CHARS),
			stderr: decoder.decode(output.stderr).slice(-MAX_OUTPUT_CHARS),
		};
	}
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Wrangler configuration (Containers require the Workers Paid plan):

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	"ai": {
		"binding": "AI"
	},
	"containers": [
		{
			"class_name": "CodeAgent",
			"scheduling_policy": "durable_object"
		}
	],
	"durable_objects": {
		"bindings": [
			{
				"class_name": "CodeAgent",
				"name": "CodeAgent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["CodeAgent"]
		}
	]
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `container.start({ image, entrypoint, enableInternet })` | method | — | Boots the container. `cloudflare/debian-trixie` is Debian with Node.js and npm; the `sleep infinity` entrypoint keeps it running because the image's default command exits immediately. |
| `enableInternet` | boolean | — | `false` blocks outbound requests. `true` allows every destination. |
| `container.setInactivityTimeout(ms)` | method | — | Keeps the container running after the agent becomes inactive (10 minutes in the example). Set again after a Durable Object restart. |
| `container.exec(argv)` | method | — | Runs a command; `process.output()` returns `exitCode`, `stdout`, `stderr`. |
| `scheduling_policy` | string | — | `"durable_object"` lets the agent choose the image when it calls `start()`. |

## Notes

- Adapted from the official docs: only comments were added to the `runCommand` snippet to state that commands run inside the disposable container VM; code is otherwise verbatim.
- The sandbox is its own virtual machine: it cannot read the agent's storage, environment variables, or bindings. It reaches the Internet only when allowed.
- `enableInternet: true` lets model-written commands send anything they can read to any server. To allow specific hostnames or inject a credential after a request leaves the sandbox, use an outbound handler in your Worker (see the cloudflare-sandbox-containers skill (containers category; https://developers.cloudflare.com/sandbox/)).
- Files last only while the container runs; after it stops the next command starts a fresh container. Use snapshots (cloudflare-sandbox-containers skill (sandbox category; https://developers.cloudflare.com/sandbox/)) and keep only small metadata (such as a snapshot ID) in agent state.
- The `routeAgentRequest` export above is unauthenticated and lets any caller drive a model that runs shell commands; add `onBeforeConnect` / `onBeforeRequest` checks and bind the instance name to the authenticated user (routing-authentication reference) before deploying.
- Prompt injection: file contents, packages, or web pages in the sandbox can steer the model. Check tool results before acting outside the sandbox and require approval for tools with side effects.
- All users of one agent instance share its sandbox; give each user their own instance when files must stay apart.
- If model-written code only calls methods you define, use Code Mode (Dynamic Worker, faster start) instead.
- The Sandbox SDK / Containers products themselves are in the cloudflare-sandbox-containers skill (sandbox; https://developers.cloudflare.com/sandbox/); this page covers only the agent tool pattern. Think workspace tools and approvals: [think-tools.md](../harnesses/think-tools.md)

## Related

- [File system](./filesystem.md)
- [Code Mode overview](./codemode-overview.md)
