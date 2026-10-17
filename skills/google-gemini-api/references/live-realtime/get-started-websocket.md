---
source: https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket
---

# Get started with Live API (WebSockets)

Integrate directly with the Live API using raw WebSockets, managing the connection and exchanging JSON messages (`BidiGenerateContentClientMessage` / `BidiGenerateContentServerMessage`).

## Signature / Usage

Endpoint formats:

```text
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=YOUR_API_KEY

wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContentConstrained?access_token={short-lived-token}
```

Connect and send the setup message first (JavaScript):

```javascript
const API_KEY = "YOUR_API_KEY";
const MODEL_NAME = "gemini-3.8-live";
const WS_URL = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${API_KEY}`;

const websocket = new WebSocket(WS_URL);

websocket.onopen = () => {
  console.log('WebSocket Connected');

  // 1. Send the initial configuration
  const setupMessage = {
    setup: {
      model: `models/${MODEL_NAME}`,
      generationConfig: { responseModalities: ['AUDIO'] },
      systemInstruction: {
        parts: [{ text: 'You are a helpful assistant.' }]
      }
    }
  };
  websocket.send(JSON.stringify(setupMessage));
  console.log('Configuration sent');
};
```

Python:

```python
import asyncio
import websockets
import json

API_KEY = "YOUR_API_KEY"
MODEL_NAME = "gemini-3.8-live"
WS_URL = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={API_KEY}"

async def connect_and_configure():
    async with websockets.connect(WS_URL) as websocket:
        print("WebSocket Connected")

        # 1. Send the initial configuration
        setup_message = {
            "setup": {
                "model": f"models/{MODEL_NAME}",
                "generationConfig": {"responseModalities": ["AUDIO"]},
                "systemInstruction": {
                    "parts": [{"text": "You are a helpful assistant."}]
                }
            }
        }
        await websocket.send(json.dumps(setup_message))
        print("Configuration sent")

        # Keep the session alive for further interactions
        await asyncio.sleep(10) # Example: keep open briefly
```

Sending text, audio and video (JavaScript):

```javascript
const textMessage = { realtimeInput: { text: text } };
websocket.send(JSON.stringify(textMessage));

const audioMessage = {
  realtimeInput: {
    audio: {
      data: chunk.toString('base64'),
      mimeType: 'audio/pcm;rate=16000'
    }
  }
};
websocket.send(JSON.stringify(audioMessage));

const videoMessage = {
  realtimeInput: {
    video: {
      data: frame.toString('base64'),
      mimeType: mimeType
    }
  }
};
websocket.send(JSON.stringify(videoMessage));
```

Handling a tool call and replying (JavaScript):

```javascript
function handleToolCall(toolCall) {
  const functionResponses = [];
  for (const fc of toolCall.functionCalls) {
    // 1. Execute the function locally
    let result;
    try {
      result = myToolFunction(fc.args || {});
    } catch (e) {
      console.error(`Error executing tool ${fc.name}:`, e);
      result = { error: e.message };
    }

    // 2. Prepare the response
    functionResponses.push({
      name: fc.name,
      id: fc.id,
      response: { result }
    });
  }

  // 3. Send the tool response back to the session
  if (websocket.readyState === WebSocket.OPEN) {
    const toolResponseMessage = {
      toolResponse: {
        functionResponses: functionResponses
      }
    };
    websocket.send(JSON.stringify(toolResponseMessage));
    console.log('Sent tool response');
  } else {
    console.warn('WebSocket not open to send tool response.');
  }
}
```

## Options / Props

| Message | Description |
|---------|-------------|
| `BidiGenerateContentSetup` | First message sent over the WebSocket; contains the `config` (`setup` key) |
| `BidiGenerateContentRealtimeInput` | `realtimeInput` with `text`, `audio`, or `video` (Blob with `data` base64 and `mimeType`) |
| `BidiGenerateContentServerMessage` | Server messages: `serverContent` (`modelTurn.parts[].inlineData`, `inputTranscription`, `outputTranscription`) and `toolCall` |
| `BidiGenerateContentToolResponse` | `toolResponse.functionResponses[]` with `name`, `id`, `response` |

## Notes

- Authentication: API key as the `key` query parameter. With ephemeral tokens, connect to the `v1beta` endpoint `BidiGenerateContentConstrained` and pass the token as the `access_token` query parameter.
- Audio is raw 16-bit PCM, 16kHz, little-endian; the `mimeType` (`audio/pcm;rate=16000`) is crucial. Video frames are individual images (e.g., JPEG or PNG).
- You are responsible for maintaining the WebSocket connection.
- The official page places `responseModalities` directly under `setup`; per the Live API reference (`BidiGenerateContentSetup`) it belongs in `setup.generationConfig`, so the examples here are corrected.
- The official Python example keeps the connection open with `asyncio.sleep(3600)` (one hour); shortened to 10 seconds here so the snippet does not block an agent.
- Availability: Live API is v1beta only. Distinct from the OpenAI Realtime API (see the openai-realtime-audio skill).

## Related

- [Get started with Live API (GenAI SDK)](./get-started-sdk.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
- [Live API overview](./overview.md)
