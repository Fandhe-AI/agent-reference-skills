# Key Concepts

Foundational concepts needed before using the OpenAI API: text generation models, embeddings, and tokens.

## Text generation models

OpenAI's text generation models (generative pre-trained transformers, "GPT" models), such as `gpt-5.6-sol` and `gpt-5.6-terra`, are trained to understand natural and formal language and produce text output in response to input ("prompts"). Designing a prompt is how you "program" a model — typically by providing instructions or examples of how to complete a task. GPT models are used for content/code generation, summarization, conversation, creative writing, and more.

## Embeddings

An embedding is a vector representation of a piece of data (e.g. text) that preserves aspects of its content or meaning. Data chunks that are similar tend to have embeddings closer together than unrelated data. OpenAI's text embedding models take a text string as input and produce an embedding vector as output. Embeddings are useful for search, clustering, recommendations, anomaly detection, and classification.

## Tokens

Text generation and embeddings models process text in chunks called tokens — commonly occurring sequences of characters. For example, " tokenization" decomposes into " token" and "ization", while common short words like " the" are a single token. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words of English text.

## Notes

- OpenAI does not train models on inputs/outputs sent through the API (see the API data privacy page).
- For a text generation model, prompt + generated output combined must not exceed the model's maximum context length. For embeddings models, the input alone must be shorter than the model's maximum context length.
- Use the tokenizer tool (platform.openai.com/tokenizer) to inspect how specific strings are tokenized.

## Related

- [Models](./models.md)
- [Developer Quickstart](./quickstart.md)
