# Custom voices

Create a unique voice from a short sample recording and use it for audio output in the Text to Speech API, the Realtime API, or Chat Completions with audio output.

## Signature / Usage

Creating a voice takes two uploads: a consent recording, then the voice sample that references the returned consent ID.

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

Use the voice in text to speech by passing `voice` as an object:

```bash
curl https://api.openai.com/v1/audio/speech \
  -X POST \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini-tts",
    "voice": {
      "id": "voice_123abc"
    },
    "input": "Maple est le meilleur golden retriever du monde entier.",
    "language": "fr",
    "format": "wav"
  }' \
  --output sample.wav
```

Use the voice in a Realtime session:

```javascript
const sessionConfig = JSON.stringify({
  session: {
    type: "realtime",
    model: "gpt-realtime-2",
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
| `/v1/audio/voice_consents` `name` | string | Name for the consent recording. |
| `/v1/audio/voice_consents` `language` | string | Language of the consent phrase (`de`, `en`, `es`, `fr`, `hi`, `id`, `it`, `ja`, `ko`, `nl`, `pl`, `pt`, `ru`, `uk`, `vi`, `zh`). |
| `/v1/audio/voice_consents` `recording` | file | Consent recording; must contain only one of the official consent phrases. Returns the consent recording ID. |
| `/v1/audio/voices` `name` | string | Name for the voice. |
| `/v1/audio/voices` `audio_sample` | file | Sample recording the model will replicate; must match the consent recording's speaker. |
| `/v1/audio/voices` `consent` | string | Consent recording ID (e.g. `cons_123abc`). |
| `voice` (speech / realtime) | object | `{ "id": "voice_123abc" }` selects the custom voice (named voices use strings). |

## Notes

- Custom voices are limited to eligible customers; contact OpenAI sales. Once enabled, a Voices tab appears under Audio in the platform dashboard. Voices must currently be created through an API request.
- Limits: at most 20 voices per organization; samples must be 30 seconds or less; allowed types are `mpeg`, `wav`, `ogg`, `aac`, `flac`, `webm`, `mp4`.
- Consent phrase must match exactly; any divergence from the script fails. English phrase: "I am the owner of this voice and I consent to OpenAI using this voice to create a synthetic voice model." Phrases for the other 15 languages are listed on the official page; `GET /v1/audio/consent_phrases` lists the currently supported phrases.
- One consent can be reused for multiple voice creations by the same voice actor.
- Quality tips: quiet space with minimal echo, professional XLR microphone, about 7-8 inches from the mic with a pop filter, consistent energy / style / accent. The model copies tone, cadence, energy, pauses, and habits exactly. Try multiple samples.
- GPT-Live: use a project-scoped API key approved for GPT-Live and custom voice creation. Reading consent phrases and using a custom voice require `api.voices.read`; creating consents and voices requires `api.voices.write` plus custom-voice API access. Use the same project for every request and keep the key on a trusted server.
- GPT-Live recordings: sample needs at least 5 seconds of actual speech and at least 15 transcribed text tokens (silence does not count); recommended 10-30 seconds of several complete sentences; each upload is limited to 10 MiB; the transcript is extracted by the service. Browser audio labeled `audio/webm;codecs=opus` is rejected, so upload with base MIME type `audio/webm` keeping the original bytes.
- GPT-Live session: pass the voice as an object in the initial session; `gpt-live-1` supports custom voices with English accents, specified in `session.instructions` (e.g. "Speak British English."):

  ```json
  {
    "model": "gpt-live-1",
    "instructions": "You are a helpful voice assistant. Speak British English.",
    "audio": { "output": { "voice": { "id": "voice_123" } } }
  }
  ```

  For WebRTC, the application server places this in the JSON `session` field alongside `transport`; for WebSockets, put it in the first `session.start` event.
- Choose the voice at session creation; start a new session to use a different voice. A deleted or revoked voice, a consent from another project, or missing custom-voice access can appear as a `404`. Malformed audio, a mismatched speaker, or a non-project-scoped key is rejected.
- Refer to the Text-to-Speech Supplemental Agreement for additional terms of use.

## Related

- [Text to speech](./text-to-speech.md)
- [Audio and speech (concepts)](./audio-and-speech.md)
