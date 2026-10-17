# useForm — Form

Optional component (Since 7.44.0, currently BETA) that takes care of form submission by closely aligning with the standard native form.

## Signature / Usage

```tsx
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

React Native:

```tsx
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
```

## Options / Props

`Form: FormProps`. All props are optional.

| Name | Type | Description |
|------|------|-------------|
| `control` | `Control` | `control` object provided by invoking `useForm`. Optional when using `FormProvider`. |
| `action` | `string \| (formData: FormData) => unknown` | URL to submit to, or (Since 7.84.0) a function (Server Action style) invoked with the submission's `FormData`. |
| `method` | `"post" \| "put" \| "delete"` | HTTP method used when `action` is a URL string. `GET` is not supported since submissions are sent as a request body. Defaults to `post`. |
| `encType` | `"application/x-www-form-urlencoded" \| "multipart/form-data" \| "text/plain" \| "application/json"` | Sets the request's `Content-Type`. By default the submission is sent as `FormData`; set this (or the `headers` prop) to `application/json` to send JSON instead. |
| `children` | `React.ReactNode` | Form contents. |
| `render` | `Function` | Render prop function suitable for headless component. |
| `onSubmit` | `Function` | Function invoked after successful validation. |
| `onSuccess` | `Function` | Function called after successful request to the server. |
| `onError` | `Function` | Function called after failed request to the server. `setError` is called to update errors state; `root.server` is used as error key. |
| `headers` | `Record<string, string>` | Request headers object. |
| `validateStatus` | `(status: number) => boolean` | Function to validate status code. |

## Notes

- Outside `FormProvider`, pass `control={control}` to every `Form`. The official manual-submission example omits `control`; it is added to that example here because it is required outside `FormProvider`.
- By default a POST request is sent with the form submission data as `FormData`.
- Progressively enhanced form; supports both React Web and React Native.
- To prepare or omit submission data, use `handleSubmit` or `onSubmit`.
- Progressive enhancement is only applicable to SSR frameworks (`useForm({ progressive: true })`); `<Form action="/api/test" method="post">` then renders `<form action="/api/test" method="post">` with native `required` attributes.

## Related

- [useForm — handleSubmit](./useform-handlesubmit.md)
- [useForm](./useform.md)
