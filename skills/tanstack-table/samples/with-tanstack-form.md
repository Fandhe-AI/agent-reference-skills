---
source: https://tanstack.com/table/latest/docs/framework/react/examples/with-tanstack-form
---

# With TanStack Form

Make every cell an editable form field by wrapping the table in a single TanStack Form with a Zod schema.

```tsx
import React from 'react'
import { z } from 'zod'
import { makeData } from './makeData'
import { useAppForm } from './form'
import { createAppColumnHelper, useAppTable } from './table'
import type { Person } from './makeData'

/**
 * `Person` includes optional recursive `subRows`; the form is a flat list only. Without `Omit`,
 * TanStack Form's `DeepKeys` chases that recursion and TypeScript reports TS2589.
 */
type FormRow = Omit<Person, 'subRows'>

// Create column helper with features and row type
const columnHelper = createAppColumnHelper<FormRow>()

// Zod validation schema for a person
const personSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  age: z
    .number()
    .min(0, 'Age must be positive')
    .max(150, 'Age must be realistic'),
  visits: z.number().min(0, 'Visits must be positive'),
  progress: z
    .number()
    .min(0, 'Progress must be 0-100')
    .max(100, 'Progress must be 0-100'),
  status: z.enum(['relationship', 'complicated', 'single']),
})

// Form data schema
const formSchema = z.object({
  data: z.array(personSchema),
})

function FullTableFormExample() {
  // Keep `data` typed as FormRow[] (not Person[]) so form field paths do not carry recursive `subRows` (TS2589).
  const [data, setData] = React.useState<Array<FormRow>>(() => makeData(100))

  const form = useAppForm({
    defaultValues: {
      data,
    },
    onSubmit: ({ value }) => {
      alert(
        `Submitted ${value.data.length} records!\n\nFirst record: ${JSON.stringify(value.data[0], null, 2)}`,
      )
    },
    validators: {
      onChange: formSchema,
    },
  })

  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('firstName', {
          header: 'First Name',
          footer: (props) => props.column.id,
          cell: ({ row }) => (
            <form.AppField name={`data[${row.index}].firstName`}>
              {(field) => <field.TextField />}
            </form.AppField>
          ),
        }),
        columnHelper.accessor('age', {
          header: () => 'Age',
          footer: (props) => props.column.id,
          cell: ({ row }) => (
            <form.AppField name={`data[${row.index}].age`}>
              {(field) => <field.NumberField />}
            </form.AppField>
          ),
        }),
      ]),
    [form],
  )

  const table = useAppTable(
    {
      key: 'with-tanstack-form-full-table',
      columns,
      data,
      debugTable: true,
    },
    (state) => state, // default selector
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.AppForm>
        <form.FormStateIndicator />
        <form.SubmitButton label="Save All Changes" />
      </form.AppForm>

      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  )
}
```

## Notes

- Trimmed from the official example: only two of six columns, header/footer/pagination markup, the add-row / regenerate buttons, devtools, and the second `RowSubmitFormExample` (one `useAppForm` per row with a per-row Save button). `useAppForm` (`./form`) and `useAppTable` / `createAppColumnHelper` (`./table`) are the example's own helpers built on `createFormHook` and `createTableHook`; they are not reproduced here.
- Field names index into the form's array by `row.index` (`data[${row.index}].firstName`), so row order in the form and the table must stay aligned.
- Typing `data` as `Omit<Person, 'subRows'>` avoids TS2589 from TanStack Form's `DeepKeys` on recursive types.
- Pass `[form]` to `useMemo` dependencies so cells re-bind to the form instance.

## Related

- [editable-cells.md](./editable-cells.md)
- [composable-tables.md](./composable-tables.md)
