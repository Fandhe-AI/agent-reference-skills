---
source: https://ai.google.dev/gemini-api/docs/live-api/get-started-sdk
---

# Get started with Live API (GenAI SDK)

Integrate with the Live API on your server using the Google GenAI SDK (`google-genai`), which provides a high-level asynchronous interface over WebSockets.

## Signature / Usage

Python:

```python
import asyncio
from google import genai

client = genai.Client(api_key="YOUR_API_KEY")

model = "gemini-3.8-live"
config = {"response_modalities": ["AUDIO"]}

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        print("Session started")
        # Send content...

if __name__ == "__main__":
    asyncio.run(main())
```

JavaScript:

```javascript
import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY"});
const model = 'gemini-3.8-live';
const config = { responseModalities: [Modality.AUDIO] };

async function main() {

  const session = await ai.live.connect({
    model: model,
    callbacks: {
      onopen: function () {
        console.debug('Opened');
      },
      onmessage: function (message) {
        console.debug(message);
      },
      onerror: function (e) {
        console.debug('Error:', e.message);
      },
      onclose: function (e) {
        console.debug('Close:', e.reason);
      },
    },
    config: config,
  });

  console.debug("Session started");
  // Send content...

  session.close();
}

main();
```

Sending text, audio (raw 16-bit PCM, 16kHz, little-endian) and video frames (max 1 frame per second):

```python
await session.send_realtime_input(text="Hello, how are you?")

# Assuming 'chunk' is your raw PCM audio bytes
await session.send_realtime_input(
    audio=types.Blob(
        data=chunk,
        mime_type="audio/pcm;rate=16000"
    )
)

# Assuming 'frame' is your JPEG-encoded image bytes
await session.send_realtime_input(
    video=types.Blob(
        data=frame,
        mime_type="image/jpeg"
    )
)
```

```javascript
session.sendRealtimeInput({
  text: 'Hello, how are you?'
});

// Assuming 'chunk' is a Buffer of raw PCM audio
session.sendRealtimeInput({
  audio: {
    data: chunk.toString('base64'),
    mimeType: 'audio/pcm;rate=16000'
  }
});
```

Receiving audio and transcriptions (Python):

```python
async for response in session.receive():
    if response.server_content and response.server_content.model_turn:
        for part in response.server_content.model_turn.parts:
            if part.inline_data:
                audio_data = part.inline_data.data
                # Process or play the audio data

async for response in session.receive():
    content = response.server_content
    if content:
        if content.input_transcription:
            print(f"User: {content.input_transcription.text}")
        if content.output_transcription:
            print(f"Gemini: {content.output_transcription.text}")
```

Handling tool calls (Python):

```python
async for response in session.receive():
    if response.tool_call:
        function_responses = []
        for fc in response.tool_call.function_calls:
            # 1. Execute the function locally
            result = my_tool_function(**fc.args)

            # 2. Prepare the response
            function_responses.append(types.FunctionResponse(
                name=fc.name,
                id=fc.id,
                response={"result": result}
            ))

        # 3. Send the tool response back to the session
        await session.send_tool_response(function_responses=function_responses)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| model | string | Example in source: `gemini-3.8-live` |
| config | object | Modalities (audio/text), voice, and system instructions; example `{"response_modalities": ["AUDIO"]}` (Python) / `{ responseModalities: [Modality.AUDIO] }` (JavaScript) |
| `send_realtime_input` / `sendRealtimeInput` | method | Send text, audio, or video as real-time input |
| `send_tool_response` / `sendToolResponse` | method | Send function responses back for a tool call |

## Notes

- Key concepts: Session (a persistent connection to the model), Config, Real-time Input (audio and video frames as blobs).
- Python uses `client.aio.live.connect(...)`; JavaScript uses `ai.live.connect({ model, callbacks, config })`.
- Availability: Live API is v1beta only. Distinct from the OpenAI Realtime API (see the openai-realtime-audio skill).

## Related

- [Get started with Live API (WebSockets)](./get-started-websocket.md)
- [Live API capabilities guide](./capabilities.md)
- [Tool use with Live API](./tool-use.md)
- [Session management with Live API](./session-management.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
