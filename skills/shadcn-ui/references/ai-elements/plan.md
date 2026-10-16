---
source: https://ui.shadcn.com/docs/ai-elements/base/plan
---

# Plan

The list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done. Built with `Trace` with a `TraceCollapsible` for the plan.

## Signature / Usage

```bash
npx shadcn@latest add trace
```

Manual install: `npx shadcn@latest add collapsible`, then copy `components/ui/trace.tsx`.

```tsx
<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine status="running">
        <TraceIcon>
          <RouteIcon />
        </TraceIcon>
        <TraceTitle>Plan: migrate to Base UI</TraceTitle>
        <TraceDescription>2 of 5 done</TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine status="pending">
          <TraceIcon>
            <CircleIcon />
          </TraceIcon>
          <TraceTitle>Run the type checker</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

Step status maps to a `TraceLine` status and icon in the demo:

| Step status | `TraceLine` status | Icon |
| --- | --- | --- |
| `done` | none | `CircleCheckIcon` |
| `running` | `"running"` while streaming | `CircleDotIcon` |
| `pending` | `"pending"` | `CircleIcon` |

Props are those of Trace: see Trace `## API Reference` in the components docs.

## Notes

- Put a description above the steps, inside `TraceCollapsibleContent`.
- When the steps are not known up front, use Task instead.
- AI SDK: stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-plan", id: "plan", data: { title, steps } })
  },
})
```

```tsx
const plan = message.parts.find((part) => part.type === "data-plan")
```

- Migration from AI SDK Elements `plan.tsx`: `Plan` -> `Trace` + `TraceCollapsible` (instead of a Card); `PlanHeader` -> `TraceCollapsibleTrigger` + `TraceLine` with `status="running"` while `isStreaming`; `PlanTitle` -> `TraceTitle`; `PlanDescription` -> `TraceDescription`; `PlanContent` -> `TraceCollapsibleContent`. Buttons cannot sit inside a trigger: render `PlanAction` next to the trigger.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/plan`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/plan`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Task](./task.md)
- [Queue](./queue.md)
- [Trace](../components-chat/trace.md)
