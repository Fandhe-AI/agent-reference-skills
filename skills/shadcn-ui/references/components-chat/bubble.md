---
source: https://ui.shadcn.com/docs/components/base/bubble
---

# Bubble

Displays framed conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content. Scoped to the bubble surface only; avatars, names, timestamps and message-level actions belong in Message.

## Signature / Usage

```bash
npx shadcn@latest add bubble
```

Manual install: copy the component source into `components/ui/bubble.tsx` and update the import paths.

```tsx
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble"
```

```tsx
<Bubble>
  <BubbleContent>
    I checked the registry output and removed the stale route.
  </BubbleContent>
  <BubbleReactions>
    <span>👍</span>
  </BubbleReactions>
</Bubble>
```

Composition:

```text
Bubble
├── BubbleContent
└── BubbleReactions
```

Use `BubbleGroup` to group consecutive bubbles from the same sender. Set `align` on each `Bubble`, not on `BubbleGroup`.

Link or button bubble via `render` on `BubbleContent`:

```tsx
<Bubble variant="muted">
  <BubbleContent render={<button />}>Click here</BubbleContent>
</Bubble>
```

## Options / Props

### Bubble

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment. |
| `align` | `"start" \| "end"` | `"start"` | The inline alignment of the bubble. |
| `className` | `string` | - | Additional classes to apply to the root element. |

### BubbleContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `ReactElement \| function` | - | Render the content as a different element such as a link. |
| `className` | `string` | - | Additional classes to apply to the content element. |

### BubbleReactions

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom"` | `"bottom"` | The side of the bubble to anchor the reactions. |
| `align` | `"start" \| "end"` | `"end"` | The inline alignment of the reactions. |
| `className` | `string` | - | Additional classes to apply to the reaction row. |

### BubbleGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | - | Additional classes to apply to the group root. |

### Variants

| Variant | Description |
| --- | --- |
| `default` | A strong primary bubble, usually for the current user. |
| `secondary` | The standard neutral bubble for conversation content. |
| `muted` | A lower-emphasis bubble for quiet supporting content. |
| `tinted` | A subtle primary-tinted bubble. |
| `outline` | A bordered bubble for secondary or rich content. |
| `ghost` | Unframed content for assistant text or rich content. |
| `destructive` | A destructive bubble for error or failed actions. |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- A bubble sizes to its content, up to 80% of the container width. The `ghost` variant removes the max-width so assistant text can span the full row.
- When building chat interfaces, set alignment on `Message` (via its `align` prop) rather than on `Bubble`.
- Reactions overlap the bubble edge, so leave vertical space between rows. Group emoji reactions with `role="img"` and a descriptive `aria-label`; for interactive reactions render buttons with `aria-label`.
- Long content can be composed with `Collapsible` for show more / show less; wrap a bubble in `Tooltip` or pair with `Popover` for metadata.
- Bubble variants signal tone with color; keep error context in the message text for `destructive`.
- Base UI uses `render`; the Radix variant (https://ui.shadcn.com/docs/components/radix/bubble) uses `asChild` on `BubbleContent`. A React Aria variant exists at https://ui.shadcn.com/docs/components/aria/bubble.

## Related

- [message.md](./message.md)
- [marker.md](./marker.md)
