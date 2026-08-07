<!-- source: https://platform.claude.com/docs/en/about-claude/glossary / last verified: 2026-08-07 -->

# Glossary

Brief summary of key LLM/AI terms; these concepts are not unique to Claude.

## Signature / Usage

- **Context window:** the amount of text a language model can look back on and reference when generating new text ("working memory"), distinct from the training corpus. A larger context window allows processing longer/more complex prompts; a smaller one limits handling of longer prompts or coherence over extended conversations.
- **Fine-tuning:** further training a pretrained model on additional data so it mimics that dataset's patterns/characteristics. Claude has already been fine-tuned to be a helpful assistant; the Claude API does not currently offer fine-tuning.
- **HHH (helpful, honest, harmless):** research framework informing how Claude is trained to be beneficial to society; distinct from the product tagline "AI assistant for life and work." Helpful = attempts the task with relevant/useful information; honest = accurate, doesn't hallucinate, acknowledges limitations; harmless = not offensive/discriminatory, politely refuses dangerous/unethical requests.
- **Latency:** time between submitting a prompt and receiving the generated output. Affected by model size, hardware, network conditions, and prompt/response complexity.
- **LLM:** large language models — AI models with many parameters trained on vast text data, capable of generating human-like text, answering questions, summarizing, etc. Claude is based on an LLM fine-tuned and trained using RLHF.
- **MCP (Model Context Protocol):** open protocol standardizing how applications provide context to LLMs — "a USB-C port for AI applications" — connecting AI models to data sources and tools in a unified way.
- **MCP connector:** feature letting API users connect to MCP servers directly from the Messages API without building an MCP client; supports tool calling; available in beta.
- **Pretraining:** initial training of language models on a large unlabeled text corpus, predicting the next word given prior context (autoregressive). Pretrained models are not inherently good at Q&A/instruction-following without prompt engineering; fine-tuning and RLHF refine them further.
- **RAG (Retrieval augmented generation):** combines information retrieval with generation to improve accuracy/relevance and ground responses in evidence. An external knowledge base/document set is retrieved at query time and passed into the context window (optionally via tool use and a retrieval function). Effectiveness depends on knowledge-base quality and retrieval relevance.
- **RLHF (Reinforcement Learning from Human Feedback):** trains a pretrained model to behave consistent with human preferences by ranking example texts and reinforcing outputs similar to higher-ranked ones. Claude was trained using RLHF.
- **Temperature:** controls randomness of predictions during generation. Higher = more creative/diverse outputs; lower = more conservative/deterministic. Even at temperature 0, results are not fully deterministic — identical inputs may produce different outputs across API calls, both for Anthropic's first-party inference and third-party cloud providers.
- **TTFT (Time to first token):** time to generate the first output token after receiving a prompt; important for interactive/real-time applications. Influenced by model size, hardware, network conditions, and prompt complexity.
- **Tokens:** smallest individual units a language model processes (words, subwords, characters, or bytes for Unicode). For Claude, a token approximately represents 3.5 English characters (varies by language). Tokenization choice affects performance, vocabulary size, and out-of-vocabulary handling.

## Related

- [Models overview](../models/overview.md)
- [Pricing](./pricing.md)
