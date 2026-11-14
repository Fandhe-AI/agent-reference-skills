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

A complete sign-up form: default values, validation rules, error messages, and an async submit that disables the button while it runs.

```tsx
import { useForm } from "react-hook-form"

type FormValues = {
  email: string
  password: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  })

  const onSubmit = async (data: FormValues) => {
    await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", {
          required: "Email is required",
          pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
        })}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        aria-invalid={errors.password ? "true" : "false"}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "Use at least 8 characters" },
        })}
      />
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Sign up
      </button>
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
- An async `defaultValues` function runs once, when the form mounts. If its promise rejects, `formState.isLoading` stays `true`, so catch errors inside the function and return fallback values:

  ```javascript
  useForm({
    defaultValues: async () => {
      try {
        const res = await fetch("/api/user")
        return await res.json()
      } catch {
        return { firstName: "", lastName: "" }
      }
    },
  })
  ```

- `values` is deep-compared with the previous `values` prop. When it changes, the form is reset with the new values, which **replaces anything the user has typed**. If your data source refetches in the background (for example, React Query on window focus) and returns updated data, set `resetOptions: { keepDirtyValues: true }` to keep the user's edits.
- Passing a new object with the same content to `values` does nothing, so you don't need to memoize `values`.
- Source: https://react-hook-form.com/docs/useform (documentation master c0511c9, fetched 2026-11-14)

### Loading form data from a server: which option to use?

| Approach | Updates when the data changes | Good for |
|----------|-------------------------------|----------|
| Async `defaultValues` | No, it runs once on mount | Edit forms that load their data once. `formState.isLoading` is `true` until it resolves. |
| `values` | Yes, it resets the form whenever the data changes | Forms that must stay in sync with external or server state. Combine with `resetOptions` to keep user edits. |
| [reset](./useform-reset.md) in `useEffect` | Only when your effect runs | Full control over when the form is refilled and which state to keep. |
| Render the form after the data arrives | No | The simplest option: fetch in the parent and pass the data in as `defaultValues`. |

### Tips

- Give every field a default value in `defaultValues`, even if it is just `""`. `isDirty`, `dirtyFields`, `reset`, and controlled components all compare against `defaultValues`, so a missing default can make a field look dirty or switch from uncontrolled to controlled.
- If you are not sure which `mode` to use, try `mode: "onTouched"`. Errors show after the user leaves a field, and then update on every change. Users are not shown errors while they are still typing for the first time.
- To load data from an API, pass it to `values` instead of calling `reset` in a `useEffect`. The form updates when the values change, and the values are compared deeply, so a new object with the same content does not reset the form.
- In a large form, keep `useForm` in the parent and move the parts that change often into child components. Read values with [useWatch](./usewatch.md) and state with [useFormState](./useformstate.md) in those children, so the whole form does not re-render on every key press.

### Troubleshooting

#### Fields stay empty after data loads from an API

- Why: `defaultValues` is read once, on the first render, and then cached. If the data arrives later, the new `defaultValues` object is ignored.
- Fix: Pass the data to `values`. The form updates whenever `values` changes:

```javascript
const { data } = useQuery(...)
const { register } = useForm({ values: data })
```

Or call `reset(data)` ([reset](./useform-reset.md)) once the data arrives.

#### Errors only appear after the first submit

- Why: This is the default. With `mode: "onSubmit"`, fields are not validated until the form is submitted. After that, `reValidateMode` (`"onChange"` by default) re-checks them as the user types.
- Fix: Set `mode` to validate earlier, for example `useForm({ mode: "onTouched" })` to show errors when the user leaves a field.

#### `formState.isValid` (or another value) is always `false` in an event handler

- Why: `formState` only tracks the values your component reads during render. If you read `formState.isValid` only inside a click handler or effect, the form never subscribed to it, so it is not kept up to date.
- Fix: Read the value during render, for example by destructuring it:

```javascript
const {
  formState: { isValid },
} = useForm({ mode: "onChange" })

<button disabled={!isValid}>Submit</button>
```

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `useForm` retaining removed options and disabled state (#13882, #13883, #13889, #13898)"
- "Fix select options being lost before the form is ready (#13872)"
- "Fix `useForm` mutating the externally provided `errors` object (#13896)"

From the v7.92.0 release notes:

- "Fix default values not being applied correctly to selects with disabled optgroups (#13953)"

## Related

- [useForm — register](./useform-register.md)
- [useForm — handleSubmit](./useform-handlesubmit.md)
- [useForm — formState](./useform-formstate.md)
- [useForm — reset](./useform-reset.md)
- [useWatch](./usewatch.md)
- [useFormState](./useformstate.md)
- [createFormControl](./createformcontrol.md)
