# NestedValue (Deprecated at 7.33.0)

`NestedValue` is deprecated (since 7.33.0) and will be removed in a future major version.

## Signature / Usage

```tsx
import { useForm, NestedValue } from "react-hook-form"

type FormValues = {
  key1: string
  key2: number
  key3: NestedValue<{
    key1: string
    key2: number
  }>
  key4: NestedValue<string[]>
}

const {
  formState: { errors },
} = useForm<FormValues>()

errors?.key1?.message // no type error
errors?.key2?.message // no type error
errors?.key3?.message // no type error
errors?.key4?.message // no type error
```

## Notes

- Deprecated at 7.33.0. For a non-primitive value that needs to stay controlled (such as array values), type the field normally in your form values and wire it up with `Controller` instead of wrapping the type in `NestedValue`.
- In the official example, a cast is required (`e.target.value as number[]`) because `NestedValue<number[]>` bypasses field-level type inference.

## Related

- [ControllerRenderProps / ControllerFieldState / UseControllerReturn / UseControllerProps / ControllerProps](./controller-types.md)
