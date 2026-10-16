<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart / last verified: 2026-10-17 -->
<!-- source: https://platform.claude.com/docs/en/api/skills/create / last verified: 2026-10-17 -->
<!-- source: https://platform.claude.com/docs/en/build-with-claude/skills-guide / last verified: 2026-10-17 -->

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
See FORMS.md, REFERENCE.md, EXAMPLES.md (bundled in the same skill directory)
```

```bash
# Upload the SKILL.md package
curl https://api.anthropic.com/v1/skills \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'files[]=@/path/to/file'
```

```python
import anthropic
from anthropic.lib import files_from_dir

client = anthropic.Anthropic()

# Upload the SKILL.md package (directory containing the pdf-processing SKILL.md above)
skill = client.skills.create(
    files=files_from_dir("pdf-processing"),
)
print(f"Created skill: {skill.id}")
print(f"Latest version: {skill.latest_version_id}")

# Use a pre-built Anthropic-managed Skill (pptx) from the Messages API
response = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=16000,
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

- The Skills API is out of beta: `POST /v1/skills` and Messages requests with `container.skills` need no `anthropic-beta` header. The old `skills-2025-10-02` header is not required; requests that still send it keep working and keep returning the beta response shapes.
- Upload via `POST /v1/skills` (multipart `files[]`; all files in one top-level directory with `SKILL.md` at its root; optional `display_name`) returns `{id, created_at, display_name, latest_version_id, source, type, updated_at}`; `source.type` is `"custom"` for user-created Skills.
- Using a Skill in a Messages request requires `container.skills[].skill_id` plus a `code_execution` tool variant in `tools` (Skills run inside its container); any current code execution tool version satisfies the requirement (e.g. `code_execution_20250825` also works).
- In the SDKs call `client.skills` rather than `client.beta.skills`; `client.beta.skills` without the header works only on SDK releases that no longer send it.
- `name` is lowercase/numbers/hyphens only (max 64 chars, cannot contain "anthropic"/"claude"); `description` is non-empty, max 1024 chars, no XML tags; keep SKILL.md body under 500 lines.
- This is the Claude API's Skills API/`container.skills` mechanism — distinct from Claude Code's own Skills (SKILL.md files discovered from `.claude/skills/`), which are covered by `anthropic-claude-code-extend`.
