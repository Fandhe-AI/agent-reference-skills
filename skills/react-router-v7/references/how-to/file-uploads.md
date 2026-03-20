# File Uploads

Handle multipart form file uploads in React Router using `@remix-run/form-data-parser` for streaming support and optional `@remix-run/file-storage` for persistence.

**Available in:** Framework mode only.

## 実装方法

1. Set `encType="multipart/form-data"` on the form
2. Install `@remix-run/form-data-parser`
3. Use `parseFormData(request, uploadHandler)` in the action
4. Process the `FileUpload` object immediately (it is streaming data)
5. Optionally use `@remix-run/file-storage` to persist files locally

## コード例

```tsx
// api/avatar.tsx
import { type FileUpload, parseFormData } from "@remix-run/form-data-parser";
import { LocalFileStorage } from "@remix-run/file-storage/local";
import type { Route } from "./+types/avatar";

const fileStorage = new LocalFileStorage("./uploads/avatars");

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await parseFormData(request, async (fileUpload: FileUpload) => {
    if (fileUpload.fieldName === "avatar" && fileUpload.type.startsWith("image/")) {
      const key = `user-${params.id}-avatar`;
      await fileStorage.set(key, fileUpload);
      return fileStorage.get(key);
    }
  });
  const file = formData.get("avatar");
  // ...
}

export default function Component() {
  return (
    <form method="post" encType="multipart/form-data">
      <input type="file" name="avatar" />
      <button>Upload</button>
    </form>
  );
}
```

## 注意点

- `FileUpload` objects are temporary streaming data — store them immediately before accessing other form fields
- The stored file is a `LazyFile`: content is only read when accessed (e.g., `file.stream()`), avoiding unnecessary memory usage
- Serve stored files via a resource route that returns `new Response(file.stream(), { headers: { "Content-Type": file.type } })`

## 関連

- [./resource-routes.md](./resource-routes.md)
- [./form-validation.md](./form-validation.md)
