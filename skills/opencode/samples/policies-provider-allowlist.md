---
source: https://opencode.ai/docs/policies/
---

# Policies: Provider Allowlist

Restrict OpenCode to one custom provider with `provider.use` policy statements.

```jsonc
{
  "providers": {
    "company-ai": {
      "package": "@opencode/ai/providers/openai-compatible",
      "settings": { "baseURL": "https://ai.company.example/v1" },
    },
  },
  "policies": [
    { "action": "provider.use", "resource": "*", "effect": "deny" },
    { "action": "provider.use", "resource": "company-ai", "effect": "allow" },
  ],
}
```

## Notes

- The last matching statement wins; if nothing matches, the action is allowed.
- Policies only tighten; `allow` never grants access beyond what permissions allow.
- Managed and system policies outrank user and project files, the reverse of ordinary settings.
- Policies are separate from permissions, and distinct from Claude Code permission settings (anthropic-claude-code-admin).
