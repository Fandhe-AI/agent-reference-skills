<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/legal-summarization / last verified: 2026-08-07 -->

# Legal summarization

Guide to summarizing legal documents with Claude to extract key information and expedite legal research (contract review, litigation prep, regulatory work). See the [summarization cookbook](https://platform.claude.com/cookbook/capabilities-summarization-guide) for a worked example.

## Signature / Usage

```python
def summarize_document(text, details_to_extract, model="claude-opus-5", max_tokens=1000):
    details_to_extract_str = "\n".join(details_to_extract)
    prompt = f"""Summarize the following sublease agreement. Focus on these key aspects:

    {details_to_extract_str}

    Provide the summary in bullet points nested within the XML header for each section.
    If any information is not explicitly stated, note it as "Not specified". Do not preamble.

    Sublease agreement text:
    {text}
    """
    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system="You are a legal analyst specializing in real estate law.",
        messages=[{"role": "user", "content": prompt}],
    )
    return next(block.text for block in response.content if block.type == "text")
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| details_to_extract | list[str] | Fields to pull out, e.g. parties involved, term and rent, special provisions |
| model | str | `claude-opus-5` for high-accuracy summarization; `claude-haiku-4-5` to cut cost at scale |

## Notes

- Explicitly define `details_to_extract` — without direction Claude cannot know what to include, and there is no single correct summary.
- Evaluation metrics: ROUGE, BLEU, contextual embedding similarity, LLM-based grading, and human evaluation by legal experts.
- For documents exceeding the context window, use meta-summarization: chunk the document, summarize each chunk, then combine chunk summaries into a final summary.
- For large document collections, use summary-indexed documents (an advanced RAG variant) to rank documents for retrieval with less context than traditional RAG.
- Fine-tuning is currently only available through Amazon Bedrock.
- Deployment considerations: include AI-disclaimer notices to manage liability, support diverse input formats (PDF, Word, text), and parallelize API calls (see [rate limits](https://platform.claude.com/docs/en/api/rate-limits#rate-limits)) since long documents can take up to a minute per summary.

## Related

- [Overview](./overview.md)
- [Classification](./classification.md)
