<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill / last verified: 2026-08-07 -->

# Claude API skill

An open-source Agent Skill (`claude-api`) that gives Claude up-to-date reference material for building on the Messages API and Claude Managed Agents (beta), across eight languages. Bundled with Claude Code and available from the Anthropic skills repository.

## Signature / Usage

```text
/claude-api
/claude-api migrate this project to claude-opus-5
/claude-api managed-agents-onboard
```

```bash
npx skills add https://github.com/anthropics/skills --skill claude-api
```

## Options / Props

| Language | Messages API SDK | Tool runner | Managed Agents |
| --- | --- | --- | --- |
| Python / TypeScript / C# / Go / Java / PHP / Ruby | Yes | Yes (beta) | Yes (beta) |
| cURL | Yes | N/A | Yes (beta) |

## Notes

- Automatic activation: project imports an Anthropic SDK, or the user asks to build/debug/tune something with the Claude API, Anthropic SDK, or Managed Agents.
- `/claude-api migrate` performs Claude model migrations across a codebase (model ID swaps, breaking parameter changes, beta header cleanup, effort calibration, refusal fallback wiring).
- Managed Agents is available on the Claude API and Claude Platform on AWS only (not Bedrock, Google Cloud, or Microsoft Foundry); requires beta header `managed-agents-2026-04-01`.
- This is a Claude API skill for the Messages API / Managed Agents surfaces, distinct from Claude Code's bundled skills mechanism (`anthropic-claude-code-extend`).

## Related

- [overview.md](./overview.md)
- [quickstart.md](./quickstart.md)
