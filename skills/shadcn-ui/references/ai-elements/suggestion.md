---
source: https://ui.shadcn.com/docs/ai-elements/base/suggestion
---

# Suggestion

A prompt you send without typing. Each one is a Button with the prompt as its label. Put a row of them above the Prompt Input.

## Signature / Usage

```bash
npx shadcn@latest add button
```

```tsx
import { Button } from "@/components/ui/button"

<div className="scrollbar-none flex scroll-fade-x gap-2 overflow-x-auto overscroll-x-contain">
  {suggestions.map((suggestion) => (
    <Button
      key={suggestion}
      variant="outline"
      size="sm"
      className="shrink-0"
      onClick={() => send(suggestion)}
    >
      {suggestion}
    </Button>
  ))}
</div>
```

## Notes

- Scrolling: the row scrolls sideways when the suggestions do not fit. The `scroll-fade-x` utility (utils/scroll-fade docs) fades the edge that has more to show, and `shrink-0` keeps each label on one line.
- AI SDK: the label is the message. Send it as is: `sendMessage({ text: suggestion })`.
- Migration from AI SDK Elements `suggestion.tsx`: `Suggestions` renders a `div` with `className="flex scroll-fade-x scrollbar-none gap-2 overflow-x-auto overscroll-x-contain"` instead of a ScrollArea (`SuggestionsProps` becomes `ComponentProps<"div">`); `Suggestion` renders `Button variant="outline" size="sm"` with `shrink-0`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/suggestion`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/suggestion`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Prompt Input](./prompt-input.md)
- Button
