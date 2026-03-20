# data

Returns data from a loader or action together with custom HTTP headers or a status code, without serializing the value into a full `Response` object.

## Signature

```typescript
function data<D>(data: D, init?: number | ResponseInit): DataWithResponseInit<D>
```

## Usage

```typescript
import { data } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const item = await createItem(formData);
  return data(item, {
    headers: { "X-Custom-Header": "value" },
    status: 201,
  });
}
```

Status code only:

```typescript
return data({ message: "Not found" }, 404);
```

## Notes

- Avoids unnecessary serialization to a `Response` object while still allowing custom `status` and `headers`
- The generic type parameter `D` is inferred from the first argument, providing type-safe `loaderData` / `actionData` in the component
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [redirect](./redirect.md)
- [isRouteErrorResponse](./isRouteErrorResponse.md)
