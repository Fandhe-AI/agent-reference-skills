---
source: https://ai-sdk.dev/docs/ai-sdk-harnesses/skills
---

# Harness Skills

Skills are reusable instruction bundles (project conventions, workflow guidance, domain procedures) discoverable by the underlying harness runtime. Configure them for a `HarnessAgent` or replace them between completed turns.

## Signature / Usage

```ts
const agent = new HarnessAgent({
  harness: claudeCode,
  skills: [
    {
      name: 'careful-refactors',
      description: 'Make small, low-risk code changes.',
      content:
        'Prefer minimal diffs. Preserve public APIs. Before editing, read references/checklist.md and follow it.',
      files: [
        {
          path: 'references/checklist.md',
          content:
            '# Refactor checklist\n\n- Identify the smallest useful change.\n- Preserve public APIs.\n- Run the narrowest relevant test.',
        },
      ],
    },
  ],
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string | Stable identifier for the skill. |
| description | string | Short model-facing summary. |
| content | string | Full instruction content. |
| files | Array<{ path: string; content: string }> | Optional additional text files bundled with the skill. Skill-relative POSIX paths (e.g. `reference.md`, `references/codes.md`, `templates/config.json`); reference them from `content`. |

## Notes

- Stability: harness packages are experimental.
- Use skills for reusable instructions available on demand rather than always loaded like regular `instructions`; use `instructions` for broad agent behavior and current-session priorities.
- Skills can change between completed turns with `callOptionsSchema` and `prepareCall`. The Codex adapter starts a fresh native thread when skills change.
- Skills are adapter context with no AI SDK telemetry field, so they are not included in standard telemetry events.
- Distance: these are AI SDK `HarnessAgent` skill objects passed in code (the format follows agentskills.io). They are not the Skills API (see anthropic-api-tools-mcp) nor Claude Code Agent Skills `SKILL.md` files (see anthropic-claude-code-extend).

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness tools](./harness-tools.md)
- [Harness adapters](./harness-adapters.md)
