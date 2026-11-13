---
source: https://opencode.ai/docs/build/plugins/server/#generate-experimental
---

# Generate (experimental)

Generate with a selected model without creating a session, invoking tools, or adding to session history.

## Signature / Usage

These APIs may change. `ctx.generate.text` still works but is deprecated in favor of `ctx.experimental.generate.text`.

```ts
const review = await ctx.experimental.generate.text({
  model: { providerID: "anthropic", id: "claude-sonnet-5-5" },
  prompt: "Review this proposed action.",
})

const { images } = await ctx.experimental.generate.image({
  model: { providerID: "openai", id: "gpt-image-1-mini" },
  prompt: "A watercolor fox in the snow",
  aspect: "16:9",
})

const { answers } = await ctx.experimental.generate.decisions({
  model: { providerID: "opencode", id: "jev-1.13" },
  input: [{ type: "text", text: "I was charged twice, please refund one." }],
  questions: [{ type: "predicate", name: "refund", instructions: "Is this a refund request?" }],
})
```

## Notes

- Experimental; shapes may change.
- Source inconsistency: the Permissions hook example in the official docs still calls the deprecated `ctx.generate.text`.
- Model IDs are transcribed as written in the official docs.

## Related

- [Session API](./session-api.md) (`ctx.session.generate` for transient session requests)
- [Permission hooks](./permission-hooks.md)
