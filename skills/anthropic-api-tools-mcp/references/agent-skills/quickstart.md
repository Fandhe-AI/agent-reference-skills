<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart / last verified: 2026-08-07 -->

# Agent Skills quickstart (API)

Tutorial for using pre-built Agent Skills (PowerPoint, Excel, Word, PDF) with the Claude API in under 10 minutes: list Skills, create a document, download the generated file.

## Signature / Usage

```python
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
```

## Options / Props

| Field | Description |
| --- | --- |
| `container.skills[].type` | `"anthropic"` for pre-built, or a custom Skill reference |
| `container.skills[].skill_id` | `pptx`, `xlsx`, `docx`, or `pdf` |
| `container.skills[].version` | e.g. `"latest"` |
| `tools` | Must include a `code_execution` tool variant (Skills run inside its container) |
| beta header | `skills-2025-10-02` (add `files-api-2025-04-14` when uploading/downloading via Files API) |

## Notes

- List Anthropic-managed Skills with `GET /v1/skills?source=anthropic` (beta header `skills-2025-10-02`).
- Generated files appear as `bash_code_execution_output` items inside `bash_code_execution_tool_result`; download via the Files API `GET /v1/files/{file_id}/content`.
- This is the Claude API side of Agent Skills. Claude Code's Skills are covered by `anthropic-claude-code-extend`; Agent SDK usage by `anthropic-agent-sdk`.

## Related

- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
