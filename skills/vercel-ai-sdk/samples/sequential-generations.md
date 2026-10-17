---
source: https://ai-sdk.dev/docs/advanced/sequential-generations
---

# Sequential Generations (Chains)

Feed the output of one `generateText` call into the next to build a multi-step chain.

```typescript
import { generateText } from 'ai';
__PROVIDER_IMPORT__;

async function sequentialActions() {
  // Generate blog post ideas
  const ideasGeneration = await generateText({
    model: __MODEL__,
    prompt: 'Generate 10 ideas for a blog post about making spaghetti.',
  });

  console.log('Generated Ideas:\n', ideasGeneration);

  // Pick the best idea
  const bestIdeaGeneration = await generateText({
    model: __MODEL__,
    prompt: `Here are some blog post ideas about making spaghetti:
${ideasGeneration}

Pick the best idea from the list above and explain why it's the best.`,
  });

  console.log('\nBest Idea:\n', bestIdeaGeneration);

  // Generate an outline
  const outlineGeneration = await generateText({
    model: __MODEL__,
    prompt: `We've chosen the following blog post idea about making spaghetti:
${bestIdeaGeneration}

Create a detailed outline for a blog post based on this idea.`,
  });

  console.log('\nBlog Post Outline:\n', outlineGeneration);
}

sequentialActions().catch(console.error);
```

## Notes

- `__PROVIDER_IMPORT__` and `__MODEL__` are placeholders on the official page; replace them with your provider import and model.
- The official snippet interpolates the whole result object into the next prompt; `generateText` returns an object whose generated text is its `text` property (see `references/core/generate-text.md`), so use `ideasGeneration.text` when you want the plain string.
- For model-driven multi-step tool loops use `stopWhen` instead (`quickstart-nodejs.md`); the durable-workflow variant is in `references/workflow-harnesses/workflow-agent-guide.md`.
