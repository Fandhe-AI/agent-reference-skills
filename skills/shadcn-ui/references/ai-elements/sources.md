---
source: https://ui.shadcn.com/docs/ai-elements/base/sources
---

# Sources

A line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one. Built with `Trace` with a `TraceCollapsible` for the list.

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
          <GlobeIcon />
        </TraceIcon>
        <TraceTitle>Used {sources.length} sources</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        {sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
            <TraceLine>
              <TraceTitle>
                {source.title ?? new URL(source.url).hostname}
                <span className="sr-only"> (opens in a new tab)</span>
              </TraceTitle>
              <TraceIcon>
                <ArrowUpRightIcon />
              </TraceIcon>
            </TraceLine>
          </a>
        ))}
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Notes

- AI SDK: collect the `source-url` parts of a message and render them after the text. The agent can cite the same page more than once, so dedupe by `url`. `title` is optional on a `source-url` part; fall back to the URL's hostname.

```tsx
const sources = message.parts
  .filter((part) => part.type === "source-url")
  .filter(
    (part, index, all) =>
      all.findIndex((other) => other.url === part.url) === index
  )
```

- Accessibility: links open in a new tab, so add `sr-only` text like "(opens in a new tab)". The arrow icon is decorative; the title is the link name. The count in the trigger tells the person what opens.
- For a citation inside a sentence, use Inline Citation.
- Migration from AI SDK Elements `sources.tsx`: `Sources` -> `Trace` + `TraceCollapsible`; `SourcesTrigger` -> `TraceCollapsibleTrigger` + `TraceLine` with a title using `count`; `SourcesContent` -> `TraceCollapsibleContent` + `Trace`; `Source` -> a link wrapping a `TraceLine`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/sources`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/sources`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Inline Citation](./inline-citation.md)
- [Trace](../components-chat/trace.md)
