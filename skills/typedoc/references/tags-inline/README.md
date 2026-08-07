# tags-inline

| Name | Description | Path |
|------|-------------|------|
| @include / @includeCode | Inline tags that embed the content of an external file directly into a doc comment. `@include` inserts Markdown content verbatim; `@includeCode` inserts the file content as a fenced code block (with syntax highlighting based on the file extension). | [include.md](./include.md) |
| @inheritDoc | An inline tag that copies documentation from another reflection (symbol). Follows the TSDoc spec, under which only specific documentation elements are copied. | [inheritDoc.md](./inheritDoc.md) |
| @label | An inline tag that assigns a name to an overloaded function signature. The assigned name can then be referenced via a declaration reference. Conforms to the TSDoc spec (https://tsdoc.org/pages/tags/label/). | [label.md](./label.md) |
| @link / @linkcode / @linkplain | Inline tags that create a link to another reflection (symbol), a URL, or similar target. Follows the TSDoc spec. Three variants exist, differing in how the link text is rendered. | [link.md](./link.md) |
