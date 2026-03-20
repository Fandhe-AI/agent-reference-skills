# createFormControl

React Context を使わずにフォーム状態を作成する関数。v7.55.0 以降で利用可能。`FormProvider` でラップせずにフォームメソッドを直接使用でき、`subscribe` でコンポーネントの再レンダリングなしにフォーム状態を購読できる。

## バージョン要件

- v7.55.0+（オプション機能）

## シグネチャ

```typescript
createFormControl<TFieldValues>(
  props?: UseFormProps<TFieldValues>
): CreateFormControlReturn<TFieldValues>
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `props` | `UseFormProps` | いいえ | `useForm` と同じ設定オプション（`defaultValues`, `mode`, `resolver` など） |

## Return

| Name | Type | Description |
|------|------|-------------|
| `formControl` | `Object` | `useForm` フックに統合するための制御オブジェクト |
| `control` | `Object` | `useController`, `useFormState`, `useWatch` で使用する制御オブジェクト |
| `subscribe` | `Function` | 再レンダリングなしでフォーム状態の変更を購読する |
| `register` | `Function` | フィールドを登録する |
| `unregister` | `Function` | フィールドの登録を解除する |
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
| `watch` | `Function` | フィールド値の変更を監視する |
| `formState` | `Object` | フォームの状態情報 |

## コード例

### 基本的な使い方

```tsx
import { createFormControl } from "react-hook-form";

// フォーム制御をコンポーネント外で作成
const {
  register,
  handleSubmit,
  control,
  formState,
  subscribe,
} = createFormControl({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
  },
});

function App() {
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input {...register("email")} />
      <button type="submit">送信</button>
    </form>
  );
}
```

### subscribe による再レンダリングなしの購読

```tsx
const { register, handleSubmit, subscribe } = createFormControl({
  defaultValues: { name: "" },
});

// 再レンダリングなしでフォーム状態を購読
const unsubscribe = subscribe({
  formState: {
    // 購読したい状態を指定
    isDirty: true,
    errors: true,
  },
  callback: (formState) => {
    // フォーム状態が変更されたときに呼ばれる
    console.log("isDirty:", formState.isDirty);
    console.log("errors:", formState.errors);

    // DOM を直接操作するなど、React 外の処理に有用
    document.getElementById("status").textContent = formState.isDirty
      ? "変更あり"
      : "変更なし";
  },
});

// 不要になったら購読解除
unsubscribe();
```

### useForm の formControl と統合

```tsx
import { useForm, createFormControl } from "react-hook-form";

const { formControl } = createFormControl({
  defaultValues: { name: "" },
});

function App() {
  // formControl を useForm に渡して統合
  const { register, handleSubmit } = useForm({
    formControl,
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("name")} />
      <button type="submit">送信</button>
    </form>
  );
}
```

### useController との併用

```tsx
import { useController } from "react-hook-form";

const { control, handleSubmit } = createFormControl({
  defaultValues: { date: new Date() },
});

function DateField() {
  const { field } = useController({
    control,
    name: "date",
  });

  return (
    <DatePicker
      value={field.value}
      onChange={field.onChange}
    />
  );
}
```

## 重要なルール

1. **Context API か createFormControl のどちらかを使う**: 両方を同時に使用しないこと。`createFormControl` を使用する場合は `FormProvider` でラップしない。

2. **FormProvider は不要**: `createFormControl` はコンポーネントツリー外でフォーム状態を作成するため、`FormProvider` によるラップが不要。メソッドを直接インポートして使用できる。

3. **subscribe の用途**: `subscribe` はコンポーネントの再レンダリングをトリガーせずにフォーム状態の変更を購読する。パフォーマンスが重要な場面や、DOM 直接操作、外部ライブラリとの統合に適している。

4. **オプション機能**: `createFormControl` は完全にオプションであり、従来の `useForm` + `useFormContext` パターンの代替手段として提供される。

5. **非 React 環境**: React コンポーネント外でフォーム状態が必要な場合（例: ユーティリティ関数、外部ライブラリ統合）に特に有用。
