---
source: https://developers.cloudflare.com/workers-ai/platform/glossary/
---

# Glossary

Definitions of terms used across the Workers AI documentation.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/configuration/bindings/ (a minimal inference run):

```javascript
const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| AI models | term | — | A trained system that processes input data to generate predictions, decisions, or outputs based on learned patterns. |
| API Tokens | term | — | Authentication credentials used to access and manage Workers AI resources via the REST API. |
| Cloudflare Dashboard | term | — | Web interface to manage Workers AI services, including model deployment and monitoring. |
| Context Window | term | — | Sum of input, reasoning, and completion or response tokens a model supports; the limit is on each model page. |
| D1 | term | — | Cloudflare's managed, serverless database with SQLite's SQL semantics. |
| Environment Variables | term | — | Dynamic values used within Workers to manage configuration. |
| Fine-Tuning | term | — | Modifying an AI model by continuing to train it with additional data. |
| Function Calling | term | — | Using the model response to execute functions or interact with external APIs. |
| Inference | term | — | Using a trained model to make predictions or generate outputs from new data. |
| LoRA Adapters | term | — | Low-Rank Adaptation adapters that fine-tune models by adjusting a small number of parameters; public LoRA adapters are pre-trained and available for public use. |
| Maximum Tokens | term | — | The user-defined `max_tokens` property: the maximum number of tokens at which the model should stop responding; it cannot exceed the context window. |
| Model Catalog | term | — | Curated collection of AI models available within Workers AI. |
| Prompt Engineering | term | — | Designing and refining input prompts to elicit desired responses. |
| Prompt Templates | term | — | Predefined structures that guide the input provided to models. |
| REST API | term | — | HTTP API to interact with Workers AI services. |
| Serverless GPUs | term | — | GPUs provided by Cloudflare in a serverless environment for running models. |
| Worker Bindings | term | — | Configurations that connect Workers scripts to external resources such as AI models. |
| Workers AI | term | — | Cloudflare service that runs machine learning models on Cloudflare's global network using serverless GPUs. |
| Workers KV | term | — | Globally available key-value data storage. |
| Wrangler CLI | term | — | Command-line tool for building and deploying Workers. |

## Notes

- The source glossary links to some outdated paths (for example `/workers-ai/fine-tunes/` and `/workers-ai/guides/prompting/`); use the pages in this category instead.
- D1 and Workers KV are covered by cloudflare-storage; Wrangler CLI by cloudflare-wrangler.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
- [Function calling](./function-calling.md)
- [Prompting](./prompting.md)
- [REST API](./rest-api.md)
