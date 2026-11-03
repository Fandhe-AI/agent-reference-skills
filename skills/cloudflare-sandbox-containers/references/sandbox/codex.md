---
source: https://developers.cloudflare.com/sandbox/coding-agents/codex/
---

# Run Codex in a sandbox

Switch the coding agent runner to the Codex CLI, which edits a GitHub repository from a prompt and whose changes are read as a diff. Codex calls OpenAI models through AI Gateway; the Worker adds the gateway token and the sandbox reaches only your gateway and `github.com`.

## Signature / Usage

`Dockerfile` (only the Codex install line differs from the runner; commands run inside the disposable sandbox container; the `cloudflare/sandbox` tag must match the installed package version):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install --global --ignore-scripts @openai/codex@0.156.1

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

WORKDIR /workspace
CMD ["sleep", "infinity"]
```

`wrangler.jsonc` (an OpenAI model ID that supports the Responses API):

```jsonc
{
	"vars": {
		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
		"AI_GATEWAY_ID": "default",
		"MODEL": "gpt-6-sol",
	},
}
```

`src/sandbox.ts`:

```ts
const lastMessagePath = `${taskDirectory}/last-message.txt`;

const FailureEvent = z.union([
	z.object({
		type: z.literal("turn.failed"),
		error: z.object({ message: z.string() }),
	}),
	z.object({ type: z.literal("error"), message: z.string() }),
]);
```

```ts
export class AgentSandbox extends DurableObject<Env> {
	// ...

	private agentCommand(prompt: string): string[] {
		const baseUrl = `https://gateway.ai.cloudflare.com/v1/${this.env.AI_GATEWAY_ACCOUNT_ID}/${this.env.AI_GATEWAY_ID}/openai`;

		return [
			"codex",
			// Run one task without an interactive terminal
			"exec",
			// Write one JSON event per line to the events file
			"--json",
			// Skip the session files that Codex would otherwise save
			"--ephemeral",
			"--dangerously-bypass-approvals-and-sandbox",
			// Write the final message to a file outside the repository
			"--output-last-message",
			lastMessagePath,
			"--model",
			this.env.MODEL,
			// Add a custom provider that sends requests to the OpenAI endpoint of your gateway
			"--config",
			'model_provider="cloudflare-ai-gateway"',
			"--config",
			`model_providers.cloudflare-ai-gateway={ name = "Cloudflare AI Gateway", base_url = ${JSON.stringify(baseUrl)}, wire_api = "responses" }`,
			// Stop the analytics and update requests from Codex
			"--config",
			"analytics.enabled=false",
			"--config",
			"check_for_update_on_startup=false",
			// Stop Codex from syncing its plugin marketplace, which clones a
			// repository from `github.com` on every run
			"--config",
			"features.plugins=false",
			"--",
			prompt,
		];
	}

	private agentEnv(): Record<string, string> {
		return {};
	}
}
```

## Notes

- Replace `outcome()` as well (omitted for length): exit code `0` is `succeeded` with the content of `lastMessagePath`; otherwise the task fails with the message from the last `turn.failed` or `error` event (validated by `FailureEvent`), or with `codex exited with <code>: <stderr tail>`. Codex exits nonzero when its turn fails, so the exit code decides the outcome; it retries a failing model request five times and fails after about 20 seconds.
- `--dangerously-bypass-approvals-and-sandbox` turns off approval prompts and Codex's built-in command sandbox; the container limits what commands can reach instead, so treat the repository and agent output as untrusted. The custom provider sends no API key: the `Outbound` entrypoint adds the gateway token. Codex reads the intercepted-HTTPS certificate from `SSL_CERT_FILE`, set by `trustEnv` in the runner.
- The npm package ships native binaries as dependencies, so `--ignore-scripts` works. Pin the version: flags and event format can change. A running container keeps its image: use a new sandbox name.
- Prerequisites: the `sandbox-coding-agent` project from the runner page and OpenAI credentials in AI Gateway (Unified Billing or a stored OpenAI key). Example requests are the same as the claude-code page with sandbox name `codex-1`. The agent itself (flags, config) is covered by the openai-codex skill. Example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/codex ; AI Gateway: cloudflare-ai skill (ai-gateway).

## Related

- [Build a coding agent runner](./build-a-coding-agent-runner.md)
- [Run Claude Code in a sandbox](./claude-code.md)
- [Coding agents in a sandbox](./coding-agents-overview.md)
