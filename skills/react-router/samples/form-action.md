# Form Action

Submit a form with `<Form method="post">` and handle the mutation in a server `action`.

```tsx
// app/routes/new-project.tsx
import { Form, redirect } from "react-router";
import type { Route } from "./+types/new-project";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const project = await db.createProject({ title });
  return redirect(`/projects/${project.id}`);
}

export default function NewProject() {
  return (
    <Form method="post">
      <input type="text" name="title" placeholder="Project title" required />
      <button type="submit">Create</button>
    </Form>
  );
}
```

## Notes

- `<Form method="post">` serializes form fields as `FormData` and calls the route's `action`
- `redirect()` returned from an action causes navigation and triggers loader revalidation
- `action` runs server-side only — database writes and secrets are safe here
- To avoid navigation on submit (e.g., inline edits), use `useFetcher` instead
