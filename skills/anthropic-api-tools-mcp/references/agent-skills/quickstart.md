<!-- source: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart / last verified: 2026-10-16 -->

# Agent Skills quickstart (API)

Tutorial for using pre-built Agent Skills (PowerPoint, Excel, Word, PDF) with the Claude API in under 10 minutes: list Skills, create a document, download the generated file.

## Signature / Usage

```python
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
```

## Options / Props

| Field | Description |
| --- | --- |
| `container.skills[].type` | `"anthropic"` for pre-built, or a custom Skill reference |
| `container.skills[].skill_id` | `pptx`, `xlsx`, `docx`, or `pdf` |
| `container.skills[].version` | e.g. `"latest"` |
| `tools` | Must include a `code_execution` tool variant (Skills run inside its container) |
| `client.skills.list(source="anthropic")` | Lists Anthropic-managed Skills; each result has `id` and `display_name` |
| `client.files.download(file_id=...)` | Downloads a generated file via the Files API |

## Notes

- No beta header and no `betas` / `client.beta` are used for the Skills API or for Messages requests that load Skills; the Skills API is out of beta.
- The official quickstart (Step 3, verified 2026-10-16) downloads generated files with the non-beta Files API client (`client.files.download(file_id=...)` in Python, `client.files.download(fileId)` in TypeScript, `ant files download` in the CLI), and its cURL example calls `GET /v1/files/{file_id}/content` with only `x-api-key` and `anthropic-version`, without the `files-api-2025-04-14` beta header. Older pages that use `client.beta.files` describe the earlier beta shape.
- List Anthropic-managed Skills with `GET /v1/skills?source=anthropic`.
- Generated files appear in `bash_code_execution_tool_result` → `bash_code_execution_result` → `content[].file_id`; download via the Files API `GET /v1/files/{file_id}/content`.
- This is the Claude API side of Agent Skills. Claude Code's Skills are covered by `anthropic-claude-code-extend`; Agent SDK usage by `anthropic-agent-sdk`.

## Related

- [overview.md](./overview.md)
- [best-practices.md](./best-practices.md)
