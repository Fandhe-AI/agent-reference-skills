# useForm — setError

`setError` メソッドはフィールドに手動でエラーを設定する。サーバーサイドバリデーションの結果をフォームに反映する場合や、API エラーを表示する場合に使用する。

## シグネチャ

```typescript
setError: (
  name: string,
  error: { type: string; message?: string; types?: Record<string, string> },
  config?: { shouldFocus?: boolean }
) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | エラーを設定するフィールド名。`root.serverError` のようなルートエラーもサポート。 |
| `error` | `FieldError` | Yes | エラーオブジェクト。 |
| `config` | `{ shouldFocus?: boolean }` | No | フォーカス制御。 |

## error オブジェクト

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `string` | Yes | エラーの種類を示す識別子（例: `"required"`, `"server"`, `"custom"`）。 |
| `message` | `string` | No | 表示用のエラーメッセージ。 |
| `types` | `Record<string, string>` | No | 複数のエラーを設定する場合に使用。`criteriaMode: "all"` との併用が必要。 |

## config オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shouldFocus` | `boolean` | `false` | `true` の場合、エラー設定時にフィールドへフォーカスする。登録済み input にのみ有効。disabled な input では無視される。 |

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();

      // サーバーから返されたフィールドエラーを設定
      if (result.errors?.email) {
        setError("email", {
          type: "server",
          message: result.errors.email,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <input type="submit" />
    </form>
  );
}
```

### ルートエラー（サーバーエラー）

```tsx
const onSubmit = async (data: any) => {
  try {
    await fetch("/api/submit", { method: "POST", body: JSON.stringify(data) });
  } catch {
    setError("root.serverError", {
      type: "400",
      message: "サーバーエラーが発生しました",
    });
  }
};

// エラー表示
{errors.root?.serverError && (
  <p>{errors.root.serverError.message}</p>
)}
```

### 複数エラー

```tsx
setError("username", {
  types: {
    minLength: "3文字以上必要です",
    pattern: "英数字のみ使用可能です",
  },
});
```

### フォーカス付きエラー設定

```tsx
setError("email", {
  type: "manual",
  message: "このメールは既に登録されています",
}, { shouldFocus: true });
```

## 重要なルール / 注意事項

- `register` で設定されたバリデーションルールが通過する場合、`setError` で設定したエラーは永続化されない。例えば、`minLength: 4` が満たされているフィールドに手動でエラーを設定しても、送信はブロックされない。
- 未登録フィールドに設定したエラーは、`clearErrors` で明示的にクリアするまで残る。
- `setError` は `isValid` を強制的に `false` にする。ただし最終的な有効性はスキーマや `register` のバリデーションルールに基づく。
- `root` エラーはフォーム送信をまたいで永続化されない。
- フィールド名に `type` や `types` を使用しないこと。エラーオブジェクトと競合する。
- `handleSubmit` のコールバック内で使用するのが一般的なパターン。
