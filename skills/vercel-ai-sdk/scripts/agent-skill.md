---
source: https://ai-sdk.dev/docs/getting-started/coding-agents
---

# agent-skill

Commands to install the official AI SDK Agent Skill (`vercel/ai`) with `npx skills add`.

> **Warning**: `npx skills add` writes files into the agent's skills directory (for example `.claude/skills`, `.codex/skills`). Run it in an environment where you can review the result (a disposable sandbox or a committed working tree).

## Install the official AI SDK skill

```sh
npx skills add vercel/ai
```

When you select multiple agents, the CLI creates symlinks. Use `-a` to pick an agent directly (for example `-a amp` installs into the shared `.agents/skills`) and `-y` to run non-interactively.

## Migration skill for 6.x to 7.0

```sh
npx skills add vercel/ai --skill migrate-ai-sdk-v6-to-v7
```

After installing, give the agent this instruction (official wording):

```txt
Use the migrate-ai-sdk-v6-to-v7 skill and migrate my app from AI SDK v6 to v7.
```

## Notes

- The official skill is an Agent Skill (SKILL.md format) distributed by the `vercel/ai` repository. Its distribution path differs from the `vercel-ai-sdk` skill in this repository, which is distilled from the official docs.
- Agent Skills use progressive disclosure: only the name and description are loaded at startup, and the body is loaded when a task matches.
- For how Agent Skills (SKILL.md) work, see `anthropic-claude-code-extend`; for the Skills API, see `anthropic-api-tools-mcp`.
- For code migration with codemods, see `codemod.md`.
