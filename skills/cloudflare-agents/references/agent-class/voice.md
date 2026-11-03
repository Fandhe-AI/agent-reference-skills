---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/voice/
---

# Voice (withVoice / withVoiceInput / useVoiceAgent)

Real-time voice agents (beta): speech-to-text, text-to-speech and conversation persistence. Audio streams over WebSocket as 16 kHz mono 16-bit PCM binary frames; no SFU needed.

## Signature / Usage

```ts
import { Agent } from "agents";
import {
	withVoice,
	WorkersAIFluxSTT,
	WorkersAITTS,
	type VoiceTurnContext,
} from "agents/voice";

const VoiceAgent = withVoice(Agent);

export class MyAgent extends VoiceAgent<Env> {
	transcriber = new WorkersAIFluxSTT(this.env.AI);
	tts = new WorkersAITTS(this.env.AI);

	async onTurn(transcript: string, context: VoiceTurnContext) {
		return "Hello! I heard you say: " + transcript;
	}
}
```

Streaming LLM response:

```ts
import { streamText } from "ai";
import { createAI } from "agents/models/ai-sdk";

export class MyAgent extends VoiceAgent<Env> {
	transcriber = new WorkersAIFluxSTT(this.env.AI);
	tts = new WorkersAITTS(this.env.AI);

	async onTurn(transcript: string, context: VoiceTurnContext) {
		const ai = createAI({ binding: this.env.AI });

		const result = streamText({
			model: ai("@cf/moonshotai/kimi-k2.6"),
			system: "You are a helpful voice assistant. Keep responses concise.",
			messages: [
				...context.messages.map((m) => ({
					role: m.role as "user" | "assistant",
					content: m.content,
				})),
				{ role: "user", content: transcript },
			],
			abortSignal: context.signal,
		});

		return result.textStream;
	}
}
```

Client:

```tsx
import { useVoiceAgent } from "agents/voice/react";

function VoiceUI() {
	const {
		status,
		transcript,
		interimTranscript,
		audioLevel,
		isMuted,
		startCall,
		endCall,
		toggleMute,
	} = useVoiceAgent({ agent: "MyAgent" });

	return (
		<div>
			<p>Status: {status}</p>

			<button onClick={status === "idle" ? startCall : endCall}>
				{status === "idle" ? "Start Call" : "End Call"}
			</button>

			<button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>

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
		</div>
	);
}
```

STT-only, config and framework-agnostic client:

```ts
import { Agent, type Connection } from "agents";
import {
	withVoice,
	withVoiceInput,
	WorkersAINova3STT,
} from "agents/voice";

const InputAgent = withVoiceInput(Agent);

export class DictationAgent extends InputAgent<Env> {
	transcriber = new WorkersAINova3STT(this.env.AI);

	onTranscript(text: string, connection: Connection) {
		console.log("User said:", text);
	}
}

const VoiceAgent2 = withVoice(Agent, {
	historyLimit: 20,
	audioFormat: "mp3",
	maxMessageCount: 1000,
});
```

```ts
import { VoiceClient } from "agents/voice/client";

const client = new VoiceClient({ agent: "MyAgent" });

client.addEventListener("statuschange", (status) => {
	console.log("Status:", status);
});

client.connect();
await client.startCall();

// Later:
client.endCall();
client.disconnect();
```

Wrangler (`ai` binding, DO binding, `new_sqlite_classes` migration):

```jsonc
{
	"ai": {
		"binding": "AI"
	},
	"durable_objects": {
		"bindings": [
			{
				"name": "MyAgent",
				"class_name": "MyAgent"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["MyAgent"]
		}
	]
}
```

## Options / Props

Server exports from `agents/voice`: `withVoice` (full STT + LLM + TTS + persistence), `withVoiceInput` (STT only). Client: `useVoiceAgent`, `useVoiceInput` (`agents/voice/react`), `VoiceClient` (`agents/voice/client`).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transcriber` | `Transcriber` | — | Required. Continuous per-call STT provider |
| `tts` | `TTSProvider` | — | Required for `withVoice`. Text-to-speech |
| `onTurn(transcript, context)` | method | — | Required. Return `string`, `AsyncIterable<string>` or `ReadableStream`. `context`: `connection`, `messages` (history before this transcript), `signal` (aborted on interrupt/disconnect) |
| `beforeCallStart(connection)` | hook | — | Return `false` to reject the call |
| `onCallStart` / `onCallEnd` / `onInterrupt` | hook | — | Call lifecycle |
| `afterTranscribe(transcript, connection)` | hook | — | Return `null` to skip |
| `beforeSynthesize(text, connection)` | hook | — | Return `null` to skip |
| `afterSynthesize(audio, text, connection)` | hook | — | Return `null` to skip |
| `createTranscriber(connection)` | method | — | Runtime model switching |
| `speak(connection, text)` / `speakAll(text)` / `forceEndCall(connection)` / `saveMessage(role, text)` / `getConversationHistory()` | method | — | Convenience methods |
| `historyLimit` | `number` (`withVoice` option) | `20` | Max messages loaded for context |
| `audioFormat` | `string` | `"mp3"` | Audio format sent to client |
| `maxMessageCount` | `number` | `1000` | Max messages stored in SQLite |
| `onTranscript(text, connection)` | method (`withVoiceInput`) | — | Called after each transcribed utterance |

Built-in providers (Workers AI, no API key): `WorkersAIFluxSTT` (`@cf/deepgram/flux`), `WorkersAINova3STT` (`@cf/deepgram/nova-3`), `WorkersAITTS` (`@cf/deepgram/aura-1`). Third-party: `@cloudflare/voice-deepgram` `DeepgramSTT`; `@cloudflare/voice-elevenlabs` `ElevenLabsTTS`; `@cloudflare/voice-telnyx` `TelnyxSTT`/`TelnyxTTS`; `@cloudflare/voice-twilio` `TwilioAdapter`; `@cloudflare/voice-plivo` `PlivoAdapter`.

`useVoiceAgent` tuning:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Delay client creation and connection when false |
| `silenceThreshold` | `number` | `0.04` | RMS below this is silence |
| `silenceDurationMs` | `number` | `500` | Silence before `end_of_speech` |
| `interruptThreshold` | `number` | `0.05` | RMS to detect speech during playback |
| `interruptChunks` | `number` | `2` | Consecutive high-RMS chunks to trigger interrupt |
| `outputDeviceId` | `string` | system default | Preferred `audiooutput` device |

`useVoiceAgent` returns `status` (`"idle" | "listening" | "thinking" | "speaking"`), `transcript`, `interimTranscript`, `metrics`, `audioLevel`, `isMuted`, `connected`, `error`, `outputDeviceError`, `startCall`, `endCall`, `toggleMute`, `sendText`, `sendJSON`, `lastCustomMessage`. `VoiceClient` events: `statuschange`, `transcriptchange`, `interimtranscript`, `metricschange`, `audiolevelchange`, `connectionchange`, `mutechange`, `error`, `outputdeviceerror`, `custommessage`.

## Notes

- Voice ships in the `agents` package (0.23.0 and later). `@cloudflare/voice` is deprecated and forwards each entry point (`/client`, `/react`, `/errors`) to `agents/voice/...`; exported names, wire protocol and SQLite table names are unchanged.
- Append `transcript` exactly once when building an LLM message list; `context.messages` excludes it. `getConversationHistory()` inside `onTurn()` includes it.
- Telephony: Twilio and Plivo use server-side adapters (8 kHz mulaw converted to 16 kHz PCM) that expose `handleRequest()`; Telnyx bridges via browser WebRTC and needs a short-lived credential from `TelnyxJWTEndpoint` (requires an `authorize` callback). `WorkersAITTS` returns MP3, which cannot be decoded to PCM in Workers, so Twilio/Plivo need a PCM-output TTS (e.g. ElevenLabs `outputFormat: "pcm_16000"`).
- Text messages (`sendText`) bypass STT and go to `onTurn()`. Non-voice JSON messages reach your `onMessage` and emit `custommessage`.
- Single-speaker enforcement via `beforeCallStart` with an in-memory `#speakerId` field is illustrative only: class fields are lost on eviction. Voice agents use `keepAlive` during active calls.
- Do not put third-party API keys in code; use `wrangler secret put`.

## Related

- [WebSockets](./websockets.md)
- [Durable execution](./durable-execution.md)
- [Client SDK](./client-sdk.md)
