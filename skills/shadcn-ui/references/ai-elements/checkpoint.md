---
source: https://ui.shadcn.com/docs/ai-elements/base/checkpoint
---

# Checkpoint

A point in the conversation you can return to. It is a Marker after a turn, with a Restore button. Restore keeps that turn and drops every message after it.

## Signature / Usage

```bash
npx shadcn@latest add marker button
```

```tsx
<Marker variant="separator">
  <MarkerContent className="inline-flex items-center gap-2">
    {label}
    <Button size="xs" variant="outline" onClick={restore}>
      Restore
    </Button>
  </MarkerContent>
</Marker>
```

## Notes

- AI SDK: Restore replaces the thread with the messages up to and including that turn; every later turn is removed. Send a new message to continue from there.

```tsx
const index = messages.findIndex((message) => message.id === messageId)
setMessages(messages.slice(0, index + 1))
```

- AI SDK helper: script a checkpoint with `createChat` as a data part on the agent's turn. Send the same `id` again only when you mean to update that checkpoint.

```ts
writer.data({
  type: "data-checkpoint",
  id: "rename",
  data: { label: "Button renamed" },
})
```

- Migration from AI SDK Elements `checkpoint.tsx`: `Checkpoint` -> `Marker variant="separator"` + `MarkerContent` (instead of a Separator); `CheckpointIcon` -> `MarkerIcon`; `CheckpointTrigger` -> `Button size="xs" variant="outline"`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/checkpoint`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/checkpoint`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Marker](../components-chat/marker.md)
- [Message](./message.md)
