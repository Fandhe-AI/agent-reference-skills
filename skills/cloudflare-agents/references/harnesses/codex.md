---
source: https://developers.cloudflare.com/agents/harnesses/codex/
---

# Codex harness (ContainerHarness, experimental)

Run [OpenAI Codex ↗︎](https://developers.openai.com/codex/cli/) on Cloudflare, with its tools and configuration, the way it runs on your laptop.

Codex runs in a [Cloudflare Container](https://developers.cloudflare.com/containers/), and a [Durable Object](https://developers.cloudflare.com/durable-objects/) drives it with `ContainerHarness` from `agents/harness/container`:

- **The CLI owns the loop.** It keeps its own tools, plugins, settings, and session format, the same as on your laptop.
- **The Durable Object owns the record.** The harness stores sessions, operations, transcripts, and the CLI's session files in the object's SQLite database. [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) jobs reconnect to a running container after an eviction or a deploy.
- **Credentials stay outside the container.** The CLI calls a placeholder host with a placeholder key. `ContainerEgress`, a Worker entrypoint in your Worker, adds the real credentials to each model request after it leaves the container.

No Dockerfile is needed. The harness starts the `cloudflare/debian-trixie` image, installs Codex on first use, and snapshots the filesystem for later starts.

Experimental: `agents/harness/container` is experimental. Its API may change in any release.

To start from a complete app, with HTTP routes and event streaming, use the [Container harness example](https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/container).

## Signature / Usage

### Create a project

You need Node.js 24 or later, the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/), and an OpenAI API key. Local container development also needs Docker running.

1. Create a Worker project:

   ```sh
   cf init codex-agent
   cd codex-agent
   ```

2. Install the Agents SDK:

   ```sh
   npm i agents@latest
   ```

   ```sh
   yarn add agents@latest
   ```

   ```sh
   pnpm add agents@latest
   ```

   ```sh
   bun add agents@latest
   ```

Replace `cloudflare.config.ts`. It declares a SQLite-backed Durable Object with a container on the [`durable_object` scheduling policy](https://developers.cloudflare.com/containers/configuration/scheduling-policy/#use-the-durable-object-scheduling-policy), the `ContainerEgress` entrypoint, and the API key secret:

```ts
import { bindings, defineConfig, defineContainer, exports } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

const container = defineContainer({
	name: "codex",
	schedulingPolicy: "durable-object",
});

export default defineConfig({
	worker: {
		name: "codex-agent",
		entrypoint,
		compatibilityDate: "2026-11-06",
		compatibilityFlags: ["nodejs_compat"],
		exports: {
			CodexAgent: exports.durableObject({ storage: "sqlite", container }),
			ContainerEgress: exports.worker(),
		},
		env: {
			OPENAI_API_KEY: bindings.secret(),
		},
	},
	containers: [container],
});
```

### Create the agent

Create the harness with the `codex()` preset, and add it to the Lifecycle. `src/index.ts`:

```ts
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, codex } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class CodexAgent extends DurableObject<Env> {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		egress: this.ctx.exports.ContainerEgress,
		agent: codex({ apiKey: this.env.OPENAI_API_KEY }),
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request: Request): Promise<Response> {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { prompt } = await request.json<{ prompt: string }>();
		const result = await this.harness.prompt(prompt);
		return Response.json({ status: result.status, text: result.text });
	}
}

function containerOf(ctx: DurableObjectState): Container {
	if (!ctx.container) throw new Error("Configure a container for CodexAgent");
	return ctx.container;
}

export default {
	async fetch(request: Request, _env: Env, ctx: ExecutionContext) {
		return ctx.exports.CodexAgent.getByName("demo").fetch(request);
	},
} satisfies ExportedHandler<Env>;
```

`src/index.js`:

```js
import { DurableObject } from "cloudflare:workers";
import { ContainerHarness, codex } from "agents/harness/container";
import { Lifecycle } from "agents/lifecycle";

export { ContainerEgress } from "agents/harness/container";

export class CodexAgent extends DurableObject {
	harness = new ContainerHarness({
		container: containerOf(this.ctx),
		egress: this.ctx.exports.ContainerEgress,
		agent: codex({ apiKey: this.env.OPENAI_API_KEY }),
	});

	lifecycle = Lifecycle.install(this).use(this.harness);

	async onRequest(request) {
		if (request.method !== "POST") {
			return Response.json(await this.harness.messages());
		}
		const { prompt } = await request.json();
		const result = await this.harness.prompt(prompt);
		return Response.json({ status: result.status, text: result.text });
	}
}

function containerOf(ctx) {
	if (!ctx.container) throw new Error("Configure a container for CodexAgent");
	return ctx.container;
}

export default {
	async fetch(request, _env, ctx) {
		return ctx.exports.CodexAgent.getByName("demo").fetch(request);
	},
};
```

To send model requests through [AI Gateway](https://developers.cloudflare.com/ai-gateway/), pass the gateway's OpenAI URL as `baseUrl`. With [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), pass the gateway token as `apiKey`. With [stored provider keys](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/), pass it in a `cf-aig-authorization` header in `headers` instead.

### Run locally

Add your API key to `.dev.vars`, and keep that file out of version control:

```txt
OPENAI_API_KEY="<OPENAI_API_KEY>"
```

Start Docker, then run `cf dev`. Send a prompt to the agent named `demo`, using the port that `cf dev` prints:

```sh
curl http://localhost:5173/ \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"Write hello.txt containing hi, then read it back."}'
```

The first prompt takes longer, because the harness installs Codex and takes the setup snapshot. Later containers start from that snapshot.

### Sessions and recovery

`prompt()` submits work and waits for the answer. `submit()` returns once the prompt is stored, and `wait()` picks up the result later, in another request to the same object. Pass an `operationId` to deduplicate a submission:

```ts
const receipt = await this.harness.submit("Add tests for parse()", {
	operationId: "parse-tests-1",
});

// In a later request to the same Durable Object:
const result = await this.harness.wait(receipt.operationId);
if (result.status === "done") console.log(result.text);
else console.log(result.reason);
```

`harness.sessions.create()` starts an independent session, and `harness.sessions.fork(id)` branches one. `session.events()` returns a snapshot of the session followed by live events, which you can forward to a client.

Recovery depends on what stopped:

- **The Durable Object is evicted or redeployed.** A Lifecycle job reattaches to the running container and replays the events it missed.
- **The container goes idle.** After five minutes, the harness snapshots the filesystem and stops it. The next prompt restores the snapshot and resumes the CLI's session.
- **The container dies during a turn.** The turn ends with `status: "unanswered"` and `reason: "container_lost"`, and the session survives. Pass `onContainerLost: "retry"` to run the turn again instead, when its side effects are safe to repeat.

Files in the container come back from the last snapshot, so edits made after it can be lost. Keep files that must survive in separate durable storage.

### Deploy

After you add authentication, deploy with the [Cloudflare CLI](https://developers.cloudflare.com/cf/get-started/) and supply the secret from a [secrets file](https://developers.cloudflare.com/cf/projects/#deploy):

```sh
cf auth login
cf deploy --secrets-file .dev.vars
```

## Options / Props

### Customize Codex

`codex()` takes these options:

| Option | Description |
| --- | --- |
| `model` | The model new sessions start with. `session.setModel()` changes it |
| `config` | Extra `-c key=value` overrides, passed to every `codex exec` run |
| `version` | The `@openai/codex` version to install |
| `setup` | Commands that run once on the first start, kept in the snapshot |

Use `config` for single settings, and `setup` to write `~/.codex/config.toml`, `AGENTS.md`, or MCP server configuration. A step with `user: "agent"` runs as the user Codex runs as, in its home. Every session's home starts as a copy of that home:

```ts
codex({
	apiKey: this.env.OPENAI_API_KEY,
	config: ['model_reasoning_effort="high"'],
	setup: [
		{
			name: "write AGENTS.md",
			user: "agent",
			command: [
				"sh",
				"-c",
				"mkdir -p ~/.codex && printf '%s\\n' 'Use pnpm. Keep commits small.' > ~/.codex/AGENTS.md",
			],
		},
	],
});
```

Changing `setup` or `version` takes effect when a container next starts. That container sets up from scratch, without the previous snapshot. A token that a setup step uses stays in the snapshot, where the agent can read it.

## Notes

- Source: https://developers.cloudflare.com/agents/harnesses/codex/ (cloudflare-docs production 34d908a, fetched 2026-11-14)
- Experimental: `agents/harness/container` is experimental and its API may change in any release.
- Security: The container is the sandbox. Both CLIs run without their own permission prompts, so treat everything in the container as readable by the agent. Keep credentials out of it, and put [authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/) in front of every route that reaches the harness. Each prompt can run commands and spend model credit.
- The official page shows `npm`, `yarn`, `pnpm`, and `bun` tabs for the install command, and `.js` / `.ts` tabs for the agent and the snippets; all are reproduced above.
- Placeholders such as `<OPENAI_API_KEY>` stand for your own secret; do not commit `.dev.vars`.
- Distinction: this harness runs the Codex CLI in a container and is a harness over a plain Durable Object, not the `Agent` base class. Codex CLI itself (config.toml, AGENTS.md, rules, approvals) is covered by the openai-codex skill; the OpenAI API behind it by openai-api-core. For a general sandbox/container runtime see the cloudflare-sandbox-containers skill.

## Related

- [overview.md](./overview.md)
- [opencode.md](./opencode.md)
- [pi.md](./pi.md)
