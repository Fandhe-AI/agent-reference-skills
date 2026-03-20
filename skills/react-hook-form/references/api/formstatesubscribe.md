# FormStateSubscribe

`useFormState` フックのコンポーネント版。render prop パターンを使い、JSX 内で宣言的にフォーム状態を購読できる。購読したフィールドの状態が変更された時のみ再レンダリングされる。

## シグネチャ

```tsx
<FormStateSubscribe
  control={Control}
  name={string | string[]}  // 必須
  disabled={boolean}
  exact={boolean}
  render={Function}          // 必須
/>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `name` | `string \| string[]` | はい | - | 購読するフィールド名。単一、複数（配列）、または全フィールド |
| `disabled` | `boolean` | いいえ | `false` | 購読を無効化する |
| `exact` | `boolean` | いいえ | `false` | フィールド名の完全一致を有効にする |
| `render` | `Function` | はい | - | フォーム状態を受け取り React 要素を返す render 関数。状態変更時に再実行される |

## render 関数の引数

render 関数は `formState` オブジェクトを受け取る。

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | フォーム全体の変更状態 |
| `dirtyFields` | `object` | 変更されたフィールドの一覧 |
| `touchedFields` | `object` | タッチされたフィールドの一覧 |
| `defaultValues` | `object` | 初期値 |
| `isSubmitted` | `boolean` | フォームが送信されたかどうか |
| `isSubmitSuccessful` | `boolean` | 送信が成功したかどうか |
| `isSubmitting` | `boolean` | 送信中かどうか |
| `isLoading` | `boolean` | 非同期 defaultValues のロード中かどうか |
| `submitCount` | `number` | 送信回数 |
| `isValid` | `boolean` | バリデーションエラーがないかどうか |
| `isValidating` | `boolean` | バリデーション実行中かどうか |
| `validatingFields` | `object` | 非同期バリデーション中のフィールド |
| `errors` | `object` | フィールドエラーメッセージ |
| `disabled` | `boolean` | フォームが無効化されているかどうか |

## コード例

### 基本的な使い方

```tsx
import { useForm, FormStateSubscribe } from "react-hook-form";

function App() {
  const { register, control } = useForm({
    defaultValues: { foo: "", bar: "" },
  });

  return (
    <form>
      <input {...register("foo", { required: "必須です" })} />
      <input {...register("bar")} />

      <FormStateSubscribe
        control={control}
        name="foo"
        render={({ errors }) => (
          <span>{errors.foo?.message}</span>
        )}
      />
    </form>
  );
}
```

### 送信状態の表示

```tsx
<FormStateSubscribe
  control={control}
  name={["firstName", "lastName"]}
  render={({ isSubmitting, isValid }) => (
    <button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  )}
/>
```

### dirty 状態の表示

```tsx
<FormStateSubscribe
  control={control}
  name="email"
  exact={true}
  render={({ dirtyFields, errors }) => (
    <div>
      {dirtyFields.email && <span>変更あり</span>}
      {errors.email && <span className="error">{errors.email.message}</span>}
    </div>
  )}
/>
```

### FormProvider との併用

```tsx
import { useForm, FormProvider, FormStateSubscribe } from "react-hook-form";

function App() {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)}>
        <input {...methods.register("name")} />
        <StatusDisplay />
      </form>
    </FormProvider>
  );
}

function StatusDisplay() {
  // FormProvider 内では control 不要
  return (
    <FormStateSubscribe
      name="name"
      render={({ isDirty, errors }) => (
        <div>
          {isDirty && <p>フォームが変更されています</p>}
          {errors.name && <p>{errors.name.message}</p>}
        </div>
      )}
    />
  );
}
```

## 重要なルール

1. **render prop は必須**: `render` 関数は必ず指定する。フォーム状態オブジェクトを引数として受け取り、React 要素を返す。
2. **選択的な再レンダリング**: 指定したフィールドの状態が変更された時のみ再レンダリングされるため、パフォーマンスに優れる。
3. **useFormState との使い分け**: フックが使えない場面や、JSX 内で宣言的に状態を表示したい場合に `FormStateSubscribe` が適している。ロジック処理が必要な場合は `useFormState` を使用する。
4. **exact の活用**: `exact: true` を指定すると、指定したフィールド名に完全一致する状態変更のみで再レンダリングがトリガーされる。ネストされたフィールド名がある場合に有用。
