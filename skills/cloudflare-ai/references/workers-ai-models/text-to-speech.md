---
source: https://developers.cloudflare.com/workers-ai/models/aura-1/, https://developers.cloudflare.com/workers-ai/models/aura-2-en/, https://developers.cloudflare.com/workers-ai/models/aura-2-es/, https://developers.cloudflare.com/workers-ai/models/melotts/
---

# Text-to-Speech Models

Deepgram Aura and MyShell MeloTTS speech synthesis on Workers AI.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/aura-1/.

```ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
      const resp = await env.AI.run("@cf/deepgram/aura-1", {
        "text":"Hello World!"
      }, {
        returnRawResponse: true
      });

      return resp;
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/deepgram/aura-1` | Deepgram | Context-aware TTS; Batch, Partner, Real-time, Zero data retention | $0.015 per 1k characters |
| `@cf/deepgram/aura-2-en` | Deepgram | Context-aware TTS (English speakers); Batch, Partner, Real-time, Zero data retention | $0.03 per 1k characters |
| `@cf/deepgram/aura-2-es` | Deepgram | Context-aware TTS (Spanish speakers); Batch, Partner, Real-time, Zero data retention | $0.03 per 1k characters |
| `@cf/myshell-ai/melotts` | MyShell | High-quality multi-lingual TTS library; Zero data retention; Planned deprecation 2026-11-20 | $0.000205 per audio minute |

### Aura input parameters (aura-1, aura-2-en, aura-2-es)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | string | — | The text content to convert to speech. Required on aura-1; the aura-2 pages do not mark it required. |
| speaker | string | angus (aura-1), luna (aura-2-en), aquila (aura-2-es) | Speaker used to produce the audio; the enum differs per model (see Notes). |
| encoding | string | — | enum: linear16, flac, mulaw, alaw, mp3, opus, aac. |
| container | string | — | enum: none, wav, ogg. Available options depend on the encoding. |
| sample_rate | number | — | Output sample rate; supported values depend on the encoding, and for some encodings it is not configurable. |
| bit_rate | number | — | Bits per second; predefined ranges or specific values depending on the encoding. |

### MeloTTS input parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prompt | string | — | Required, minLength 1. A text description of the audio to generate (as worded in the source). |
| lang | string | en | The speech language (e.g. 'en' for English, 'fr' for French). |

Output: MeloTTS returns either an object (`application/json`) or a binary string with contentType `audio/mpeg` (the generated audio in MP3 format). Aura pages state the binding returns a `ReadableStream` with the audio in MPEG format.

## Notes

- Speaker enums as stated: aura-1 — angus, asteria, arcas, orion, orpheus, athena, luna, zeus, perseus, helios, hera, stella. aura-2-es — sirio, nestor, carina, celeste, alvaro, diana, aquila, selena, estrella, javier. aura-2-en — amalthea, andromeda, apollo, arcas, aries, asteria, athena, atlas, aurora, callista, cora, cordelia, delia, draco, electra, harmonia, helena, hera, hermes, hyperion, iris, janus, juno, jupiter, luna, mars, minerva, neptune, odysseus, ophelia, orion, orpheus, pandora, phoebe, pluto, saturn, thalia, theia, vesta, zeus.
- The aura-1 snippet returns the raw `Response` from `env.AI.run(..., { returnRawResponse: true })` directly.
- Only aura-1 has a usage example; aura-2 and MeloTTS pages show parameters only.
- Planned deprecation: `@cf/myshell-ai/melotts` is flagged for deprecation on 2026-11-20; after that date requests fail with HTTP `410` / error code `5028`. The announcement suggests `@cf/deepgram/aura-2-en` as the replacement. Source: https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/ (pin 34d908a / fetched 2026-11-14).
- The aura-1 page's text says the quality of the input text directly impacts the naturalness of the audio.

## Related

- [automatic-speech-recognition.md](./automatic-speech-recognition.md)
- [translation.md](./translation.md)
