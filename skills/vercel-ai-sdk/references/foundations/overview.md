---
source: https://ai-sdk.dev/docs/foundations/overview
---

# Overview

Beginner-friendly introduction to the high-level AI concepts behind the AI SDK: generative AI, large language models, and embedding models.

## Signature / Usage

The AI SDK standardizes integrating AI models across supported providers. Text generation with a model (the site renders the model per selected provider):

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5.5',
  prompt: 'What is love?',
});
```

(The page itself shows an interactive provider switcher; this snippet is the equivalent form from Choosing a Provider.)

## Notes

- **Generative artificial intelligence**: models that predict and generate outputs (text, images, audio) based on what is statistically likely, learned from training data. Photo to caption, audio to transcription, text description to image.
- **Large language model (LLM)**: a subset of generative models focused on text. Takes a sequence of words as input and predicts the most likely sequence to follow; continues until a stopping criterion is met. LLMs may "hallucinate" on less known or absent information.
- **Embedding model**: converts complex data (words, images) into a dense vector (list of numbers), known as an embedding. Embedding models do not generate new text or data; they provide representations of semantic and syntactic relationships usable as input for other models or NLP tasks.

## Related

- [Providers and Models](./providers-and-models.md)
- [Choosing a Provider](./choosing-a-provider.md)
