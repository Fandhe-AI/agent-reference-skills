# Integrations Overview

Integrations: https://react-hook-form.com/integrations

React Hook Form works with schema validators, controlled UI components, and modern React frameworks without changing how your form data is managed. Choose an integration for installation steps, a complete example, TypeScript guidance, and integration-specific caveats.

## Signature / Usage

### Schema validation

- [Zod](./zod.md) — TypeScript-first schemas, input/output types, and transformed values.
- [Yup](./yup.md) — object schemas, inferred types, casting, and form context.
- [All schema resolvers](./resolvers.md) — AJV, ArkType, Class Validator, computed-types, Effect, fluentvalidation-ts, io-ts, Joi, Nope, Standard Schema, Superstruct, typanion, TypeBox, TypeSchema, Valibot, Vest, VineJS, ata-validator, Yup, and Zod.

### Frameworks and UI

- [Next.js](./nextjs.md) — App Router Client Components, Server Actions, and server-side validation.
- [shadcn/ui](./shadcn-ui.md) — `FormField`, controlled components, Zod, and accessible errors.
- [React 19](./react-19.md) — form actions, progressive enhancement, and `useActionState`.

### Choose the right API

| Goal                                   | Recommended API                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------- |
| Validate with an external schema       | A [resolver](./resolvers.md) passed to [`useForm`](../api/useform.md)      |
| Use a controlled UI component          | [`Controller`](../api/controller.md) or [`useController`](../api/usecontroller.md) |
| Share methods through a component tree | [`FormProvider`](../api/formprovider.md) and [`useFormContext`](../api/useformcontext.md)        |
| Submit to an endpoint or Server Action | [`Form`](../api/useform-form.md)                                                             |
| Own the complete request lifecycle     | [`handleSubmit`](../api/useform-handlesubmit.md)                                             |
| Build repeatable dynamic rows          | [`useFieldArray`](../api/usefieldarray.md)                                                   |

For the fundamentals, begin with [Get Started](https://react-hook-form.com/get-started). Continue to [Advanced Usage](https://react-hook-form.com/advanced-usage) for accessibility, testing, reusable components, and Server Action patterns.

Snippet taken from https://react-hook-form.com/integrations/resolvers :

```tsx
import { useForm } from "react-hook-form"
import { libraryResolver } from "@hookform/resolvers/library"

const form = useForm({
  resolver: libraryResolver(schema),
})
```

## Notes

- The snippet above is borrowed from the resolvers page because the overview page has no code of its own.
- Source: https://react-hook-form.com/integrations (documentation master c0511c9, fetched 2026-11-14)
- Index page for the integration guides; each linked guide has its own page in this category.

## Related

- [resolvers](./resolvers.md)
- [zod](./zod.md)
- [yup](./yup.md)
- [nextjs](./nextjs.md)
- [shadcn-ui](./shadcn-ui.md)
- [react-19](./react-19.md)
