---
source: https://developers.cloudflare.com/ai-search/how-to/talk-to-your-knowledge-base/
---

# Talk to your knowledge base (voice agent)

A Cloudflare voice agent that transcribes speech, answers from an AI Search instance through a retrieval tool, and speaks the reply.

## Signature / Usage

Scaffold a project from the agents starter template:

```sh
npm create cloudflare@latest voice-knowledge-base -- --template cloudflare/agents-starter
cd voice-knowledge-base
```

Update the `agents` package, which ships voice support:

```sh
npm i agents@latest
```

`wrangler.jsonc` (the AI Search binding requires a `compatibility_date` of `2026-03-27` or later):

```jsonc
{
	"name": "voice-knowledge-base",
	"main": "src/server.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"ai": {
		"binding": "AI",
		"remote": true
	},
	"ai_search": [
		{
			"binding": "AI_SEARCH",
			"instance_name": "my-instance",
			"remote": true
		}
	],
	"durable_objects": {
		"bindings": [
			{
				"name": "TalkToDocs",
				"class_name": "TalkToDocs"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["TalkToDocs"]
		}
	]
}
```

Regenerate the binding types so `env.AI` and `env.AI_SEARCH` are typed:

```sh
npx wrangler types
```

`src/server.ts`:

Adapted (not in the official docs): the Worker entry passes `onBeforeConnect` / `onBeforeRequest` hooks to `routeAgentRequest()` that reject unauthenticated callers (fail closed: the `authenticate()` placeholder returns `null` until you implement it) and only let each user reach the agent instance named after their verified user ID, following the Agents SDK authentication guide. An open voice endpoint lets anyone consume Workers AI and query the knowledge base, and a shared instance would share conversation history between users. See Notes.

```ts
import { Agent, routeAgentRequest } from "agents";
import {
	withVoice,
	WorkersAIFluxSTT,
	WorkersAITTS,
	type VoiceTurnContext,
} from "agents/voice";
import { generateText, tool, stepCountIs } from "ai";
import { createAI } from "agents/models/ai-sdk";
import { z } from "zod";

const VoiceAgent = withVoice(Agent);

export class TalkToDocs extends VoiceAgent<Env> {
	// Workers AI powers speech-to-text and text-to-speech (no API keys needed).
	transcriber = new WorkersAIFluxSTT(this.env.AI);
	tts = new WorkersAITTS(this.env.AI);

	// Called each time the user finishes speaking. The agent's model generates
	// the reply, calling AI Search as a retrieval tool when it needs facts from
	// your knowledge base.
	async onTurn(transcript: string, context: VoiceTurnContext) {
		const ai = createAI({ binding: this.env.AI });

		const result = await generateText({
			// Use a Workers AI model that supports function calling.
			model: ai("@cf/zai-org/glm-5.2"),
			system:
				"You are a helpful voice assistant that answers from a Cloudflare AI Search knowledge base. " +
				"For questions about the product, call the searchKnowledgeBase tool first and answer using the results. " +
				"Skip the tool for greetings and small talk. Keep replies short and conversational.",
			messages: [
				...context.messages.map((message) => ({
					role: message.role as "user" | "assistant",
					content: message.content,
				})),
				{ role: "user" as const, content: transcript },
			],
			tools: {
				searchKnowledgeBase: tool({
					description:
						"Search the knowledge base for information to answer the user's question.",
					inputSchema: z.object({
						query: z.string().describe("A focused search query"),
					}),
					execute: async ({ query }) => {
						// search() runs retrieval only and returns the matching chunks.
						const res = await this.env.AI_SEARCH.search({
							query,
							ai_search_options: { retrieval: { max_num_results: 5 } },
						});
						return res.chunks.map((chunk) => chunk.text).join("\n\n");
					},
				}),
			},
			// Let the model call the tool, then answer from the results.
			stopWhen: stepCountIs(4),
		});

		// Return the generated answer for the pipeline to speak.
		return result.text;
	}
}

type User = { id: string };

// Verify your own session here. Browsers cannot set an Authorization header on
// a WebSocket upgrade, so check a session cookie (sent automatically on the
// same-origin upgrade). Returning null rejects the request (fail closed).
async function authenticate(_request: Request, _env: Env): Promise<User | null> {
	return null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const check = async (req: Request, route: { name: string }) => {
			const user = await authenticate(req, env);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// Each user can only reach the agent instance named after them, so
			// conversation history is never shared between users.
			if (route.name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
		};

		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: check,
				onBeforeRequest: check,
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`src/client.tsx` (React client from the page; render it as `<App userId={...} />` with the signed-in user's ID):

Adapted (not in the official docs): `App` takes the signed-in user's ID and passes it as the `name` option of `useVoiceAgent`, so the client connects to the agent instance the server-side check allows. See Notes.

```tsx
import { useVoiceAgent } from "agents/voice/react";

function App({ userId }: { userId: string }) {
	// useVoiceAgent connects to your agent over WebSocket, captures the
	// microphone, plays the spoken response, and exposes the live call state.
	// `agent` matches your Durable Object class name.
	const {
		// Pipeline state: "idle" | "listening" | "thinking" | "speaking".
		status,
		// Finalized conversation turns (your speech and the agent's replies).
		transcript,
		// Live partial transcription of what you are currently saying.
		interimTranscript,
		// Whether the WebSocket connection to the agent is open.
		connected,
		startCall,
		endCall,
		toggleMute,
		isMuted,
	} = useVoiceAgent({ agent: "TalkToDocs", name: userId });

	const inCall = status !== "idle";

	return (
		<div>
			<h1>Talk to your knowledge base</h1>

			{/* Shows "thinking" while the agent searches the KB and generates a reply. */}
			<p>Status: {status}</p>

			{/* Toggle the call. Disabled until the agent connection is open. */}
			<button
				onClick={inCall ? endCall : startCall}
				disabled={!connected && !inCall}
			>
				{!connected ? "Connecting…" : inCall ? "End call" : "Start call"}
			</button>

			{/* Mute only applies once a call is active. */}
			{inCall && (
				<button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
			)}

			{/* Lightweight loading state while the agent works on a reply. */}
			{status === "thinking" && <p>Thinking…</p>}

			{/* Live partial transcript, updated as you speak. */}
			{interimTranscript && (
				<p>
					<em>{interimTranscript}</em>
				</p>
			)}

			{/* Finalized turns from both you and the agent. */}
			{transcript.map((message, index) => (
				<p key={index}>
					<strong>{message.role}:</strong> {message.text}
				</p>
			))}
		</div>
	);
}

export default App;
```

## Notes

- Adapted from the official docs: the official entry routes every request to a single shared `default` instance. Here `routeAgentRequest()` gets `onBeforeConnect` / `onBeforeRequest` hooks (the pattern from https://developers.cloudflare.com/agents/runtime/routing/authentication/) that reject callers `authenticate()` cannot verify and requests for any instance other than the user's own, and the client passes the user's ID as `name`. `authenticate()` is a fail-closed placeholder: until you implement it (for example by verifying a signed session cookie), every request is rejected with 401. This sample relies on a session cookie that the browser sends with the same-origin WebSocket upgrade.
- Run locally with `npm run dev` and deploy with `npx wrangler deploy`, as in the starter template.
- The model needs function calling; the page uses `@cf/zai-org/glm-5.2`.
- `onTurn()` returns the text that the pipeline speaks; `context.messages` carries conversation history for follow-ups.
- The page's multi-person variant uses RealtimeKit for the audio layer and keeps this agent as the answer engine (https://developers.cloudflare.com/realtime/realtimekit/).
- Voice and the Agents SDK are covered by the cloudflare-agents skill (voice; https://developers.cloudflare.com/agents/); the AI SDK `generateText` by vercel-ai-sdk.

## Related

- [Search](../references/ai-search/search.md)
- [Bindings configuration](../references/ai-search/bindings-configuration.md)
- [Text-to-speech models](../references/workers-ai-models/text-to-speech.md)
