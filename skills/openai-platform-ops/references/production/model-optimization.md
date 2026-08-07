# Model Optimization

Workflow for iteratively improving OpenAI model output quality using evals, prompt engineering, and (legacy) fine-tuning.

Evals and fine-tuning workflows covered here are moving into legacy documentation; see the deprecations page for current timelines.

## Workflow

1. Write evals that measure model output; establish a baseline.
2. Prompt the model, providing relevant context and instructions.
3. Optionally fine-tune a model for a specific task.
4. Run evals against realistic test data; measure prompt/fine-tuned performance.
5. Tweak the prompt or fine-tuning dataset based on eval feedback.
6. Repeat continuously.

## Prompt engineering practices

- **Include relevant context** — data the model needs beyond its training data (private DB content, up-to-the-minute info).
- **Provide clear instructions** — start with `gpt-5.6` for new work; tune reasoning effort/verbosity per the reasoning-model guidance.
- **Provide example outputs** — few-shot examples let the model extrapolate correct behavior.

## Fine-tuning methods

OpenAI is winding down the fine-tuning platform; no longer accessible to new users. Existing users can create training jobs for a limited period, and fine-tuned models remain available for inference until base models are deprecated.

| Method | How it works | Best for | Reasoning-only |
|--------|--------------|----------|-----------------|
| Supervised fine-tuning (SFT) | Train on example prompt/correct-response pairs | Classification, nuanced translation, fixed-format output, instruction-following fixes | No |
| Vision fine-tuning | SFT with image inputs | Image classification, complex instruction-following | No |
| Direct preference optimization (DPO) | Train on correct vs. incorrect response pairs | Summarization, tone/style-sensitive chat generation | No |
| Reinforcement fine-tuning (RFT) | Grade generated responses with an expert grader; reinforce high-scoring chain-of-thought | Complex domain reasoning (medical diagnosis, legal case relevance) | Yes |

## Fine-tuning process

1. Collect a training dataset.
2. Upload it to OpenAI as JSONL.
3. Create a fine-tuning job with the chosen method.
4. For RFT, define a grader to score model behavior.
5. Evaluate the results.

## Related

- [Cost optimization](./cost-optimization.md)
- [Latency optimization](./latency-optimization.md)
