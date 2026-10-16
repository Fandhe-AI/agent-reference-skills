---
source: https://ui.shadcn.com/docs/ai-elements/base/chain-of-thought
---

# Chain of Thought

A summary line that expands into the steps an agent took, like "Researched in 3 steps". Built with `Trace` with a `TraceCollapsible` for the summary.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block badge
```

Manual install: `npx shadcn@latest add collapsible code-block badge`, then copy `components/ui/trace.tsx` and update the import paths.

```tsx
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

<Trace>
  <TraceCollapsible defaultOpen>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Researched in 3 steps</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Read the build log for dpl_8Kx2</TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

Each step is a `TraceLine`. Set its `status` and write the title in the matching tense.

| Step | `status` | Title |
| --- | --- | --- |
| Running | `"running"` | Searching for ... |
| Done, with detail | none | Searched for ... |
| Done, links out | none | Read the Image component docs |
| Failed | `"error"` | Failed to search for ... |

Props are those of Trace: see Trace `## API Reference` in the components docs.

## Notes

- Add `keepMounted` to the summary's `TraceCollapsibleContent` so steps keep their open state when the summary closes.
- Search results: show a `Badge variant="secondary"` per hostname (`new URL(result.url).hostname`) in the step's `TraceCollapsibleContent`.
- AI SDK: render each tool part as a step. `running` is `streaming && !answering`; set the summary status from the steps (`failed` count of `output-error` parts). Control the open state with `open={open ?? running}` and `onOpenChange={setOpen}`.
- Migration from AI SDK Elements `components/ai-elements/chain-of-thought.tsx`: `ChainOfThoughtStep` status `"active"` maps to `"running"`, `"pending"` to `"pending"`, `"complete"` to no status.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/chain-of-thought`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/chain-of-thought`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Tool](./tool.md)
- [Reasoning](./reasoning.md)
- [Trace](../components-chat/trace.md)
