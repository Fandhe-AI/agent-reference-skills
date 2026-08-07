<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise / last verified: 2026-08-07 -->

# Skills for enterprise

Governance guidance for deploying Agent Skills at enterprise scale: risk-tier assessment, review checklist, evaluation requirements, lifecycle management, and distribution/version control.

## Signature / Usage

```text
Skill lifecycle: Plan → Create and review → Test → Deploy → Monitor → Iterate or deprecate
```

## Options / Props

| Risk indicator | Concern level |
| --- | --- |
| Code execution (`*.py`, `*.sh`, `*.js` in Skill dir) | High |
| Instruction manipulation (bypass safety, hide actions) | High |
| MCP server references (`ServerName:tool_name`) | High |
| Network access patterns (URLs, `fetch`, `curl`) | High |
| Hardcoded credentials | High |
| Filesystem access scope beyond Skill directory | Medium |
| Tool invocations (bash, file ops) | Medium |

| Evaluation dimension | What it measures |
| --- | --- |
| Triggering accuracy | Activates for right queries, stays inactive for unrelated ones |
| Isolation behavior | Works correctly on its own |
| Coexistence | Doesn't degrade other Skills |
| Instruction following | Claude follows Skill instructions accurately |
| Output quality | Correct, useful results |

## Notes

- API requests support a maximum of 8 Skills per request; consolidate or route by task type if a role needs more.
- Custom Skills do not sync across surfaces (claude.ai / Claude API / Claude Code) — maintain Git as the source of truth and synchronize manually.
- Treat installing an unvetted Skill with the same rigor as installing production software.
- This is enterprise governance for Claude API Agent Skills; Claude Code Skills distribution/plugins are covered by `anthropic-claude-code-extend`.

## Related

- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
