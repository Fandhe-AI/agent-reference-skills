---
source: https://spec.editorconfig.org/#indentation-non-normative
---

# EditorConfig Indentation

How `indent_style`, `indent_size` and `tab_width` combine to determine the exact indentation of a line (non-normative section of the specification).

## Signature / Usage

```ini
root = true
[example_file.py]
indent_style = tab
indent_size = 4
tab_width = 3
```

`indent_size = 4` cannot be reached with 1 or 2 tabs when `tab_width = 3`, so new indented lines must be precisely indented with one tab and one space.

```ini
root = true
[another_file.py]
indent_style = tab
indent_size = 8
tab_width = 4
```

All indentation here can be achieved with tabs only, so spaces are not used at all.

```ini
root = true
[another_file.py]
indent_style = tab
indent_size = 4
tab_width = 8
```

`indent_size` may be less than `tab_width`. For the following Python code, the `if` line is indented with 4 spaces (a tab does not fit in 4 columns) and the `return` line with one tab (8 columns).

```python
def func():
    if True:
        return True
```

## Options / Props

| Name | Role in indentation |
|------|---------------------|
| `indent_size` | How many columns indent the next line relative to the previous one (where indentation applies) |
| `indent_style` | Which character to use whenever possible to achieve `indent_size`; `tab` means as many hard tabs as possible, the rest filled by spaces |
| `tab_width` | Number of columns a tab character represents |

## Notes

- The section is marked "(Non-Normative)"; the normative text is the `indent_style` row of Supported Pairs (see properties).
- This section exists in the specification's master (`f580513`, rendered by spec.editorconfig.org on 2026-11-14) but not in the `index.rst` of the latest tag v0.17.2 (`329077a`).
- Source: https://spec.editorconfig.org/#indentation-non-normative (fetched 2026-11-14, master `f580513`)
- Source: https://github.com/editorconfig/specification/blob/f58051318a657b52b73ff2d7774a66fa6c296bd8/index.rst (fetched 2026-11-14)

## Related

- [properties](./properties.md) — `indent_style` / `indent_size` / `tab_width` values
- [specification](./specification.md) — File format specification
