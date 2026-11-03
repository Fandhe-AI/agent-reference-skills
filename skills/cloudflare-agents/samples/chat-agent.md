---
source: https://developers.cloudflare.com/agents/examples/chat-agent/
---

# Chat agent

Streaming Workers AI chat agent with a server-side tool, a client-side tool, and an approval-gated tool, plus the React client.

## Signature / Usage

Install (`npm create cloudflare@latest chat-agent`, pick "Hello World" Worker):

```sh
cd chat-agent
npm install agents @cloudflare/ai-chat ai @ai-sdk/provider zod
```

`wrangler.jsonc`:

```jsonc
{
	"name": "chat-agent",
	"main": "src/server.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": { "binding": "AI" },
	"durable_objects": {
		"bindings": [{ "name": "ChatAgent", "class_name": "ChatAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["ChatAgent"] }],
}
```

`src/server.ts`:

Adapted (not in the official docs): `AIChatAgent<Env>` generic added so `this.env.AI` is typed, and `routeAgentRequest` gets fail-closed `onBeforeConnect` / `onBeforeRequest` authentication (see Notes).

```ts
import { AIChatAgent } from "@cloudflare/ai-chat";
import { routeAgentRequest } from "agents";
import { createAI } from "agents/models/ai-sdk";
import {
	streamText,
	convertToModelMessages,
	pruneMessages,
	tool,
	stepCountIs,
} from "ai";
import { z } from "zod";

export class ChatAgent extends AIChatAgent<Env> {
	async onChatMessage() {
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/meta/llama-4-scout-17b-16e-instruct"),
			system:
				"You are a helpful assistant. You can check the weather, " +
				"get the user's timezone, and run calculations.",
			messages: pruneMessages({
				messages: await convertToModelMessages(this.messages),
				toolCalls: "before-last-2-messages",
			}),
			tools: {
				// Server-side tool: runs automatically on the server
				getWeather: tool({
					description: "Get the current weather for a city",
					inputSchema: z.object({
						city: z.string().describe("City name"),
					}),
					execute: async ({ city }) => {
						// Replace with a real weather API in production
						const conditions = ["sunny", "cloudy", "rainy"];
						const temp = Math.floor(Math.random() * 30) + 5;
						return {
							city,
							temperature: temp,
							condition:
								conditions[Math.floor(Math.random() * conditions.length)],
						};
					},
				}),

				// Client-side tool: no execute function — the browser handles it
				getUserTimezone: tool({
					description: "Get the user's timezone from their browser",
					inputSchema: z.object({}),
				}),

				// Approval tool: requires user confirmation before executing
				calculate: tool({
					description:
						"Perform a math calculation with two numbers. " +
						"Requires user approval for large numbers.",
					inputSchema: z.object({
						a: z.coerce.number().describe("First number"),
						b: z.coerce.number().describe("Second number"),
						operator: z
							.enum(["+", "-", "*", "/", "%"])
							.describe("Arithmetic operator"),
					}),
					needsApproval: async ({ a, b }) =>
						Math.abs(a) > 1000 || Math.abs(b) > 1000,
					execute: async ({ a, b, operator }) => {
						const ops: Record<string, (x: number, y: number) => number> = {
							"+": (x, y) => x + y,
							"-": (x, y) => x - y,
							"*": (x, y) => x * y,
							"/": (x, y) => x / y,
							"%": (x, y) => x % y,
						};
						if (operator === "/" && b === 0) {
							return { error: "Division by zero" };
						}
						return {
							expression: `${a} ${operator} ${b}`,
							result: ops[operator](a, b),
						};
					},
				}),
			},
			stopWhen: stepCountIs(5),
		});

		return result.toUIMessageStreamResponse();
	}
}

type User = { id: string };

async function authenticate(request: Request, env: Env): Promise<User | null> {
	// Verify a session cookie, a JWT, or an API key here.
	// This placeholder rejects every request until you implement verification.
	return null;
}

const check = async (
	env: Env,
	req: Request,
	route: { name: string },
): Promise<Response | void> => {
	const user = await authenticate(req, env);
	if (!user) return new Response("Unauthorized", { status: 401 });
	// Each user can only reach the agent named after them.
	if (route.name !== user.id) return new Response("Forbidden", { status: 403 });
};

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: (req, route) => check(env, req, route),
				onBeforeRequest: (req, route) => check(env, req, route),
			})) || new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`src/client.tsx` (`userId` is the signed-in user's id, which the server's routing check requires as the instance name):

Adapted (not in the official docs): the agent `name` is the signed-in user's id, and tool parts are detected with `isToolUIPart()` / `getToolName()` from `ai` instead of reading `part.state` / `part.toolName` on every part. See Notes.

```tsx
import { getToolName, isToolUIPart } from "ai";
import { useAgent } from "agents/react";
import { useAgentChat, getToolApproval } from "@cloudflare/ai-chat/react";

function Chat({ userId }: { userId: string }) {
	const agent = useAgent({ agent: "ChatAgent", name: userId });

	const { messages, sendMessage, clearHistory, addToolApprovalResponse, status } =
		useAgentChat({
			agent,
			// Handle client-side tools (tools with no server execute function)
			onToolCall: async ({ toolCall, addToolOutput }) => {
				if (toolCall.toolName === "getUserTimezone") {
					addToolOutput({
						toolCallId: toolCall.toolCallId,
						output: {
							timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
							localTime: new Date().toLocaleTimeString(),
						},
					});
				}
			},
		});

	return (
		<div>
			<div>
				{messages.map((msg) => (
					<div key={msg.id}>
						<strong>{msg.role}:</strong>
						{msg.parts.map((part, i) => {
							if (part.type === "text") {
								return <span key={i}>{part.text}</span>;
							}

							// Tool parts are typed `tool-<name>` or `dynamic-tool`
							if (!isToolUIPart(part)) return null;
							const toolName = getToolName(part);

							// Render approval UI for tools that need confirmation
							if (part.state === "approval-requested") {
								const approval = getToolApproval(part);
								if (!approval) return null;
								return (
									<div key={part.toolCallId}>
										<p>
											Approve <strong>{toolName}</strong>?
										</p>
										<pre>{JSON.stringify(part.input, null, 2)}</pre>
										<button
											onClick={() =>
												addToolApprovalResponse({
													id: approval.id,
													approved: true,
												})
											}
										>
											Approve
										</button>
										<button
											onClick={() =>
												addToolApprovalResponse({
													id: approval.id,
													approved: false,
												})
											}
										>
											Reject
										</button>
									</div>
								);
							}

							// Show completed tool results
							if (part.state === "output-available") {
								return (
									<details key={part.toolCallId}>
										<summary>{toolName} result</summary>
										<pre>{JSON.stringify(part.output, null, 2)}</pre>
									</details>
								);
							}

							return null;
						})}
					</div>
				))}
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					const input = e.currentTarget.elements.namedItem(
						"message",
					) as HTMLInputElement;
					sendMessage({ text: input.value });
					input.value = "";
				}}
			>
				<input name="message" placeholder="Try: What's the weather in Paris?" />
				<button type="submit" disabled={status === "streaming"}>
					Send
				</button>
			</form>

			<button onClick={clearHistory}>Clear history</button>
		</div>
	);
}

export default function App({ userId }: { userId: string }) {
	return <Chat userId={userId} />;
}
```

Run and deploy:

```sh
npx wrangler types
npm run dev
npx wrangler deploy
```

## Notes

- Adapted from the official docs: the page's TypeScript tab declares `class ChatAgent extends AIChatAgent` without the `Env` generic, which leaves `this.env.AI` untyped; `<Env>` was added (the Env type comes from `npx wrangler types`).
- Tool kinds: `getWeather` has `execute` (runs on the server); `getUserTimezone` has no `execute` (the browser answers through `onToolCall`); `calculate` has `execute` plus `needsApproval` (pauses until `addToolApprovalResponse`).
- For destructive or irreversible tools, set `needsApproval: true` (or a predicate that returns true) so a human must approve before `execute` runs. `calculate` only gates large numbers, as an illustration.
- Adapted from the official docs: the official `fetch` calls `routeAgentRequest(request, env)` with no checks, which serves every Agent binding to any caller. The fence adds the hooks from the routing-authentication reference with a placeholder `authenticate()` that rejects everything (fail closed) until you implement verification; the instance name is bound to the authenticated user id. Derive identity from a verified token, never from unverified headers or query parameters. `routeAgentRequest` also matches other Durable Object bindings in `env`; restrict by `route.className` if the Worker has any.
- Corrected from the official docs: the client reads `part.state` and `part.toolName` on every message part, but AI SDK v6 `UIMessage` tool parts are typed `tool-<name>` (no `toolName` field) or `dynamic-tool`, and non-tool parts have no tool `state`. The fence narrows with `isToolUIPart(part)` and reads the name with `getToolName(part)` (both from `ai`, v6 and later), as in the agent-tools reference. It also passes `name: userId` to `useAgent` so the client reaches the instance the routing check allows.
- This is the Cloudflare Agents SDK (`agents`, `@cloudflare/ai-chat`) with the Vercel AI SDK `streamText`, not the OpenAI Agents SDK or the Claude Agent SDK.

## Related

- [Chat SDK](../references/agent-class/chat-sdk.md)
- [Routing authentication](../references/runtime/routing-authentication.md)
