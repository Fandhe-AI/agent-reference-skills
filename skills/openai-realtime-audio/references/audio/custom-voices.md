# Custom voices

Create a custom voice for your agent or application in one of two ways: from a text description (prompt-to-voice, GPT-Live only) or from a consent recording plus a short reference sample (usable with GPT-Live, the Text to Speech API, the Realtime API, or Chat Completions with audio output).

## Signature / Usage

Create a voice from a description (`type: "prompt"`, JSON request; no reference or consent recording needed):

```bash
curl --fail-with-body https://api.openai.com/v1/audio/voices \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "prompt",
    "name": "Support assistant",
    "prompt": "A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace.",
    "model": "auto"
  }' \
  -o voice.json
```

Response (metadata only, no audio or preview):

```json
{
  "object": "audio.voice",
  "id": "voice_123",
  "name": "Support assistant",
  "created_at": 0,
  "type": "prompt",
  "prompt": "A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace."
}
```

Use the returned ID in a GPT-Live session (include the original description in `instructions` for voice performance):

```json
{
  "model": "gpt-live-1",
  "instructions": "You are a helpful voice assistant. A calm, reassuring adult voice for a customer support assistant. Speak with an American English accent, a mid-range pitch, a smooth, warm tone, and a steady, conversational pace.",
  "audio": { "output": { "voice": { "id": "voice_123" } } }
}
```

Create a voice from a recording: a consent recording first, then the voice sample that references the returned consent ID.

```bash
curl https://api.openai.com/v1/audio/voice_consents \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=test_consent" \
  -F "language=en" \
  -F "recording=@$HOME/tmp/voice_consent/consent_recording.wav;type=audio/x-wav"
```

```bash
curl https://api.openai.com/v1/audio/voices \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "name=test_voice" \
  -F "audio_sample=@$HOME/tmp/voice_consent/audio_sample_recording.wav;type=audio/x-wav" \
  -F "consent=cons_123abc"
```

Use a voice from a recording in a Realtime session:

```typescript
const sessionConfig = JSON.stringify({
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1-mini",
    instructions: "Read the user's text aloud without adding commentary.",
    output_modalities: ["audio"],
    audio: {
      output: {
        voice: { id: "voice_123abc" },
      },
    },
  },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `/v1/audio/voices` `type` | string | `prompt` selects prompt-to-voice (JSON body). Omit for the recording flow (multipart form). |
| `/v1/audio/voices` `name` | string | Name for the voice. |
| `/v1/audio/voices` `prompt` | string | Prompt-to-voice only. Plain-language description of the vocal qualities (accent, age, presentation, pitch, timbre, texture, loudness, speech rate, distinctiveness). |
| `/v1/audio/voices` `model` | string | Prompt-to-voice only. `auto` in the official example. |
| `/v1/audio/voices` `script_hint` | string | Prompt-to-voice only; optional example script (up to 2,000 characters) that guides generation. Blank or too-short scripts are rejected. |
| `/v1/audio/voices` `audio_sample` | file | Recording flow only. Sample recording the model will replicate; must match the consent recording's speaker. |
| `/v1/audio/voices` `consent` | string | Recording flow only. Consent recording ID (e.g. `cons_123abc`). |
| `/v1/audio/voice_consents` `name` | string | Name for the consent recording. |
| `/v1/audio/voice_consents` `language` | string | Language of the consent phrase (`de`, `en`, `es`, `fr`, `hi`, `id`, `it`, `ja`, `ko`, `nl`, `pl`, `pt`, `ru`, `uk`, `vi`, `zh`). |
| `/v1/audio/voice_consents` `recording` | file | Consent recording; must contain only one of the official consent phrases. Returns the consent recording ID. |
| `voice` (realtime / live) | object | `{ "id": "voice_123abc" }` selects the custom voice (named voices use strings). |

## Notes

### Prompt-to-voice (from a description)

- Generally available to all API customers (Oct 16, 2026 changelog). Prompt-generated voices work with GPT-Live only; they are not supported by the Text to Speech, Realtime, or Chat Completions APIs. No reference or consent recording is needed.
- Create through the API or the voice Playground. Creating a prompt-generated voice is free; speech generated in GPT-Live (including listening in the Playground) is billed at regular GPT-Live session rates.
- Each successful request saves a new voice; up to 100 prompt-generated voices per organization (this includes voices your application creates for its customers). Keep the returned `id` and the original prompt, and reuse the voice in later sessions.
- Describe the qualities themselves in the prompt; they are words, not separate API parameters. Do not request imitation of a named person, public figure, or fictional character. Children's voices are not allowed; describe an adult voice.
- Keep conversation rules (answer length, interruptions, when to delegate) in the GPT-Live session instructions, not in the voice description. Change one quality at a time when refining; compare using the same short passage.
- Responsible use: do not impersonate others or violate the Usage Policies; tell listeners that speech is AI-generated and preserve provenance metadata or watermarks; voices are not guaranteed to be unique; the Service Terms apply.
- The official page describes `script_hint` but its curl example does not include it; the field name is taken from that description.
- Voice creation through `/v1/audio/voices` (including from recordings) is not compatible with Zero Data Retention. GPT-Live speech generations are eligible for Zero Data Retention when enabled; stored session recordings, recording downloads, and session forking are not available with it.
- For WebRTC, the application server places the session configuration in the JSON `session` field alongside `transport`; for WebSockets, put it in the first `session.start` event. Choose the voice at session creation; start a new session to try a different voice.

### Voices from recordings

- Limited to eligible customers; contact OpenAI sales. Once enabled, a Voices tab appears under Audio in the platform dashboard. Voices from recordings must be created through an API request.
- Limits: at most 20 voices from recordings per organization; samples must be 60 seconds or less; allowed types are `mpeg`, `wav`, `ogg`, `aac`, `flac`, `webm`, `mp4`.
- Consent phrase must match exactly; any divergence from the script fails. English phrase: "I am the owner of this voice and I consent to OpenAI using this voice to create a synthetic voice model." Phrases for the other 15 languages are listed on the official page; `GET /v1/audio/consent_phrases` lists the currently supported phrases.
- One consent can be reused for multiple voice creations by the same voice actor. A successful creation lists the voice under the Audio tab of the platform dashboard.
- Quality tips: quiet space with minimal echo, professional XLR microphone, about 7-8 inches from the mic with a pop filter, consistent energy / style / accent. The model copies tone, cadence, energy, pauses, and habits exactly. Try multiple samples.
- Realtime API: the official guide uses `gpt-realtime-2.1-mini`; set `session.audio.output.voice` to an object with the voice ID before the session's first audio response. For text-to-speech generation, add a user message containing the text, then send `response.create` with `output_modalities` set to `["audio"]`. Receive audio through the WebRTC audio track.
- GPT-Live: use a project-scoped API key approved for GPT-Live and custom voice creation. Reading consent phrases and using a custom voice require `api.voices.read`; creating consents and voices requires `api.voices.write` plus custom-voice API access. Use the same project for every request and keep the key on a trusted server.
- GPT-Live recordings: sample needs at least 5 seconds of actual speech and at least 15 transcribed text tokens (silence does not count); recommended 10-60 seconds of several complete sentences; each upload is limited to 10 MiB; the transcript is extracted by the service. Browser audio labeled `audio/webm;codecs=opus` is rejected, so upload with base MIME type `audio/webm` keeping the original bytes.
- GPT-Live session: pass the voice as an object in the initial session; `gpt-live-1` supports custom voices with English accents, specified in `session.instructions` (e.g. "Speak British English." or "Speak Irish English."):

  ```json
  {
    "model": "gpt-live-1",
    "instructions": "You are a helpful voice assistant. Speak British English.",
    "audio": { "output": { "voice": { "id": "voice_123" } } }
  }
  ```

- A deleted or revoked voice, a consent from another project, or missing custom-voice access can appear as a `404`. Malformed audio, a mismatched speaker, or a non-project-scoped key is rejected.
- Refer to the Text-to-Speech Supplemental Agreement for additional terms of use.
- Changed since the 2026-10-17 pin: the guide now leads with prompt-to-voice, raised the sample limit from 30 to 60 seconds and the GPT-Live recommended length from 10-30 to 10-60 seconds, uses `gpt-realtime-2.1-mini` in the Realtime example (previously `gpt-realtime-2`), and no longer includes the `/v1/audio/speech` custom-voice curl example (the guide still lists the Text to Speech API as a target for voices from recordings).
- Source: https://developers.openai.com/api/docs/guides/custom-voices (Markdown twin, fetched 2026-11-14)
- Source: https://developers.openai.com/api/docs/changelog (Oct 16, 2026 entry, fetched 2026-11-14)

## Related

- [Text to speech](./text-to-speech.md)
- [Audio and speech (concepts)](./audio-and-speech.md)
