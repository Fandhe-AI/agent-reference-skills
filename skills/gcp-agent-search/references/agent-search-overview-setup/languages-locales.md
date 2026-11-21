---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/languages-locales
---

# Supported languages

Languages supported in Agent Search (formerly Vertex AI Search), with the level of support per feature: search features, answers and follow-ups, media search, healthcare search, the Ranking API and the Grounded generation API. Create a separate data store per language.

## Signature / Usage

### Create one data store per language (REST)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema (the twin for this page has no code block). Google recommends a separate data store for each language (for example one for English data and one for German data); each is created with `dataStores.create`. `DATA_STORE_ID` can contain only lowercase letters, digits, underscores, and hyphens; `INDUSTRY_VERTICAL` is `GENERIC` or `MEDIA`:

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-H "X-Goog-User-Project: PROJECT_ID" \
"https://discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/global/collections/default_collection/dataStores?dataStoreId=DATA_STORE_ID" \
-d '{
  "displayName": "DATA_STORE_DISPLAY_NAME",
  "industryVertical": "INDUSTRY_VERTICAL"
}'
```

## Options / Props

### Language support

| Language | Search features | Answers and follow-ups | Media search | Healthcare search | Ranking API | Grounded generation API |
|---|---|---|---|---|---|---|
| Afrikaans `(af-ZA)` | ✔ | ✔ | --- | --- | --- | --- |
| Albanian `(sq-AL)` | ✔ | ✔ | --- | --- | --- | --- |
| Arabic `(ar-001)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Armenian `(hy-AM)` | ✔ | ✔ | --- | --- | --- | --- |
| Assamese `(as-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Azerbaijani `(az-AZ)` | ✔ | ✔ | --- | --- | --- | --- |
| Bangla (Bengali India) `(bn-IN)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Basque `(eu-ES)` | ✔ | ✔ | --- | --- | --- | --- |
| Bulgarian `(bg-BG)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Burmese (Myanmar) `(my-MM)` | ✔ | ✔ | --- | --- | --- | --- |
| Catalan `(ca-ES)` | ✔ | ✔ | --- | --- | --- | --- |
| Chinese (Simplified, Mandarin) `(zh-CN)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Chinese (Traditional, Mandarin) `(zh-TW)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Croatian `(hr-HR)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Czech `(cs-CZ)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Danish `(da-DK)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Dutch `(nl-NL)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| English (American) `(en-US)` | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| English (British) `(en-GB)` | Close equivalent to `en-US` | --- | --- | --- | ✔ | --- |
| Estonian `(et-EE)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Filipino `(fil-PH)` | ✔ | ✔ | --- | --- | --- | --- |
| Finnish `(fi-FI)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| French (CA) `(fr-CA)` | ✔ | ✔ | --- | --- | --- | --- |
| French (European) `(fr-FR)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Georgian `(ka-GE)` | ✔ | ✔ | --- | --- | --- | --- |
| German `(de-DE)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Greek `(el-GR)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Gujarati `(gu-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Hebrew `(he-IL)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Hindi `(hi-IN)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Hungarian `(hu-HU)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Icelandic `(is-IS)` | ✔ | ✔ | --- | --- | --- | --- |
| Indonesian `(id-ID)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Italian `(it-IT)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Japanese `(ja-JP)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Kannada `(kn-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Kazakh `(kk-KZ)` | ✔ | ✔ | --- | --- | --- | --- |
| Korean `(ko-KR)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Latvian `(lv-LV)` | ✔ | ✔ | --- | --- | --- | --- |
| Lithuanian `(lt-LT)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Macedonian `(mk-MK)` | ✔ | ✔ | --- | --- | --- | --- |
| Malay `(ms-MY)` | ✔ | --- | --- | --- | --- | --- |
| Malayalam `(ml-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Marathi `(mr-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Nepali `(ne-NP)` | ✔ | ✔ | --- | --- | --- | --- |
| Norwegian (Bokmål) `(no-NO)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Odia `(or-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Persian `(fa-IR)` | ✔ | ✔ | --- | --- | --- | --- |
| Polish `(pl-PL)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Portuguese (Brazilian) `(pt-BR)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Portuguese (European) `(pt-PT)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Punjabi `(pa-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Romanian `(ro-RO)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Russian `(ru-RU)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Serbian (Cyrillic) `(sr-RS)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Sinhala `(si-LK)` | ✔ | ✔ | --- | --- | --- | --- |
| Slovak `(sk-SK)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Slovenian `(sl-SI)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Spanish (European) `(es-ES)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Spanish (Latin American) `(es-419)` | ✔ | ✔ | ✔ | --- | ✔ | ✔ |
| Swahili `(sw-TZ)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Swedish `(sv-SE)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Tamil `(ta-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Telugu `(te-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Thai `(th-TH)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Turkish `(tr-TR)` | ✔ | ✔ | --- | --- | ✔ | ✔ |
| Ukrainian `(uk-UA)` | ✔ | ✔ | --- | --- | --- | ✔ |
| Urdu `(ur-PK)` | ✔ | ✔ | --- | --- | --- | --- |
| Urdu `(ur-IN)` | ✔ | ✔ | --- | --- | --- | --- |
| Uzbek `(uz-UZ)` | ✔ | ✔ | --- | --- | --- | --- |
| Vietnamese `(vi-VN)` | ✔ | ✔ | --- | --- | --- | ✔ |

## Notes

- Search features include Search, Snippets, Extractive answers and Extractive segments.
- Google recommends creating separate data stores for each language: for example, don't ingest English and German data into one data store; create separate data stores for each.
- For evaluation purposes you can create data stores for documents in other languages, but only the languages listed above are officially supported.
- The Grounded Generation API column is informational: "Google isn't accepting new requests for the Grounded Generation API" (https://docs.cloud.google.com/generative-ai-app-builder/docs/grounded-gen, retrieved 2026-11-21); do not use it as a current API. Agent Search for healthcare is deprecated: "Agent Search for healthcare is deprecated and won't be available after May 15, 2027." (https://docs.cloud.google.com/generative-ai-app-builder/docs/prepare-data, retrieved 2026-11-21).
- The REST snippet is borrowed from the schema page because the source has no code; the request has no language field, and the source does not say how a data store's language is set.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/languages-locales (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/provide-schema (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-generic-search.md](./about-generic-search.md)
- [create-engine-es.md](./create-engine-es.md)
