---
source: https://ui.shadcn.com/docs/ai-elements/base/message
---

# Message

One turn in a thread. The person's text is a Bubble on a Message with `align="end"`. The agent's reply is markdown on a Message, with actions under it. A thread of these turns is Chat.

## Signature / Usage

```bash
npx shadcn@latest add message bubble tooltip
```

```tsx
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"

<Message align="end">
  <MessageContent>
    <Bubble align="end" variant="muted">
      <BubbleContent>How do I add a settings dialog?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
<Message>
  <MessageContent className="gap-2">
    <p>Install Dialog, then open it from the gear button.</p>
    <MessageFooter>
      <Button variant="ghost" size="icon-sm" aria-label="Copy">
        <CopyIcon />
      </Button>
    </MessageFooter>
  </MessageContent>
</Message>
```

## Notes

- Actions go in `MessageFooter`, which follows the message alignment. Use ghost icon buttons with a tooltip: Copy (clipboard, swaps to a check for two seconds), Good / Bad response (toggles; set `aria-pressed`), Retry, and Edit on the person's turn.
- The reply streams as markdown. Render it with Streamdown (`https://streamdown.ai`) and route fenced code to Code Block so code gets line numbers and a copy button.
- AI SDK: branch on the message role; `regenerate({ messageId })` runs a turn again.

```tsx
const { messages, regenerate } = useChat()

<Button
  variant="ghost"
  size="icon-sm"
  aria-label="Retry"
  onClick={() => regenerate({ messageId: message.id })}
>
  <RefreshCcwIcon />
</Button>
```

- Migration from AI SDK Elements `message.tsx`: the file exports `Message` and `MessageContent` too, so import the shadcn/ui parts under other names (for example `MessageRoot`, `MessageBody`). `Message` renders the shadcn/ui Message with `align="end"` when `from` is `"user"`; `MessageActions` -> `MessageFooter`; `MessageAction` -> `Button variant="ghost" size="icon-sm"` in a Tooltip. Keep `MessageResponse` on Streamdown.
- Same name, different thing: the Message component itself is in `components-chat/message.md`; this page is the turn pattern built on it.
- Base UI variant is canonical (`TooltipTrigger` takes `render`). Radix variant (`asChild`): `https://ui.shadcn.com/docs/ai-elements/radix/message`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/message`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Chat](./chat.md)
- [Message component](../components-chat/message.md)
