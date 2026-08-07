<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/legal-summarization / last verified: 2026-08-07 -->

# Long-document summarization prompt

Summarize a long legal document into a structured, section-by-section bullet summary with explicit fields to extract.

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


details_to_extract = [
    "Parties involved (sublessor, sublessee, original landlord)",
    "Term and rent (start/end date, monthly rent, deposit)",
    "Special provisions (subletting restrictions, maintenance responsibilities)",
]
summary = summarize_document(document_text, details_to_extract)
```

## Notes

- Explicitly define `details_to_extract` — without direction Claude cannot know what to include, and there is no single correct summary.
- For documents exceeding the context window, use meta-summarization: chunk the document, summarize each chunk, then combine chunk summaries into a final summary.
- For long inputs (20k+ tokens), put the document text above the instructions/query — this can improve response quality up to 30% on complex multidocument inputs.
- Evaluate summaries with ROUGE-L, contextual embedding similarity, LLM-based grading, or human review by subject-matter experts (see `eval-rubric-workflow.md`).
