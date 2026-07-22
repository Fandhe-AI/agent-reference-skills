# React Hook Form Integration

Use `register` for plain inputs wrapped in `Field`, and `Controller` for stateful components like `Select` that don't accept a raw `ref`/`onChange` pair.

```tsx
import { Field } from '@ark-ui/react/field'
import { useForm } from 'react-hook-form'

function SimpleField() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Field.Root invalid={!!errors.email}>
        <Field.Label>Email</Field.Label>
        <Field.Input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
        />
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>
      <button type="submit">Submit</button>
    </form>
  )
}
```

```tsx
import { Field } from '@ark-ui/react/field'
import { Select } from '@ark-ui/react/select'
import { createListCollection } from '@ark-ui/react/collection'
import { Controller, useForm } from 'react-hook-form'

const collection = createListCollection({ items: ['React', 'Solid', 'Vue', 'Svelte'] })

function ControlledSelect() {
  const { control, handleSubmit } = useForm({ defaultValues: { framework: '' } })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="framework"
        control={control}
        rules={{ required: 'Select a framework' }}
        render={({ field: { name, ref, value, onChange }, fieldState: { invalid, error } }) => (
          <Field.Root invalid={invalid}>
            <Select.Root
              name={name}
              collection={collection}
              value={value ? [value] : []}
              onValueChange={(e) => onChange(e.value[0])}
            >
              <Select.Label>Framework</Select.Label>
              <Select.Control>
                <Select.Trigger ref={ref}>
                  <Select.ValueText placeholder="Select..." />
                </Select.Trigger>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {collection.items.map((item) => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
              <Select.HiddenSelect />
            </Select.Root>
            <Field.ErrorText>{error?.message}</Field.ErrorText>
          </Field.Root>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- `Field.Root`'s `invalid` prop cascades `data-invalid` / `aria-invalid` to all Ark UI components nested inside it via context.
- Forward the field's `ref` to the respective Ark UI trigger/input component so `react-hook-form` can move focus to the invalid control on validation failure.
- `register()` works directly for native-input-backed parts (`Field.Input`); stateful non-native components (`Select`, `Combobox`, date pickers) need `Controller` because they expose `value`/`onValueChange` instead of a DOM `ref`+`onChange` pair.
