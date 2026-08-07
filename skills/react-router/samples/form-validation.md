# Form Validation

Validate server-side in an `action` and return field errors without navigating away using `useFetcher`.

```tsx
// app/routes/signup.tsx
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

## Notes

- Use `status: 400` so React Router does not trigger loader revalidation on error
- Returning `data()` does not trigger `ErrorBoundary`; throwing does
- `useFetcher<typeof action>()` provides type-safe access to `fetcher.data`
- `useFetcher.Form` keeps the user on the same page after submission
