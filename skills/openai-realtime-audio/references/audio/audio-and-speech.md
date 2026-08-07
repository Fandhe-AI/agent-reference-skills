# Audio and speech (concepts)

Core vocabulary for OpenAI's audio APIs: the modalities an audio app combines, the four speech tasks, and when to use request-based APIs vs. Realtime sessions.

## Audio modalities

| Modality | Meaning | Common use cases |
|----------|---------|-------------------|
| Audio input | The model receives sound from a user or app. | Voice agents, transcription, translation. |
| Audio output | The model or API returns spoken audio. | Voice agents, text to speech, spoken responses. |
| Text transcript | Speech becomes text. | Captions, call analysis, search, records. |
| Text prompt | Text controls what the model says or does. | Speech generation, scripted voice flows, prompts. |

## Common speech tasks

- **Speech to text**: converts speech into text (captions, notes, transcripts, analytics, search, accessibility). Request-based for files or streaming for live audio.
- **Text to speech**: converts text into spoken audio (narration, assistants, accessibility, generated voice responses). Can stream audio as it is produced.
- **Speech to speech**: a model listens, reasons, and speaks in one low-latency session (conversational voice agents that respond, call tools, or maintain session state).
- **Speech translation**: listens to speech in one language and returns translated speech or transcript in another language.

## Request-based APIs vs. realtime sessions

| Architecture | Use when | Examples |
|--------------|----------|----------|
| Request-based audio APIs | You have a file, a text input, or a bounded request. | File transcription, text to speech. |
| Realtime sessions | Audio is live and the app needs low-latency events. | Voice agents, translation, transcription (see Realtime API scope). |
| Multimodal Chat Completions | You are extending an existing chat flow with audio. | Audio input/output via `modalities: ["text", "audio"]`. |

## Signature / Usage

Add audio input/output to an existing Chat Completions app with an audio-capable model (e.g. `gpt-audio-1.5`):

```javascript
import { writeFileSync } from "node:fs";
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.chat.completions.create({
  model: "gpt-audio-1.5",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [
    { role: "user", content: "Is a golden retriever a good family dog?" },
  ],
  store: true,
});

writeFileSync(
  "dog.wav",
  Buffer.from(response.choices[0].message.audio.data, "base64"),
);
```

Audio input uses the same endpoint with a `input_audio` content part:

```javascript
const response = await openai.chat.completions.create({
  model: "gpt-audio-1.5",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this recording?" },
        { type: "input_audio", input_audio: { data: base64str, format: "wav" } },
      ],
    },
  ],
});
```

## Notes

- The Responses API currently describes text and image inputs with text outputs only; for the audio-chat pattern above, use Chat Completions with an audio-capable model instead.
- For live browser speech-to-speech, use a Realtime session via the TypeScript Agents SDK (`RealtimeAgent` / `RealtimeSession`) — this is Realtime API scope, not covered here.
- Streaming requires a realtime connection and a session model that can emit partial events; request-based APIs are simpler for files/non-interactive work but don't support the same live interaction patterns.

## Related

- [File transcription](./file-transcription.md)
- [Text to speech](./text-to-speech.md)
- [Choosing a transcription workflow](./transcription-workflow.md)
