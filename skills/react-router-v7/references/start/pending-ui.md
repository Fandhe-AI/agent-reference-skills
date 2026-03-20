# Pending UI

ナビゲーションやフォーム送信の待機中に即座にフィードバックを表示するパターン。

## useNavigation（グローバル状態）

```tsx
import { useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <html><body>
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </body></html>
  );
}
```

`navigation.state`: `'idle' | 'loading' | 'submitting'`

## NavLink（ローカルリンク状態）

```tsx
<NavLink to="/home">
  {({ isPending }) => <span>Home {isPending && <Spinner />}</span>}
</NavLink>
```

## useFetcher（独立フォーム状態）

```tsx
const fetcher = useFetcher();
<fetcher.Form method="post">
  <button>{fetcher.state !== "idle" ? "Submitting..." : "Submit"}</button>
</fetcher.Form>
```

## Optimistic UI

```tsx
function Task({ task }) {
  const fetcher = useFetcher();
  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete = fetcher.formData.get("status") === "complete";
  }
  return (
    <fetcher.Form method="post">
      <button name="status" value={isComplete ? "incomplete" : "complete"}>
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </fetcher.Form>
  );
}
```

## パターン一覧

| ユースケース | フック | プロパティ |
|------------|-------|----------|
| グローバルスピナー | `useNavigation` | `navigation.location` |
| リンクインジケータ | `NavLink` | `isPending` |
| フォームボタン(fetcher) | `useFetcher` | `fetcher.state` |
| フォームボタン(global) | `useNavigation` | `navigation.formAction` |
| Optimistic UI | `useFetcher` | `fetcher.formData` |

## 関連

- [actions](./actions.md)
- [navigating](./navigating.md)
- [data-loading](./data-loading.md)
