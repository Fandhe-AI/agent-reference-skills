---
source: https://ui.shadcn.com/docs/components/base/kbd
---

# Kbd

Used to display textual user input from keyboard.

## Signature / Usage

```bash
npx shadcn@latest add kbd
```

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

<Kbd>Ctrl</Kbd>

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

```text
Kbd
KbdGroup
├── Kbd
└── Kbd
```

## Options / Props

### Kbd / KbdGroup

| Prop | Type | Default |
| --- | --- | --- |
| `className` | `string` | `` |

## Notes

- Official examples also place `Kbd` inside `Button`, a tooltip and `InputGroupAddon`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/kbd ; React Aria variant: https://ui.shadcn.com/docs/components/aria/kbd
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [badge](./badge.md)
- [typography](./typography.md)
