---
source: https://ui.shadcn.com/docs/components/base/message
---

# Message

Lays out a single message in a conversation, with optional avatar, header, footer, and alignment. Render the visible message surface inside it with Bubble; use MessageScroller for the scroll container around a conversation.

## Signature / Usage

```bash
npx shadcn@latest add message
```

Manual install: copy the component source into `components/ui/message.tsx` and update the import paths.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
```

```tsx
<Message>
  <MessageAvatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <Bubble>
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
  </MessageContent>
</Message>
```

Composition:

```text
Message
├── MessageAvatar
└── MessageContent
    ├── MessageHeader
    ├── Bubble
    └── MessageFooter
```

Use `MessageGroup` to stack consecutive messages from the same sender:

```text
MessageGroup
├── Message
└── Message
```

## Options / Props

### Message

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"start" \| "end"` | `"start"` | The alignment of the message in the conversation. |
| `className` | `string` | - | Additional classes to apply to the row. |

### MessageGroup

Groups consecutive messages from the same sender.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the group root. |

### MessageAvatar

The avatar slot, aligned to the bottom of the message. When the message has a `MessageFooter`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the avatar slot. |

### MessageContent

Wraps the header, message surface, and footer.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the content slot. |

### MessageHeader

Displays content above the message, such as a sender name. Stays aligned to the start regardless of `align`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the header. |

### MessageFooter

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the footer. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Same name, different thing: this is the Message layout component under components. The AI Elements Message pattern (`ai-elements/message`, rendering AI SDK message parts) is a separate page in the ai-elements category.
- `Message` is a presentational layout wrapper; accessibility comes from the content inside it. Give icon-only buttons in `MessageFooter` an `aria-label`. For in-progress messages use a `Marker` with `role="status"`.
- Render an empty `MessageAvatar` on the earlier messages of a `MessageGroup` to keep them aligned with the avatar on the last one.
- Place message-level actions (copy, retry, feedback) in `MessageFooter`. Attachments, CodeBlock and other rich content can be placed inside `MessageContent`.
- For AI apps, reasoning steps, tool calls and assistant messages can be rendered using `Message`.
- Radix and React Aria variants exist at https://ui.shadcn.com/docs/components/radix/message and https://ui.shadcn.com/docs/components/aria/message.

## Related

- [bubble.md](./bubble.md)
- [message-scroller.md](./message-scroller.md)
- [marker.md](./marker.md)
- [attachment.md](./attachment.md)
