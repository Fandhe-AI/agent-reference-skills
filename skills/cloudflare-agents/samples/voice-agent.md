---
source: https://developers.cloudflare.com/agents/examples/voice-agent/
---

# Voice agent

Real-time voice agent: speech-to-text, streamed LLM turn, text-to-speech, and a React client (beta).

## Signature / Usage

Scaffold from the starter and update `agents`:

```sh
npm create cloudflare@latest voice-agent -- --template cloudflare/agents-starter
cd voice-agent
npm install agents@latest
```

`wrangler.jsonc`:

```jsonc
{
	"name": "voice-agent",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"main": "src/server.ts",
	"upload_source_maps": true,
	"ai": {
		"binding": "AI"
	},
	"durable_objects": {
		"bindings": [
			{
				"name": "MyVoiceAgent",
				"class_name": "MyVoiceAgent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["MyVoiceAgent"]
		}
	]
}
```

`src/server.ts`:

Adapted (not in the official docs): `routeAgentRequest` gets fail-closed `onBeforeConnect` / `onBeforeRequest` authentication so only the owner can open a call (see Notes).

```ts
import { Agent, routeAgentRequest, type Connection } from "agents";
import {
	withVoice,
	WorkersAIFluxSTT,
	WorkersAITTS,
	type VoiceTurnContext,
} from "agents/voice";
import { streamText, tool, stepCountIs } from "ai";
import { createAI } from "agents/models/ai-sdk";
import { z } from "zod";

const VoiceAgent = withVoice(Agent);

export class MyVoiceAgent extends VoiceAgent<Env> {
	transcriber = new WorkersAIFluxSTT(this.env.AI);
	tts = new WorkersAITTS(this.env.AI);

	async onTurn(transcript: string, context: VoiceTurnContext) {
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/moonshotai/kimi-k2.6"),
			system:
				"You are a helpful voice assistant. Keep responses concise — you are being spoken aloud.",
			messages: [
				...context.messages.map((m) => ({
					role: m.role as "user" | "assistant",
					content: m.content,
				})),
				{ role: "user" as const, content: transcript },
			],
			tools: {
				get_current_time: tool({
					description: "Get the current date and time.",
					inputSchema: z.object({}),
					execute: async () => ({
						time: new Date().toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
						}),
					}),
				}),
			},
			stopWhen: stepCountIs(3),
			abortSignal: context.signal,
		});

		return result.textStream;
	}

	async onCallStart(connection: Connection) {
		await this.speak(connection, "Hi there! How can I help you today?");
	}
}

async function authenticate(
	request: Request,
	env: Env,
): Promise<{ id: string } | null> {
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
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`src/client.tsx` (`userId` is the signed-in user's id):

Adapted (not in the official docs): `name` is set to the signed-in user's id so the client reaches the instance the server's routing check allows. See Notes.

```tsx
import { useVoiceAgent } from "agents/voice/react";

function App({ userId }: { userId: string }) {
	const {
		status,
		transcript,
		interimTranscript,
		metrics,
		audioLevel,
		isMuted,
		startCall,
		endCall,
		toggleMute,
	} = useVoiceAgent({ agent: "MyVoiceAgent", name: userId });

	return (
		<div>
			<h1>Voice Agent</h1>
			<p>Status: {status}</p>

			<div>
				<button onClick={status === "idle" ? startCall : endCall}>
					{status === "idle" ? "Start Call" : "End Call"}
				</button>
				{status !== "idle" && (
					<button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
				)}
			</div>

			{interimTranscript && (
				<p>
					<em>{interimTranscript}</em>
				</p>
			)}

			{transcript.map((msg, i) => (
				<p key={i}>
					<strong>{msg.role}:</strong> {msg.text}
				</p>
			))}

			{metrics && (
				<p>
					LLM: {metrics.llm_ms}ms | TTS: {metrics.tts_ms}ms | First audio:{" "}
					{metrics.first_audio_ms}ms
				</p>
			)}
		</div>
	);
}
```

Pipeline hooks (drop very short transcripts, adjust pronunciation before TTS):

```ts
export class MyVoiceAgent extends VoiceAgent<Env> {
	transcriber = new WorkersAIFluxSTT(this.env.AI);
	tts = new WorkersAITTS(this.env.AI);

	afterTranscribe(transcript: string, connection: Connection) {
		if (transcript.length < 3) return null;
		return transcript;
	}

	beforeSynthesize(text: string, connection: Connection) {
		return text.replace(/\bAI\b/g, "A.I.");
	}

	async onTurn(transcript: string, context: VoiceTurnContext) {
		return "You said: " + transcript;
	}
}
```

## Notes

- Voice is beta; `agents/voice` requires a recent `agents` release (hence `npm install agents@latest`).
- `status` cycles `idle` -> `listening` -> `thinking` -> `speaking` -> `listening`. `context.signal` aborts when the user interrupts or disconnects; pass it to `streamText` as `abortSignal`. Returning `null` from `afterTranscribe` drops the utterance.
- Adapted from the official docs: the official server calls `routeAgentRequest(request, env)` with no authentication, so anyone who can reach the Worker could open a call and consume Workers AI usage. The fence adds the routing-authentication hooks with a placeholder `authenticate()` that rejects everything until you implement verification, and binds the instance name to the authenticated user id; the client fence passes that id as `useVoiceAgent({ name })` (the official voice page passes `name` the same way, with `"default"`).
- Third-party providers (`@cloudflare/voice-deepgram`, `@cloudflare/voice-elevenlabs`) are drop-in replacements for `transcriber` / `tts`; keep their API keys as Wrangler secrets read from `this.env`.
- The `get_current_time` tool is read-only. A tool that changes data should be approval-gated (see the chat-agent sample) rather than run from a voice transcript alone.
- This is the Cloudflare Agents SDK voice mixin, not the OpenAI Realtime API or the Claude Agent SDK.

## Related

- [Voice](../references/agent-class/voice.md)
- [Routing authentication](../references/runtime/routing-authentication.md)
