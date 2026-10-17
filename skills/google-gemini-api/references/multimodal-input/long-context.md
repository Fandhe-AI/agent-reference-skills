---
source: https://ai.google.dev/gemini-api/docs/long-context
---

# Long context

Many Gemini models have context windows of 1 million or more tokens. The code used for text generation or multimodal inputs works unchanged with long context. The page is conceptual and contains no code examples; the verbatim facts below are quoted from it.

## Signature / Usage

What 1 million tokens looks like in practice (verbatim from the page):

```text
- 50,000 lines of code (with the standard 80 characters per line)
- All the text messages you have sent in the last 5 years
- 8 average length English novels
- Transcripts of over 200 average length podcast episodes
```

Prompt placement (FAQ): "In most cases, especially if the total context is long, the model's performance will be better if you put your query / question at the end of the prompt (after all the other context)."

To count tokens before sending a long prompt, see tokens.md (example adapted from tokens.md; the long-context page has no code):

```python
from google import genai

client = genai.Client()
prompt = "..."  # your long context + question

total_tokens = client.models.count_tokens(
    model="gemini-3.8-flash",
    contents=prompt
)
print("total_tokens:", total_tokens.total_tokens)
```

## Notes

- Context window sizes of specific models are on the Models page (models category).
- Use cases: long-form text (summarizing large corpuses, question answering, agentic workflows, many-shot in-context learning), long-form video (video Q&A, memory, captioning, recommendation, customization, content moderation, real-time processing), long-form audio (real-time transcription and translation, podcast / video Q&A, meeting transcription and summarization, voice assistants).
- Many-shot in-context learning: scaling from one or a few examples to hundreds, thousands or more can lead to novel capabilities and performance similar to fine-tuned models.
- Optimization: the primary optimization is context caching. The page states the input / output cost per request with Gemini Flash is "~4x less than the standard input / output cost" when cached content is reused; caching stores files on a per-hour basis.
- Limitations: needle-in-a-haystack retrieval is strong for a single needle (~99% on a single query) but accuracy varies when looking for multiple pieces of information; there is a trade-off between retrieval quality and input token cost per query.
- FAQ: adding tokens that are not needed is best avoided, but the model can extract information from large chunks (up to 99% accuracy in many cases); longer queries generally have higher latency (time to first token); to lower cost with a reusable context use context caching.
- API availability: model feature, not tied to one endpoint; the page links to the context caching guide. Docs fetched 2026-10-16.

## Related

- [tokens](./tokens.md)
- [video-understanding](./video-understanding.md)
- [files-api](./files-api.md)
