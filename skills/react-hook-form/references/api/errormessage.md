# ErrorMessage

React Hook Form のエラーメッセージを表示するためのコンポーネント。`@hookform/error-message` パッケージとして提供される。

## インストール

```bash
npm install @hookform/error-message
```

## シグネチャ

```tsx
import { ErrorMessage } from "@hookform/error-message";

<ErrorMessage
  name={string}           // 必須
  errors={object}
  message={string | ReactElement}
  as={ReactElementType | string}
  render={Function}
/>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | はい | - | 対象のフォームフィールド名 |
| `errors` | `object` | いいえ | - | `useForm` の `formState.errors` オブジェクト。`FormProvider` 使用時は省略可 |
| `message` | `string \| React.ReactElement` | いいえ | - | インラインで表示するエラーメッセージ |
| `as` | `React.ElementType \| string` | いいえ | - | ラッパー要素（例: `"span"`, `"p"`, カスタムコンポーネント） |
| `render` | `Function` | いいえ | - | エラー表示をカスタマイズする render 関数 |

## コード例

### 基本的な使い方（単一エラー）

```tsx
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        {...register("name", { required: "名前は必須です" })}
      />
      <ErrorMessage errors={errors} name="name" />
      <button type="submit">送信</button>
    </form>
  );
}
```

### render prop でカスタム表示

```tsx
<ErrorMessage
  errors={errors}
  name="email"
  render={({ message }) => <p className="error">{message}</p>}
/>
```

### as prop でラッパー要素を指定

```tsx
<ErrorMessage
  errors={errors}
  name="email"
  as="span"
/>
```

### message prop でインラインメッセージ

```tsx
<input {...register("name", { required: true })} />
<ErrorMessage
  errors={errors}
  name="name"
  message="このフィールドは必須です"
/>
```

### 複数エラーモード（criteriaMode: "all"）

`useForm` の `criteriaMode` を `"all"` に設定すると、1 つのフィールドに対する複数のバリデーションエラーを同時に表示できる。

```tsx
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all", // 全エラーを収集
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        {...register("password", {
          required: "パスワードは必須です",
          minLength: {
            value: 8,
            message: "8文字以上で入力してください",
          },
          pattern: {
            value: /[A-Z]/,
            message: "大文字を1文字以上含めてください",
          },
        })}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type} className="error">
              {message}
            </p>
          ))
        }
      />
      <button type="submit">送信</button>
    </form>
  );
}
```

## 重要なルール

1. **criteriaMode の設定**: 複数エラーを同時表示するには `useForm` で `criteriaMode: "all"` を設定する必要がある。デフォルトの `"firstError"` では最初のエラーのみ返される。
2. **render の引数**: 単一エラーモードでは `{ message }` を受け取り、複数エラーモードでは `{ messages }` オブジェクトを受け取る。`messages` は `{ [validationType]: message }` の形式。
3. **FormProvider との併用**: `FormProvider` 使用時は `errors` prop を省略できる。コンテキストから自動的にエラー情報を取得する。
4. **エラーが存在しない場合**: 対象フィールドにエラーがない場合、コンポーネントは何もレンダリングしない。
