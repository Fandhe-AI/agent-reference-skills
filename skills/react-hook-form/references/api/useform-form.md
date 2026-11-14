# useForm — Form

Optional component (Since 7.44.0, currently BETA). It renders a native `<form>` element, runs your validation through [handleSubmit](./useform-handlesubmit.md), and then sends the data to an API, a Server Action, or your callback. Loading, success, and error state end up in [formState](./useform-formstate.md). By default it sends a POST request with the submission data as FormData. Set `encType` (or a `Content-Type` header via the `headers` prop) to `application/json` to send JSON instead.

## Signature / Usage

```javascript
<Form
  action="/api"
  method="post" // default to post
  onSubmit={() => {}} // function to be called before the request
  onSuccess={() => {}} // valid response
  onError={() => {}} // error response
  validateStatus={(status) => status >= 200 && status < 300} // the default
/>
```

### How it works

When the user submits, `Form` goes through these steps:

1. **Validate.** The form is validated the same way as `handleSubmit`. If validation fails, the request is not sent, and `onSubmit`, `onSuccess`, and `onError` are not called. Field errors appear in `formState.errors` as usual.
2. **`onSubmit`.** Your `onSubmit` callback is called with the validated `data` and the same values encoded as `formData` and `formDataJson`. If it returns a promise, `Form` waits for it.
3. **Send the request.**
   - If `action` is a URL string, `Form` calls `fetch(action, { method, headers, body })`. Then it checks the response status with `validateStatus`. It calls `onSuccess({ response })` when the status is valid, and `onError({ response })` when it is not.
   - If `action` is a function, `Form` calls it with the `FormData`. If the function throws, `onError({ error })` is called.
   - If there is no `action`, nothing is sent. Only `onSubmit` runs, so you can send the request yourself.
4. **Update form state.** `formState.isSubmitting` stays `true` until all of the above finishes. If the request fails, `formState.isSubmitSuccessful` is set to `false` and an error is set at `errors.root.server`.

### Examples

React Web:

```javascript
import { useForm, Form } from "react-hook-form"

function App() {
  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    // progressive: true, optional prop for progressive enhancement
  })

  return (
    <div>
      {/* Use action prop to make post submission with formData */}
      <Form
        action="/api"
        control={control}
        onSuccess={() => {
          alert("Success")
        }}
        onError={() => {
          alert("error")
        }}
      >
        <input {...register("name")} />
        {isSubmitSuccessful && <p>Form submit successful.</p>}
        {errors?.root?.server && <p>Form submit failed.</p>}
        <button>submit</button>
      </Form>
      {/* Manual form submission */}
      <Form
        control={control}
        onSubmit={async ({ formData, data, formDataJson, event }) => {
          await fetch("api", {
            method: "post",
            body: formData,
          })
        }}
      >
        <input {...register("test")} /> <button>submit</button>
      </Form>
    </div>
  )
}
```

Send JSON and show the submission state:

```tsx
import { useForm, Form } from "react-hook-form"

type FormValues = {
  email: string
}

function App() {
  const {
    control,
    register,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<FormValues>()

  return (
    <Form
      control={control}
      action="/api/subscribe"
      encType="application/json" // sends JSON.stringify(data)
      headers={{ Authorization: `Bearer ${token}` }}
      onError={async ({ response }) => {
        // response is undefined when the network request itself failed
        if (response) console.error(await response.text())
      }}
    >
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}
      {errors.root?.server && (
        <p role="alert">
          Something went wrong ({errors.root.server.type || "network error"}).
        </p>
      )}
      {isSubmitSuccessful && <p>Thanks for subscribing!</p>}
      <button disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Subscribe"}
      </button>
    </Form>
  )
}
```

`errors.root.server.type` holds the response status as a string, such as `"500"`. It is an empty string when `fetch` or a function `action` throws.

Server Action:

```tsx
// actions.ts
"use server"

export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: String(formData.get("title")) } })
}
```

```tsx
"use client"

import { useForm, Form } from "react-hook-form"
import { createPost } from "./actions"

export function PostForm() {
  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm({ progressive: true })

  return (
    <Form control={control} action={createPost}>
      <input {...register("title", { required: true })} />
      {errors.root?.server && <p role="alert">Could not save the post.</p>}
      {isSubmitSuccessful && <p>Post created.</p>}
      <button>Create</button>
    </Form>
  )
}
```

When `action` is a function, `Form` does not render `method` or `encType` on the `<form>` element, because React manages those for Server Actions.

With FormProvider:

```javascript
import { useForm, FormProvider, Form, useFormContext } from "react-hook-form"

function NameInput() {
  const { register } = useFormContext()
  return <input {...register("name")} />
}

function App() {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      {/* No control prop: Form reads it from FormProvider */}
      <Form action="/api">
        <NameInput />
        <button>submit</button>
      </Form>
    </FormProvider>
  )
}
```

File upload:

```javascript
import { useForm, Form } from "react-hook-form"

function App() {
  const { control, register } = useForm()

  return (
    <Form control={control} action="/api/upload" encType="multipart/form-data">
      <input type="text" {...register("title")} />
      {/* each selected file is appended under "attachments" */}
      <input type="file" multiple {...register("attachments")} />
      <button>Upload</button>
    </Form>
  )
}
```

React Native:

```javascript
import { useForm, Form } from "react-hook-form"
function App() {
  const {
    control,
    register,
    formState: { isSubmitSuccessful, errors },
  } = useForm()
  return (
    <Form
      action="/api"
      control={control}
      render={({ submit }) => (
        <View>
          {isSubmitSuccessful && <Text>Form submit successful.</Text>}

          {errors?.root?.server && <Text>Form submit failed.</Text>}
          <Button onPress={() => submit()} />
        </View>
      )}
    />
  )
}
```

## Options / Props

`Form: FormProps`. All props are optional. Any other `<form>` attributes, such as `id`, `className`, or `aria-*`, are passed to the rendered `<form>` element.

| Name | Type | Description |
|------|------|-------------|
| `control` | `Control` | [control](./useform-control.md) object provided by invoking `useForm`. Optional when using `FormProvider`. |
| `action` | `string \| (formData: FormData) => unknown` | URL to submit to, or (Since 7.84.0) a function (Server Action style) invoked with the submission's `FormData`. |
| `method` | `"post" \| "put" \| "delete"` | HTTP method used when `action` is a URL string. `GET` is not supported since submissions are sent as a request body. Defaults to `post`. |
| `encType` | `"application/x-www-form-urlencoded" \| "multipart/form-data" \| "text/plain" \| "application/json"` | Sets the request's `Content-Type` and how the body is encoded (see Request body below). By default the submission is sent as `FormData`. |
| `children` | `React.ReactNode` | Form contents. |
| `render` | `({ submit }) => React.ReactNode` | Render prop for headless use, such as React Native. When `render` is set, no `<form>` element is rendered. Call `submit()` to start the submission. |
| `onSubmit` | `FormSubmitHandler` | Function invoked after successful validation and before the request is sent. Receives `{ data, event, method, formData, formDataJson }`. |
| `onSuccess` | `({ response }) => void` | Function called after a request to a URL `action` returns a status that passes `validateStatus`. |
| `onError` | `({ response } \| { error }) => void` | Function called when the request fails. You get `{ response }` when the status fails `validateStatus`, and `{ error }` when `fetch` or a function `action` throws. An error is also set on `formState.errors`, with `root.server` as the key. |
| `headers` | `Record<string, string>` | Request headers object. |
| `validateStatus` | `(status: number) => boolean` | Function to validate the response status code. Defaults to `status >= 200 && status < 300`. |

### onSubmit payload

| Name | Type | Description |
|------|------|-------------|
| `data` | `TTransformedValues` | The validated form values. If you use a `resolver` (see [useForm](./useform.md)), these are the transformed values. |
| `event` | `React.BaseSyntheticEvent` | The submit event. This is `undefined` when you call `submit()` from `render` without an event. |
| `method` | `"post" \| "put" \| "delete"` | The `method` prop. |
| `formData` | `FormData` | `data` encoded as `FormData`. This is the same body that is sent by default. |
| `formDataJson` | `string` | `data` encoded with `JSON.stringify`. This is the body that is sent for JSON requests. |

### Request body

The request body depends on `encType`, or on a `Content-Type` header in `headers`. The header name is matched without case sensitivity.

| `encType` / `Content-Type` | Body sent |
|----------------------------|-----------|
| (not set) | `FormData`. The browser sets the `multipart/form-data` header and boundary. |
| `multipart/form-data` | `FormData`. `Form` does not set the `Content-Type` header, so the browser can add the boundary. |
| `application/json` | `formDataJson` (the result of `JSON.stringify(data)`). |
| `application/x-www-form-urlencoded` | `URLSearchParams` made from the `FormData`. Files are sent as their file name only. |
| `text/plain` | One `name=value` line for each field. Files are sent as their file name only. |

When values are encoded as `FormData`, nested objects and arrays use dot-notation keys, for example `user.name` and `items.0.title`. `undefined` values are skipped. Each file in a `FileList` is appended under the same key.

## Notes

- Source: https://react-hook-form.com/docs/useform/form (documentation master c0511c9, fetched 2026-11-14)
- The `createPost` Server Action above is verbatim and illustrative only: a real action must authenticate and authorize the caller and validate `title` (type, non-empty, length) on the server, because client-side `required` can be bypassed by calling the action directly.
- By default a POST request is sent with the form submission data as `FormData`. Progressively enhanced form; supports both React Web and React Native.
- Data serialization: the `<Form>` component focuses on form submission, not custom data serialization. Type-specific transformations (e.g. `Date`, `Dayjs`, or custom objects) should be handled at the application level before submission. The component is kept lightweight and avoids additional serialization rules.
- To prepare or omit submission data, use `handleSubmit` or `onSubmit`:

```javascript
const { handleSubmit, control } = useForm();
const onSubmit =(data) => callback(prepareData(data))
<form onSubmit={handleSubmit(onSubmit)} />
// or
<Form
  onSubmit={({ data }) => {
    console.log(data)
  }}
/>
```

- Progressive enhancement is only applicable to SSR frameworks:

```javascript
const { handleSubmit, control } = useForm({
  progressive: true
});

<Form onSubmit={onSubmit} control={control} action="/api/test" method="post">
  <input {...register("test", { required: true })} />
</Form>

// Renders

<form action="/api/test" method="post">
  <input required name="test" />
</form>
```

- `Form` needs a `control`. Pass it as a prop, or render `Form` inside a [FormProvider](./formprovider.md).
- `onSuccess` is only called for a URL string `action`. When `action` is a function, there is no response to check, so treat the end of the submission as success, for example with `formState.isSubmitSuccessful`.
- `onError` is only for request errors. Validation errors do not call `onError`; read them from `formState.errors`.
- The `<form>` element gets `noValidate` only after it mounts. Before hydration, the browser's native validation (from `progressive: true`) protects the form. After hydration, React Hook Form validates it.

### Form component vs handleSubmit

Both APIs validate with the rules configured in `useForm`. Choose based on who should own the request:

| Use | Best when |
|-----|-----------|
| `Form` | You want React Hook Form to encode the data, send the request, and expose request success or failure through `formState`. It also supports progressive enhancement and function actions. |
| [handleSubmit](./useform-handlesubmit.md) | You need complete control over the submission, such as retries, cancellation, multiple requests, custom serialization, or integration with a data-fetching library. |

Use `Form` with a URL `action` for a conventional API endpoint, a function `action` for a Server Action-style workflow, or no `action` when your `onSubmit` callback sends the request itself.

### Tips

- **Pick one place to send the request.** Use `action` to let `Form` call `fetch`, or leave out `action` and send the request in `onSubmit`. If you set both, `onSubmit` runs first and then the request is sent. This is useful for logging or analytics, but not for changing the payload.
- **Return a promise from `onSubmit`.** `Form` waits for it before it sends the request, and `isSubmitting` stays `true` while it waits. If `onSubmit` throws, the request is not sent and the error is not caught for you.
- **Show server errors with `errors.root.server`.** Request errors are stored there and not on a field, so they do not block the next submission. Root errors are cleared each time the form is submitted again.
- **Do not set `Content-Type` for file uploads.** The browser must create the `multipart/form-data` header with its boundary. Leave `encType` unset or set it to `multipart/form-data`, and do not add a `Content-Type` header.
- **Use `validateStatus` for APIs that use non-2xx codes on purpose.** For example, `validateStatus={(status) => status < 500}` treats a `409 Conflict` as a success, so you can read the body in `onSuccess`.
- **Need more control?** If you need retries, request cancellation, or a data-fetching library, use `handleSubmit` on a plain `<form>`. `Form` is a convenience for simple submissions.

### Troubleshooting

#### The form sends two requests

- Why: An `action` URL tells `Form` to send a request after `onSubmit` finishes. If `onSubmit` also calls `fetch` or a mutation, both requests run.
- Fix: Choose one request owner. Pass `action` and use `onSubmit` only for preparation or analytics, or omit `action` and send the request yourself in `onSubmit`.

#### `onError` is not called when validation fails

- Why: `onError` handles request failures. When client-side validation fails, no request is sent, so request callbacks do not run.
- Fix: Render field validation errors from `formState.errors`. Use `onError` for a rejected function action, a failed network request, or a response status rejected by `validateStatus`.

#### A file upload arrives empty or cannot be parsed

- Why: Setting `Content-Type: multipart/form-data` by hand omits the boundary generated by the browser. Setting JSON encoding instead serializes form values as JSON and cannot send the file bytes from a `FileList`.
- Fix: For file uploads, leave `Content-Type` unset (and leave `encType` unset or use `multipart/form-data`) so the browser sends `FormData` with the correct boundary.

### Changes since v7.90

From the v7.91.0 release notes:

- "Fix `<Form />` handling of JSON, URL-encoded, multipart and plain-text submissions (#13848, #13854, #13874, #13893, #13907, #13915, #13926)"
- "Reduce unnecessary `<Form />` re-renders (#13899)"

From the v7.92.0 release notes:

- "Fix `<Form />` not respecting `encType` when constructing request bodies (#13997)"

## Related

- [useForm — handleSubmit](./useform-handlesubmit.md)
- [useForm — control](./useform-control.md)
- [useForm](./useform.md)
