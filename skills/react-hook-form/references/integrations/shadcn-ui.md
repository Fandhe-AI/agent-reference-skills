# React Hook Form with shadcn/ui

Integrations: https://react-hook-form.com/integrations/shadcn-ui

The [shadcn/ui Form component](https://ui.shadcn.com/docs/components/form) composes React Hook Form's [`FormProvider`](../api/formprovider.md) and [`Controller`](../api/controller.md). It supplies accessible labels, descriptions, and error messages around shadcn/ui controls.

## Signature / Usage

### Installation

Add the shadcn/ui form primitives, then install the resolver and schema library used by this example:

```bash
npx shadcn@latest add form input button
npm install @hookform/resolvers zod
```

### Complete example

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  username: z.string().min(2, "Enter at least two characters"),
})

export function UsernameForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}
```

### Two different Form components

The shadcn/ui `Form` above provides React Hook Form context. It is different from React Hook Form's submission-oriented [`Form` component](../api/useform-form.md), which can send values to an endpoint or Server Action.

### Native and controlled inputs

- Use `register` directly when a component exposes a native input ref and standard change events.
- Use shadcn/ui `FormField` or React Hook Form's `Controller` for controlled components such as custom selects, date pickers, and switches.
- Define every controlled field in `defaultValues`; avoid `undefined` as a controlled value.
- Spread `field` onto the actual control so `value`, `onChange`, `onBlur`, `name`, and `ref` stay connected.

See the dedicated [Zod guide](./zod.md), [`Controller`](../api/controller.md), and [`FormProvider`](../api/formprovider.md).

## Notes

- Source: https://react-hook-form.com/integrations/shadcn-ui (documentation master c0511c9, fetched 2026-11-14)
- The shadcn/ui `Form` component and CLI belong to the shadcn-ui skill; this page covers only how they connect to React Hook Form.

## Related

- [formprovider](../api/formprovider.md)
- [controller](../api/controller.md)
- [useform-form](../api/useform-form.md)
- [zod](./zod.md)
