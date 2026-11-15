---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/markdown-extensions
---

# Markdown extensions

Cloud Shell tutorials support Markdown extensions to expand the capability of the language. The page covers code block formatting.

## Signature / Usage

To create a code block in your tutorial, use backticks. Code blocks support syntax highlighting and have a button to copy the code to the clipboard.

````markdown
```
print("hello world")
```
````

Add a class name after the first set of backticks to change how a code block is displayed. For example, to syntax highlight as Python, add `py`:

Adapted (not in the official docs): the fetched source escapes this opening fence with backslashes (a conversion artifact); it is shown unescaped.

````markdown
```py
print("hello world")
```
````

## Options / Props

Classes that change how a code block is shown:

| Class | Effect |
| --- | --- |
| `LANGUAGE_CLASS_NAME` | Change the syntax highlighting to a specified supported language (table below). |
| `none` | Don't apply syntax highlighting to the code block. |
| `sh` | Format the code like terminal input. The code is prefixed by a `$`, and a button is shown on the block that copies the code to Cloud Shell when clicked. |
| `terminal` | Format the code like terminal output. Identical to the `none` style, except it has no copy buttons on the code block. |

Supported language styles for syntax highlighting:

| Language name | Class name |
| --- | --- |
| C# | `cs` |
| C variants | `c`, `cc`, `cpp`, `cxx`, `cyc`, `m` |
| Clojure | `clj` |
| Coffeescript | `coffee` |
| Command line | `bsh`, `csh`, `sh` |
| CSS | `css` |
| Go | `go` |
| Haskell | `hs` |
| Java | `java` |
| Javascript | `js` |
| JSON | `json` |
| Kotlin | `kotlin` |
| Lisp | `lisp` |
| Lua | `lua` |
| Markup | `default-markup`, `htm`, `html`, `mxml`, `xml`, `xsl` |
| OCaml, SML, F#, and similar languages | `fs`, `ml` |
| Perl | `perl`, `pl`, `pm` |
| Protocol buffers | `proto` |
| Python | `cv`, `py` |
| Ruby | `rb` |
| Scala | `scala` |
| SQL | `sql` |
| Swift | `swift` |
| VHDL '93 | `vhdl` |
| Visual Basic | `vb`, `vbs` |
| Wiki | `wiki` |
| YAML | `yaml` |

## Notes

- The fetched source renders the second example's opening fence with backslashes (`\`\`\`py`), a conversion artifact; inside a four-backtick fence a three-backtick line cannot close the outer fence, so the fence is shown as plain `` ```py ``.
- The source renders the `LANGUAGE_CLASS_NAME` placeholder in a `<var>` element; it is shown here in backticks.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/markdown-extensions (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [writing-tutorials.md](./writing-tutorials.md)
- [style-guide.md](./style-guide.md)
