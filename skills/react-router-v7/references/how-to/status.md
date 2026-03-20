# Status Codes

Set HTTP response status codes from loaders and actions using the `data()` utility.

**Available in:** Framework mode and Data mode.

## 実装方法

- Return `data(value, { status: code })` for non-default status codes
- Throw `data(null, { status: 404 })` to send the error to the nearest `ErrorBoundary`
- Default status is `200` — no need to wrap plain return values

## コード例

```ts
import { data, redirect } from "react-router";
import type { Route } from "./+types/project";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (!title) {
    return data({ message: "Title is required" }, { status: 400 });
  }

  if (!projectExists(title)) {
    const project = await fakeDb.createProject({ title });
    return data(project, { status: 201 });
  }

  return fakeDb.updateProject({ title }); // 200 by default
}

export async function loader({ params }: Route.LoaderArgs) {
  const project = await fakeDb.getProject(params.id);
  if (!project) throw data(null, { status: 404 });
  return project;
}
```

## 注意点

- `throw data(...)` triggers the `ErrorBoundary`; `return data(...)` does not
- React Router only revalidates route data on 2xx responses — returning a 400 in an action keeps users on the form without triggering revalidation

## 関連

- [./error-boundary.md](./error-boundary.md)
- [./form-validation.md](./form-validation.md)
- [./headers.md](./headers.md)
