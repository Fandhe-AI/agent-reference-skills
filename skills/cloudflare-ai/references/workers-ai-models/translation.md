---
source: https://developers.cloudflare.com/workers-ai/models/m2m100-1.2b/, https://developers.cloudflare.com/workers-ai/models/indictrans2-en-indic-1B/
---

# Translation Models

Multilingual machine translation on Workers AI. No summarization model is listed in this catalog.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/models/m2m100-1.2b/.

Adapted (not in the official docs): language codes (`en` / `fr`) instead of full names to match the parameter table, and `Response.json`; see Notes.

```ts
export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {

    const response = await env.AI.run(
      "@cf/meta/m2m100-1.2b",
      {
        text: "I'll have an order of the moule frites",
        source_lang: "en", // defaults to en
        target_lang: "fr",
      }
    );

    return Response.json(response);
  },
} satisfies ExportedHandler<Env>;
```

## Options / Props

### Models

| Model ID | Provider | Properties as stated | Unit pricing |
|----------|----------|----------------------|--------------|
| `@cf/meta/m2m100-1.2b` | Meta | Many-to-many multilingual encoder-decoder; Batch, Zero data retention | $0.342 per M input tokens, $0.342 per M output tokens |
| `@cf/ai4bharat/indictrans2-en-indic-1B` | ai4bharat | English to 22 scheduled Indic languages; Zero data retention | $0.342 per M input tokens, $0.342 per M output tokens |

### Input parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | string (m2m100: required, minLength 1) | — | The text to be translated. On indictrans2 the type is "one of" and required. |
| source_lang | string | en | m2m100. Source language code (e.g. 'en'). Defaults to 'en' if not specified. |
| target_lang | string | — | m2m100. Required. Language code to translate into (e.g. 'es'). |
| target_language | string | hin_Deva | indictrans2. Required. enum: asm_Beng, awa_Deva, ben_Beng, bho_Deva, brx_Deva, doi_Deva, eng_Latn, gom_Deva, gon_Deva, guj_Gujr, hin_Deva, hne_Deva, kan_Knda, kas_Arab, kas_Deva, kha_Latn, lus_Latn, mag_Deva, mai_Deva, mal_Mlym, mar_Deva, mni_Beng, mni_Mtei, npi_Deva, ory_Orya, pan_Guru, san_Deva, sat_Olck, snd_Arab, snd_Deva, tam_Taml, tel_Telu, urd_Arab, unr_Deva. |
| requests | array | — | m2m100 batch variant. Required. |
| request_id | string | — | m2m100. The async request id that can be used to obtain the results. |

Output: indictrans2 returns `translations` (array of translated texts).

## Notes

- Corrected from the official docs: the m2m100 page's example passes full language names (`"english"`, `"french"`) and wraps the result with `new Response(JSON.stringify(response))`, while its parameter descriptions call for language codes such as 'en' and 'es' (default 'en'). The snippet uses codes (`en`, `fr`) and `Response.json`.
- indictrans2 takes `target_language` (FLORES-style codes such as `hin_Deva`), not `source_lang` / `target_lang`.
- The m2m100 batch description reads "Batch of the embeddings requests to run using async-queue", as published.
- The indictrans2 description is spelled "Target langauge to translate to" in the source.

## Related

- [automatic-speech-recognition.md](./automatic-speech-recognition.md)
- [text-generation.md](./text-generation.md)
