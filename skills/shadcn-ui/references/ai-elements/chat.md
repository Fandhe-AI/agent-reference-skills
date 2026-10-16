---
source: https://ui.shadcn.com/docs/ai-elements/base/chat
---

# Chat

The thread of a conversation with the agent. Each turn is a Message inside Message Scroller. The person's message is the scroll anchor, so a new question settles near the top and the reply streams in under it. The field is a Prompt Input.

## Signature / Usage

```bash
npx shadcn@latest add message-scroller message bubble input-group
```

```tsx
<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem messageId={id} scrollAnchor>
          <Message align="end">
            <MessageContent>
              <Bubble align="end" variant="muted">
                <BubbleContent>{text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

## Notes

- `scrollAnchor` goes on the person's turn. `autoScroll` follows the reply while the person stays at the live edge.
- AI SDK helper: to build without a model, script the conversation with `createChat` (`@/lib/ai`, see the helpers/ai-sdk docs). `chat.next(messages)` fills the field with the next scripted message; `chat.transport({ fallback })` replies with a string once the script runs out.

```ts
const chat = createChat()
  .user("Add a dark mode toggle to the settings page.")
  .assistant(({ writer }) => {
    writer.reasoning("I need to know how themes are set up first.")
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .output({ stdout: "app/layout.tsx" })
    writer.text("next-themes is already set up, so I added a ModeToggle.")
  })
const transport = chat.transport({ fallback: "This demo only knows the scripted turns." })
const nextMessage = chat.next(messages)
```

- Migration from AI SDK Elements `conversation.tsx`: `Conversation` -> `MessageScrollerProvider` (with `autoScroll`) + `MessageScroller` instead of `StickToBottom`; `ConversationContent` -> `MessageScrollerViewport` + `MessageScrollerContent`; `ConversationScrollButton` -> `MessageScrollerButton`. Wrap each message in a `MessageScrollerItem` with its `messageId` and drop `use-stick-to-bottom`.
- Base UI variant is canonical (triggers use the `render` prop). Radix variant (`asChild` on triggers): `https://ui.shadcn.com/docs/ai-elements/radix/chat`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/chat`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It is a UI pattern rendering AI SDK message parts, not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Message](./message.md)
- [Prompt Input](./prompt-input.md)
- [Message Scroller](../components-chat/message-scroller.md)
