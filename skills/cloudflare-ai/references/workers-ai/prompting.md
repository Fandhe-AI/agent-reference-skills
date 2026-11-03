---
source: https://developers.cloudflare.com/workers-ai/features/prompting/
---

# Prompting

Prompt text generation models with scoped prompts (`messages` with roles) or unscoped prompts (`prompt`, optionally `raw`).

## Signature / Usage

Adapted (not in the official docs): the official snippets were bare object literals ending in `;` (not valid JavaScript); they are bound to `const` variables here.

```js
const scoped = {
  messages: [
    { role: "system", content: "you are a professional computer science assistant" },
    { role: "user", content: "what is WASM?" },
    { role: "assistant", content: "WASM (WebAssembly) is a binary instruction format that is designed to be a platform-agnostic" },
    { role: "user", content: "does Python compile to WASM?" },
    { role: "assistant", content: "No, Python does not directly compile to WebAssembly" },
    { role: "user", content: "what about Rust?" },
  ],
};

const unscoped = {
  prompt: "tell me a joke about cloudflare",
};
```

Adapted (not in the official docs): the official raw Mistral template contained a literal newline inside a double-quoted string; it is escaped as `\n`.

```js
const raw = {
  prompt: "<s>[INST]comedian[/INST]</s>\n[INST]tell me a joke about cloudflare[/INST]",
  raw: true,
};
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| messages | array of `{ role, content }` | — | Scoped prompt. Roles: `system` (personality/rules), `user` (the query), `assistant` (hints desired output format; not all models support it). |
| prompt | string | — | Unscoped prompt; converted to a default scoped prompt internally. |
| raw | boolean | — | Use with `prompt` to construct the model chat template manually. |

## Notes

- Scoped prompts are the recommended method: Workers AI applies each model's chat template.
- Use unscoped prompts for inference with LoRA (recommended in the source).
- Different LLMs are trained with different templates; check the model documentation (instruct models like Codellama respond to instructions, chat models expect dialog fragments).
- Role semantics follow the OpenAI messages-and-roles convention; the OpenAI API itself is covered by openai-api-core.

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
- [Prompt caching](./prompt-caching.md)
