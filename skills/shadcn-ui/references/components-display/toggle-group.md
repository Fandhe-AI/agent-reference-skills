---
source: https://ui.shadcn.com/docs/components/base/toggle-group
---

# Toggle Group

A set of two-state buttons that can be toggled on or off (Base UI Toggle Group).

## Signature / Usage

```bash
npx shadcn@latest add toggle-group
```

Manual install dependency:

```bash
npm install @base-ui/react
```

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup variant="outline" multiple>
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic />
  </ToggleGroupItem>
</ToggleGroup>
```

Controlled with an array value:

```tsx
<ToggleGroup
  value={[spacing]}
  onValueChange={(value) => {
    if (value[0]) setSpacing(value[0])
  }}
  variant="outline"
  size="sm"
>
  ...
</ToggleGroup>
```

## Options / Props

The docs have no API table; the rows below list only props observed in the official examples. See the [Base UI Toggle Group](https://base-ui.com/react/components/toggle-group#api-reference) documentation.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | string | — | Observed value: `"outline"`. |
| size | string | — | Observed value: `"sm"`. |
| multiple | boolean | — | Observed as a bare `multiple` attribute. |
| defaultValue | array | — | Observed value: `{["all"]}`. |
| spacing | number | — | Observed value: `{2}`. |

## Notes

- Changelog 2026-05-17 Default Spacing: the default `spacing` changed from `0` to `2` so items render with space between them. Use `spacing={0}` for connected items.
- The page's Usage snippet shows `<ToggleGroup type="single">`, while its demos use `multiple` and array-valued `defaultValue`; follow the demos for the Base UI variant (the Radix page shows the same `type="single"` Usage snippet).
- Radix variant: https://ui.shadcn.com/docs/components/radix/toggle-group ; React Aria variant: https://ui.shadcn.com/docs/components/aria/toggle-group
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [toggle](./toggle.md)
