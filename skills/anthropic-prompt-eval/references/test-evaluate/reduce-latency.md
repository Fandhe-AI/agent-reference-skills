<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency / last verified: 2026-08-07 -->

# Reducing latency

Reduce Claude's response latency by choosing a faster model like Claude Haiku 4.5, trimming prompt and output tokens, and streaming responses.

Latency is the time to process a prompt and generate output, influenced by model size, prompt complexity, and infrastructure. Engineer a prompt that works well without model/prompt constraints first, then apply latency reduction — reducing latency prematurely can hide what top performance looks like.

## How to measure latency

- **Baseline latency** — time to process the prompt and generate the response, independent of tokens/sec.
- **Time to first token (TTFT)** — time to the first response token, relevant when streaming.

## How to reduce latency

### 1. Choose the right model

Select the model matching speed/quality needs. **Claude Haiku 4.5** offers the fastest response times while maintaining high intelligence:

```python
message = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "Summarize this customer feedback in 2 sentences: [feedback text]"}],
)
```

### 2. Optimize prompt and output length

- Be clear but concise — Claude lacks context on your use case, so unclear instructions won't be filled in correctly by inference.
- Ask directly for shorter responses; because LLMs count tokens (not words), a paragraph/sentence-count limit is more effective than a word-count request.
- Set `max_tokens` as a hard output-length cap — note this is a blunt technique: the response is cut off (possibly mid-word) when the limit is reached, so it's best for multiple-choice/short-answer cases where the answer comes right at the start.
- Experiment with `temperature` — lower values (for example 0.2) can produce more focused, shorter responses; higher values (for example 0.8) more diverse but potentially longer ones.

### 3. Stream responses

[Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming) lets the model send output before the full response is complete, improving perceived responsiveness — process output as it arrives to update the UI or run other tasks in parallel.

## Notes

- `temperature`, `max_tokens`, and streaming event mechanics are anthropic-api-core parameter/API topics; this page covers the latency-reduction strategy.

## Related

- [reduce-hallucinations](./reduce-hallucinations.md)
