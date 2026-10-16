# Transform and Parse

Advanced Usage: https://react-hook-form.com/advanced-usage#TransformandParse

Native inputs return values in `string` format unless `valueAsNumber` or `valueAsDate` is used; you can read more in [this section](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement). However, it's not perfect, as we still have to deal with `NaN` or `null` values. Therefore, it's better to handle transformations at the custom hook level. In the following example, we use the `Controller` to handle input and output transformations. You can also achieve a similar result with a custom `register`.

## Signature / Usage

```javascript
import { Controller } from "react-hook-form"

const ControllerPlus = ({ control, transform, name, defaultValue }) => (
  <Controller
    defaultValue={defaultValue}
    control={control}
    name={name}
    render={({ field }) => (
      <input
        {...field}
        onChange={(e) => field.onChange(transform.output(e))}
        value={transform.input(field.value)}
      />
    )}
  />
)

// usage below:
<ControllerPlus
  transform={{
    input: (value) => (isNaN(value) || value === 0 ? "" : value.toString()),
    output: (e) => {
      const output = parseInt(e.target.value, 10)
      return isNaN(output) ? 0 : output
    },
  }}
  control={control}
  name="number"
  defaultValue=""
/>
```

## Notes

- Spread `field` onto the input before overriding `onChange`/`value`, so `onBlur`, `name`, and `ref` are still forwarded — without `ref`, RHF can't focus the input on a validation error, and without `onBlur`, `isTouched` never updates.

## Related

- [controller](../api/controller.md)
- [useform-register](../api/useform-register.md)
