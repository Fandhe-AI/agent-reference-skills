---
source: https://developers.cloudflare.com/sandbox/coding-agents/opencode/
---

# Run OpenCode in a sandbox

Switch the coding agent runner to OpenCode, which edits a GitHub repository from a prompt and calls models through AI Gateway. The Worker adds the gateway token; the sandbox reaches only your gateway and `github.com`.

## Signature / Usage

`Dockerfile` (commands run inside the disposable sandbox container; the `cloudflare/sandbox` tag must match the installed package version):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install --global --ignore-scripts opencode-linux-x64-baseline@1.19.4 \
	&& ln -s /usr/local/lib/node_modules/opencode-linux-x64-baseline/bin/opencode /usr/local/bin/opencode

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

WORKDIR /workspace
CMD ["sleep", "infinity"]
```

`wrangler.jsonc` (model IDs have the form `cloudflare-ai-gateway/<PROVIDER>/<MODEL>`):

```jsonc
{
	"vars": {
		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
		"AI_GATEWAY_ID": "default",
		"MODEL": "cloudflare-ai-gateway/anthropic/claude-sonnet-5",
	},
}
```

`src/sandbox.ts`:

```ts
const OpencodeEvent = z.union([
	z.object({ type: z.literal("text"), part: z.object({ text: z.string() }) }),
	z.object({
		type: z.literal("error"),
		error: z.object({
			name: z.string(),
			data: z.object({ message: z.string().optional() }).optional(),
		}),
	}),
]);
```

```ts
export class AgentSandbox extends DurableObject<Env> {
	// ...

	private agentCommand(prompt: string): string[] {
		return [
			"opencode",
			// Run one task without an interactive terminal
			"run",
			// Write one JSON event per line to the events file
			"--format",
			"json",
			"--auto",
			// Select the AI Gateway model from `MODEL`
			"--model",
			this.env.MODEL,
			"--",
			prompt,
		];
	}

	private agentEnv(): Record<string, string> {
		return {
			CLOUDFLARE_API_TOKEN: "provided-by-worker",
			CLOUDFLARE_ACCOUNT_ID: this.env.AI_GATEWAY_ACCOUNT_ID,
			CLOUDFLARE_GATEWAY_ID: this.env.AI_GATEWAY_ID,
			OPENCODE_DISABLE_MODELS_FETCH: "1",
			OPENCODE_DISABLE_AUTOUPDATE: "1",
			OPENCODE_DISABLE_DEFAULT_PLUGINS: "1",
			OPENCODE_DISABLE_LSP_DOWNLOAD: "1",
			OPENCODE_DISABLE_SHARE: "1",
		};
	}
}
```

## Notes

- Replace `outcome()` too (omitted for length): exit code `0` returns the last `text` event as `succeeded`; otherwise the message from the last `error` event (or `opencode exited with <code>: <stderr tail>`). OpenCode exits nonzero on any model or session error.
- `--auto` approves every tool call the OpenCode configuration does not deny (a run without a terminal otherwise rejects permission requests); the container limits what commands can reach, so treat the repository and agent output as untrusted. `CLOUDFLARE_API_TOKEN` is a placeholder; `Outbound` swaps the token header for the gateway token. For Anthropic models OpenCode uses the universal gateway path, which `Outbound` allows. OpenCode still tries to install `@opencode-ai/plugin` from npm and gets a `403` from `Outbound`; it continues.
- The image installs the baseline x64 binary directly because `opencode-ai` picks a binary for the build machine's CPU (wrong under `amd64` emulation). `ripgrep` is in the image because otherwise OpenCode tries to download `rg` from GitHub. Pin the version: model list and event format change between releases; list models with `opencode models cloudflare-ai-gateway` for the same version.
- A running container keeps its image: use a new sandbox name. Prerequisites: the runner project and Anthropic credentials in AI Gateway. The Agents SDK OpenCode harness is in the cloudflare-agents skill (harnesses: opencode).

## Related

- [Build a coding agent runner](./build-a-coding-agent-runner.md)
- [Run Pi in a sandbox](./pi.md)
- [Coding agents in a sandbox](./coding-agents-overview.md)
