---
source: https://ui.shadcn.com/docs/components/base/attachment
---

# Attachment

Displays a file or image attachment with media, metadata, upload state, and actions. Use it for files and images in chat composers, message threads, and upload lists.

## Signature / Usage

```bash
npx shadcn@latest add attachment
```

Manual install: first `npx shadcn@latest add button`, then copy the component source into `components/ui/attachment.tsx` and update the import paths.

```tsx
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
```

```tsx
<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>
```

Composition:

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Use `AttachmentGroup` to lay out multiple attachments in a scrollable row.

## Options / Props

### Attachment

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"` | The upload state. Drives styling and the shimmer. |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` | The attachment size. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Lay the media beside or above the content. |
| `className` | `string` | - | Additional classes to apply to the root element. |

### AttachmentMedia

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `className` | `string` | - | Additional classes to apply to the media slot. |

### AttachmentAction

Renders a `Button` and accepts all of its props.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `Button["size"]` | `"icon-xs"` | The button size. |
| `...props` | `React.ComponentProps<typeof Button>` | - | Props spread to the underlying `Button`. |

### AttachmentTrigger

A full-card overlay that activates the attachment. Renders a `<button>` by default.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `render` | `ReactElement \| function` | - | Render as a different element, such as a link. |
| `...props` | `React.ComponentProps<"button">` | - | Props spread to the trigger element. |

### AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentGroup

Each accepts only `className` (`string`) for additional classes. `AttachmentTitle` shimmers while the attachment is `uploading` or `processing`. `AttachmentActions` aligns to the end of the attachment. `AttachmentGroup` lays attachments out in a horizontally scrollable, snapping row.

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Upload states: `idle`, `uploading`, `processing`, `error`, `done`. `uploading` and `processing` shimmer the title; `error` switches to a destructive treatment. Keep the failure reason in `AttachmentDescription` so state is not conveyed by color alone.
- `AttachmentTrigger` fills the card behind the actions, so actions stay independently clickable. With a Dialog, wrap it: `<DialogTrigger render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />} />`.
- Accessibility: give each icon-only `AttachmentAction` an `aria-label`, and give `AttachmentTrigger` an `aria-label`. For a row of presentational attachments, make `AttachmentGroup` focusable with `tabIndex={0}`, `role="group"` and an `aria-label`.
- Base UI uses the `render` prop on `AttachmentTrigger`; the Radix variant (https://ui.shadcn.com/docs/components/radix/attachment) uses `asChild` in its examples. A React Aria variant exists at https://ui.shadcn.com/docs/components/aria/attachment.

## Related

- [message.md](./message.md)
- [bubble.md](./bubble.md)
