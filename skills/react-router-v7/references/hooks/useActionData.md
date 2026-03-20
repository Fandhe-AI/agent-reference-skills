# useActionData

Returns the data from the route's `action` function after a form submission. Returns `undefined` if no action has been called yet.

## Signature

```typescript
function useActionData<T = any>(): SerializeFrom<T> | undefined
```

## Usage

```tsx
import { Form, useActionData } from "react-router";

export async function action({ request }) {
  const body = await request.formData();
  const name = body.get("visitorsName");
  return { message: `Hello, ${name}` };
}

export default function Invoices() {
  const data = useActionData<typeof action>();
  return (
    <Form method="post">
      <input type="text" name="visitorsName" />
      {data ? data.message : "Waiting..."}
    </Form>
  );
}
```

## Notes

- Returns `undefined` until a form submission triggers the action
- Only captures data from `POST` navigation form submissions
- Not available in Declarative mode

## Related

- [useLoaderData](./useLoaderData.md) — access loader return values
- [useNavigation](./useNavigation.md) — track submission state
- [useSubmit](./useSubmit.md) — submit forms programmatically
