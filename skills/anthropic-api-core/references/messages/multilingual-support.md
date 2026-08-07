<!-- source: https://platform.claude.com/docs/en/build-with-claude/multilingual-support / last verified: 2026-08-07 -->

# Multilingual support

Claude maintains strong cross-lingual performance relative to English across most world languages that use standard Unicode.

## Signature / Usage

```python
message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    system="Always respond in French, regardless of the language the user writes in.",
    messages=[{"role": "user", "content": "How do I reset my password?"}],
)
```

Set the response language explicitly in the `system` prompt (most reliable, stays stable across turns) rather than relying on inference. For runtime language selection, interpolate the user's choice into the system prompt. For translation, name both languages explicitly, e.g. "Translate the user's message from German to Korean. Respond with only the translation."

## Notes

- Zero-shot chain-of-thought performance relative to English (100%) on translated MMLU, e.g. (Sonnet 4.5 / Haiku 4.5 with extended thinking): Spanish 98.2%/96.4%, Portuguese(BR) 97.8%/96.1%, French 97.5%/95.7%, German 97.0%/94.3%, Arabic 97.2%/92.5%, Chinese(Simplified) 96.9%/94.2%, Japanese 96.8%/93.5%, Korean 96.7%/93.3%, Hindi 96.7%/92.4%, Bengali 95.4%/90.4%, Swahili 91.1%/78.3%, Yoruba 79.7%/52.7%. Claude supports many more languages beyond those benchmarked — test with use-case-relevant languages.
- Best practices: state input/output languages explicitly; prompt for "idiomatic speech as if a native speaker" for fluency; submit text in its native script (not transliteration); account for cultural/regional context beyond literal translation.

## Related

- [Working with messages](./working-with-messages.md)
