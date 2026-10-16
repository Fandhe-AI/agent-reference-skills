---
source: https://ui.shadcn.com/docs/components/base/code-block
---

# Code Block

Displays code, terminal output and diffs with an optional header, line numbers and a copy button. Syntax highlighting is optional and lives in a separate hook (`useHighlightedCode`).

## Signature / Usage

```bash
npx shadcn@latest add code-block
```

Manual install: `npm install shiki`, then `npx shadcn@latest add button`, then copy `components/ui/code-block.tsx`, `hooks/use-highlighted-code.ts` and `lib/highlighter.tsx` into your project and update the import paths. `code-block` also installs `useHighlightedCode`.

```tsx
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
```

```tsx
<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>Terminal</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={output} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent>{output}</CodeBlockContent>
</CodeBlock>
```

Composition:

```text
CodeBlock
├── CodeBlockHeader
│   ├── CodeBlockTitle
│   └── CodeBlockActions
│       └── CodeBlockCopyButton
├── CodeBlockActions (floating, when there is no header)
├── CodeBlockContent
│   └── CodeBlockLine
└── CodeBlockFooter
```

`CodeBlockContent` takes a string or a list of `CodeBlockLine`. Use lines when you need line variants or highlighted tokens.

Syntax highlighting:

```tsx
const lines = useHighlightedCode(code, "json")

<CodeBlock>
  <CodeBlockContent>
    {lines.map((line, index) => (
      <CodeBlockLine key={index}>{line}</CodeBlockLine>
    ))}
  </CodeBlockContent>
</CodeBlock>
```

## Options / Props

### CodeBlock

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "destructive"` | `"default"` | The tone of the block. |
| `size` | `"default" \| "sm"` | `"default"` | `"sm"` has tighter padding and `text-xs` code, for tool output. |
| `className` | `string` | - | Additional classes to apply to the block. |

### CodeBlockContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | - | A string, or a list of `CodeBlockLine`. |
| `wrap` | `boolean` | `false` | Wrap long lines instead of scrolling. |
| `lineNumbers` | `boolean` | `false` | Number each line. A string child is split into lines. |
| `startLine` | `number` | `1` | The number of the first line, when `lineNumbers` is set. |
| `tabIndex` | `number` | `0` | Makes the content focusable so it can be scrolled by keyboard. |
| `className` | `string` | - | Additional classes to apply to the content, such as `max-h-72`. |

### CodeBlockLine

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "added" \| "removed" \| "highlighted"` | `"default"` | The state of the line. |
| `className` | `string` | - | Additional classes to apply to the line. |

### CodeBlockCopyButton

A ghost icon button that copies `value` to the clipboard. Accepts the props of `Button`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | - | Required. The text to copy. |
| `className` | `string` | - | Additional classes to apply to the button. |

### CodeBlockHeader, CodeBlockTitle, CodeBlockActions, CodeBlockFooter

Each accepts only `className` (`string`). `CodeBlockTitle` is a filename or label with an optional icon and truncates. `CodeBlockActions` as a direct child of `CodeBlock` floats at the top end. `CodeBlockFooter` is a row below the content, such as for a Show More button.

### useHighlightedCode

```tsx
const lines = useHighlightedCode(code, language)
```

Returns one React node per line. It returns plain lines until the first pass finishes, and for a language that is not in the list.

| Argument | Type | Description |
| --- | --- | --- |
| `code` | `string` | The code to highlight. A trailing newline is ignored. |
| `language` | `string` | A language or alias from `lib/highlighter.tsx`, or `"ansi"`. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Highlighting uses Shiki's JavaScript regex engine (no WASM) and loads each language on first use. The shipped list: `bash`, `css`, `diff`, `html`, `javascript`, `json`, `jsx`, `markdown`, `python`, `sql`, `tsx`, `typescript`, `yaml`, plus aliases such as `ts`, `js`, `sh`, `yml`. Edit the list in `lib/highlighter.tsx`; a language not in the list renders as plain text.
- Pass `"ansi"` as the language to render colors in terminal output; ANSI colors do not carry from one line to the next. On the server, `highlightCode` from `@/lib/highlighter` is async and keeps Shiki out of the client bundle.
- While code streams, the hook tokenizes only new lines; a string child renders as one text node, so plain output stays cheap.
- Selections skip line numbers and diff markers. Content is always `dir="ltr"`; the header follows the page direction.
- Floating actions show on hover and focus, and always on touch screens. `CodeBlockContent` is focusable by default (`tabIndex={0}`); pass `tabIndex={-1}` to remove the tab stop.
- Diff lines (`added` / `removed`) carry a `+` or `−` marker as well as a tint. Give a wrap toggle `aria-pressed`, and a Show More button `aria-expanded` and `aria-controls` pointing at the `id` of `CodeBlockContent`.
- Cap height with a `max-h-*` class on `CodeBlockContent`; edges fade via the `scroll-fade` utility (add `scroll-fade-y` to a capped block that does not wrap).
- With Streamdown, route fenced code to a `CodeBlock` via `components.code`; `useIsCodeFenceIncomplete` returns `true` until the closing fence arrives and only works when Streamdown receives `isAnimating`.
- Use `size="sm"` inside `TraceCollapsibleContent` for tool output; see trace.md.
- Radix and React Aria variants exist at https://ui.shadcn.com/docs/components/radix/code-block and https://ui.shadcn.com/docs/components/aria/code-block.

## Related

- [trace.md](./trace.md)
- [message.md](./message.md)
