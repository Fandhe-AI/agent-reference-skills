# Navigating

ユーザーナビゲーションの方法: `<Link>`, `<NavLink>`, `<Form>`, `redirect`, `useNavigate`。

## NavLink

アクティブ・ペンディング状態のスタイリング付きリンク。

```tsx
import { NavLink } from "react-router";

<NavLink to="/messages" className={({ isActive, isPending }) =>
  isActive ? "active" : isPending ? "pending" : ""
}>Messages</NavLink>
```

デフォルト CSS クラス: `.active`, `.pending`, `.transitioning`

## Link

標準リンク（アクティブ状態なし）。

```tsx
import { Link } from "react-router";
<Link to="/login">Login</Link>
```

## Form ナビゲーション

```tsx
<Form action="/search">
  <input type="text" name="q" />
</Form>
```

GET: URLSearchParams としてナビゲート。POST: FormData として送信。

## redirect

loader/action 内でのサーバーサイドリダイレクト。

```tsx
import { redirect } from "react-router";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) return redirect("/login");
  return { userName: user.name };
}
```

## useNavigate

プログラマティックナビゲーション（ユーザー操作なしの場合のみ推奨）。

```tsx
const navigate = useNavigate();
navigate("/logout");
```

## 使い分け

| 方法 | ユースケース | 履歴追加 |
|------|------------|---------|
| `<Link>` | 標準リンク | あり |
| `<NavLink>` | アクティブ状態付きリンク | あり |
| `<Form>` | フォーム送信ナビゲーション | あり |
| `redirect()` | サーバーサイドリダイレクト | あり |
| `useNavigate()` | プログラマティック（限定的） | あり |

## 関連

- [pending-ui](./pending-ui.md)
- [actions](./actions.md)
- [routing](./routing.md)
