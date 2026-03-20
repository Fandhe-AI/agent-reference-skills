# TypeDoc External Documents

Including external Markdown documents in TypeDoc output using the @document tag, projectDocuments option, YAML frontmatter, media handling, and relative link resolution.

## 詳細説明

TypeDoc can include external Markdown documents as part of the generated documentation. Documents can be added as children of reflections or as top-level project documents. There are three methods for including documents.

### Method 1: @document Tag

The `@document` tag can be placed in comments for most types to add child documents to reflections. The document path is relative to the file in which the comment appears.

```typescript
/**
 * @document documents/external-markdown.md
 */
export class MyClass {}
```

This makes `external-markdown.md` a child document of `MyClass` in the documentation navigation.

### Method 2: projectDocuments Option

For projects with multiple entry points where comments cannot be placed at the top level, use the `projectDocuments` option. This adds documents as children of the root of the generated documentation.

Configure in `typedoc.json`:

```json
{
  "projectDocuments": ["documents/*.md"]
}
```

- Supports glob patterns to match multiple files.
- Can be specified with multiple entries.
- TypeDoc's default sorting options will cause project documents to be re-ordered alphabetically.
- The `sortEntryPoints` option controls whether alphabetical reordering is applied.

### Method 3: YAML Frontmatter Children

Documents may include YAML frontmatter to specify child documents nested under the current document.

### YAML Frontmatter

Documents may include frontmatter delimited by `---` on separate lines. The following fields are supported:

| Field | Description |
|---|---|
| `title` | Document name displayed in sidebar navigation. If not specified, TypeDoc uses the filename. |
| `group` | Equivalent to the `@group` tag. Organizes the document into a named group in the index. |
| `category` | Equivalent to the `@category` tag. Organizes the document into a named category. |
| `children` | Array of paths to additional documents that should be nested under this document. |

Example frontmatter:

```yaml
---
title: External Markdown
group: Documents
category: Guides
children:
  - ./child.md
  - ./child2.md
---
```

### Link Resolution

TypeDoc detects and resolves links in external documents in three formats:

1. **Markdown links**: `[text](link)` syntax
2. **HTML anchor tags**: `<a href="...">` elements
3. **HTML image tags**: `<img src="...">` elements

Links are resolved relative to the document file's location. TypeDoc automatically updates the links to point to the correct location in the generated output.

### Declaration References in Documents

Documents support `{@link}` inline tags. These resolve as declaration references, allowing you to link to any documented symbol from within external documents:

```markdown
See the {@link MyClass} for more details.

The {@link MyClass.myMethod} method handles authentication.
```

### Media Handling

If a path in a Markdown link cannot be resolved to a part of the documentation (i.e., it points to a non-document file such as an image or other asset), TypeDoc will:

1. Copy the referenced file to a `media` folder in the generated documentation output.
2. Update the link to point to the copied file in the `media` folder.

This means you can reference images and other assets using relative paths in your Markdown documents, and TypeDoc will handle copying them to the correct location.

```markdown
![Architecture Diagram](./images/architecture.png)

See the [CSV data](./assets/sample.csv) for reference.
```

## コード例

### Basic External Document

Create `documents/guide.md`:

```markdown
---
title: Getting Started Guide
group: Guides
category: Introduction
---

# Getting Started

This guide covers the basics of using the library.

## Installation

Install via npm:

\`\`\`bash
npm install my-library
\`\`\`

## Usage

\`\`\`typescript
import { MyClass } from "my-library";

const instance = new MyClass();
\`\`\`

See the {@link MyClass} API reference for full details.
```

### Attaching to a Class

```typescript
/**
 * The main entry point for the library.
 *
 * @document ./docs/my-class-guide.md
 * @document ./docs/my-class-examples.md
 */
export class MyClass {
  // ...
}
```

### Project-Level Documents Configuration

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "projectDocuments": [
    "documents/overview.md",
    "documents/guides/*.md",
    "documents/tutorials/*.md"
  ]
}
```

### Nested Documents via Frontmatter

Parent document (`documents/guides.md`):

```markdown
---
title: Guides
children:
  - ./guides/authentication.md
  - ./guides/configuration.md
  - ./guides/deployment.md
---

# Guides

This section contains detailed guides for using the library.
```

Child document (`documents/guides/authentication.md`):

```markdown
---
title: Authentication Guide
group: Security
---

# Authentication

Detailed guide for setting up authentication.

See {@link AuthService} for the API reference.
```

### Documents with Media

```markdown
---
title: Architecture Overview
---

# Architecture

The following diagram shows the system architecture:

![Architecture](./images/architecture.png)

Download the [full specification](./assets/spec.pdf).
```

TypeDoc will copy `images/architecture.png` and `assets/spec.pdf` to the `media` folder in the output.

## 注意点

- Document paths in `@document` tags are relative to the file containing the comment, not the project root.
- Document paths in `projectDocuments` are relative to the TypeDoc configuration file (usually `typedoc.json`).
- Document paths in YAML `children` arrays are relative to the parent document's location.
- TypeDoc's default sorting causes project documents to be re-ordered alphabetically. Set `sortEntryPoints` to `false` to preserve the order specified in the configuration.
- YAML frontmatter must be delimited by `---` on separate lines at the very beginning of the file.
- If a `title` is not specified in frontmatter, TypeDoc derives the title from the filename.
- `{@link}` tags in external documents resolve using the same declaration reference rules as in code comments.
- Non-document files (images, PDFs, etc.) referenced in links are automatically copied to a `media` folder in the output. You do not need to manually copy assets.
- External documents are full Markdown files, not code comments, so you do not need the `/** */` wrapping.

## 関連

- [Doc Comments](./doc-comments.md)
- [Declaration References](./declaration-references.md)
- [JSDoc Support](./jsdoc-support.md)
- [Installation & CLI](../getting-started/installation.md)
