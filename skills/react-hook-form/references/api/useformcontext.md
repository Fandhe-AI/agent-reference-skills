# useFormContext

深くネストされたコンポーネント構造で、props のバケツリレー（prop drilling）を避けるためのカスタムフック。`FormProvider` でラップされたコンポーネントツリー内で、フォームメソッドにアクセスできる。

## シグネチャ

```typescript
const methods = useFormContext<TFieldValues>(): UseFormReturn<TFieldValues>
```

## 前提条件

`useFormContext` を使用するには、親コンポーネントで `FormProvider` によるラップが必要。

## Return

`useForm` が返す全てのメソッドとプロパティを返す。

| Name | Type | Description |
|------|------|-------------|
| `register` | `Function` | フィールドを登録する |
| `unregister` | `Function` | フィールドの登録を解除する |
| `formState` | `Object` | フォームの状態情報 |
| `watch` | `Function` | フィールド値の変更を監視する |
| `handleSubmit` | `Function` | フォーム送信を処理する |
| `reset` | `Function` | フォーム値をリセットする |
| `resetField` | `Function` | 個別フィールドをリセットする |
| `setError` | `Function` | エラーを手動で設定する |
| `clearErrors` | `Function` | バリデーションエラーをクリアする |
| `setValue` | `Function` | フィールド値を更新する |
| `setFocus` | `Function` | フィールドにフォーカスする |
| `getValues` | `Function` | 現在の値を取得する |
| `getFieldState` | `Function` | フィールドの状態を取得する |
| `trigger` | `Function` | バリデーションを手動で実行する |
| `control` | `Object` | フォーム制御オブジェクト |

## コード例

### 基本的な使い方

```tsx
import { useForm, FormProvider, useFormContext } from "react-hook-form";

// 親コンポーネント
function App() {
  const methods = useForm({
    defaultValues: { firstName: "", lastName: "" },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <button type="submit">送信</button>
      </form>
    </FormProvider>
  );
}

// 子コンポーネント（深くネストされていても使用可能）
function NestedInput() {
  const { register } = useFormContext();
  return <input {...register("firstName")} />;
}
```

### フォーム状態の利用

```tsx
function SubmitButton() {
  const { formState: { isSubmitting, isValid } } = useFormContext();

  return (
    <button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  );
}
```

### エラー表示

```tsx
function ErrorDisplay({ name }) {
  const { formState: { errors } } = useFormContext();
  const error = errors[name];

  if (!error) return null;
  return <span role="alert">{error.message}</span>;
}
```

## 重要なルール

1. **FormProvider が必須**: `useFormContext` は `FormProvider` でラップされたコンポーネントツリー内でのみ動作する。ラップなしで使用すると `undefined` が返る。
2. **useEffect の依存配列に `methods` 全体を入れない**: `methods` オブジェクト全体を `useEffect` の依存配列に含めると、不要な再レンダリングや無限ループが発生する。必要な個別メソッド（例: `reset`）を依存配列に入れること。

```tsx
// NG: methods 全体を依存配列に入れる
const methods = useFormContext();
useEffect(() => {
  // ...
}, [methods]); // 無限ループの原因

// OK: 個別メソッドを依存配列に入れる
const { reset } = useFormContext();
useEffect(() => {
  reset(data);
}, [reset, data]);
```

3. **型安全性**: TypeScript で型パラメータを渡すことで、返されるメソッドに型が適用される。

```tsx
const { register } = useFormContext<{ firstName: string; lastName: string }>();
```
