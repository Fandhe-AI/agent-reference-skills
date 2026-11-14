# useForm — formState

An object containing information about the entire form state. It helps you keep track of user interactions with your form application.

## Signature / Usage

```tsx
const {
  formState: { isDirty, dirtyFields },
  setValue,
} = useForm({ defaultValues: { test: "" } })

// isDirty: true
setValue("test", "change", { shouldDirty: true })

// isDirty: false because getValues() === defaultValues
setValue("test", "", { shouldDirty: true })
```

## Options / Props

`formState: FormState` (return values)

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | Set to `true` after the user modifies any of the inputs. Provide all inputs' `defaultValues` in `useForm` so there is a single source of truth. File-type inputs need to be managed at the app level. Does not support custom objects, classes, or File objects. |
| `dirtyFields` | `object` | An object with the user-modified fields. Provide `defaultValues` in `useForm` to compare against. Fields are marked dirty at the field level rather than the entire form; use `isDirty` for the entire form state. |
| `touchedFields` | `object` | An object containing all the inputs the user has interacted with. |
| `defaultValues` | `object` | Since 7.37.0. The value set at `useForm`'s `defaultValues` or updated via `reset`. |
| `isSubmitted` | `boolean` | Set to `true` after the form is submitted. Remains `true` until `reset` is invoked. |
| `isSubmitSuccessful` | `boolean` | Indicates that the form was successfully submitted without any runtime error. |
| `isSubmitting` | `boolean` | `true` if the form is currently being submitted (`false` otherwise). It stays `true` only while the promise returned by your `onSubmit` handler is pending; if you start a request without `await`ing or returning it, `isSubmitting` turns `false` straight away. |
| `isLoading` | `boolean` | Since 7.41.0. `true` if the form is currently loading async default values. Only applicable to async `defaultValues`. |
| `submitCount` | `number` | The number of times the form has been submitted. |
| `isValid` | `boolean` | Set to `true` if the form doesn't have any errors. With `mode: "onBlur"` (see [useForm](./useform.md)), `isValid` is evaluated on mount when subscribed; before submission, typing leaves `isValid` unchanged until the field blurs. `errors` only fills in according to `mode` and `reValidateMode`, so with the default `mode: "onSubmit"` `isValid` can be `false` while `errors` is still empty. `isValid` is not computed while the form is `disabled`. `setError` immediately forces `isValid` to `false`; it is overwritten the next time validation runs (next `onChange`, submit, or `trigger()`). |
| `isValidating` | `boolean` | Set to `true` during validation. |
| `validatingFields` | `object` | Since 7.51.0. Captures fields that are undergoing asynchronous validation. |
| `errors` | `object` | An object with field errors. There is also an `ErrorMessage` component to retrieve error messages easily. |
| `disabled` | `boolean` | Since 7.48.0. Set to `true` if the form is disabled via the `disabled` prop in `useForm`. |
| `isReady` | `boolean` | Since 7.56.0. Set to `true` when `formState` subscription setup is ready. Children render before the parent completes setup, so use an `isReady` flag before calling `useForm` methods (e.g. `setValue`) from a child. |

## Notes

- `setValue` does not update `isDirty` unless `{ shouldDirty: true }` is passed. Adapted from the official example: the `setValue` calls above add `{ shouldDirty: true }`, which the official `isDirty` example omits.
- Returned `formState` is wrapped with a Proxy to improve render performance and skip extra logic if a specific state is not subscribed to. Invoke or read it before a render in order to enable the state update.
- `formState` is updated in batch. To subscribe via `useEffect`, put the entire `formState` in the dependency array:

  ```javascript
  useEffect(() => {
    if (formState.errors.firstName) {
      // do your logic here
    }
  }, [formState]) // ✅ ([formState.errors] will not trigger the useEffect)
  ```

- Pay attention to the logical operator when subscribing:

  ```javascript
  // ❌ formState.isValid is accessed conditionally, so the Proxy does not subscribe to it
  return <button disabled={!formState.isDirty || !formState.isValid} />

  // ✅ read all formState values to subscribe to changes
  const { isDirty, isValid } = formState
  return <button disabled={!isDirty || !isValid} />
  ```

- `isReady` example: `useEffect(() => isReady && setValue('test', 'data'), [isReady])` in a child component.
- Source: https://react-hook-form.com/docs/useform/formstate (documentation master c0511c9, fetched 2026-11-14)

### Tips

- Read `formState` in the component that uses it. To show a submit button's state without re-rendering the whole form, move the button into a child component that calls [useFormState](./useformstate.md), or use the `FormState` component (see [FormStateSubscribe](./formstatesubscribe.md) for the subscription-based alternative).
- A common submit button pattern is `disabled={!isDirty || isSubmitting}`. It prevents an empty submission and a double submission. Remember to destructure both values before you use them.
- Use `isSubmitSuccessful` to show a confirmation message, or to reset the form in a `useEffect` after a successful submission (see [reset](./useform-reset.md)).
- `errors` holds what is currently stored, not what is valid right now. To check validity without showing errors, use `isValid`. To validate on demand, use [trigger](./useform-trigger.md).

### Troubleshooting

#### `isDirty` stays `true` after the user clears the field

- Why: `isDirty` compares the current values with `defaultValues`. A field without a default value starts as `undefined`, and after the user types and deletes the text its value is `""`. That is not equal to `undefined`, so the field is still dirty.
- Fix: Give every field a default value in `useForm`, even if it is just `""`:

```javascript
useForm({ defaultValues: { firstName: "" } })
```

#### A `formState` value is stale when you read it in a handler

- Why: `formState` only tracks the values your component reads during render. A value you read only inside an event handler or effect is never subscribed to.
- Fix: Destructure the value during render, as in `const { formState: { isValid } } = useForm()`. See [useForm](./useform.md) for an example.

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `isValid` not updating correctly after `reset()` and subsequent changes (#13847, #13930)"
- "Fix form state subscriptions and validity updates (#13866, #13877, #13906)"

From the v7.92.0 release notes:

- "Fix `reset` not updating `isValid` after cancelling pending validation (#13994)"
- "Fix form-level validation errors appearing before submission during `isValid` checks (#14015)"
- "Fix form state values becoming inconsistent (#13948)"

## Related

- [useFormState](./useformstate.md)
- [useForm — reset](./useform-reset.md)
- [ErrorMessage](./errormessage.md)
