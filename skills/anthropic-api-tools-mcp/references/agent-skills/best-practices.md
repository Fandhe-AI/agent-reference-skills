<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices / last verified: 2026-11-14 -->

# Skill authoring best practices

Guidance for writing effective, discoverable Agent Skills: conciseness, degrees of freedom, naming, descriptions, progressive disclosure, workflows/feedback loops, and evaluation.

## Signature / Usage

```markdown
---
name: pdf-processing
description: Extracts text and tables from PDF files, fills forms, and merges documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## Quick start
Extract text with pdfplumber: ...

## Advanced features
See [FORMS.md](FORMS.md), [REFERENCE.md](REFERENCE.md), [EXAMPLES.md](EXAMPLES.md)
```

## Options / Props

| Guideline | Detail |
| --- | --- |
| Conciseness | SKILL.md body under 500 lines; only add context Claude doesn't already have |
| Degrees of freedom | High (text instructions) / Medium (pseudocode+params) / Low (exact scripts) matched to task fragility |
| Naming | Gerund form preferred (`processing-pdfs`); lowercase/numbers/hyphens only; avoid vague names |
| `description` | Third person, specific triggers, both "what" and "when" |
| Progressive disclosure | Keep references one level deep from SKILL.md; ToC for files over 100 lines |
| MCP tool references | Use fully qualified `ServerName:tool_name` |

## Notes

- Anti-pattern: Windows-style backslash paths — always use forward slashes.
- Anti-pattern: offering too many library/approach options instead of one clear default.
- Build 3–5 evaluations before writing extensive documentation; test across Haiku/Sonnet/Opus.
- Scripts should "solve, don't defer" — handle errors explicitly, avoid unjustified "voodoo constants".
- Runtime limits: claude.ai can install packages from npm/PyPI and pull from GitHub; the Claude API has no network access and no runtime package installation, so list required packages in SKILL.md and check them against the code execution tool docs. Do not assume packages are installed: on surfaces that allow runtime installs, state `pip install ...` explicitly; on the Claude API, use only packages already available in the code execution container and say what to do when one is missing.
- Execution intent: write "Run `analyze_form.py` to extract fields" (execute) vs "See `analyze_form.py` for the extraction algorithm" (read).
- Source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices (fetched 2026-11-14)
- This page is for Claude API Agent Skills. Claude Code's Skills conventions live in `anthropic-claude-code-extend`.

## Related

- [overview.md](./overview.md)
- [enterprise.md](./enterprise.md)
