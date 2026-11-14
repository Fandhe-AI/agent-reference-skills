---
source: https://developers.cloudflare.com/ai-gateway/usage/websockets-api/, https://developers.cloudflare.com/ai-gateway/usage/websockets-api/non-realtime-api/, https://developers.cloudflare.com/ai-gateway/usage/websockets-api/realtime-api/
---

# WebSockets API

Persistent WebSocket connections through AI Gateway: a non-realtime API (all providers, including those without native WebSockets) and a realtime API (providers with dedicated WebSocket endpoints).

## Signature / Usage

Adapted (not in the official docs): the official non-realtime snippet is wrapped so `send` happens in an `open` handler (the original in the Universal Endpoint page sends before the socket is open), and the token is read from an environment variable.

Non-realtime (`wss://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}`):

```javascript
import WebSocket from "ws";

const ws = new WebSocket(
	"wss://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/",
	{
		headers: {
			"cf-aig-authorization": `Bearer ${process.env.AI_GATEWAY_TOKEN}`,
		},
	},
);

ws.on("open", () => {
	ws.send(
		JSON.stringify({
			type: "universal.create",
			request: {
				eventId: "my-request",
				provider: "workers-ai",
				endpoint: "@cf/meta/llama-3.1-8b-instruct",
				headers: {
					Authorization: `Bearer ${process.env.WORKERS_AI_TOKEN}`,
					"Content-Type": "application/json",
				},
				query: {
					prompt: "tell me a joke",
				},
			},
		}),
	);
});

ws.on("message", (message) => {
	console.log(message.toString());
});
```

Realtime (OpenAI), also with `send` inside `open`.

Adapted (not in the official docs): `cf-aig-authorization` carries `Bearer <token>`, as on the non-realtime example and the authentication page; the official realtime example passes the bare token.

```javascript
import WebSocket from "ws";

const url =
	"wss://gateway.ai.cloudflare.com/v1/<account_id>/<gateway>/openai?model=gpt-4o-realtime-preview-2024-12-17";
const ws = new WebSocket(url, {
	headers: {
		"cf-aig-authorization": `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
		Authorization: "Bearer " + process.env.OPENAI_API_KEY,
		"OpenAI-Beta": "realtime=v1",
	},
});

ws.on("open", () => {
	console.log("Connected to server.");
	ws.send(
		JSON.stringify({
			type: "response.create",
			response: { modalities: ["text"], instructions: "Tell me a joke" },
		}),
	);
});
ws.on("message", (message) => console.log(JSON.parse(message.toString())));
```

Realtime (ElevenLabs, browser-style subprotocol auth):

```javascript
const ws = new WebSocket(
	"wss://gateway.ai.cloudflare.com/v1/<account_id>/<gateway>/elevenlabs?agent_id=<elevenlabs_agent_id>",
	[
		"xi-api-key.<elevenlabs_api_key>",
		"cf-aig-authorization.<cloudflare_token>",
	],
);
```

## Options / Props

### Message types (non-realtime)

| `type` | Direction | Description |
|--------|-----------|-------------|
| universal.create | client to gateway | Request: `eventId`, `provider`, `endpoint`, `headers`, `query` |
| universal.created | gateway to client | Result with `metadata` (`cacheStatus`, `eventId`, `logId`, `step`, `contentType`) and `response` |
| universal.stream | gateway to client | Streaming chunk; metadata carries only `eventId` |
| universal.done | gateway to client | End of stream; repeats full metadata |

### Realtime providers

| Provider | Notes |
|----------|-------|
| OpenAI | `/openai?model=...`; headers incl. `OpenAI-Beta: realtime=v1` |
| Google AI Studio | `/google`; setup message with `model` and `generationConfig` |
| Cartesia | `/cartesia?cartesia_version=2024-06-10` |
| ElevenLabs | `/elevenlabs?agent_id=...` |
| Fal AI | `/fal/fal-ai/<model>` (HTTP over WebSocket) |
| Deepgram (Workers AI) | `/workers-ai?model=@cf/deepgram/nova-3` (STT), also `@cf/deepgram/flux`; TTS models |

## Notes

- Adapted from the official docs: the realtime header example sends `cf-aig-authorization` without the `Bearer ` prefix; it is written as `Bearer <token>` to match the non-realtime example and the AI Gateway authentication contract.

- Authentication: a Cloudflare API token with the AI Gateway Run permission. New gateways require authentication; for an existing gateway with authentication off, turn it on. Use headers in non-browser environments; browsers use the `sec-websocket-protocol` subprotocol list (`cf-aig-authorization.<token>`, `xi-api-key.<key>`, `fal-api-key.<key>`).
- Do not put provider API keys in the URL query string. The official Google AI Studio and Cartesia examples append `?api_key=<...>` to the URL; URLs are commonly logged. Store those keys with BYOK instead (then only `cf-aig-authorization` is required) or use a header/subprotocol where the provider accepts it.
- Provider keys can be configured with BYOK on the gateway; the `cf-aig-authorization` header is still required.
- Non-realtime streaming: an initial `universal.created` (content type `text/event-stream`), then `universal.stream` chunks, then `universal.done`. `eventId` lets you correlate responses on a persistent connection.
- Corrected from the official docs: sends happen after the socket opens; the realtime snippets in the official page call `ws.send` immediately after construction.
- Auto Router does not support the WebSockets API.
- Provider realtime protocols (OpenAI Realtime, Gemini Live) belong to openai-realtime-audio and google-gemini-api.

## Related

- [usage-universal-endpoint.md](./usage-universal-endpoint.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [configuration-authentication.md](./configuration-authentication.md)
