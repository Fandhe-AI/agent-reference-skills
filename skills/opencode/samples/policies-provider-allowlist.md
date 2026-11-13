---
source: https://opencode.ai/docs/policies/
---

# Policies: Provider Allowlist

Restrict OpenCode to one custom provider with `provider.use` policy statements.

Adapted (not in the official docs): the official example defines `company-ai` without `models`. A custom provider has no catalog models, so a `models` entry is added; replace `coder` and `modelID` with the models your gateway serves.

```jsonc
{
  "providers": {
    "company-ai": {
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "https://ai.company.example/v1" },
      "models": {
        "coder": { "name": "Company Coder", "modelID": "company-coder" },
      },
    },
  },
  "policies": [
    { "action": "provider.use", "resource": "*", "effect": "deny" },
    { "action": "provider.use", "resource": "company-ai", "effect": "allow" },
  ],
}
```

## Notes

- Adapted from the official docs: the `company-ai` example adds a `models` map, because a custom provider has no catalog models and denying every other provider would otherwise leave no usable model.
- The last matching statement wins; if nothing matches, the action is allowed.
- Policies only tighten; `allow` never grants access beyond what permissions allow.
- Managed and system policies outrank user and project files, the reverse of ordinary settings.
- Policies are separate from permissions, and distinct from Claude Code permission settings (anthropic-claude-code-admin).
