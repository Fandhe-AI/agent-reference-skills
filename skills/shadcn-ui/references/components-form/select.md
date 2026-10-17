---
source: https://ui.shadcn.com/docs/components/base/select
---

# Select

Displays a list of options for the user to pick from, triggered by a button.

## Signature / Usage

```bash
npx shadcn@latest add select
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

```tsx
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
]

<Select items={items}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
```

Composition:

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   ├── SelectItem
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectGroup
        ├── SelectLabel
        ├── SelectItem
        └── SelectItem
```

## Notes

- In this Base UI version the options are passed to `Select` via the `items` prop (array of `{ label, value }`).
- `alignItemWithTrigger` on `SelectContent`: when `true` (default) the popup positions so the selected item appears over the trigger; when `false` the popup aligns to the trigger edge.
- Use `SelectGroup`, `SelectLabel`, and `SelectSeparator` to organize items.
- The docs page has no props table; see the Base UI Select API reference: https://base-ui.com/react/components/select#api-reference
- For the native browser `<select>`, see Native Select.
- Radix variant (https://ui.shadcn.com/docs/components/radix/select) installs `radix-ui` and links to Radix Select docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/select.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Native Select](./native-select.md)
- [Combobox](./combobox.md)
- [Field](./field.md)
