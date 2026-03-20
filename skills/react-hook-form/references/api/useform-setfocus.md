# useForm — setFocus

`setFocus` メソッドは登録済みの input フィールドにプログラム的にフォーカスを設定する。初期フォーカスや特定操作後のフォーカス移動に使用する。

## シグネチャ

```typescript
setFocus: (name: string, options?: { shouldSelect?: boolean }) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | フォーカスを設定するフィールド名。 |
| `options` | `{ shouldSelect?: boolean }` | No | フォーカスオプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldSelect` | `boolean` | `false` | `true` にすると、フォーカス時に入力内容を全選択する。 |

## コード例

### 初期フォーカス

```tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
};

function App() {
  const { register, handleSubmit, setFocus } = useForm<FormValues>();

  useEffect(() => {
    setFocus("firstName");
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("firstName")} placeholder="名" />
      <input {...register("lastName")} placeholder="姓" />
      <input type="submit" />
    </form>
  );
}
```

### 内容を選択してフォーカス

```tsx
setFocus("firstName", { shouldSelect: true });
```

### エラー時のフォーカス移動

```tsx
const onError = (errors: FieldErrors) => {
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    setFocus(firstErrorField as keyof FormValues);
  }
};

return <form onSubmit={handleSubmit(onSubmit, onError)}>...</form>;
```

### ボタンクリックでフォーカス

```tsx
<button type="button" onClick={() => setFocus("email")}>
  メール入力にフォーカス
</button>
```

## 重要なルール / 注意事項

- `setFocus` は `register` の `ref` を使用して `focus()` メソッドを呼び出す。フィールドが `register` で登録され、`ref` が正しく DOM に接続されている必要がある。
- `reset` の直後に `setFocus` を呼び出してはならない。`reset` は全入力の参照を削除するため、フォーカスが機能しない。
- カスタムコンポーネントを使用する場合は、`ref` が内部の input 要素に正しく転送されている必要がある。
- `shouldFocusError` オプション（`useForm` のオプション）を使用すると、バリデーション失敗時に自動的に最初のエラーフィールドにフォーカスされる。手動でのフォーカス制御が不要な場合はそちらを活用すること。
