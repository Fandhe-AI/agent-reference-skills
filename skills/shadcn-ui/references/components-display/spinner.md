---
source: https://ui.shadcn.com/docs/components/base/spinner
---

# Spinner

An indicator that can be used to show a loading state.

## Signature / Usage

```bash
npx shadcn@latest add spinner
```

```tsx
import { Spinner } from "@/components/ui/spinner"

<Spinner />
```

Inside a button (`data-icon` sets the position):

```tsx
<Button disabled size="sm">
  <Spinner data-icon="inline-start" />
  Loading...
</Button>
```

Size with `size-*` utility classes:

```tsx
<Spinner className="size-3" />
<Spinner className="size-8" />
```

Customization: replace the default icon by editing the component.

```tsx
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## Notes

- No API table in the docs; `Spinner` takes `React.ComponentProps<"svg">`.
- Official examples also place `Spinner` in `Badge`, `InputGroupAddon`, `Empty` (`EmptyMedia variant="icon"`) and `ItemMedia`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/spinner ; React Aria variant: https://ui.shadcn.com/docs/components/aria/spinner
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [progress](./progress.md)
- [skeleton](./skeleton.md)
- [badge](./badge.md)
- [empty](./empty.md)
