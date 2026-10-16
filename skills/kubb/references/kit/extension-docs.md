# Kit: Extension docs

An extension ships its docs in a `docs/` folder at the package root, next to `kubb-extension.json`. The registry reads the folder from the npm tarball of the pinned version, and kubb.dev renders it under `/extensions/<owner>/<slug>`.

## Signature / Usage

```text
docs/
  overview.md          -> /extensions/<owner>/<slug>   (required)
  options.md           -> /extensions/<owner>/<slug>/options
  guides/<id>.md       -> /extensions/<owner>/<slug>/guides/<id>
```

List `docs` in `files` in `package.json` so npm ships it.

| File | Page on kubb.dev | Required |
| --- | --- | --- |
| `docs/overview.md` | `/extensions/<owner>/<slug>`, also the summary in Studio | Yes |
| `docs/options.md` | `/extensions/<owner>/<slug>/options` | No |
| `docs/guides/<id>.md` | `/extensions/<owner>/<slug>/guides/<id>` | No |

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/kit/extension-docs （kubb@5.11.0 の docs/5.x/reference/kit/extension-docs.md）
- The registry ignores other files in `docs/`. It skips a file larger than 256 KiB and reports it.
- Start each file with a `#` title on its first line. The first paragraph after the title is the description (guide cards, search, meta description). Files have no frontmatter.
- Name each guide file in kebab case, such as `base-url.md`; the id is the file name without `.md`. Guides appear in file name order, at most 50. A guide without a title, a description, or a kebab-case id is not listed.
- Write plain Markdown with absolute `https://` URLs for links and images. A code fence can carry a title, such as ` ```typescript [kubb.config.ts] `.
- Rendered extras: callouts `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`; components `::code-group`, `::field-group` with `:::field`, `::steps`, `::code-collapse`, `::tabs` with `:::tabs-item`.
- Not rendered: raw HTML, `<!--@include-->` lines, twoslash code fences, other components. Validation reports each one before a version is approved.
- `overview.md` covers, in order: what the extension is and does (one or two short paragraphs); how it works, only when not obvious; the setup it needs (other plugins or peer packages); options worth explaining and known limits. Say so when the package runs an install script, uses the network, or touches files outside its output path.
- Use sentence case, plain language, and no em dashes. Leave out install commands, badges, a changelog, license text, and marketing. Validation fails for an overview that contains `kubb add`, `npm install`, `npm i`, `pnpm add`, or `yarn add`.

## Related

- [Manifest](./manifest.md)
- [Extensions](./extensions.md)
