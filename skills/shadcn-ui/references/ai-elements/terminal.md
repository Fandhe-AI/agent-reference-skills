---
source: https://ui.shadcn.com/docs/ai-elements/base/terminal
---

# Terminal

A shell command the agent runs, such as a lint, a test run or a build. The line shows the command, and its output streams in underneath while it runs. Built with `Trace` with a `TraceCollapsible` for each command.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block
```

Manual install: `npx shadcn@latest add collapsible code-block`, then copy `components/ui/trace.tsx`.

```tsx
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"

<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Ran pnpm build</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <CodeBlock size="sm">
        <CodeBlockContent wrap className="max-h-64">
          {output}
        </CodeBlockContent>
      </CodeBlock>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

A command that exits with any code other than `0` failed; set `status="error"`.

| State | `status` | Title |
| --- | --- | --- |
| Running | `"running"` | Running pnpm build |
| Exited with `0` | none | Ran pnpm build |
| Exited with another code | `"error"` | pnpm lint exited with code 1 |

## Notes

- Open While Running: open the line once the first output arrives so the output is visible while the command runs. Leave it open or closed after that.
- The command is a tool call, so its states map the same way as in Tool.
- AI SDK: a tool result arrives only once the command exits. To stream output while it runs, write it from the tool as a data part with the tool call's id; the AI SDK replaces a data part with the same id, so the output grows in place.

```ts
writer.write({
  type: "data-terminal",
  id: toolCallId,
  data: { output },
})
```

```tsx
function getOutput(message: ChatMessage, toolCallId: string) {
  for (const part of message.parts) {
    if (part.type === "data-terminal" && part.id === toolCallId) {
      return part.data.output
    }
  }
  return ""
}
```

- Migration from AI SDK Elements `terminal.tsx`: keep `output`, `isStreaming`, `autoScroll`, `onClear`. `TerminalHeader` -> `TraceCollapsibleTrigger` + `TraceLine` with `status="running"` while streaming; `TerminalContent` -> `TraceCollapsibleContent` + `CodeBlock size="sm"`. Buttons cannot sit inside a trigger: render status, actions, copy and clear buttons next to it. Remove `ansi-to-react` if nothing else uses it.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/terminal`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/terminal`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It only renders command output; it is not a terminal emulator or agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Tool](./tool.md)
- [Stack Trace](./stack-trace.md)
- [Code Block](../components-chat/code-block.md)
