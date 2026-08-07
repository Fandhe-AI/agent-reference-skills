# Skills (shell tool)

Agent Skills let you upload and reuse versioned bundles of files in hosted and local shell environments. A skill is a versioned bundle of files plus a `SKILL.md` manifest (front matter + instructions), compatible with the open Agent Skills standard. Attached via the `shell` tool's `environment.skills`.

## Signature / Usage

```json
{
  "model": "gpt-5.6",
  "tools": [
    {
      "type": "shell",
      "environment": {
        "type": "container_auto",
        "skills": [
          { "type": "skill_reference", "skill_id": "<skill_id>" },
          { "type": "skill_reference", "skill_id": "<skill_id>", "version": 2 }
        ]
      }
    }
  ],
  "input": "Use the skills to add 144 and 377, then compute triangle area with base 9 height 13."
}
```

```bash
# Create a skill (multipart directory upload)
curl -X POST 'https://api.openai.com/v1/skills' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F 'files[]=@./basic_math/SKILL.md;filename=basic_math/SKILL.md;type=text/markdown' \
  -F 'files[]=@./basic_math/calculate.py;filename=basic_math/calculate.py;type=text/plain'

# Create a skill (zip upload, max 50 MB)
curl -X POST 'https://api.openai.com/v1/skills' \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F 'files=@./basic_math.zip;type=application/zip'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `environment.type: "container_auto"` (hosted shell) | string | Enables `skill_reference` attachments for uploaded skills |
| `skill_reference.skill_id` | string | ID of an uploaded or curated skill (e.g. `openai-spreadsheets`) |
| `skill_reference.version` | integer \| `"latest"` | Version to mount; defaults to the skill's `default_version` |
| `environment.type: "local"` (local shell) | string | Uses local file paths instead of `skill_reference`; not interchangeable with hosted attachments |
| local `skills[].name` / `description` / `path` | string | Skill metadata and local folder path for local shell mode |
| `default_version` | integer | Version used when a `skill_reference` omits `version` |
| `latest_version` | integer | Tracks the newest uploaded version |
| inline skill `source.type: "base64"` | object | Inlines a zip bundle (base64) instead of creating a hosted skill, attached via a container's `skills` array |

## Limits and validation

- `SKILL.md` matching is case-insensitive; exactly one `skill.md`/`SKILL.md` file per bundle.
- Front matter validation follows the Agent Skills specification.
- Max zip upload size 50 MB, max 500 files per version, max 25 MB uncompressed file size.

## Notes

- Hosted shell (`container_auto`) and local shell do **not** accept the same skill attachment formats — hosted uses `skill_reference` (uploaded/curated, versioned), local uses inline `name`/`description`/`path` pointing at a runtime-controlled directory.
- Once mounted, the platform adds each skill's `name`, `description`, and `path` to user prompt context; the model decides whether to invoke it. For deterministic behavior, explicitly instruct the model to "use the `<skill name>` skill."
- Skill instructions load as **user prompt input**, not system prompt input.
- Treat skills as privileged, potentially untrusted code/instructions: don't expose an open skills catalog to end-users, gate write/high-impact actions behind approval, and review skill content before use (prompt injection / data exfiltration risk).
- Hosted skills follow the shell tool's container lifecycle — available while the container is active, discarded when it expires or is deleted; use local shell mode to keep execution entirely on infrastructure you manage.
- This is the shell tool's skill-attachment mechanism (`skill_reference`, `SKILL.md` bundles run inside a Responses API `shell` tool call) — distinct from the sandbox `Skills` capability on `SandboxAgent` (see this skill's `agents-sdk` scope), and unrelated to Claude Code's own Agent Skills used to build this repository, and to the ChatGPT-plugin "skills" workflow layer covered by the `openai-apps-sdk` skill.

## Related

- [Shell](./shell.md)
- [Local Shell](./local-shell.md)
