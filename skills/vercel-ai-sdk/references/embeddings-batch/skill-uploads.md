---
source: https://ai-sdk.dev/docs/ai-sdk-core/skill-uploads
---

# Skill Uploads

`uploadSkill` uploads custom skills to a provider and returns a `ProviderReference` that can be passed to subsequent inference calls. A skill is a bundle of files (e.g. a `SKILL.md` describing the skill's behavior) that providers can load, e.g. in sandboxed container environments.

## Signature / Usage

```ts
import { uploadSkill, generateText } from 'ai';
import {
  anthropic,
  type AnthropicLanguageModelOptions,
} from '@ai-sdk/anthropic';
import { readFileSync } from 'fs';

const { providerReference } = await uploadSkill({
  api: anthropic.skills(),
  files: [
    {
      path: 'my-skill/SKILL.md',
      content: readFileSync('./SKILL.md'),
    },
  ],
  displayTitle: 'My Skill',
});

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-6'),
  tools: {
    code_execution: anthropic.tools.codeExecution_20260120(),
  },
  prompt: 'Use the skill to complete the task.',
  providerOptions: {
    anthropic: {
      container: {
        skills: [{ type: 'custom', providerReference }],
      },
    } satisfies AnthropicLanguageModelOptions,
  },
});
```

Shorthand: pass a provider instance directly to `api` instead of calling `.skills()`:

```ts
const { providerReference } = await uploadSkill({
  api: anthropic, // shorthand for anthropic.skills()
  files: [{ path: 'my-skill/SKILL.md', content: readFileSync('./SKILL.md') }],
  displayTitle: 'My Skill',
});
```

### Skill files

A skill is composed of one or more files, each with a relative `path` and `content`. Content can be a `Uint8Array` (e.g. from `fs.readFileSync`) or a base64-encoded string:

```ts
const { providerReference } = await uploadSkill({
  api: openai.skills(),
  files: [
    {
      path: 'my-skill/SKILL.md',
      content: readFileSync('./SKILL.md'), // Uint8Array
    },
    {
      path: 'my-skill/helper.py',
      content: readFileSync('./helper.py'),
    },
  ],
});
```

### Upload result

`uploadSkill` returns an `UploadSkillResult`:

| Field | Type | Description |
| --- | --- | --- |
| `providerReference` | `ProviderReference` | Maps provider names to provider-specific skill IDs |
| `displayTitle` | `string?` | Human-readable title (if supported and provided) |
| `name` | `string?` | Name inferred by the provider from the skill files |
| `description` | `string?` | Description inferred by the provider from the skill files |
| `latestVersion` | `string?` | Latest version identifier assigned by the provider |
| `providerMetadata` | `object?` | Additional provider-specific metadata (e.g. timestamps) |
| `warnings` | `Warning[]` | Warnings for unsupported options (e.g. `displayTitle` on OpenAI) |

### Provider references

```ts
// Example ProviderReference
{
  anthropic: 'skill_abc123',
}
```

Pass the `providerReference` when referencing the skill during inference. Each provider looks up its own skill ID from the reference. If no entry exists for the current provider, an error is thrown.

### Multi-provider usage

Upload the skill to each provider and merge the references:

```ts
const [openaiUpload, anthropicUpload] = await Promise.all([
  uploadSkill({
    api: openai.skills(),
    files: [{ path: 'my-skill/SKILL.md', content: skillSource }],
  }),
  uploadSkill({
    api: anthropic.skills(),
    files: [{ path: 'my-skill/SKILL.md', content: skillSource }],
    displayTitle: 'My Skill',
  }),
]);

const mergedReference = {
  ...openaiUpload.providerReference,
  ...anthropicUpload.providerReference,
};

// mergedReference: { openai: 'sk_...', anthropic: 'sk_...' }
```

### Using skills in inference calls

How you attach a skill depends on the provider.

Anthropic: pass the `providerReference` inside the `container.skills` array in `providerOptions` (see the first example above).

OpenAI: pass the `providerReference` inside the `shell` tool's `environment.skills` array:

```ts
await generateText({
  model: openai.responses('gpt-6-astra'),
  tools: {
    shell: openai.tools.shell({
      environment: {
        type: 'containerAuto',
        skills: [{ type: 'skillReference', providerReference }],
      },
    }),
  },
  prompt: '...',
});
```

## Notes

### Supported providers

| Provider | Factory Method |
| --- | --- |
| Anthropic | `anthropic.skills()` |
| OpenAI | `openai.skills()` |

### General notes

- Distance from other skills: "skills" here are provider-side skill bundles uploaded through the AI SDK `uploadSkill` function and referenced by `ProviderReference`. For the Claude Skills API itself see anthropic-api-tools-mcp; for Agent Skills (`SKILL.md`) authored for Claude Code see anthropic-claude-code-extend. This page documents only the AI SDK upload and reference mechanism.

## Related

- [uploadSkill](./upload-skill.md)
- [File Uploads](./file-uploads.md)
