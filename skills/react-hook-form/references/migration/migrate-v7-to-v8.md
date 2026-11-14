# Migrate V7 to V8 (beta)

Migration guide from React Hook Form v7 to v8: installation of the beta, React Compiler support, flat field arrays, and the breaking changes.

## Signature / Usage

### Installation

```bash
npm install react-hook-form@beta
```

### React Compiler

V8 supports the [React Compiler](https://react.dev/learn/react-compiler). `useForm` returns the same object on every render, so the compiler can't tell when something read through that object changes. To work around this, the read methods `register`, `watch`, `getValues`, `getErrors` and `getFieldState` get a new reference whenever form state changes (see [Method References](#method-references)). Two patterns keep compiled components up to date:

- In nested components, subscribe with [`useFormState`](https://react-hook-form.com/docs/useformstate) instead of reading `formState` from `useFormContext()`. The compiler memoizes `<FormProvider {...methods}>` in the parent, so the context keeps the `formState` from the first render.
- Destructure methods such as `getFieldState` from `useForm()` instead of calling them on the returned object. The compiler memoizes `methods.getFieldState("name")` on `methods`, which never changes, but a destructured `getFieldState` changes with form state, so its result is recomputed.

```tsx
function NestedInput() {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control }) // ✅ updates under the compiler

  return (
    <>
      <input {...register("name", { required: "Name is required" })} />
      <p>{errors.name?.message}</p>
    </>
  )
}
```

For updates from a local `useFormState` subscription, pass its result to `getFieldState` so the compiler sees that dependency:

```tsx
const { control, getFieldState } = useForm()
const formState = useFormState({ control })
const { isDirty } = getFieldState("name", formState)
```

Use [`useWatch`](https://react-hook-form.com/docs/usewatch) to render values. Under the compiler, a destructured `getValues` from `useFormContext()` can stay stale during render. It still reads current values in event handlers.

### Flat Field Array

V8 supports flat field arrays. Each primitive row in `fields` is an object with the row's `value` and its generated `key`, and the input is registered by index.

```tsx
// Before (V7) — each row had to be an object
const { fields } = useFieldArray({ name: "items" }) // items: { value: string }[]
fields.map((field, index) => (
  <input key={field.id} {...register(`items.${index}.value`)} />
))

// After (V8) — primitive values work directly
const { fields } = useFieldArray({ name: "items" }) // items: string[]
fields.map((field, index) => (
  <input key={field.key} {...register(`items.${index}`)} />
))
```

Object rows are unchanged: `fields` spreads each row and adds `key`.

### Breaking Changes

The following changes require updates to your existing code when upgrading from V7.

#### Method References

`register`, `watch`, `getValues`, `getErrors` and `getFieldState` no longer keep a stable reference. They get a new reference whenever form state changes, so the React Compiler sees fresh values. The object returned by `useForm` and the other methods (`setValue`, `handleSubmit`, `reset`, …) stay stable.

Any `useEffect`, `useCallback` or `useMemo` that lists one of these methods as a dependency now runs again on every form state update. For example, `useEffect(() => register("x", rules), [register])` registers the field again after `unregister("x")`.

```tsx
// Before (V7)
useEffect(() => {
  register("x", { required: true })
}, [register])

// After (V8) — register during render
register("x", { required: true })
```

To react to value changes in an effect, use [`subscribe`](https://react-hook-form.com/docs/useform/subscribe) instead of `watch` (see [watch Callback API](#watch-callback-api)).

#### unknown Instead of any

Public types now use `unknown` instead of `any`. Code that relied on `any` to skip type checking needs explicit types:

- Callbacks without a parameter type now receive `unknown`. This applies to `setValueAs`, `onChange` and `onBlur` in `register` options. Annotate the parameter:

  ```tsx
  // Before (V7) — v was any
  register("name", { setValueAs: (v) => v.trim() })

  // After (V8) — annotate the parameter
  register("name", { setValueAs: (v: string) => v.trim() })
  ```

- [`Controller`](https://react-hook-form.com/docs/usecontroller/controller)'s `field.onChange` arguments, `ChangeHandler` event `target` and `type`, `RefCallBack` instances and `CustomElement.value` are typed as `unknown`.
- `TContext` defaults to `unknown`. In a resolver that uses the default context, narrow `context` before reading from it, or pass a context type: `Resolver<FormValues, MyContext>`.
- On untyped forms, nested `dirtyFields` and `touchedFields` are `unknown`. Pass a form type with `useForm<FormValues>()`, or narrow the value before you access nested fields.

#### Input Ref

`register`'s returned `ref` and [`Controller`](https://react-hook-form.com/docs/usecontroller/controller) / [`useController`](https://react-hook-form.com/docs/usecontroller)'s `field.ref` are still callback refs. In V8, RHF stores the supplied element for Controller fields instead of a proxy. This changes `FieldError.ref` and the ref used for error focus, `setFocus`, and native validation. To use the node yourself, call `field.ref(element)` from your own callback ref.

See [#12773](https://github.com/react-hook-form/react-hook-form/issues/12773) for details.

#### useFieldArray

Two changes affect `useFieldArray`:

**`id` renamed to `key`**

The internal render identifier has been renamed from `id` to `key`. Update any destructured field references:

```tsx
const { fields, append } = useFieldArray({ name: "items" })

// fields[0].key is the unique render identifier (was fields[0].id)
```

Note: you can still append `id` or `key` as data — neither affects the render key:

```tsx
append({
  key: "custom-key", // stored as field data, does not override the render key
  id: "custom-id", // stored as field data, does not override the render key
})

fields[0].key // unique id used for re-render (auto-generated)
```

**`keyName` prop removed**

The `keyName` option has been removed from `useFieldArray`. The render key is always `key`.

#### Watch Component

The `<Watch />` component prop `names` has been renamed to `name` for consistency with the rest of the API.

```tsx
// Before (V7)
<Watch names={["firstName", "lastName"]} />

// After (V8)
<Watch name={["firstName", "lastName"]} />
```

#### watch Callback API

The `watch(callback)` overload has been removed, along with its `WatchObserver` type. `watch` now only reads values. Use [`subscribe`](https://react-hook-form.com/docs/useform/subscribe) to run a callback when values change:

```tsx
// Before (V7)
useEffect(() => {
  const { unsubscribe } = watch((value, { name, type }) => console.log(value))
  return () => unsubscribe()
}, [watch])

// After (V8) — use subscribe
useEffect(() => {
  return subscribe({
    formState: { values: true },
    callback: ({ values }) => console.log(values),
  })
}, [subscribe])
```

#### valueAsDate

With `valueAsDate: true`, an empty input (`""`) now returns `null` instead of `Invalid Date`. This matches the native [`HTMLInputElement.valueAsDate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate) behavior.

```tsx
register("birthday", { valueAsDate: true })

// Empty input
// Before (V7): Invalid Date
// After (V8):  null
```

If you checked for an empty date with `isNaN(value.getTime())`, check for `null` instead.

#### setValue

As of the current beta, `setValue` still directly updates `useFieldArray` fields, unchanged from V7 — this section describes a planned change that has not yet shipped. If you need to overwrite an entire field array, the `replace` method from `useFieldArray` remains the recommended approach in both V7 and V8:

```tsx
const { replace } = useFieldArray({ name: "items" })
replace(newItems)
```

> See [`setValue`](https://react-hook-form.com/docs/useform/setvalue) and [`useFieldArray`](https://react-hook-form.com/docs/usefieldarray) docs for details.

## Notes

- v8 is a beta: the latest v8 release is `v8.0.0-beta.5` (2026-10-23, GitHub prerelease). This skill documents the stable v7 line (v7.92.0); the other pages describe v7 APIs and behavior. Install v7 with `npm install react-hook-form` (the default `latest` tag), and v8 only with `npm install react-hook-form@beta`.
- The official page title is "Migrate V7 to V8 (BETA)". The `setValue` section states that, as of the beta, the planned `setValue` / `useFieldArray` change has not shipped yet.
- Existing v7 pages in this skill (for example `useFieldArray` with `id` / `keyName`, `watch(callback)`, `<Watch names>`) stay valid for v7; the sections above list what v8 changes.
- Source: https://react-hook-form.com/migrate-v7-to-v8 (documentation master c0511c9, fetched 2026-11-14)

## Related

- [useFieldArray](../api/usefieldarray.md)
- [useForm — watch](../api/useform-watch.md)
- [useForm — subscribe](../api/useform-subscribe.md)
- [useForm — register](../api/useform-register.md)
- [useForm — setValue](../api/useform-setvalue.md)
- [useFormState](../api/useformstate.md)
- [watch component](../api/watch-component.md)
