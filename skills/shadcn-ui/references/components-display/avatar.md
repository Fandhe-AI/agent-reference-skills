---
source: https://ui.shadcn.com/docs/components/base/avatar
---

# Avatar

An image element with a fallback for representing the user (Base UI Avatar).

## Signature / Usage

```bash
npx shadcn@latest add avatar
```

Manual install dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

Compositions:

```text
Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge

AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
└── AvatarGroupCount
```

## Options / Props

### Avatar

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` |
| `className` | `string` | - |

### AvatarImage

Accepts all Base UI Avatar Image props.

| Prop | Type | Default |
| --- | --- | --- |
| `src` | `string` | - |
| `alt` | `string` | - |
| `className` | `string` | - |

### AvatarFallback / AvatarBadge / AvatarGroup / AvatarGroupCount

`AvatarFallback` accepts all Base UI Avatar Fallback props; `AvatarBadge` is positioned at the bottom right; `AvatarGroup` overlaps avatars; `AvatarGroupCount` shows the extra count.

| Prop | Type | Default |
| --- | --- | --- |
| `className` | `string` | - |

## Notes

- For other Base UI Avatar props see https://base-ui.com/react/components/avatar#api-reference
- As a dropdown trigger, the official example uses `<DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/avatar ; React Aria variant: https://ui.shadcn.com/docs/components/aria/avatar
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [badge](./badge.md)
- [empty](./empty.md)
- [item](./item.md)
