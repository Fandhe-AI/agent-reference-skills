---
source: https://ai.google.dev/gemini-api/docs/live-api/get-started-websocket
---

# Live API WebSocket Audio Session

Connect to the Live API over a raw WebSocket, send the setup message, stream 16 kHz PCM audio, and read audio responses.

```python
import asyncio
import base64
import websockets
import json
import os

API_KEY = os.environ["GEMINI_API_KEY"]
MODEL_NAME = "gemini-3.8-live"
WS_URL = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={API_KEY}"

async def send_audio_chunk(websocket, chunk_bytes):
    encoded_data = base64.b64encode(chunk_bytes).decode('utf-8')
    audio_message = {
        "realtimeInput": {
            "audio": {
                "data": encoded_data,
                "mimeType": "audio/pcm;rate=16000"
            }
        }
    }
    await websocket.send(json.dumps(audio_message))
    # print("Sent audio chunk") # Avoid excessive logging

# Assuming 'chunk' is your raw PCM audio bytes
# await send_audio_chunk(websocket, chunk)

async def receive_loop(websocket):
    async for message in websocket:
        response = json.loads(message)
        print("Received:", response)

        if "serverContent" in response:
            server_content = response["serverContent"]
            # Receiving Audio
            if "modelTurn" in server_content and "parts" in server_content["modelTurn"]:
                for part in server_content["modelTurn"]["parts"]:
                    if "inlineData" in part:
                        audio_data_b64 = part["inlineData"]["data"]
                        # Process or play the base64 encoded audio data
                        # audio_data = base64.b64decode(audio_data_b64)
                        print(f"Received audio data (base64 len: {len(audio_data_b64)})")

            # Receiving Text Transcriptions
            if "inputTranscription" in server_content:
                print(f"User: {server_content['inputTranscription']['text']}")
            if "outputTranscription" in server_content:
                print(f"Gemini: {server_content['outputTranscription']['text']}")

async def connect_and_configure():
    async with websockets.connect(WS_URL) as websocket:
        print("WebSocket Connected")

        # 1. Send the initial configuration
        setup_message = {
            "setup": {
                "model": f"models/{MODEL_NAME}",
                "generationConfig": {"responseModalities": ["AUDIO"]},
                "inputAudioTranscription": {},
                "outputAudioTranscription": {},
                "systemInstruction": {
                    "parts": [{"text": "You are a helpful assistant."}]
                }
            }
        }
        await websocket.send(json.dumps(setup_message))
        print("Configuration sent")

        # 2. Read responses (send audio with send_audio_chunk from another task)
        await receive_loop(websocket)

async def main():
    await connect_and_configure()

if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- Live API is v1beta only. The first message must be `BidiGenerateContentSetup` (`setup`); audio is raw 16-bit PCM, 16 kHz, little-endian with `mimeType: "audio/pcm;rate=16000"`.
- The official snippet hardcodes the API key and handles `toolCall` with a `handle_tool_call` helper defined in the page's Handle tool calls section; this sample reads the key from `GEMINI_API_KEY` and omits the tool-call branch.
- The official websocket quickstart puts `responseModalities` directly under `setup`; per the BidiGenerateContentSetup reference it belongs in `generationConfig`, so the sample nests it there.
- Transcription fields are read only when `inputAudioTranscription` / `outputAudioTranscription` are set at the setup level (per the BidiGenerateContentSetup reference); the official snippet omits them.
- The sample wires `receive_loop` into the connection instead of the original's `sleep(3600)` placeholder; the three official snippets are merged into one script.
- With ephemeral tokens, connect to the `BidiGenerateContentConstrained` endpoint with an `access_token` query parameter instead of `key`.
- Model ID `gemini-3.8-live` is kept as written. For the SDK-based route see the official Live API SDK guide; comparable to Realtime API in openai-realtime-audio but a different protocol.
