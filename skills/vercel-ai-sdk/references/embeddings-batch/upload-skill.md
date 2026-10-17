---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/upload-skill
---

# uploadSkill

Uploads a skill (a bundle of files) to a provider and returns a result whose `providerReference` (a `ProviderReference`) can be used in subsequent inference calls.

## Signature / Usage

```ts
import { uploadSkill } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
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
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `api` | SkillsV4 \| ProviderV4 | — | The skills API interface to use for uploading. Can be a `SkillsV4` instance (e.g. `anthropic.skills()`) or a provider instance directly (e.g. `anthropic`), in which case `.skills()` is called automatically. |
| `files` | SkillsV4File[] | — | The files that make up the skill. Each file has a relative `path` and `content` (either a `Uint8Array` or a base64-encoded string). |
| `displayTitle` | string (Optional) | — | Human-readable title for the skill. |
| `providerOptions` | ProviderOptions (Optional) | — | Additional provider-specific options. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| `providerReference` | ProviderReference | A `Record<string, string>` mapping provider names to provider-specific skill identifiers. Pass this when referencing the skill in inference calls. |
| `displayTitle` | string (Optional) | Human-readable title returned by the provider (if supported). |
| `name` | string (Optional) | Skill name inferred by the provider from the uploaded files. |
| `description` | string (Optional) | Skill description inferred by the provider from the uploaded files. |
| `latestVersion` | string (Optional) | Latest version identifier assigned by the provider. |
| `providerMetadata` | ProviderMetadata (Optional) | Additional provider-specific metadata returned from the upload. |
| `warnings` | Warning[] | Warnings from the provider (e.g. unsupported settings). |

## Notes

- Distance from other skills: this is the AI SDK `uploadSkill` function, which uploads a bundle of files to a provider and returns a `ProviderReference`. For the Claude Skills API endpoints see anthropic-api-tools-mcp; for Agent Skills (`SKILL.md`) authored for Claude Code see anthropic-claude-code-extend.

## Related

- [Skill Uploads](./skill-uploads.md)
- [uploadFile](./upload-file.md)
