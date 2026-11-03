---
source: https://developers.cloudflare.com/sandbox/coding-agents/pi/
---

# Run Pi in a sandbox

Switch the coding agent runner to the Pi coding agent, which edits a GitHub repository from a prompt and calls models through AI Gateway with its built-in `cloudflare-ai-gateway` provider. The Worker adds the gateway token; the sandbox reaches only your gateway and `github.com`.

## Signature / Usage

`Dockerfile` (commands run inside the disposable sandbox container; the `cloudflare/sandbox` tag must match the installed package version):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install --global --ignore-scripts @earendil-works/pi-coding-agent@0.87.1

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

WORKDIR /workspace
CMD ["sleep", "infinity"]
```

`wrangler.jsonc` (a model ID from Pi's `cloudflare-ai-gateway` provider):

```jsonc
{
	"vars": {
		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
		"AI_GATEWAY_ID": "default",
		"MODEL": "claude-sonnet-5",
	},
}
```

`src/sandbox.ts`:

```ts
const PiEvent = z.union([
	z.object({ type: z.literal("agent_settled") }),
	z.object({
		type: z.literal("message_end"),
		message: z.object({
			role: z.literal("assistant"),
			content: z.array(
				z.object({ type: z.string(), text: z.string().optional() }),
			),
			stopReason: z.string(),
			errorMessage: z.string().optional(),
		}),
	}),
]);

type PiMessage = Extract<
	z.infer<typeof PiEvent>,
	{ type: "message_end" }
>["message"];
```

```ts
export class AgentSandbox extends DurableObject<Env> {
	// ...

	private agentCommand(prompt: string): string[] {
		return [
			"pi",
			// Run one task, write one JSON event per line to the events file, and exit
			"--mode",
			"json",
			// Keep the session in memory instead of saving it to disk
			"--no-session",
			// Select the built-in AI Gateway provider in Pi, which reads the account
			// and gateway IDs from the environment
			"--provider",
			"cloudflare-ai-gateway",
			// Select the model from `MODEL`
			"--model",
			this.env.MODEL,
			"--",
			prompt,
		];
	}

	private agentEnv(): Record<string, string> {
		return {
			CLOUDFLARE_API_KEY: "provided-by-worker",
			CLOUDFLARE_ACCOUNT_ID: this.env.AI_GATEWAY_ACCOUNT_ID,
			CLOUDFLARE_GATEWAY_ID: this.env.AI_GATEWAY_ID,
			PI_OFFLINE: "1",
			PI_SKIP_VERSION_CHECK: "1",
			PI_TELEMETRY: "0",
		};
	}
}
```

## Notes

- Replace `outcome()` too (omitted for length): a nonzero exit fails with `pi exited with <code>: <stderr tail>`; otherwise the task succeeds only when an `agent_settled` event was seen and the last assistant `message_end` has a `stopReason` other than `error` or `aborted` (result is its concatenated text blocks). Pi exits successfully even when a model request fails, so the outcome comes from its events.
- Pi runs its tools without approval prompts; the container limits what commands can reach, so treat the repository and agent output as untrusted. `CLOUDFLARE_API_KEY` is a placeholder (Pi does not start without one); Pi sends it in `cf-aig-authorization` and `Outbound` replaces it with the gateway token. `PI_OFFLINE`, `PI_SKIP_VERSION_CHECK`, `PI_TELEMETRY` disable catalog refresh, version check and telemetry.
- Pi loads `AGENTS.md` and `CLAUDE.md` from the repository. Without `--approve` it skips protected project resources in the repository's `.pi` directory: leave `--approve` off for repositories you do not trust.
- Use a model from a provider such as Anthropic: for most Workers AI models in its catalog, Pi 0.87.1 requests as many output tokens as the context window and Workers AI rejects those requests. Pin the version; flags and events change. Use a new sandbox name after switching agents. The Agents SDK Pi harness is in the cloudflare-agents skill (harnesses: pi).

## Related

- [Build a coding agent runner](./build-a-coding-agent-runner.md)
- [Run OpenCode in a sandbox](./opencode.md)
- [Coding agents in a sandbox](./coding-agents-overview.md)
