# External Documents

Include Markdown guides and tutorials alongside API reference in TypeDoc output.

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "projectDocuments": [
    "documents/overview.md",
    "documents/guides/*.md"
  ]
}
```

Attach a document to a specific class using `@document`:

```typescript
/**
 * The main entry point for the library.
 *
 * @document ./docs/getting-started.md
 * @document ./docs/advanced-usage.md
 */
export class MyLibrary {}
```

External Markdown document with YAML frontmatter (`documents/overview.md`):

```markdown
---
title: Overview
group: Documents
children:
  - ./guides/authentication.md
  - ./guides/configuration.md
---

# Overview

Welcome to the library. See {@link MyLibrary} for the main API.

![Architecture](./images/architecture.png)
```

## Notes

- Paths in `@document` are relative to the source file; paths in `projectDocuments` are relative to `typedoc.json`.
- `{@link}` tags inside Markdown documents resolve the same way as in code comments.
- Images and other non-document assets referenced in Markdown are automatically copied to a `media/` folder in the output.
- YAML frontmatter must start at the very first line of the file, delimited by `---`.
