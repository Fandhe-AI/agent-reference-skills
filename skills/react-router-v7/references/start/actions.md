# Actions

データ変更（ミューテーション）を処理する。完了後、全 loader データが自動再検証。

## Server Action

```tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  return await db.updateProject({ title });
}
```

- サーバー専用（クライアントバンドルから除外）

## Client Action

```tsx
export async function clientAction({ request, serverAction }: Route.ClientActionArgs) {
  fakeInvalidateClientSideCache();
  const data = await serverAction();
  return data;
}
```

- `clientAction` 定義時はサーバー `action` より優先

## 呼び出し方法

### 1. Form（ナビゲーションあり）

```tsx
import { Form } from "react-router";
<Form method="post" action="/projects/123">
  <input type="text" name="title" />
  <button type="submit">Submit</button>
</Form>
```

### 2. useSubmit（命令的、ナビゲーションあり）

```tsx
const submit = useSubmit();
submit({ title: "New" }, { action: "/projects", method: "post" });
```

### 3. useFetcher（ナビゲーションなし）

```tsx
const fetcher = useFetcher();
<fetcher.Form method="post" action="/update-task/123">
  <input type="text" name="title" />
  <button type="submit">{fetcher.state !== "idle" ? "Saving..." : "Save"}</button>
</fetcher.Form>
```

## Optimistic UI

```tsx
function Task({ task }) {
  const fetcher = useFetcher();
  const optimisticTitle = fetcher.formData
    ? fetcher.formData.get("title") : task.title;
  return <fetcher.Form method="post">...</fetcher.Form>;
}
```

## 注意点

- `method="post"` が必要
- action 後に全 loader が自動再検証
- 戻り値はシリアライズ可能であること
- Form/useSubmit はブラウザ履歴に追加、fetcher は追加しない

## 関連

- [data-loading](./data-loading.md)
- [pending-ui](./pending-ui.md)
- [navigating](./navigating.md)
