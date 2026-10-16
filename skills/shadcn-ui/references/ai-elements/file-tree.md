---
source: https://ui.shadcn.com/docs/ai-elements/base/file-tree
---

# File Tree

The files the agent changed, shown as folders you can open. A folder is a Collapsible and a file is a Button. For a single file the agent read or edited, use a Tool line instead.

## Signature / Usage

```bash
npx shadcn@latest add collapsible button
```

Render nodes recursively. Nest each folder's children in its `CollapsibleContent`.

```tsx
if (node.type === "folder") {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        render={
          <Button variant="ghost" size="sm" className="w-full justify-start" />
        }
      >
        <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
        <FolderIcon />
        {node.name}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 flex flex-col">
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

A file:

```tsx
<Button
  variant="ghost"
  size="sm"
  className="w-full justify-start"
  onClick={() => onSelect(node.path)}
>
  <FileIcon />
  {node.name}
</Button>
```

## Notes

- Base UI: `CollapsibleTrigger` takes `render={<Button ... />}`. Radix variant (`https://ui.shadcn.com/docs/ai-elements/radix/file-tree`): `<CollapsibleTrigger asChild>` wrapping the `Button`. React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/file-tree`.
- Migration from AI SDK Elements `file-tree.tsx`: `FileTreeFolder` -> `Collapsible`; `FileTreeFile` -> `Button variant="ghost" size="sm"` calling `onSelect` with its path. Render `FileTreeActions` next to the Button, not inside it.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Collapsible](../components-layout/collapsible.md)
- [Tool](./tool.md)
