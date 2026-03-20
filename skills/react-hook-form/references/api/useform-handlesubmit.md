# useForm — handleSubmit

`handleSubmit` メソッドはフォーム送信を処理する。バリデーションを実行し、成功時とエラー時のコールバックを呼び分ける。

## シグネチャ

```typescript
handleSubmit: (
  onValid: SubmitHandler<TFieldValues>,
  onInvalid?: SubmitErrorHandler<TFieldValues>
) => (e?: React.BaseSyntheticEvent) => Promise<void>
```

### 型定義

```typescript
type SubmitHandler<TFieldValues> = (
  data: TFieldValues,
  event?: React.BaseSyntheticEvent
) => void | Promise<void>;

type SubmitErrorHandler<TFieldValues> = (
  errors: FieldErrors<TFieldValues>,
  event?: React.BaseSyntheticEvent
) => void | Promise<void>;
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `onValid` | `SubmitHandler` | Yes | バリデーション成功時に呼ばれるコールバック。バリデーション済みのフォームデータを受け取る。 |
| `onInvalid` | `SubmitErrorHandler` | No | バリデーション失敗時に呼ばれるコールバック。エラーオブジェクトを受け取る。 |

## コード例

### 基本的な使い方

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any, e?: React.BaseSyntheticEvent) => {
    console.log("送信データ:", data);
  };

  const onError = (errors: any, e?: React.BaseSyntheticEvent) => {
    console.log("バリデーションエラー:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register("firstName", { required: true })} />
      <input type="submit" />
    </form>
  );
}
```

### 非同期送信と try-catch

```tsx
const onSubmit = async (data: FormValues) => {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("送信失敗");
  } catch (error) {
    // エラーハンドリングを実装すること
    console.error(error);
  }
};

return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
```

### ボタンクリックでの呼び出し

```tsx
<button onClick={handleSubmit(onSubmit)}>送信</button>
```

## 重要なルール / 注意事項

- `handleSubmit` は非同期コールバックをサポートする。`async/await` が使用可能。
- `handleSubmit` は内部で発生したエラーを飲み込まない。`onSubmit` コールバック内で非同期リクエストを行う場合は、必ず `try-catch` でエラーハンドリングすること。
- `disabled` な input のフォームデータ値は `undefined` になる。値を保持したい場合は `disabled` ではなく `readOnly` を使用するか、`<fieldset disabled>` で囲む。
- `handleSubmit` の戻り値は `Promise<void>` であるため、`event.preventDefault()` は自動的に呼ばれる。
