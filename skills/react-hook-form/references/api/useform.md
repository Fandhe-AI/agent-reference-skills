# useForm

Custom hook for managing forms with ease. Takes one optional object argument (`UseFormProps`).

## Signature / Usage

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

const App = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: { name: "", age: 0 },
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("name")} />
      <input {...register("age", { valueAsNumber: true })} type="number" />
      <input type="submit" />
    </form>
  )
}
```

Return values: `register`, `unregister`, `formState`, `watch`, `subscribe`, `handleSubmit`, `reset`, `resetField`, `resetDefaultValues`, `setError`, `clearErrors`, `setValue`, `setValues`, `setFocus`, `getValues`, `getErrors`, `getFieldState`, `trigger`, `control`, `Form`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mode` | `onChange \| onBlur \| onSubmit \| onTouched \| all = 'onSubmit'` | Validation strategy before submission. `onSubmit`: on submit, inputs then attach `onChange` listeners to re-validate. `onBlur`: on blur. `onChange`: on every change (multiple re-renders, significant performance impact). `onTouched`: first on blur, then on every change (with `Controller`, wire up `onBlur` in `render`). `all`: on both blur and change. |
| `reValidateMode` | `onChange \| onBlur \| onSubmit = 'onChange'` | Validation strategy after submission. Since 7.56.0, both `mode` and `reValidateMode` are reactive. |
| `defaultValues` | `FieldValues \| () => Promise<FieldValues>` | Default values for the entire form (sync or async). Cached; use `reset` to change. |
| `values` | `FieldValues` | Since 7.41.0. Reactive values that update the form; overwrites `defaultValues` unless `resetOptions: { keepDefaultValues: true }`. |
| `errors` | `FieldErrors` | Since 7.49.0. Server-returned errors to update the form. Keep the errors object reference-stable to avoid infinite re-renders. |
| `resetOptions` | `KeepStateOptions` | Since 7.41.0. Behavior when `values`/`defaultValues` update (same options as `reset`). |
| `context` | `object` | Mutable context object injected into the `resolver`'s second argument (or Yup's context). |
| `criteriaMode` | `firstError \| all` | `firstError` (default) gathers the first error per field; `all` gathers all errors. |
| `shouldFocusError` | `boolean = true` | Focus the first field with an error after failed submit. Requires `ref` attached to a DOM element; focus order follows `register` order. |
| `delayError` | `number` | Since 7.12.0. Delay (ms) before displaying error states; correcting the input removes the error instantly. |
| `validate` | `Function` | Since 7.72.0. Form-level validation. Receives `{ formValues, formState, eventType, name }`; returns `true`, a `string` (surfaced at `formState.errors.form`), or `{ [fieldName]: { type, message } }`. Does not run when a `resolver` is configured. |
| `shouldUnregister` | `boolean = false` | Unregister inputs on unmount. Global setting overriding child-level configuration. |
| `shouldUseNativeValidation` | `boolean = false` | Since 7.9.0. Enables browser native validation and `:valid`/`:invalid` CSS selectors. |
| `progressive` | `boolean = false` | Since 7.44.0. Forwards validation rules (`required`, `min`, `max`, `minLength`, `maxLength`, `pattern`) from `register` as native HTML attributes; enables progressive enhancement for `Form`. |
| `disabled` | `boolean = false` | Since 7.48.0. Disables the entire form and all associated inputs. |
| `formControl` | `object` | Supply a pre-created form control object (from `createFormControl`) instead of letting `useForm` create one internally. |
| `resolver` | `Resolver` | Integrates a schema validation library (Yup, Zod, Joi, Vest, Ajv, etc.) via `@hookform/resolvers`. |

Resolver arguments:

| Name | Type | Description |
|------|------|-------------|
| `values` | `object` | The entire form values. |
| `context` | `object` | The `context` object given to `useForm`; mutable and can change on each re-render. |
| `options` | `{ criteriaMode: string, fields: object, names: string[] }` | Information about the validated fields, names and `criteriaMode`. |

## Notes

- Avoid `undefined` as a default value; it conflicts with the default state of a controlled component. `defaultValues` are included in the submission result by default. Avoid custom objects with prototype methods (e.g. `Moment`, `Luxon`) as `defaultValues`.
- Async `defaultValues` or `values` updates call `reset` internally; use `resetOptions` (e.g. `{ keepDirtyValues: true, keepErrors: true }`) to configure behavior.
- `shouldUnregister: false` means unmounted fields are not validated by built-in validation; `true` means `defaultValues` are not merged into the submission result, values live in inputs, and unmounted inputs must be notified at `useForm` or `useWatch`'s `useEffect`.
- `shouldUseNativeValidation` only works with `onSubmit` and `onChange` modes, requires string validation messages, and only works with `register` and `useController`/`Controller` connected to actual DOM references. It works independently of `progressive`.
- A resolver cannot be used with the built-in validators (required, min, etc.). Schema validation focuses on field-level error reporting; re-validation occurs one field at a time. A custom resolver must return `{ values, errors }` (default `{}`), and `errors` keys must be hierarchical (`{ participants: [null, { name: someErr }] }`, not `"participants.1.name"`).
- Custom resolver example returns `{ values: error ? {} : values, errors: error ? ... : {} }` from `resolver: async (data) => ...`.
- In a future major release the `useForm` return value will be memoized; do not depend on the entire return in `useEffect`. Destructure instead: `const { reset } = useForm(); useEffect(() => { reset({ ... }) }, [reset])`.

## Related

- [useForm — register](./useform-register.md)
- [useForm — handleSubmit](./useform-handlesubmit.md)
- [useForm — formState](./useform-formstate.md)
- [createFormControl](./createformcontrol.md)
