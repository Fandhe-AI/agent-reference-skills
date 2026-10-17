---
source: https://ai.google.dev/gemini-api/docs/transcribe
---

# Audio transcription

The Gemini API converts speech in audio files into text using the Gemini 3.5 Transcribe model (`gemini-3.5-transcribe`): automatic language identification, speaker diarization, word-level timestamps, custom vocabulary hints, and a smart transcription mode with disfluency removal and smart formatting.

## Signature / Usage

Python:

```python
from google import genai

client = genai.Client()

audio_file = client.files.upload(file="path/to/sample.mp3")

interaction = client.interactions.create(
    model="gemini-3.5-transcribe",
    input=[
        {
            "type": "audio",
            "uri": audio_file.uri,
            "mime_type": audio_file.mime_type,
        }
    ],
)

print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const audioFile = await client.files.upload({
  file: "path/to/sample.mp3",
  config: { mimeType: "audio/mp3" },
});

const interaction = await client.interactions.create({
  model: "gemini-3.5-transcribe",
  input: [
    {
      type: "audio",
      uri: audioFile.uri,
      mime_type: audioFile.mimeType,
    },
  ],
});

console.log(interaction.output_text);
```

REST:

```bash
# First upload the file via the Files API, then pass its URI:
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-3.5-transcribe",
    "input": [
      {
        "type": "audio",
        "uri": "YOUR_FILE_URI",
        "mime_type": "audio/mp3"
      }
    ]
  }'
```

Language hints (Python):

```python
generation_config = {
    "transcription_config": {
        "language_codes": ["es-ES"],
    }
}
```

Custom vocabulary (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.5-transcribe",
    input=[
        {
            "type": "audio",
            "uri": audio_file.uri,
            "mime_type": audio_file.mime_type,
        }
    ],
    generation_config={
        "transcription_config": {
            "custom_vocabulary": ["Gemini", "Kubernetes", "BigQuery"],
        }
    },
)
```

Speaker diarization (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.5-transcribe",
    input=[
        {
            "type": "audio",
            "uri": audio_file.uri,
            "mime_type": audio_file.mime_type,
        }
    ],
    generation_config={
        "transcription_config": {
            "mode": {
                "type": "verbatim",
                "diarization_mode": "speaker",
            },
        }
    },
)
```

Word-level timestamps combined with diarization (Python config):

```python
generation_config = {
    "transcription_config": {
        "mode": {
            "type": "verbatim",
            "diarization_mode": "speaker",
            "timestamp_granularities": ["word"],
        },
    }
}
```

Smart transcription (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.5-transcribe",
    input=[
        {
            "type": "audio",
            "uri": audio_file.uri,
            "mime_type": audio_file.mime_type,
        }
    ],
    generation_config={
        "transcription_config": {
            "mode": "smart",
        }
    },
)
print(interaction.output_text)
```

Parsing word annotations (Python):

```python
def extract_word_annotations(interaction):
    words = []
    for step in getattr(interaction, "steps", []) or []:
        for content in getattr(step, "content", []) or []:
            for annotation in getattr(content, "annotations", []) or []:
                if getattr(annotation, "type", None) == "word_info":
                    words.append(annotation)
    return words

words = extract_word_annotations(interaction)

for w in words:
    speaker = f"[{w.speaker}] " if getattr(w, "speaker", None) else ""
    start = getattr(w, "start_offset", "")
    end = getattr(w, "end_offset", "")
    timing = f"({start} -> {end}) " if start and end else ""
    print(f"{speaker}{timing}{w.text}")
```

Response shape with word annotations (REST):

```json
{
  "id": "interactions/abc123xyz",
  "status": "completed",
  "steps": [
    {
      "id": "step_001",
      "type": "model_output",
      "content": [
        {
          "type": "text",
          "text": "Hello world",
          "annotations": [
            {
              "type": "word_info",
              "text": "Hello",
              "speaker": "spk_1",
              "start_offset": "0.100s",
              "end_offset": "0.450s"
            },
            {
              "type": "word_info",
              "text": "world",
              "speaker": "spk_1",
              "start_offset": "0.500s",
              "end_offset": "0.850s"
            }
          ]
        }
      ]
    }
  ]
}
```

## Options / Props

Set fields within `transcription_config` in `generation_config`:

| Field | Type | Description |
|-------|------|-------------|
| `language_codes` | Array of strings | BCP-47 language codes (e.g., `["en-US"]`). If omitted or empty (`[]`), the model automatically detects the language and handles code-switching. |
| `custom_vocabulary` | Array of strings | Up to 1,000 custom terms, acronyms, or proper names to bias speech recognition. Incompatible with speaker diarization and word-level timestamps. |
| `mode` | Object or String | Transcription mode configuration. Accepts `"smart"` or a verbatim mode object (`{"type": "verbatim", ...}`). Defaults to verbatim transcription. |
| `mode.type` | String | (Verbatim mode only) Mode identifier. Always set to `"verbatim"`. |
| `mode.timestamp_granularities` | Array of strings | (Verbatim mode only) Pass `["word"]` to enable word start and end offsets. Incompatible with custom vocabulary. |
| `mode.diarization_mode` | String | (Verbatim mode only) Pass `"speaker"` to identify and label distinct speakers. Incompatible with custom vocabulary. |

Transcription modes (verbatim vs smart):

| Spoken audio | `verbatim` output | `smart` output |
|---|---|---|
| "Um, so for the meeting, I think we should, uh, invite Alice and, wait no, Bob and Carol." | "Um so for the meeting I think we should uh invite Alice and wait no Bob and Carol." | "For the meeting, I think we should invite Bob and Carol." |
| "First item review budget second item finalize timeline third item send recap" | "first item review budget second item finalize timeline third item send recap" | "1. Review budget 2. Finalize timeline 3. Send recap" |

Supported languages: BCP-47 codes supported by Gemini 3.5 Transcribe (page lists 85+ locales):

```text
Afrikaans af-ZA; Amharic am-ET; Arabic (Egypt) ar-EG; Armenian hy-AM; Assamese as-IN; Azerbaijani az-AZ;
Belarusian be-BY; Bengali (Bangladesh) bn-BD; Bengali (India) bn-IN; Bosnian bs-BA; Bulgarian bg-BG;
Bulgarian (Aromanian) rup-BG; Burmese my-MM; Cantonese (Traditional) yue-Hant-HK; Catalan ca-ES; Cebuano ceb;
Central Khmer km-KH; Croatian hr-HR; Czech cs-CZ; Danish da-DK; Dutch nl-NL; English (Great Britain) en-GB;
English (India) en-IN; English (United States) en-US; Estonian et-EE; Farsi fa-IR; Filipino fil-PH; Finnish fi-FI;
French fr-FR; Galician gl-ES; Georgian ka-GE; German de-DE; Greek el-GR; Gujarati gu-IN; Hausa ha-NG;
Hebrew he-IL; Hindi hi-IN; Hungarian hu-HU; Icelandic is-IS; Indian English en-IN; Indonesian id-ID; Italian it-IT;
Japanese ja-JP; Javanese jv-ID; Kabuverdianu kea-CV; Kannada kn-IN; Kazakh kk-KZ; Korean ko-KR; Kyrgyz ky-KG;
Latvian lv-LV; Lingala ln-CD; Lithuanian lt-LT; Macedonian mk-MK; Malay ms-MY; Malayalam ml-IN; Maltese mt-MT;
Mandarin Chinese (Simplified) cmn-Hans-CN; Marathi mr-IN; Mongolian mn-MN; Nepali ne-NP; Norwegian nb-NO;
Oriya or-IN; Polish pl-PL; Portuguese (Brazil) pt-BR; Portuguese (Portugal) pt-PT; Punjabi pa-IN;
Punjabi (Gurmukhi script) pa-Guru-IN; Romanian ro-RO; Russian ru-RU; Serbian sr-RS; Sindhi (Arabic script) sd-Arab-IN;
Slovak sk-SK; Slovenian sl-SI; Spanish (Latin America) es-419; Spanish (United States) es-US; Swahili (Kenya) sw-KE;
Swedish sv-SE; Tajik tg-TJ; Telugu te-IN; Thai th-TH; Turkish tr-TR; Ukrainian uk-UA; Uzbek uz-UZ; Vietnamese vi-VN
```

## Notes

- The source JS upload example passes `mime_type` in the upload config; the JS SDK field is `mimeType` (as in the Files API reference), so it is used here.
- Custom vocabulary: you cannot combine `custom_vocabulary` with speaker diarization or word-level timestamps; the API rejects such requests. Best results are typically achieved with up to 100 terms.
- Smart transcription (`"smart"`) is incompatible with `timestamp_granularities` and `diarization_mode`; use `mode` with `{"type": "verbatim", ...}` for those.
- Diarization: tags segments like `spk_1` / `spk_2`; up to 8 speakers (attribution for 3 or more speakers is experimental). Enabling word-level timestamps may degrade overall transcription accuracy.
- Limits: standard unary requests support audio up to 1 hour; processing is limited to 30 minutes when speaker diarization or word-level timestamps are enabled.
- Supported audio MIME types: `audio/wav`, `audio/mp3`, `audio/aiff`, `audio/aac`, `audio/ogg`, `audio/flac`, `audio/mpeg`, `audio/m4a`, `audio/l16`, `audio/opus`, `audio/alaw`, `audio/mulaw`, `audio/webm`.
- Best practices: provide clean audio; give language hints when known; keep custom vocabulary to distinct domain terms; upload with `client.files.upload` for files longer than a few seconds.
- Real-time streaming speech recognition uses the Live API with `gemini-3.5-transcribe-live` (see the live-realtime category, live-transcribe).
- Page also has Go examples; not reproduced here.
- API availability: Interactions API (`generation_config.transcription_config`). Docs fetched 2026-10-16.
- Distinct from OpenAI speech-to-text / Realtime audio (openai-realtime-audio skill).

## Related

- [audio-understanding](./audio-understanding.md)
- [files-api](./files-api.md)
