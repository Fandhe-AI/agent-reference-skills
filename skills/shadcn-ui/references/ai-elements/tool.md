---
source: https://ui.shadcn.com/docs/ai-elements/base/tool
---

# Tool

A tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval. Built with `Trace` with a `TraceCollapsible` for each call that has output.

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
        <TraceTitle>Ran git status --short</TraceTitle>
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

Trace does not read tool parts. Map each part's `state` to a `status` and a title (per the page's migration prompt):

| Tool part state | `status` | Title |
| --- | --- | --- |
| `input-streaming`, `input-available` | `"running"` | Running ... |
| `output-available` | none | Ran ... |
| `output-error` | `"error"` | Failed to run ... |
| `output-denied` | none | Denied ... |

## Notes

- The page has an "Output in a Sheet" section (output opened in a Sheet instead of inline); see Trace `#dialog` in the components docs and the original page for the full demo.
- Approval: a pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to `useChat` so the chat continues once every approval has an answer.

```tsx
if (part.state === "approval-requested") {
  return (
    <Item variant="outline" size="sm">
      <ItemContent>
        <ItemTitle>Run {part.input.command}?</ItemTitle>
      </ItemContent>
      <ItemActions>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: false })
          }
        >
          Deny
        </Button>
        <Button
          size="sm"
          onClick={() =>
            addToolApprovalResponse({ id: part.approval.id, approved: true })
          }
        >
          Approve
        </Button>
      </ItemActions>
    </Item>
  )
}
```

- Migration from AI SDK Elements `tool.tsx`: `Tool` -> `Trace` + `TraceCollapsible`; `ToolHeader` -> `TraceCollapsibleTrigger` + `TraceLine` + `TraceIcon` + `TraceTitle` (instead of a status Badge); `ToolContent` -> `TraceCollapsibleContent`; `ToolInput` / `ToolOutput` -> `CodeBlock size="sm"` + `CodeBlockContent` (`ToolOutput` shows `errorText` on failure). Keep `getStatusBadge` and `ToolPart` exported.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/tool`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/tool`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It only renders AI SDK tool parts; defining and executing tools belongs to agent runtimes (skills openai-agents / anthropic-agent-sdk).

## Related

- [Confirmation](./confirmation.md)
- [Terminal](./terminal.md)
- [Stack Trace](./stack-trace.md)
- [Trace](../components-chat/trace.md)
