---
source: https://developers.cloudflare.com/workflows/get-started/durable-agents/
---

# Build a Durable AI Agent

Turn each LLM call and tool call of an agent loop into a Workflow step, using the Agents SDK `AgentWorkflow` class, so the agent retries and resumes from the last successful step.

## Signature / Usage

```sh
npm create cloudflare@latest -- durable-ai-agent
cd durable-ai-agent
npm install agents @anthropic-ai/sdk
```

`src/tools.ts`:

Adapted (not in the official docs): `owner` and `repo` come from LLM output and were interpolated into the GitHub URL path unescaped; they are now passed through `encodeURIComponent`.

```ts
export interface SearchReposInput {
	query: string;
	limit?: number;
}

export interface GetRepoInput {
	owner: string;
	repo: string;
}

interface GitHubSearchResponse {
	items: Array<{ full_name: string; stargazers_count: number }>;
}

interface GitHubRepoResponse {
	full_name: string;
	description: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	language: string;
	license: { name: string } | null;
	updated_at: string;
}

export const searchReposTool = {
	name: "search_repos" as const,
	description:
		"Search GitHub repositories by keyword. Returns top results. Use get_repo for details.",
	input_schema: {
		type: "object" as const,
		properties: {
			query: {
				type: "string",
				description: "Search query (e.g., 'typescript orm')",
			},
			limit: { type: "number", description: "Max results (default 5)" },
		},
		required: ["query"],
	},
	run: async (input: SearchReposInput): Promise<string> => {
		const response = await fetch(
			`https://api.github.com/search/repositories?q=${encodeURIComponent(input.query)}&sort=stars&per_page=${input.limit ?? 5}`,
			{
				headers: {
					Accept: "application/vnd.github+json",
					"User-Agent": "DurableAgent/1.0",
				},
			},
		);
		if (!response.ok) return `Search failed: ${response.status}`;
		const data = await response.json<GitHubSearchResponse>();
		return JSON.stringify(
			data.items.map((r) => ({
				name: r.full_name,
				stars: r.stargazers_count,
			})),
		);
	},
};

export const getRepoTool = {
	name: "get_repo" as const,
	description:
		"Get detailed info about a GitHub repository including stars, forks, and description.",
	input_schema: {
		type: "object" as const,
		properties: {
			owner: {
				type: "string",
				description: "Repository owner (e.g., 'cloudflare')",
			},
			repo: {
				type: "string",
				description: "Repository name (e.g., 'workers-sdk')",
			},
		},
		required: ["owner", "repo"],
	},
	run: async (input: GetRepoInput): Promise<string> => {
		const response = await fetch(
			`https://api.github.com/repos/${encodeURIComponent(input.owner)}/${encodeURIComponent(input.repo)}`,
			{
				headers: {
					Accept: "application/vnd.github+json",
					"User-Agent": "DurableAgent/1.0",
				},
			},
		);
		if (!response.ok) return `Repo not found: ${input.owner}/${input.repo}`;
		const data = await response.json<GitHubRepoResponse>();
		return JSON.stringify({
			name: data.full_name,
			description: data.description,
			stars: data.stargazers_count,
			forks: data.forks_count,
			issues: data.open_issues_count,
			language: data.language,
			license: data.license?.name ?? "None",
			updated: data.updated_at,
		});
	},
};

export const tools = [searchReposTool, getRepoTool];
```

`src/workflow.ts`:

```ts
import { AgentWorkflow } from "agents/workflows";
import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";
import Anthropic from "@anthropic-ai/sdk";
import {
	tools,
	searchReposTool,
	getRepoTool,
	type SearchReposInput,
	type GetRepoInput,
} from "./tools";
import type { ResearchAgent } from "./agent";

type Params = { task: string };

export class ResearchWorkflow extends AgentWorkflow<ResearchAgent, Params> {
	async run(event: AgentWorkflowEvent<Params>, step: AgentWorkflowStep) {
		const client = new Anthropic({ apiKey: this.env.ANTHROPIC_API_KEY });

		const messages: Anthropic.MessageParam[] = [
			{ role: "user", content: event.payload.task },
		];

		const toolDefinitions = tools.map(({ run, ...rest }) => rest);

		// Durable agent loop - each turn is checkpointed
		for (let turn = 0; turn < 10; turn++) {
			// Report progress to Agent and connected clients
			await this.reportProgress({
				step: `llm-turn-${turn}`,
				status: "running",
				percent: turn / 10,
				message: `Processing turn ${turn + 1}...`,
			});

			const response = (await step.do(
				`llm-turn-${turn}`,
				{ retries: { limit: 3, delay: "10 seconds", backoff: "exponential" } },
				async () => {
					const msg = await client.messages.create({
						model: "claude-sonnet-4-5-20250929",
						max_tokens: 4096,
						tools: toolDefinitions,
						messages,
					});
					// Serialize for Workflow state
					return JSON.parse(JSON.stringify(msg));
				},
			)) as Anthropic.Message;

			if (!response || !response.content) continue;

			messages.push({ role: "assistant", content: response.content });

			if (response.stop_reason === "end_turn") {
				const textBlock = response.content.find(
					(b): b is Anthropic.TextBlock => b.type === "text",
				);
				const result = {
					status: "complete",
					turns: turn + 1,
					result: textBlock?.text ?? null,
				};

				// Report completion (durable)
				await step.reportComplete(result);
				return result;
			}

			const toolResults: Anthropic.ToolResultBlockParam[] = [];

			for (const block of response.content) {
				if (block.type !== "tool_use") continue;

				// Broadcast tool execution to clients
				this.broadcastToClients({
					type: "tool_call",
					tool: block.name,
					turn,
				});

				const result = await step.do(
					`tool-${turn}-${block.id}`,
					{ retries: { limit: 2, delay: "5 seconds" } },
					async () => {
						switch (block.name) {
							case "search_repos":
								return searchReposTool.run(block.input as SearchReposInput);
							case "get_repo":
								return getRepoTool.run(block.input as GetRepoInput);
							default:
								return `Unknown tool: ${block.name}`;
						}
					},
				);

				toolResults.push({
					type: "tool_result",
					tool_use_id: block.id,
					content: result,
				});
			}

			messages.push({ role: "user", content: toolResults });
		}

		return { status: "max_turns_reached", turns: 10 };
	}
}
```

`src/agent.ts`:

```ts
import { Agent } from "agents";

type State = {
	currentWorkflow?: string;
	status?: string;
};

export class ResearchAgent extends Agent<Env, State> {
	initialState: State = {};

	// Start a research task - called via HTTP or WebSocket
	async startResearch(task: string) {
		const instanceId = await this.runWorkflow("RESEARCH_WORKFLOW", { task });
		this.setState({
			...this.state,
			currentWorkflow: instanceId,
			status: "running",
		});
		return { instanceId };
	}

	// Get status of a workflow
	async getResearchStatus(instanceId: string) {
		return this.getWorkflow(instanceId);
	}

	// Called when workflow reports progress
	async onWorkflowProgress(
		workflowName: string,
		instanceId: string,
		progress: unknown,
	) {
		// Broadcast to all connected WebSocket clients
		this.broadcast(JSON.stringify({ type: "progress", instanceId, progress }));
	}

	// Called when workflow completes
	async onWorkflowComplete(
		workflowName: string,
		instanceId: string,
		result?: unknown,
	) {
		this.setState({ ...this.state, status: "complete" });
		this.broadcast(JSON.stringify({ type: "complete", instanceId, result }));
	}

	// Called when workflow errors
	async onWorkflowError(
		workflowName: string,
		instanceId: string,
		error: string,
	) {
		this.setState({ ...this.state, status: "error" });
		this.broadcast(JSON.stringify({ type: "error", instanceId, error }));
	}
}
```

`wrangler.jsonc`:

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "durable-ai-agent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"observability": {
		"enabled": true
	},
	"durable_objects": {
		"bindings": [
			{
				"name": "ResearchAgent",
				"class_name": "ResearchAgent"
			}
		]
	},
	"workflows": [
		{
			"name": "research-workflow",
			"binding": "RESEARCH_WORKFLOW",
			"class_name": "ResearchWorkflow"
		}
	],
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["ResearchAgent"]
		}
	]
}
```

`src/index.ts`:

Adapted (not in the official docs): the official `/research` and `/status` endpoints are public and start paid LLM runs for any caller; this version fails closed on a shared secret (`API_TOKEN`, set with `npx wrangler secret put`, compared in constant time) for those two routes, and `/research` rejects non-JSON or non-object bodies, a missing or oversized `task`, and both routes reject malformed `agentId` values. WebSocket routing via `routeAgentRequest` is unchanged. See Notes.

```ts
import { getAgentByName, routeAgentRequest } from "agents";

export { ResearchAgent } from "./agent";
export { ResearchWorkflow } from "./workflow";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Route WebSocket connections to /agents/research-agent/{name}
		const agentResponse = await routeAgentRequest(request, env);
		if (agentResponse) return agentResponse;

		const isApiRoute =
			(request.method === "POST" && url.pathname === "/research") ||
			url.pathname === "/status";
		if (isApiRoute) {
			// Fail closed: reject when the token is not configured or does not match
			const enc = new TextEncoder();
			const expected = env.API_TOKEN;
			const provided = enc.encode(request.headers.get("Authorization") ?? "");
			const wanted = enc.encode(`Bearer ${expected ?? ""}`);
			if (
				!expected ||
				provided.byteLength !== wanted.byteLength ||
				!crypto.subtle.timingSafeEqual(provided, wanted)
			) {
				return new Response("Unauthorized", { status: 401 });
			}
		}

		// HTTP API for starting research tasks
		if (request.method === "POST" && url.pathname === "/research") {
			let body: unknown;
			try {
				body = await request.json();
			} catch {
				return Response.json({ error: "body must be JSON" }, { status: 400 });
			}
			if (typeof body !== "object" || body === null) {
				return Response.json({ error: "body must be a JSON object" }, { status: 400 });
			}
			const { task, agentId = "default" } = body as { task?: unknown; agentId?: unknown };
			// Bound the prompt before it starts a paid LLM run.
			if (
				typeof task !== "string" ||
				task.length === 0 ||
				new TextEncoder().encode(task).byteLength > 4096
			) {
				return Response.json({ error: "task must be a string of 1-4096 bytes" }, { status: 400 });
			}
			if (typeof agentId !== "string" || !/^[a-zA-Z0-9_-]{1,64}$/.test(agentId)) {
				return Response.json({ error: "invalid agentId" }, { status: 400 });
			}

			// Get agent instance by name (creates if doesn't exist)
			const agent = await getAgentByName(env.ResearchAgent, agentId);

			// Start the research workflow via RPC
			const result = await agent.startResearch(task);
			return Response.json(result);
		}

		// Check workflow status
		if (url.pathname === "/status") {
			const instanceId = url.searchParams.get("instanceId");
			const agentId = url.searchParams.get("agentId") ?? "default";

			if (!instanceId) {
				return Response.json({ error: "instanceId required" }, { status: 400 });
			}
			if (!/^[a-zA-Z0-9_-]{1,64}$/.test(agentId)) {
				return Response.json({ error: "invalid agentId" }, { status: 400 });
			}

			const agent = await getAgentByName(env.ResearchAgent, agentId);
			const status = await agent.getResearchStatus(instanceId);

			return Response.json(status);
		}

		return new Response("POST /research with { task } to start", {
			status: 400,
		});
	},
} satisfies ExportedHandler<Env>;
```

Local development and deploy (secrets go in an untracked `.dev.vars`/`.env` file locally; add it to `.gitignore`):

```sh
# .env (local only; do not commit)
ANTHROPIC_API_KEY=your-api-key-here
API_TOKEN=choose-a-long-random-value
```

```sh
npx wrangler dev
curl -X POST http://localhost:8787/research \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"task": "Compare open-source LLM projects"}'
curl -H "Authorization: Bearer ${API_TOKEN}" "http://localhost:8787/status?instanceId=abc-123-def"
npx wrangler deploy
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put API_TOKEN
npx wrangler workflows instances describe research-workflow latest
```

React client (`useAgent` connects to `/agents/{agent-name}/{instance-name}`):

Adapted (not in the official docs): `useState(null)` infers the type `null` in a `.tsx` file, so `progress.message` does not type-check; the state is typed, and non-JSON WebSocket frames are ignored instead of throwing in `JSON.parse`. See Notes.

```tsx
import { useState } from "react";
import { useAgent } from "agents/react";

function ResearchUI({ agentId = "default" }) {
	const [progress, setProgress] = useState<{ message: string; percent: number } | null>(null);

	const { state } = useAgent({
		agent: "research-agent", // Maps to ResearchAgent class
		name: agentId, // Instance name
		onMessage: (message) => {
			let data;
			try {
				data = JSON.parse(message.data);
			} catch {
				return; // Ignore frames that are not JSON
			}
			if (data?.type === "progress") {
				setProgress(data.progress);
			}
		},
	});

	return (
		<div>
			{progress && (
				<p>
					{progress.message} ({Math.round(progress.percent * 100)}%)
				</p>
			)}
		</div>
	);
}
```

## Notes

- Corrected from the official docs: GitHub path segments are URL-encoded; the `/research` and `/status` routes require a bearer token (Adapted for safety; the official guide serves them unauthenticated). The official local-dev `curl` shows no secret; `${API_TOKEN}` here is a shell variable you export from the value in your local env file.
- Adapted from the official docs: `/research` parses the body inside `try` (400 on invalid JSON or a non-object body), requires `task` to be a non-empty string of at most 4096 bytes before starting an LLM run, and both routes accept `agentId` only as 1 to 64 letters, digits, `-` or `_`. With a single shared `API_TOKEN` every caller is the same principal; to give users their own agents, derive the agent name from your verified user identity instead of the request body.
- Adapted from the official docs: the React client types its `progress` state (the official `useState(null)` does not type-check in TSX) and ignores WebSocket frames that are not JSON.
- `routeAgentRequest` is called before the token check, so the `/agents/research-agent/{name}` WebSocket routes are not covered by `API_TOKEN`; any client that can reach them can pick an agent instance name. Authenticate those connections with the mechanism documented by the Agents SDK before exposing them, and do not derive instance names from unverified input.
- Each `step.do()` is a checkpoint: after an LLM step its response is persisted and skipped on resume; after a tool step earlier tools do not re-run. Useful for expensive LLM calls, rate-limited or side-effecting APIs, and non-idempotent tools (such as sending email).
- `this.reportProgress()` and `this.broadcastToClients()` are non-durable; `step.reportComplete()` is durable. `AgentWorkflow` is from the Agents SDK (`agents/workflows`), which is covered by the cloudflare-agents skill (agent-class, run-workflows; https://developers.cloudflare.com/agents/).
- The Agent is a Durable Object (hence the `durable_objects` binding and SQLite migration); see [overview.md](../durable-objects/overview.md) for Durable Objects. Agent class names become kebab-case in URLs (`ResearchAgent` becomes `research-agent`).
- The LLM model ID in the example is the official value and may be retired; pick a current model from your provider. The same pattern works with any LLM SDK.
- The quick-start template: `npm create cloudflare@latest -- --template cloudflare/docs-examples/workflows/durableAgent` (uses AI Gateway).
- `tools.map(({ run, ...rest }) => rest)` leaves `run` unused, as in the official sample.

## Related

- [get-started.md](./get-started.md)
- [rules-of-workflows.md](./rules-of-workflows.md)
- [sleeping-and-retrying.md](./sleeping-and-retrying.md)
