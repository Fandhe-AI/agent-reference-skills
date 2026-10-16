---
source: https://ui.shadcn.com/docs/ai-elements/base/reasoning
---

# Reasoning

A line for the agent's thinking. It reads "Thinking" and opens while the model thinks, then reads "Thought" and closes when it is done. The thinking sits inside, and the line can show how long it took. Built with `Trace` with a `TraceCollapsible`.

## Signature / Usage

```bash
npx shadcn@latest add trace
```

Manual install: `npx shadcn@latest add collapsible`, then copy `components/ui/trace.tsx`.

```tsx
<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Thought</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent className="whitespace-pre-wrap">
      {text}
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Notes

- Duration: the AI SDK does not time reasoning. Measure it on the server, send it as message metadata, and show it in a `TraceDescription` after the title (`<TraceDescription>{seconds}s</TraceDescription>`).
- AI SDK: render each `reasoning` part as a line. It starts as a plain `TraceLine` and becomes a `TraceCollapsible` once text arrives. It opens while the model thinks and closes when it finishes; if the person opens or closes it, their choice wins (`open={open ?? running}`). Some models send several reasoning parts in one message; each is a line in the same `Trace`.

```tsx
const [open, setOpen] = React.useState<boolean>()

<TraceCollapsible open={open ?? running} onOpenChange={setOpen}>
  <TraceCollapsibleTrigger>{line}</TraceCollapsibleTrigger>
  <TraceCollapsibleContent className="whitespace-pre-wrap">
    {text}
  </TraceCollapsibleContent>
</TraceCollapsible>
```

- Migration from AI SDK Elements `reasoning.tsx`: keep `isStreaming`, `open`, `defaultOpen`, `onOpenChange`, `duration` and the `useReasoning` context. `ReasoningTrigger` -> `TraceCollapsibleTrigger` + `TraceLine status="running"` while streaming (instead of Shimmer); keep Streamdown for the text.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/reasoning`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/reasoning`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Chain of Thought](./chain-of-thought.md)
- [Trace](../components-chat/trace.md)
