---
source: https://ui.shadcn.com/docs/ai-elements/base/context
---

# Context

Shows how much of the model's context window the conversation has used. It is a Hover Card with a Progress bar.

## Signature / Usage

```bash
npx shadcn@latest add hover-card progress
```

```tsx
<HoverCard>
  <HoverCardTrigger
    delay={10}
    closeDelay={100}
    render={<Button variant="outline" size="sm" />}
  >
    {percent}% context
  </HoverCardTrigger>
  <HoverCardContent className="flex w-64 flex-col gap-3">
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium">Context</span>
      <span className="text-muted-foreground">
        {used} / {limit}
      </span>
    </div>
    <Progress value={percent} aria-label="Context used" />
  </HoverCardContent>
</HoverCard>
```

## Notes

- AI SDK: read usage from the metadata on the agent's message. `messageMetadata` runs when the stream finishes.

```ts
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === "finish") {
      return { usage: part.totalUsage }
    }
  },
})
```

```tsx
const usage = message.metadata?.usage
const used = (usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0)
const percent = Math.round((used / limit) * 100)
```

- `limit` is the model's context window. The AI SDK does not send it, so set it from the model you use.
- Base UI: `delay` / `closeDelay` go on `HoverCardTrigger`, and `render={<Button />}` supplies the trigger element. Radix variant (`https://ui.shadcn.com/docs/ai-elements/radix/context`): `openDelay` / `closeDelay` go on `HoverCard` and the trigger uses `asChild`. React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/context`.
- Migration from AI SDK Elements `context.tsx`: keep `usedTokens`, `maxTokens`, `usage` and `modelId` in the Context; `ContextTrigger` -> `HoverCardTrigger` with a Button; `ContextContentHeader` shows used/max tokens and a `Progress` with `aria-label="Context used"`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- Hover Card
- [Progress](../components-display/progress.md)
