---
source: https://ui.shadcn.com/docs/ai-elements/base/stack-trace
---

# Stack Trace

A line for a tool call that failed. The error is the title, like "Failed: TypeError". Open it for the stack frames, which can link to the file and line. Built with `Trace` with a `TraceCollapsible` for the frames.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block
```

Manual install: `npx shadcn@latest add collapsible code-block`, then copy `components/ui/trace.tsx`.

```tsx
const [error, ...frames] = stack.split("\n").map((line) => line.trim())

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <CircleXIcon />
        </TraceIcon>
        <TraceTitle>Failed: {error}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <div className="flex flex-col gap-2 rounded-md bg-muted p-3 font-mono text-xs">
        <p className="text-destructive">{error}</p>
        <ol>
          {frames.map((frame, index) => (
            <li key={index}>{frame}</li>
          ))}
        </ol>
      </div>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Notes

- The title truncates, so repeat the full error at the top of the content. Frames from `node_modules` stay muted so your own frames stand out.
- Frame Links: turn your own frames into links that open the file at the line, and fold the framework frames into a collapsible line of their own.
- AI SDK: when a tool throws, its part is `output-error`. By default `errorText` is only the error message, with no frames. Return `error.stack` from `onError` in `toUIMessageStreamResponse` to send them. A stack shows file paths from your server, so only send it in development.

```ts
return result.toUIMessageStreamResponse({
  onError: (error) =>
    error instanceof Error ? (error.stack ?? error.message) : String(error),
})
```

- Migration from AI SDK Elements `stack-trace.tsx`: keep `trace`, `open`, `defaultOpen`, `onOpenChange`, `onFilePathClick` and the parsing. `StackTraceHeader` -> `TraceCollapsibleTrigger` + `TraceLine status="error"`; `StackTraceError` -> `TraceTitle`; `StackTraceExpandButton` renders nothing. Buttons cannot sit inside a trigger: render `StackTraceActions` and `StackTraceCopyButton` next to it.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/stack-trace`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/stack-trace`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Tool](./tool.md)
- [Terminal](./terminal.md)
- [Code Block](../components-chat/code-block.md)
