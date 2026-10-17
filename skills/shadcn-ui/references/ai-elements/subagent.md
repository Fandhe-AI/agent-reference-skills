---
source: https://ui.shadcn.com/docs/ai-elements/base/subagent
---

# Subagent

A line for work the agent hands to a subagent. The run is the title, like "Ran the research agent". Open it for the tool calls the subagent made and what it found. Built with `Trace` with a `TraceCollapsible` for the run and a nested `Trace` for its tool calls.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block badge
```

Manual install: `npx shadcn@latest add collapsible code-block badge`, then copy `components/ui/trace.tsx`.

```tsx
<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Ran the research agent</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keepMounted className="flex flex-col gap-3">
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CircleCheckIcon />
          </TraceIcon>
          <TraceTitle>Ran grep -rn cacheKey scripts</TraceTitle>
        </TraceLine>
      </Trace>
      <p>The cache is keyed on the commit SHA.</p>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Options / Props

AI SDK tool part state mapping:

| Tool part state | `TraceLine` status | Title |
| --- | --- | --- |
| `input-streaming`, `input-available` | `"running"` while the chat streams | Running ... |
| `output-available` with `preliminary: true` | `"running"` while the chat streams | Running ... |
| `output-available` | none | Ran ... |
| `output-error`, or a running state after the chat stops | `"error"` | Failed to run ... |

## Notes

- While the subagent runs, the line has `status="running"` and its content shows the tool calls so far. Add the result when it finishes.
- Details: put the task the subagent was given at the top of the content, with its model and tools as `Badge` items. Show how long it ran in a `TraceDescription` after the title.
- AI SDK: a subagent is a tool whose `execute` yields the subagent's `UIMessage` as it streams. Render the tool part as the line and `part.output.parts` as the nested `Trace`. Each yield is a preliminary output (`output-available` with `preliminary: true`); the final output replaces it, so check `preliminary` before showing "Ran".
- Migration from AI SDK Elements `agent.tsx`: `Agent` -> `Trace` + `TraceCollapsible`; `AgentHeader` -> `TraceCollapsibleTrigger` + `TraceLine` (model in a Badge); `AgentContent` -> `TraceCollapsibleContent keepMounted`; `AgentTools` -> `Trace`; `AgentTool` -> `TraceLine` (instead of an Accordion). Import `CodeBlock` / `CodeBlockContent` from `@/components/ui/code-block`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/subagent`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/subagent`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It only renders a subagent run; defining subagents is covered by skills openai-agents / anthropic-agent-sdk, and Claude Code subagents by skill anthropic-claude-code-extend.

## Related

- [Tool](./tool.md)
- [Task](./task.md)
- [Trace](../components-chat/trace.md)
