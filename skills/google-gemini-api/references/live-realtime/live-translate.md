---
source: https://ai.google.dev/gemini-api/docs/live-api/live-translate
---

# Live translation

Real-time, low-latency speech-to-speech translation between 70+ languages through the Live API using the `gemini-3.5-live-translate-preview` model.

## Signature / Usage

Python:

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client()

model = "gemini-3.5-live-translate-preview"
config = types.LiveConnectConfig(
    response_modalities=["AUDIO"],
    input_audio_transcription=types.AudioTranscriptionConfig(),
    output_audio_transcription=types.AudioTranscriptionConfig(),
    translation_config=types.TranslationConfig(
        target_language_code="pl",
        echo_target_language=True
    )
)

async def main():
    async with client.aio.live.connect(model=model, config=config) as session:
        print("Session started with translation")
        # Start receiving the translated audio stream
        async for response in session.receive():
            if response.server_content:
                if response.server_content.input_transcription:
                    print(f"Input transcript: {response.server_content.input_transcription.text}")
                if response.server_content.output_transcription:
                    print(f"Output transcript: {response.server_content.output_transcription.text}")
                if response.server_content.model_turn:
                    for part in response.server_content.model_turn.parts:
                        if part.inline_data:
                            audio_data = part.inline_data.data
                            # Play or process the translated audio chunk
                            print(f"Received audio chunk ({len(audio_data)} bytes)")
```

JavaScript:

```javascript
import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({});
const model = 'gemini-3.5-live-translate-preview';
const config = {
    responseModalities: [Modality.AUDIO],
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    translationConfig: {
        targetLanguageCode: 'pl',
        echoTargetLanguage: true
    }
};
```

WebSocket setup message:

```json
"setup": {
    "model": "models/gemini-3.5-live-translate-preview",
    "generationConfig": {
      "responseModalities": [
        "AUDIO"
      ],
      "translationConfig": {
        "targetLanguageCode": "pl",
        "echoTargetLanguage": true
      }
    },
    "inputAudioTranscription": {},
    "outputAudioTranscription": {}
}
```

Constrained ephemeral token for client-side use (REST):

```bash
curl -X POST "https://generativelanguage.googleapis.com/v1beta/auth_tokens" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "uses": 1,
    "expireTime": "YYYY-MM-DDTHH:MM:SSZ",
    "liveConnectConstraints": {
      "model": "models/gemini-3.5-live-translate-preview",
      "config": {
        "responseModalities": ["AUDIO"],
        "inputAudioTranscription": {},
        "outputAudioTranscription": {},
        "translationConfig": {
          "targetLanguageCode": "pl",
          "echoTargetLanguage": true
        }
      }
    }
  }'
```

## Options / Props

`translationConfig` (inside `generationConfig` at setup):

| Name | Type | Description |
|------|------|-------------|
| `targetLanguageCode` | string | BCP-47 language code to translate into (e.g., `"pl"`, `"es"`). Defaults to `"en"`. |
| `echoTargetLanguage` | boolean | If `true`, echoes (parrots) input audio already in the target language; if `false`, stays silent for such input. Defaults to `false`. |

Setup-level transcript fields (`setup.inputAudioTranscription` / `setup.outputAudioTranscription`):

| Name | Description |
|------|-------------|
| `inputAudioTranscription` | When present, enables text transcripts of the input audio |
| `outputAudioTranscription` | When present, enables text transcripts of the output (translated) audio |

Live Agent vs. Live Translation (from the source table): translation behaves as an interpreter with continuous stream processing; supports translation only (no tools or instructions); input is audio only; configuration is simplified (`target_language_code`, `echo_target_language`).

## Notes

- Audio: input raw 16-bit PCM at 16kHz (mono, little-endian); output raw 16-bit PCM at 24kHz (mono, little-endian); send audio in chunks of 100ms. Only audio input is supported; text input is not.
- Ephemeral tokens (v1beta): lock `translationConfig` in the token creation constraints by default; to let the client set it (e.g., user-chosen target language), omit it from the token request and set `"lock_additional_fields": []`.
- Limitations: voice replication can be inconsistent; language detection struggles with heavy accents, similar languages (e.g., Spanish vs. Portuguese), or rapid switches (only impacts the input transcript); not all background audio may be ignored; with `echoTargetLanguage: true` background noise or music may introduce artifacts.
- The page lists the supported languages with BCP-47 codes (e.g. `af`, `ja`, `zh-Hans`, `pt-BR`); see the official page for the full table.
- Availability: Live API is v1beta only.
- The guide's WebSocket example nests the transcription fields inside generationConfig; this page follows the API reference (BidiGenerateContentSetup), where they are top-level setup fields.

## Related

- [Live API capabilities guide](./capabilities.md)
- [Live transcription](./live-transcribe.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
