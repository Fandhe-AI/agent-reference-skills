# DevTools

React Hook Form DevTools to help debug forms with validation.

## Signature / Usage

Install `@hookform/devtools` as a dev dependency package.

```bash
npm install -D @hookform/devtools
```

Integrate with your React App by importing a Component into your App/Form render and passing the `control` prop into it.

```tsx
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default () => {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  return (
    <>
      <form onSubmit={handleSubmit(d => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input {...register("test")} />

        <input type="submit" />
      </form>

      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `control` | `Control` | The `control` object returned by `useForm`; pass it to DevTool to attach it to the form. |

## Notes

- Functionality: read inputs and entire form state.
- Because RHF is based on uncontrolled inputs, the **Update** button will refresh the DevTool to read the latest input value and form state.
- Visual feedback when input or form is valid or invalid.
- Search registered input and also custom registered components.
- You can easily locate an input by clicking the **Native** button. This will be useful when you are working on a large form.
- React Base: DevTool itself is built by React, so you easily integrate with your React application.
- Open-Source: DevTools is an open-source project, so we can all improve the experience together (https://github.com/react-hook-form/react-hook-form-devtools).
- Install it with `-D` (dev dependency).

## Related

- [useForm](../api/useform.md)
- [useForm — register](../api/useform-register.md)
