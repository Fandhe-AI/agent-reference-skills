---
source: https://ui.shadcn.com/docs/components/base/command
---

# Command

Command menu for search and quick actions, built on `cmdk`.

## Signature / Usage

```bash
npx shadcn@latest add command
# manual
npm install cmdk
```

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

Inside a dialog (controlled `open` / `onOpenChange`):

```tsx
<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</CommandDialog>
```

Composition:

```text
Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   ├── CommandItem
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        ├── CommandItem
        └── CommandItem
```

## Notes

- Unlike the other overlay components, the Base UI variant of Command does not use `@base-ui/react`; it uses `cmdk` (https://github.com/dip/cmdk) by Dip, as does the Radix variant (https://ui.shadcn.com/docs/components/radix/command). The React Aria variant (https://ui.shadcn.com/docs/components/aria/command) installs `react-aria-components` (underlying doc https://react-aria.adobe.com/Autocomplete).
- The official page has no props table; see the cmdk documentation.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dialog](./dialog.md)
- [Popover](./popover.md)
