---
source: https://ui.shadcn.com/docs/components/base/native-select
---

# Native Select

A styled native HTML select element with consistent design system integration.

## Signature / Usage

```bash
npx shadcn@latest add native-select
```

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
```

```tsx
<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>
```

Composition with groups:

```text
NativeSelect
├── NativeSelectOptGroup
│   ├── NativeSelectOption
│   └── NativeSelectOption
└── NativeSelectOptGroup
    ├── NativeSelectOption
    └── NativeSelectOption
```

## Options / Props

| Component | Prop | Type | Default |
| --- | --- | --- | --- |
| `NativeSelectOption` | `value` | `string` | |
| `NativeSelectOption` | `disabled` | `boolean` | `false` |
| `NativeSelectOptGroup` | `label` | `string` | |
| `NativeSelectOptGroup` | `disabled` | `boolean` | `false` |

## Notes

- `NativeSelect` wraps the native HTML select element and has no props table in the docs.
- Use `NativeSelect` for native browser behavior, better performance, or mobile-optimized dropdowns; use `Select` for custom styling, animations, or complex interactions.
- Use `aria-invalid` for validation errors and `data-invalid` on `Field` for styling.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/native-select and https://ui.shadcn.com/docs/components/aria/native-select.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Select](./select.md)
- [Field](./field.md)
