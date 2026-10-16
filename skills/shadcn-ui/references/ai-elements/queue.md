---
source: https://ui.shadcn.com/docs/ai-elements/base/queue
---

# Queue

The agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works. Built with `Trace` with a `TraceCollapsible` for each section.

## Signature / Usage

```bash
npx shadcn@latest add trace
```

Manual install: `npx shadcn@latest add collapsible`, then copy `components/ui/trace.tsx`.

```tsx
<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <ListTodoIcon />
        </TraceIcon>
        <TraceTitle>2 to do</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleIcon />
          </TraceIcon>
          <TraceTitle>Update the registry snapshots</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

AI SDK todo status mapping:

| Todo status | Section | Icon | `TraceLine` status |
| --- | --- | --- | --- |
| `pending` | To do | `CircleIcon` | none |
| `in_progress` | To do | `CircleDotIcon` | `"running"` while the chat streams |
| `completed` | Completed | `CircleCheckIcon` | none |

Props are those of Trace: see Trace `## API Reference` in the components docs.

## Notes

- A todo with a description is a `TraceCollapsible` that opens to show it; a todo without one stays a `TraceLine`.
- AI SDK: the agent writes its todos with a tool (`writeTodos` in the example). Each call sends the whole list, so render the last call and skip one whose input is still streaming. Set `"running"` on the in-progress todo only while the chat streams.

```tsx
const todos = message.parts
  .filter((part) => part.type === "tool-writeTodos")
  .filter((part) => part.state !== "input-streaming")
  .at(-1)?.input?.todos
```

- Migration from AI SDK Elements `queue.tsx`: `Queue` -> `Trace`; `QueueSection*` -> `TraceCollapsible*`; `QueueSectionLabel` -> `TraceLine` + `TraceIcon` + `TraceTitle`; `QueueList` -> `Trace` (drop the ScrollArea); `QueueItem` -> `TraceLine`; `QueueItemIndicator` -> `TraceIcon`; `QueueItemContent` -> `TraceTitle`; `QueueItemDescription` -> `TraceDescription`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/queue`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/queue`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk). It is also unrelated to job queues such as BullMQ (skill bullmq).

## Related

- [Plan](./plan.md)
- [Task](./task.md)
- [Trace](../components-chat/trace.md)
