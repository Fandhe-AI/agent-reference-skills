# RichTextEditor

A rich text editor component powered by Tiptap. Available as a snippet component.

## Import

```tsx
// After running: npx @chakra-ui/cli snippet add rich-text-editor
import { RichTextEditor } from "@/components/ui/rich-text-editor"
```

## Usage

```tsx
"use client"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export function Editor() {
  return (
    <RichTextEditor
      defaultValue="<p>Hello, World!</p>"
      onChange={(value) => console.log(value)}
    />
  )
}
```

## Notes

- Not exported from `@chakra-ui/react` directly — requires the CLI snippet
- Built on [Tiptap](https://tiptap.dev/) editor
- Requires `"use client"` directive
- Supports common rich text features: bold, italic, underline, lists, headings, links, etc.
- Output is HTML string

## Related

- [Prose](./prose.md)
- [Code](./code.md)
