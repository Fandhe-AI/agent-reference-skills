<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/skills/create / last verified: 2026-08-07 -->

# Agent Skills: Package, Upload, and Use via the API

Author a SKILL.md package, upload it with the Skills API, then reference it from a Messages API request via `container.skills` alongside the code execution tool.

```yaml
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## Quick start
Extract text with pdfplumber: ...

## Advanced features
See [FORMS.md](FORMS.md), [REFERENCE.md](REFERENCE.md), [EXAMPLES.md](EXAMPLES.md)
```

```bash
# Upload the SKILL.md package (beta)
curl https://api.anthropic.com/v1/skills \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: skills-2025-10-02' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F files='["Example data"]'
```

```python
# Use a pre-built Anthropic-managed Skill (pptx) from the Messages API
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=16000,
    betas=["skills-2025-10-02"],
    container={
        "skills": [{"type": "anthropic", "skill_id": "pptx", "version": "latest"}]
    },
    messages=[
        {"role": "user", "content": "Create a presentation about renewable energy with 5 slides"}
    ],
    tools=[{"type": "code_execution_20260521", "name": "code_execution"}],
)

print(f"stop_reason={response.stop_reason}, blocks={len(response.content)}")
```

## Notes

- Uploading via `POST /v1/skills` requires the `skills-2025-10-02` beta header and returns `{id, display_title, latest_version, source, type, updated_at}`; `source` is `"custom"` for user-created Skills.
- Using a Skill in a Messages API request requires `container.skills[].skill_id` plus a `code_execution` tool variant in `tools` (Skills run inside its container) and the same `skills-2025-10-02` beta header.
- List pre-built Anthropic-managed Skills with `GET /v1/skills?source=anthropic`; the four built-in ones are `pptx`, `xlsx`, `docx`, `pdf`.
- `name` is lowercase/numbers/hyphens only (max 64 chars, cannot contain "anthropic"/"claude"); `description` is non-empty, max 1024 chars, no XML tags; keep SKILL.md body under 500 lines.
- This is the Claude API's Skills API/`container.skills` mechanism — distinct from Claude Code's own Skills (SKILL.md files discovered from `.claude/skills/`), which are covered by `anthropic-claude-code-extend`.
