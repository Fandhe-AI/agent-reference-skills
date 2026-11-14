# React Hook Form — FAQs

Clear answers to common React Hook Form setup, validation, state, performance, and testing questions. Each answer gives the shortest practical explanation and links to the detailed API documentation.

## Signature / Usage

### Why is React Hook Form performant?

React Hook Form keeps form values in its own store, not in React state and not in the DOM. For native inputs, `register` attaches a `ref` and event listeners. Each `onChange` or `onBlur` updates the store directly, and only the components that subscribe to that value or state re-render. Typing therefore does not re-render the entire form. For components that must be controlled, `Controller` and `useController` can isolate updates to the field that changed.

For large forms, subscribe as close as possible to the state you render: use `useWatch` for values, `useFormState` for form state, and `getValues` for a one-time read. See the performance comparison (https://github.com/bluebill1049/react-hook-form-performance-compare) for a reproducible example.

### How do I make validation errors accessible?

Connect the label to its input, set `aria-invalid` when validation fails, and render the error in an element with `role="alert"`. For longer help text, give the message an `id` and reference it with `aria-describedby`.

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        aria-invalid={errors.firstName ? "true" : "false"}
        {...register("firstName", { required: true })}
      />
      {errors.firstName && <span role="alert">This field is required</span>}

      <input type="submit" />
    </form>
  )
}
```

### Does React Hook Form work with class components?

Hooks cannot run directly inside a class component. Put `useForm` in a function component and pass the methods or rendered fields into the class component. React supports mixing class and function components in the same tree.

### Does it work with React's `<Activity />` component?

Since 7.85.0: Yes. Hiding a form with `<Activity mode="hidden">` unmounts its effects and subscriptions, then remounts them when it becomes visible again, which used to leave `useWatch` values and `formState.isSubmitting` stale after restoration. React Hook Form now resyncs its internal subscriptions on remount, so state stays correct across `<Activity />` visibility changes without any extra configuration.

### How to reset the form?

Use React Hook Form's `reset` API when you want field values and form state to return to a known baseline:

```javascript
const { reset } = useForm({
  defaultValues: { firstName: "", lastName: "" },
})

reset() // restore defaultValues and clear form state
reset({ firstName: "Bill", lastName: "Luo" }) // set a new baseline
```

Options such as `keepErrors`, `keepDirtyValues`, and `keepDefaultValues` let you preserve selected state. Native `HTMLFormElement.reset()` resets browser controls, but it does not provide the same control over React Hook Form state.

### Why are my validation errors not showing?

First confirm that the field has a validation rule or is covered by your resolver, then read its error from `formState.errors`. Render `error.message` only if your rule or schema supplies a message.

```javascript
const {
  register,
  formState: { errors },
} = useForm()

<input {...register("email", { required: "Email is required" })} />
{errors.email && <p role="alert">{errors.email.message}</p>}
```

Validation runs on submit by default. Set `mode` to `onBlur`, `onChange`, or `onTouched` if errors should appear earlier. For nested fields, follow the same object path in `errors` rather than using a flat dotted key.

### Why is handleSubmit not calling my submit function?

`handleSubmit` calls your success callback only when the form is valid. Pass a second callback to reveal validation failures:

```javascript
const onValid = (data) => console.log(data)
const onInvalid = (errors) => console.error(errors)

<form onSubmit={handleSubmit(onValid, onInvalid)}>
```

Also check that the submit button is inside the form and has `type="submit"`, that you are not nesting `<form>` elements, and that custom inputs forward the field's `ref`, `name`, `onChange`, and `onBlur`. Disabled inputs submit as `undefined`; use `readOnly` when the value must remain in the result.

### How to initialize form values?

Pass a complete `defaultValues` object to `useForm`. A single source of initial values keeps `isDirty`, `dirtyFields`, controlled components, and `reset` behavior consistent. Avoid `undefined` defaults; use an empty string, `null`, or another value accepted by the input.

```javascript
function App() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "bill",
      lastName: "luo",
    },
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

For async default values, you can use the following methods:

- Async `defaultValues`

  ```javascript
  function App() {
    const { register, handleSubmit } = useForm({
      defaultValues: async () => {
        const response = await fetch("/api")
        return await response.json() // return { firstName: '', lastName: '' }
      },
    })
  }
  ```

`defaultValues` are cached after the first render. If data arrives later or the selected record changes, use reactive `values` or call `reset(data)`. Changing the `defaultValues` prop alone does not replace values already mounted in the form.

### Should I use register or Controller?

Use `register` for native inputs and custom components that expose a DOM `ref`. It is the simplest path and usually causes the fewest re-renders.

Use `Controller` or `useController` when a component is controlled through `value` and `onChange`, such as many component-library selects, date pickers, and autocomplete controls. Do not spread both `register` and `field` onto the same input; `Controller` already registers it.

### How do I use Zod, Yup, or another schema library?

Install `@hookform/resolvers` with your schema library and pass its resolver to `useForm`:

```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
})
```

The resolver validates the complete form and maps schema issues into `formState.errors`. See the dedicated Zod (https://react-hook-form.com/integrations/zod) and Yup (https://react-hook-form.com/integrations/yup) guides, or compare all supported resolvers (https://react-hook-form.com/integrations/resolvers), including Valibot, ArkType, AJV, Joi, Superstruct, TypeBox, and Standard Schema.

### Why is isDirty false or stuck on true?

`isDirty` compares current values with the form's `defaultValues`. Supply every field's default value through `useForm`, and do not use `undefined`. If saved data becomes the new clean baseline, call `reset(savedData)`; `setValue` changes a value but does not replace that baseline.

Read `isDirty` during render from `formState` so React Hook Form can subscribe to it:

```javascript
const {
  formState: { isDirty },
} = useForm({ defaultValues: { firstName: "" } })
```

File inputs and custom class instances need application-level comparison because the browser can cancel file selection and those values are not plain form data. See `formState` for the full state model.

- Reactive `values`

  ```javascript
  function App() {
    const { data } = useQuery() // data returns { firstName: '', lastName: '' }
    const { register, handleSubmit } = useForm({
      values: data,
      resetOptions: {
        keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
      },
    })
  }
  ```

### How to share ref usage?

React Hook Form needs a `ref` to collect the input value. However, you may want to use `ref` for other purposes (e.g. scroll into view, or focus).

```tsx
import { useRef } from "react"
import { useForm } from "react-hook-form"

type Inputs = {
  firstName: string
  lastName: string
}

export default function App() {
  const { register, handleSubmit } = useForm<Inputs>()
  const firstNameRef = useRef<HTMLInputElement | null>(null)
  const onSubmit = (data: Inputs) => console.log(data)
  const { ref, ...rest } = register("firstName")
  const onClick = () => {
    if (firstNameRef.current) firstNameRef.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...rest}
        ref={(e) => {
          ref(e) // pass the element to RHF
          firstNameRef.current = e // keep your own reference
        }}
      />
      <button type="button" onClick={onClick}>
        clear
      </button>
      <button>Submit</button>
    </form>
  )
}
```

### What if a custom input does not expose a ref?

Prefer adapting a controlled component with `Controller`. If that is not possible, you can register a field without a ref and update it with `setValue`, `setError`, and `trigger`.

**Note:** Because `ref` has not been registered, React Hook Form won't be able to register event listeners to the inputs. This means you will have to manually update the value and error.

```javascript
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit, setValue, setError } = useForm()
  const onSubmit = (data) => console.log(data)

  useEffect(() => {
    register("firstName", { required: true })
    register("lastName")
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="firstName"
        onChange={(e) => setValue("firstName", e.target.value)}
      />
      <input
        name="lastName"
        onChange={(e) => {
          const value = e.target.value
          if (value === "test") {
            setError("lastName", { type: "notMatch" })
          } else {
            setValue("lastName", e.target.value)
          }
        }}
      />
      <button>Submit</button>
    </form>
  )
}
```

### Why does a controlled input ignore the first keystroke?

An input with a `value` prop is controlled by React. If you use `register`, remove `value` and provide its initial value through `useForm({ defaultValues })` instead.

If the component requires `value` and `onChange`, integrate it with `Controller`. Do not switch an input between controlled and uncontrolled states during its lifetime.

### How does React Hook Form differ from Formik and Redux Form?

All three libraries help manage form state and validation, but their core models differ. React Hook Form uses refs and uncontrolled native inputs by default, while still supporting controlled components. This can reduce the amount of state and rendering work needed as a form grows. Formik generally stores field values in React state. Redux Form routes form state through Redux and is most relevant to applications already built around that architecture.

Choose based on your component library, validation needs, team familiarity, and measured behavior in your own form. Package size and library features change over time, so verify current releases rather than relying on a fixed snapshot.

| Library | Primary state model | API style |
| --- | --- | --- |
| React Hook Form | Uncontrolled by default; controlled too | Hooks |
| Formik | Controlled React state | Hooks and components |
| Redux Form | Controlled state stored through Redux | Components and Redux integrations |

React Hook Form includes built-in validation and also supports many schema libraries (https://react-hook-form.com/integrations/resolvers). Check current package sizes on Bundlephobia (https://bundlephobia.com/package/react-hook-form) and profile a representative form when performance is a deciding factor.

### When should I use watch, useWatch, subscribe, or getValues?

React Hook Form offers several ways to read form values. They differ in what re-renders when a value changes:

| API | Re-renders | Use it for |
| --- | --- | --- |
| `watch` | The component that calls `useForm` | Rendering a value at the form level. Simple, but every watched change re-renders the whole form. |
| `useWatch` | Only the component that calls it | Rendering a value deep in the tree, such as a live total or a conditional field. Usually the best choice for performance. |
| `subscribe` | Nothing | Side effects such as autosave, analytics or syncing to external state. |
| `getValues` | Nothing | Reading the latest values on demand, for example in an event handler. It doesn't subscribe to changes, so don't use it to render values. |
| `useFormState` / `formState` | When the state you read changes | Form state such as `errors`, `isDirty` or `isSubmitting`, not field values. |
| Local React state | Every change you store in it | Values that also drive UI outside the form. Avoid mirroring every input into state. |

### Why is default value not changing correctly with ternary operator?

React Hook Form doesn't control your entire form and inputs, which is why React doesn't recognize that the actual input has been exchanged or swapped. As a solution, you can resolve this problem by giving a unique `key` prop to your input. You can also read more about the key props from this article written by Kent C. Dodds (https://kentcdodds.com/blog/understanding-reacts-key-prop).

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const { register, watch } = useForm()
  const watchChecked = watch("checkbox")

  return (
    <div>
      <input type="checkbox" {...register("checkbox")} />
      {watchChecked ? (
        <input {...register("input3")} key="key1" defaultValue="1" />
      ) : (
        <input {...register("input4")} key="key2" defaultValue="2" />
      )}
    </div>
  )
}
```

### How to work with modal or tab forms?

For independent modal or tab forms, create a separate `useForm` instance for each form and combine their submitted data in application state. For one form split across temporarily hidden or unmounted sections, keep the same form instance and leave `shouldUnregister` as `false` so unmounted field values are retained.

- Modal form and toggle inputs example: https://codesandbox.io/s/react-hook-form-modal-form-conditional-inputs-c7n0r
- Tab form example: https://codesandbox.io/s/tabs-760h9

### How do I show errors returned by a server?

Catch the request error in your submit handler and map field-specific failures with `setError`. Use `root.serverError` for a form-wide response:

```javascript
try {
  await saveUser(data)
} catch (error) {
  setError("email", { type: "server", message: "That email is already used" })
  setError("root.serverError", {
    type: "server",
    message: "We could not save your changes",
  })
}
```

Pass stable error objects into the form if your framework supplies server errors as props; a new object on every render can cause repeated updates. See the server error guide.

### Why do tests show an act warning?

React Hook Form performs an initial asynchronous validation pass, which can update form state after the test's first render. Test the UI as a user would: await `userEvent` interactions and use a `findBy*` query or `waitFor` for the resulting UI.

```javascript
render(<App />)

expect(
  await screen.findByRole("button", { name: /submit/i })
).toBeInTheDocument()
```

Do not wrap `render()` in `act()` just to hide the warning. See the complete testing examples.

## Notes

### React Compiler

- `watch` and `getValues` keep the same reference across renders, so the React Compiler (https://react.dev/learn/react-compiler) may cache what they return and render stale values. In compiled components, use `useWatch` to render values and `subscribe` for side effects, or opt the component out with the `"use no memo"` directive. v8 adds React Compiler support; see the migration guide (https://react-hook-form.com/migrate-v7-to-v8#ReactCompiler).

### Other notes

- The official page also shows a JS tab for the "How to share ref usage?" example (same code without type annotations); only the TS version is kept here.
- The reference-style Japanese summary that earlier versions of this page held (performance, form-reset table, Formik size table) was replaced by the redesigned official page; the Formik / Redux Form size figures are no longer in the official text.
- Source: https://react-hook-form.com/faqs (documentation master c0511c9, fetched 2026-11-14)
- In the manual-validation example (verbatim), the unregistered `lastName` input never updates the form value on its own, so call `setValue` for every change and use `setError` only for the forbidden value; otherwise `onSubmit` can run with a stale value.
- In the shared-ref example (verbatim), assigning `input.value = ""` only changes the DOM and does not update React Hook Form's internal value or dirty state; use `setValue` or `resetField` to clear a value and keep the shared ref for focus or scroll.

## Related

- [useForm](../api/useform.md)
- [useForm — register](../api/useform-register.md)
- [useForm — reset](../api/useform-reset.md)
- [useForm — handleSubmit](../api/useform-handlesubmit.md)
- [useForm — formState](../api/useform-formstate.md)
- [useForm — setError](../api/useform-seterror.md)
- [useForm — watch](../api/useform-watch.md)
- [useForm — getValues](../api/useform-getvalues.md)
- [useForm — subscribe](../api/useform-subscribe.md)
- [useWatch](../api/usewatch.md)
- [useFormState](../api/useformstate.md)
- [Controller](../api/controller.md)
- [useController](../api/usecontroller.md)
- [Server errors](../advanced/server-errors.md)
- [Testing form](../advanced/testing-form.md)
