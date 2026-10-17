# Model selection

Guidance on choosing a model and reasoning effort for ChatGPT Work and Codex. Luna is the most efficient model; Astra is the state-of-the-art, most powerful model.

## Signature / Usage

Recommended model and reasoning-effort pairings, as listed on the page:

```text
1. Luna · Low                 Fine-grained edits, well-scoped problem-solving, and simple data extraction.
2. Luna · Extra high          Finding current context across multiple apps, prioritizing work, and solving problems with clear constraints.
3. GPT-6.1 Sol · Medium       Complex technical work and coordinated deliverables you expect to revise.
4. GPT-6.1 Sol · Extra high   Polished deliverables, connected visual systems, and decisions built from conflicting evidence.
5. Astra · Low                Concise writing and content adaptation that preserve facts and nuance.
6. Astra · Medium             Ambitious projects that need broad context, reliable interactions, and complete results.
7. Astra · Extra high         Demanding analysis and complex deliverables with exacting requirements.
```

## Notes

- If you don't need to think about usage or how long a task takes, you can default to Astra. To optimize usage, use the pairings above.
- Consider GPT-6.1 Sol for complex projects where cost matters (e.g. a board presentation from financial results, a website from a product brief); compare it with Astra on the same task to assess the quality/cost tradeoff.
- Availability, tools, reasoning settings, and usage limits differ by product and model version. See the models available in ChatGPT and the API model catalog (`https://developers.openai.com/api/docs/models`; GPT-6.1 Sol: `https://developers.openai.com/api/docs/models/gpt-6.1-sol`).
- The page also embeds an interactive model overview and a model recommender; their content is not present in the markdown source and is not reproduced here.
- Experiment: consider how often the workflow runs, how quickly you need the result, how the output will be used, and how important quality is. Compare results on the same inputs and keep the lightest setting that meets your quality bar.
- Source: https://learn.chatgpt.com/docs/model-selection (retrieved 2026-10).

## Related

- [Models](./models.md)
- [Codex CLI](./cli.md)
