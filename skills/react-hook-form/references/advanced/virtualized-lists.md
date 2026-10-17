# Working with virtualized lists

Advanced Usage: https://react-hook-form.com/advanced-usage#Workingwithvirtualizedlists

Imagine a scenario where you have a table of data. This table might contain hundreds or thousands of rows, and each row will have inputs. A common practice is to only render the items in the viewport; however, this causes issues as items are removed from the DOM when they are out of view and then re-added. This will cause items to reset to their default values when they re-enter the viewport.

An example is shown below using [react-window](https://github.com/bvaughn/react-window).

## Signature / Usage

Form (`FormProvider` + `useFormContext`):

```javascript
import { memo } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { VariableSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

const items = Array.from(Array(1000).keys()).map((i) => ({
  title: `List ${i}`,
  quantity: Math.floor(Math.random() * 10),
}))

const WindowedRow = memo(({ index, style, data }) => {
  const { register } = useFormContext()

  return (
    <div style={style}>
      <label>{data[index].title}</label>
      <input {...register(`${index}.quantity`)} />
    </div>
  )
})

export const App = () => {
  const onSubmit = (data) => console.log(data)
  const methods = useForm({ defaultValues: items })

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={items.length}
              itemSize={() => 100}
              width={width}
              itemData={items}
            >
              {WindowedRow}
            </List>
          )}
        </AutoSizer>
      </FormProvider>
      <button type="submit">Submit</button>
    </form>
  )
}
```

Field Array (`useFieldArray` + `Controller`):

```javascript
import { FixedSizeList } from "react-window"
import { Controller, useFieldArray, useForm } from "react-hook-form"

const items = Array.from(Array(1000).keys()).map((i) => ({
  title: `List ${i}`,
  quantity: Math.floor(Math.random() * 10),
}))

function App() {
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: {
      test: items,
    },
  })
  const { fields } = useFieldArray({ control, name: "test" })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={40}
        itemCount={fields.length}
        itemData={fields}
        itemKey={(i) => fields[i].id}
      >
        {({ style, index, data }) => {
          const defaultValue =
            getValues()["test"][index].quantity ?? data[index].quantity

          return (
            <div style={style}>
              <Controller
                render={({ field }) => <input {...field} />}
                name={`test[${index}].quantity`}
                defaultValue={defaultValue}
                control={control}
              />
            </div>
          )
        }}
      </FixedSizeList>
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Notes

- Both examples use the react-window v1 API (`VariableSizeList` / `FixedSizeList`), which is not available in react-window v2; install `react-window@1` (plus `react-virtualized-auto-sizer` for the first example) to run them as written.

## Related

- [usefieldarray](../api/usefieldarray.md)
- [formprovider](../api/formprovider.md)
