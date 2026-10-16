# EditorConfig Properties

Keys (properties) defined by the EditorConfig specification v0.17.2 (Supported Pairs), plus `max_line_length` from the wiki's limited-support list.

## Signature / Usage

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
indent_size = unset
```

## Options / Props

Specification keys (Supported Pairs):

| Name | Supported values | Description |
|------|------------------|-------------|
| `indent_style` | `tab`, `space` | Use hard tabs or soft tabs respectively. Case insensitive. |
| `indent_size` | whole number, or `tab` | Number of columns per indentation level and width of soft tabs (when supported). If `tab`, the size is set to the tab size, which should be `tab_width` (if specified); else the tab size set by the editor. Case insensitive. |
| `tab_width` | whole number | Number of columns used to represent a tab character. Defaults to the value of `indent_size` and should not usually need to be specified. |
| `end_of_line` | `lf`, `cr`, `crlf` | How line breaks are represented. Case insensitive. |
| `charset` | `latin1`, `utf-8`, `utf-8-bom`, `utf-16be`, `utf-16le` | Character set. Use of `utf-8-bom` is discouraged. |
| `spelling_language` | `ss` or `ss-TT` | Natural language for spell checking. Only one language can be specified; no default value. `ss` is an ISO 639 two-letter language code, `TT` an ISO 3166 two-letter territory identifier (so the value is two or five characters long). |
| `trim_trailing_whitespace` | `true`, `false` | `true` removes all whitespace characters preceding newline characters in the file; `false` ensures it doesn't. |
| `insert_final_newline` | `true`, `false` | `true` ensures the file ends with a newline when saving; `false` ensures it doesn't. |
| `root` | `true` | Must be specified in the preamble. `true` stops the `.editorconfig` file search on the current file. Case insensitive. |

Limited support (wiki, not in the specification):

| Name | Possible values | Description |
|------|-----------------|-------------|
| `max_line_length` | positive integer, `unset` | Forces hard line wrapping after the given number of characters. `unset` turns the feature off (use the editor settings). Supported by Emacs, Vim, Neovim, Atom, ReSharper and Rider, AppCode, IntelliJ IDEA, PhpStorm, PyCharm, RubyMine, WebStorm, Kakoune, Prettier. |

## Notes

- `spelling_language` does not specify the charset; the charset is set by the separate `charset` property.
- `spelling_language` appears in the Supported Pairs of v0.16.0 and later (the v0.15.1 `index.rst` does not list it).
- With the exception of `root`, all pairs MUST be located under a section to take effect.
- For any pair, a value of `unset` removes the effect of that pair, even if it has been set before (e.g. `indent_size = unset` undefines `indent_size` and uses editor defaults).
- Pair keys are case insensitive; all keys are lowercased after parsing.
- Cores must accept keys and values with lengths up to and including 1024 and 4096 characters respectively.
- Cores shall accept and report all syntactically valid key-value pairs, even if the key is not defined in the specification. Plugins shall ignore unrecognized keys and invalid/unsupported values.
- Wiki note on `end_of_line`: to use native line endings between different operating systems, it is better not to set this option and leave that task to the VCS.
- The wiki's "Ideas for Domain-Specific Properties" (e.g. `quote_type`, `indent_brace_style`) are not intended to be implemented by EditorConfig.
- The wiki page itself notes that properties are now known as "declarations" and that the latest specification should be read instead.
- Sources: specification v0.17.2 https://spec.editorconfig.org/ (tag source https://github.com/editorconfig/specification/blob/v0.17.2/index.rst).
- Sources: limited-support properties and wiki notes https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties (fetched 2026-10-17).
- Sources: version comparison for `spelling_language` https://github.com/editorconfig/specification/blob/v0.16.0/index.rst and https://github.com/editorconfig/specification/blob/v0.15.1/index.rst.

## Related

- [specification](./specification.md) — File format specification
- [glob-patterns](./glob-patterns.md) — Glob pattern syntax for section names
- [best-practices](./best-practices.md) — Recommended usage practices
