# FormProvider

`useForm` の全メソッドを React Context 経由で子コンポーネントに配信するプロバイダーコンポーネント。深くネストされたコンポーネントで `useFormContext` を使ってフォームメソッドにアクセスするために使用する。

## シグネチャ

```tsx
<FormProvider {...methods}>
  {children}
</FormProvider>
```

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `...props` | `UseFormReturn` | はい | `useForm()` が返す全メソッドをスプレッド演算子で渡す |

## 配信されるメソッド

`FormProvider` 経由で子コンポーネントに提供されるメソッド一覧:

| Name | Description |
|------|-------------|
| `register` | フィールドを登録する |
| `unregister` | フィールドの登録を解除する |
| `formState` | フォームの状態情報 |
| `watch` | フィールド値の変更を監視する |
| `handleSubmit` | フォーム送信を処理する |
| `reset` | フォーム値をリセットする |
| `resetField` | 個別フィールドをリセットする |
| `setError` | エラーを手動で設定する |
| `clearErrors` | バリデーションエラーをクリアする |
| `setValue` | フィールド値を更新する |
| `setFocus` | フィールドにフォーカスする |
| `getValues` | 現在の値を取得する |
| `trigger` | バリデーションを手動で実行する |
| `control` | フォーム制御オブジェクト |

## コード例

### 基本的な使い方

```tsx
import { useForm, FormProvider, useFormContext } from "react-hook-form";

function App() {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalInfo />
        <ContactInfo />
        <button type="submit">送信</button>
      </form>
    </FormProvider>
  );
}

function PersonalInfo() {
  const { register } = useFormContext();
  return (
    <div>
      <input {...register("firstName")} placeholder="名前" />
      <input {...register("lastName")} placeholder="姓" />
    </div>
  );
}

function ContactInfo() {
  const { register } = useFormContext();
  return <input {...register("email")} placeholder="メール" />;
}
```

### handleSubmit の使用

```tsx
function App() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <NestedFields />
        <SubmitButton />
      </form>
    </FormProvider>
  );
}

function SubmitButton() {
  const { formState: { isSubmitting } } = useFormContext();
  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  );
}
```

## 重要なルール

1. **スプレッド演算子で全メソッドを渡す**: `useForm` の返り値を `{...methods}` でスプレッドして渡すこと。個別のプロパティだけを渡すと `useFormContext` が正しく動作しない。

```tsx
// OK
<FormProvider {...methods}>

// NG: 個別に渡さない
<FormProvider control={methods.control} register={methods.register}>
```

2. **ネストした FormProvider は避ける**: 複数の `FormProvider` をネストすると、コンテキストの競合が発生する。1 つのフォームには 1 つの `FormProvider` を使用する。

```tsx
// NG: ネストしない
<FormProvider {...methodsA}>
  <FormProvider {...methodsB}>
    {/* コンテキスト競合 */}
  </FormProvider>
</FormProvider>
```

3. **useEffect 依存配列の注意**: `FormProvider` から取得したメソッドオブジェクト全体を `useEffect` の依存配列に入れないこと。必要な個別メソッド（例: `reset`）のみを指定する。
