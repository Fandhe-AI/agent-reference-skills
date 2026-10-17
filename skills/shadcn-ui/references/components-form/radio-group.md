---
source: https://ui.shadcn.com/docs/components/base/radio-group
---

# Radio Group

A set of checkable buttons, known as radio buttons, where no more than one of the buttons can be checked at a time.

## Signature / Usage

```bash
npx shadcn@latest add radio-group
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

```tsx
<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

Composition:

```text
RadioGroup
├── RadioGroupItem
└── RadioGroupItem
```

## Notes

- The docs page has no props table; see the Base UI Radio Group API reference: https://base-ui.com/react/components/radio-group#api-reference
- Use `Field`, `FieldContent`, `FieldLabel`, and `FieldDescription` for items with descriptions; wrap the entire `Field` in `FieldLabel` (with `FieldTitle`) for a clickable choice card.
- Radix variant (https://ui.shadcn.com/docs/components/radix/radio-group) installs `radix-ui` and links to Radix Radio Group docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/radio-group.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Checkbox](./checkbox.md)
- [Label](./label.md)
