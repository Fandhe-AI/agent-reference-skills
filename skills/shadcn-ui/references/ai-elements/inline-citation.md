---
source: https://ui.shadcn.com/docs/ai-elements/base/inline-citation
---

# Inline Citation

A source that sits in the sentence it supports. It is a Hover Card on a Button. To show a list of sources after the reply, use Sources.

## Signature / Usage

```bash
npx shadcn@latest add hover-card button
```

```tsx
<HoverCard>
  <HoverCardTrigger
    delay={10}
    closeDelay={100}
    render={<Button variant="secondary" size="xs" />}
  >
    {hostname}
  </HoverCardTrigger>
  <HoverCardContent className="flex w-64 flex-col gap-1">
    <div className="font-medium">{title}</div>
    <a href={url} target="_blank" rel="noreferrer">
      {hostname}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  </HoverCardContent>
</HoverCard>
```

## Notes

- AI SDK: a `source-url` part is the citation. Set `sendSources: true` on `toUIMessageStreamResponse()`, or write the part yourself. `title` is optional; fall back to the URL's hostname.

```ts
writer.write({
  type: "source-url",
  sourceId: "shadcn",
  url: "https://ui.shadcn.com",
  title: "shadcn/ui",
})
```

```tsx
const sources = message.parts.filter((part) => part.type === "source-url")
```

- Base UI: `delay` / `closeDelay` on `HoverCardTrigger` with `render`. Radix variant (`https://ui.shadcn.com/docs/ai-elements/radix/inline-citation`): `openDelay` / `closeDelay` on `HoverCard` and `<HoverCardTrigger asChild>`. React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/inline-citation`.
- Migration from AI SDK Elements `inline-citation.tsx`: `InlineCitationCardTrigger` -> `HoverCardTrigger` with `Button variant="secondary" size="xs"` instead of a Badge so it can take keyboard focus; `InlineCitationSource` renders the title and a new-tab link with "(opens in a new tab)" in an `sr-only` span.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Sources](./sources.md)
- Hover Card
