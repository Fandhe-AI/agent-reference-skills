# useLens

Custom hook from `@hookform/lenses` that creates a lens instance connected to your React Hook Form control, enabling type-safe focusing, transformation, and manipulation of deeply nested form data through functional lenses.

## Signature / Usage

```bash
npm install @hookform/lenses
```

```tsx
import { useForm } from "react-hook-form"
import { Lens, useLens } from "@hookform/lenses"
import { useFieldArray } from "@hookform/lenses/rhf"

function FormComponent() {
  const { handleSubmit, control } = useForm<{
    firstName: string
    lastName: string
    children: { name: string; surname: string }[]
  }>({})

  const lens = useLens({ control })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <PersonForm
        lens={lens.reflect(({ firstName, lastName }) => ({
          name: firstName,
          surname: lastName,
        }))}
      />
      <ChildForm lens={lens.focus("children")} />
      <input type="submit" />
    </form>
  )
}

function ChildForm({
  lens,
}: {
  lens: Lens<{ name: string; surname: string }[]>
}) {
  const { fields, append } = useFieldArray(lens.interop())

  return (
    <>
      <button type="button" onClick={() => append({ name: "", surname: "" })}>
        Add child
      </button>
      {lens.map(fields, (value, l) => (
        <PersonForm key={value.id} lens={l} />
      ))}
    </>
  )
}

function PersonForm({
  lens,
}: {
  lens: Lens<{ name: string; surname: string }>
}) {
  return (
    <div>
      <StringInput lens={lens.focus("name")} />
      <StringInput lens={lens.focus("surname")} />
    </div>
  )
}

function StringInput({ lens }: { lens: Lens<string> }) {
  return <input {...lens.interop((ctrl, name) => ctrl.register(name))} />
}
```

## Options / Props

`useLens({ control }, deps?)`

| Name | Type | Description |
|------|------|-------------|
| `control` | `Control<TFieldValues>` | Required. The control object from `useForm`. |
| `deps` | `DependencyList` | Optional second argument. Clears the lens cache and re-creates all lenses when dependencies change. |

Lens methods (`Lens<T>`):

| Method | Description | Returns |
|--------|-------------|---------|
| `focus` | Focuses on a specific field path (`lens.focus("profile.email")`, `lens.focus("users.0.name")`). Type-safe with autocomplete. | `Lens<PathValue>` |
| `reflect` | Transform and reshape the lens structure with complete type inference. First argument is a proxy of lenses (instantiated on property access), second is the original lens. Supports object, array (pass an array with a single item as the template), merging, and spread. | `Lens<NewStructure>` |
| `map` | Iterate over array fields with `useFieldArray` integration; requires `fields` from `useFieldArray`. Callback receives `(value, lens, index, array, originLens)`. | `R[]` |
| `interop` | Connect to React Hook Form's control system: `lens.interop()` returns `{ control, name }`; `lens.interop((ctrl, name) => ctrl.register(name))` uses a callback. The return value can be passed to `useController`. | `{ control, name }` |
| `narrow` | Type-safe narrowing of union types: `narrow<string>()` or discriminant `narrow("type", "dog")`. Type-level only. | `Lens<SubType>` |
| `assert` | Type assertion convincing TypeScript the current lens is already the subtype: `assert<string>()` or `assert("type", "success")`. No runtime validation. | `void` |
| `defined` | Exclude `null` and `undefined` from the lens type (equivalent to `narrow<NonNullable<T>>()`). | `Lens<NonNullable>` |
| `cast` | Force a type change. Unsafe: bypasses TypeScript's type system. | `Lens<NewType>` |

## Notes

- Each lens is cached and reused: `lens.focus("firstName") === lens.focus("firstName")`.
- When passing functions to `reflect`, memoize them (`useCallback`) to keep the cache; React Compiler can hoist them automatically since they have no side effects. In merging-lens cases the function passed to `reflect` is not pure.
- `narrow`, `assert`, `defined`, and `cast` are escape hatches for current TypeScript limitations in lens type variance (tracked in `react-hook-form/lenses` issue #38).
- Use the enhanced `useFieldArray` from `@hookform/lenses/rhf` for array handling with lenses.
- Lenses can be created without the hook: `LensCore.create(control, new LensesStorage(control))` (from `@hookform/lenses`). Custom methods are added by extending the `LensBase<T>` interface (module augmentation in a `.d.ts`) and subclassing `LensCore`.
- Motivation: type-safe `name` props are nearly impossible for reusable components, `useFormContext()` couples components to a form schema, and string-concatenated field paths are error-prone.

## Related

- [useForm — control](./useform-control.md)
- [useFieldArray](./usefieldarray.md)
- [useController](./usecontroller.md)
