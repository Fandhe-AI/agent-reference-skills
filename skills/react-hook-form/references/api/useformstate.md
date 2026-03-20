# useFormState

フォーム状態を購読するためのカスタムフック。カスタムフックレベルで再レンダリングを分離し、パフォーマンスを最適化する。Proxy を使用した購読メカニズムにより、アクセスしたプロパティのみが変更時に再レンダリングをトリガーする。

## シグネチャ

```typescript
useFormState(props?: UseFormStateProps): FormState
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `name` | `string \| string[]` | いいえ | - | 購読するフィールド名。単一、複数、または全フィールド |
| `disabled` | `boolean` | いいえ | `false` | 購読を無効化する |
| `exact` | `boolean` | いいえ | `false` | フィールド名の完全一致を有効にする |

## Return

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | ユーザーが入力を変更した後に `true`。`defaultValues` の設定が必要 |
| `dirtyFields` | `object` | ユーザーが変更したフィールドの一覧。フィールドレベルで追跡 |
| `touchedFields` | `object` | ユーザーが操作した全フィールドの一覧 |
| `defaultValues` | `object` | `useForm` または `reset` API で設定された初期値 |
| `isSubmitted` | `boolean` | フォーム送信後に `true`。`reset` するまで維持 |
| `isSubmitSuccessful` | `boolean` | ランタイムエラーなしに送信成功した場合に `true` |
| `isSubmitting` | `boolean` | フォーム送信中に `true` |
| `isLoading` | `boolean` | 非同期 `defaultValues` のロード中に `true` |
| `submitCount` | `number` | フォーム送信の試行回数 |
| `isValid` | `boolean` | バリデーションエラーがない場合に `true` |
| `isValidating` | `boolean` | バリデーション実行中に `true` |
| `validatingFields` | `object` | 非同期バリデーション中のフィールド |
| `errors` | `object` | フィールドエラーメッセージ |
| `disabled` | `boolean` | `useForm` の `disabled` プロパティで無効化されている場合に `true` |

## Proxy による購読メカニズム

`useFormState` の返り値は Proxy を使用してアクセスされたプロパティを追跡する。分割代入でプロパティを取り出すことで購読が有効になる。

```tsx
// OK: 分割代入で購読を有効にする
const { isDirty, errors } = useFormState({ control });

// NG: オブジェクト全体を受け取ると、どのプロパティが購読されるか不明確
const formState = useFormState({ control });
```

## コード例

### 基本的な使い方

```tsx
import { useForm, useFormState } from "react-hook-form";

function App() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: { firstName: "firstName" },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("firstName")} placeholder="名前" />
      <DirtyIndicator control={control} />
      <button type="submit">送信</button>
    </form>
  );
}

function DirtyIndicator({ control }) {
  const { dirtyFields } = useFormState({ control });

  return dirtyFields.firstName ? <p>名前フィールドが変更されました</p> : null;
}
```

### エラー表示

```tsx
function ErrorDisplay({ control, name }) {
  const { errors } = useFormState({ control, name });

  if (!errors[name]) return null;
  return <span role="alert">{errors[name].message}</span>;
}
```

### 送信状態の表示

```tsx
function SubmitStatus({ control }) {
  const { isSubmitting, isSubmitSuccessful, submitCount } = useFormState({
    control,
  });

  return (
    <div>
      {isSubmitting && <p>送信中...</p>}
      {isSubmitSuccessful && <p>送信成功!</p>}
      <p>送信回数: {submitCount}</p>
    </div>
  );
}
```

### 特定フィールドの購読

```tsx
function FieldStatus({ control }) {
  // "email" フィールドの状態のみを購読
  const { errors, dirtyFields } = useFormState({
    control,
    name: "email",
    exact: true,
  });

  return (
    <div>
      {dirtyFields.email && <span>変更あり</span>}
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}
```

## 重要なルール

1. **defaultValues の設定が必要**: `isDirty` を正確に追跡するには、`useForm` で全入力の `defaultValues` を設定する必要がある。
2. **Proxy による最適化**: 分割代入でアクセスしたプロパティのみが購読される。不要なプロパティにアクセスしないことでパフォーマンスが向上する。
3. **dirtyFields と isDirty の違い**: `isDirty` はフォーム全体の変更状態、`dirtyFields` は個別フィールドの変更を追跡する。用途に応じて使い分けること。
4. **ファイル入力の制限**: ファイル入力の dirty 状態はアプリケーションレベルで管理する必要がある。
5. **カスタムオブジェクトの制限**: カスタムオブジェクト、クラス、`File` オブジェクトのデータ型は追跡できない。
