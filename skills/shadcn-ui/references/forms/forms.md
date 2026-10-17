---
source: https://ui.shadcn.com/docs/forms
---

# Forms

Build forms with React and shadcn/ui. The index page lets you pick a form library, then follow its guide.

## Signature / Usage

Every guide builds forms from the shadcn/ui `Field` family (`Field`, `FieldGroup`, `FieldLabel`, `FieldDescription`, `FieldError`) on top of the form library of your choice.

```tsx
<Field data-invalid={fieldState.invalid}>
  <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
  <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
</Field>
```

## Options / Props

| Guide | Library | Page |
| --- | --- | --- |
| React Hook Form | `react-hook-form` + Zod | [react-hook-form.md](./react-hook-form.md) |
| TanStack Form | `@tanstack/react-form` + Zod | [tanstack-form.md](./tanstack-form.md) |
| Formisch | `@formisch/react` + Valibot | [formisch.md](./formisch.md) |
| Next.js | `useActionState` + Server Actions + Zod | [next.md](./next.md) |

## Notes

- The index page lists a fourth card, `useActionState`, marked "(Coming Soon)"; the Next.js guide covers `useActionState` with Server Actions.
- Form guides are shared across base variants of the components; this is the shadcn/ui copy-in form pattern (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Library APIs: React Hook Form in skill react-hook-form, schemas in skill zod, Server Actions in skill nextjs-app.

## Related

- [React Hook Form](./react-hook-form.md)
- [TanStack Form](./tanstack-form.md)
- [Formisch](./formisch.md)
- [Next.js](./next.md)
