# Form Validation

Validate form input server-side in an action and return errors to the UI without navigating away. Use `useFetcher` to keep users on the form while showing inline errors.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Use `useFetcher` and `fetcher.Form` so submission doesn't navigate
2. Return `data({ errors }, { status: 400 })` from the action when validation fails
3. Read `fetcher.data?.errors` in the component to display inline messages
4. Return `redirect("/destination")` on success

## コード例

```tsx
import { data, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/signup";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const errors: Record<string, string> = {};

  if (!email.includes("@")) errors.email = "Invalid email address";
  if (password.length < 12) errors.password = "Password must be 12+ characters";

  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  return redirect("/dashboard");
}

export default function Signup() {
  const fetcher = useFetcher<typeof action>();
  const errors = fetcher.data?.errors;

  return (
    <fetcher.Form method="post">
      <input type="email" name="email" />
      {errors?.email && <em>{errors.email}</em>}
      <input type="password" name="password" />
      {errors?.password && <em>{errors.password}</em>}
      <button type="submit">Sign Up</button>
    </fetcher.Form>
  );
}
```

## 注意点

- Use `status: 400` — React Router only triggers data revalidation on 2xx responses, so a 400 keeps the user on the form without reloading route data
- Returning `data()` instead of throwing means the `ErrorBoundary` is NOT triggered

## 関連

- [./fetchers.md](./fetchers.md)
- [./error-boundary.md](./error-boundary.md)
- [./status.md](./status.md)
