---
source: https://ui.shadcn.com/docs/ai-elements/base/task
---

# Task

A piece of work the agent is doing, such as finding the project files or updating a page. Each step, like a search, a read or an edit, appears under the task when the agent takes it. Built with `Trace` with a `TraceCollapsible` for each task.

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
        <TraceTitle>Found the project files</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <SearchIcon />
          </TraceIcon>
          <TraceTitle>Searched for app/page.tsx</TraceTitle>
        </TraceLine>
        <a href="/files/app/page.tsx">
          <TraceLine>
            <TraceIcon>
              <FileTextIcon />
            </TraceIcon>
            <TraceTitle>Read app/page.tsx</TraceTitle>
          </TraceLine>
        </a>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

Set the task's status from its steps. Write the title in the present tense while the task runs and in the past tense once it is done.

| Steps | `status` | Title |
| --- | --- | --- |
| A step is still running | `"running"` | Updating the page metadata |
| A step failed | `"error"` | Failed to update the page metadata |
| Every step is done | none | Updated the page metadata |

## Notes

- Task or Plan: use Plan when the agent decides the steps before it starts (every step from the start, pending steps shown, title is the goal with progress). Use Task when the steps come from the work itself (each step once taken, no pending steps, one or more tasks per reply, each closing when done).
- Put several tasks in one `Trace`. Keep the running task open and close each task once it is done.
- AI SDK: stream each task as a data part with its own `id`. The AI SDK replaces a data part with the same `id`, so writing a task again with a new step updates it in place.

```ts
writer.write({ type: "data-task", id: "update", data: { title, steps } })
```

```tsx
const tasks = message.parts.filter((part) => part.type === "data-task")
```

- Migration from AI SDK Elements `task.tsx`: `Task` -> `Trace` + `TraceCollapsible`; `TaskTrigger` -> `TraceCollapsibleTrigger` + `TraceLine` + `TraceTitle`; `TaskContent` -> `TraceCollapsibleContent keepMounted` + `Trace`; `TaskItem` -> `TraceLine`. Keep `TaskItemFile`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/task`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/task`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Plan](./plan.md)
- [Queue](./queue.md)
- [Trace](../components-chat/trace.md)
