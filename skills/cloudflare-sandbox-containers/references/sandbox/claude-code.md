---
source: https://developers.cloudflare.com/sandbox/coding-agents/claude-code/
---

# Run Claude Code in a sandbox

Switch the coding agent runner (see the build-a-coding-agent-runner page) to Claude Code, which edits a GitHub repository from a prompt and whose changes are read back as a diff. Claude Code calls Anthropic models through AI Gateway; your Worker adds the gateway token, and the sandbox can reach only your gateway and `github.com`.

## Signature / Usage

Replace the `Dockerfile` (the agent and its commands run inside the disposable sandbox container, never on the host; the `cloudflare/sandbox` tag must match the installed `@cloudflare/sandbox` version):

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends bash ca-certificates git ripgrep \
	&& rm -rf /var/lib/apt/lists/*

RUN npm install --global @anthropic-ai/claude-code@2.1.308

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

WORKDIR /workspace
CMD ["sleep", "infinity"]
```

Set the model in `wrangler.jsonc` (an Anthropic model ID your gateway can serve):

```jsonc
{
	"vars": {
		"AI_GATEWAY_ACCOUNT_ID": "<ACCOUNT_ID>",
		"AI_GATEWAY_ID": "default",
		"MODEL": "claude-sonnet-5",
	},
}
```

In `src/outbound.ts` the `Outbound` entrypoint removes the placeholder key before adding the gateway token:

```ts
const headers = new Headers(request.headers);
headers.delete("x-api-key");
headers.set("cf-aig-authorization", `Bearer ${this.env.AI_GATEWAY_TOKEN}`);
```

In `src/sandbox.ts`:

```ts
const ResultEvent = z.object({
	type: z.literal("result"),
	subtype: z.string(),
	is_error: z.boolean(),
	result: z.string().optional(),
});
```

```ts
	private agentCommand(prompt: string): string[] {
		return [
			"claude",
			"--print",
			"--output-format",
			"stream-json",
			"--verbose",
			"--dangerously-skip-permissions",
			"--no-session-persistence",
			"--model",
			this.env.MODEL,
			"--",
			prompt,
		];
	}

	private agentEnv(): Record<string, string> {
		return {
			ANTHROPIC_BASE_URL: `https://gateway.ai.cloudflare.com/v1/${this.env.AI_GATEWAY_ACCOUNT_ID}/${this.env.AI_GATEWAY_ID}/anthropic`,
			ANTHROPIC_API_KEY: "provided-by-worker",
			CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
			IS_SANDBOX: "1",
		};
	}
```

```ts
export class AgentSandbox extends DurableObject<Env> {
	// ...

	private async outcome(exitCode: number): Promise<TaskStatus> {
		let result: z.infer<typeof ResultEvent> | undefined;
		const events = await this.files.readFile(eventsPath);

		for await (const line of readLines(events.body)) {
			const parsed = ResultEvent.safeParse(parseJson(line));

			if (parsed.success) {
				result = parsed.data;
			}
		}

		if (result === undefined) {
			const stderr = (await this.readOptionalText(stderrPath)) ?? "";
			return {
				state: "failed",
				error: `claude exited with ${exitCode}: ${stderr.slice(-2000)}`,
			};
		}

		if (result.is_error) {
			return { state: "failed", error: result.result ?? result.subtype };
		}

		return { state: "succeeded", result: result.result ?? "" };
	}
}
```

Run a task (on your machine, against your deployed Worker):

```sh
curl "$WORKER_URL/sandboxes/claude-1/repository" \
	--json '{"url": "https://github.com/octocat/Hello-World"}'
curl "$WORKER_URL/sandboxes/claude-1/task" \
	--data "Add a file NOTES.md with a one-sentence summary of this repository. Do not commit."
curl "$WORKER_URL/sandboxes/claude-1/task"
curl "$WORKER_URL/sandboxes/claude-1/diff"
```

## Notes

- Prerequisites: the `sandbox-coding-agent` project from the runner page, plus Anthropic credentials in AI Gateway (Unified Billing credits or an Anthropic API key stored as a provider key).
- Claude Code sends a placeholder API key; if `x-api-key` is not removed, AI Gateway forwards it to Anthropic and the request fails with `Invalid API key`. `ANTHROPIC_API_KEY` is a placeholder only because Claude Code does not start without one. Unlike the placeholder, no real credential is placed in the sandbox environment.
- `--dangerously-skip-permissions` lets the agent run commands and edit files without asking; only the container limits what its commands can reach, so treat the repository and agent output as untrusted. Claude Code requires `IS_SANDBOX=1` to allow this as `root`. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` disables update checks, telemetry and error reporting so only your gateway is called. A `CLAUDE.md` in the repository is read by the agent.
- Claude Code exits successfully even when a model request fails: the outcome comes from `is_error` on the final `result` event. It retries a failing model request 10 times; a rejected gateway token fails after about three minutes with `Failed to authenticate. API Error: 401 Unauthorized`. The image pins the agent version because flags and event format can change between releases.
- A running container keeps the image it started with: use a new sandbox name after switching agents. The agent itself (flags, settings) is documented by the anthropic-claude-code skill; the harness inside the sandbox is the sandbox side of the setup. Example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/coding-agents/claude-code ; AI Gateway: cloudflare-ai skill (ai-gateway).

## Related

- [Build a coding agent runner](./build-a-coding-agent-runner.md)
- [Codex in a sandbox](./codex.md)
- [Coding agents in a sandbox](./coding-agents-overview.md)
