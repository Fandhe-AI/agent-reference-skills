# Validate Issue Reference

Require every commit to reference a project ticket by enforcing `references-empty` and a custom issue prefix.

```json
// package.json (commitlint field)
{
  "commitlint": {
    "rules": {
      "references-empty": [2, "never"]
    },
    "parserPreset": {
      "parserOpts": {
        "issuePrefixes": ["PROJ-"]
      }
    }
  }
}
```

A passing commit message:

```
feat(auth): add OAuth login PROJ-123
```

A failing commit message (no reference):

```
feat(auth): add OAuth login
# ✖   references may not be empty
```

## Notes

- `"references-empty": [2, "never"]` means "it must never be the case that references are empty" (i.e., at least one reference is required)
- `issuePrefixes` tells the parser which strings introduce an issue reference; adjust to match your tracker (e.g., `["#", "GH-", "JIRA-"]`)
- This can be combined with `@commitlint/config-conventional` in `extends` to keep type/scope rules alongside reference requirements
- Multiple prefixes are supported: `"issuePrefixes": ["PROJ-", "HOTFIX-"]`
