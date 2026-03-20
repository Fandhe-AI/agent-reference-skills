# React Hook Form — TypeScript

TypeScript 4.3+ が必要。

## 主要な型定義

### フォーム管理

| 型 | 説明 |
|----|------|
| `UseFormReturn<TFieldValues>` | `useForm` の戻り値。全メソッドとプロパティを含む |
| `UseFormProps<TFieldValues>` | `useForm` の設定オプション |
| `SubmitHandler<TFieldValues>` | `handleSubmit` の成功コールバック型 |
| `SubmitErrorHandler<TFieldValues>` | `handleSubmit` のエラーコールバック型 |
| `FieldValues` | フォーム値のベース制約（`Record<string, any>`） |
| `Mode` | バリデーションタイミング（`onChange | onBlur | onSubmit | onTouched | all`） |

### フィールド制御

| 型 | 説明 |
|----|------|
| `Control<TFieldValues>` | フォーム制御インスタンス。Controller, useWatch 等に渡す |
| `UseControllerProps<TFieldValues>` | `useController` の設定オプション |
| `UseControllerReturn<TFieldValues>` | `useController` の戻り値 |
| `RegisterOptions<TFieldValues>` | `register` のバリデーションルールオプション |

### フィールド配列

| 型 | 説明 |
|----|------|
| `UseFieldArrayProps<TFieldValues>` | `useFieldArray` の設定オプション |
| `UseFieldArrayReturn<TFieldValues>` | `useFieldArray` の戻り値（append, remove, swap 等） |
| `FieldArrayWithId<TFieldValues>` | 一意 ID 付きの配列アイテム |

### バリデーション・エラー

| 型 | 説明 |
|----|------|
| `Resolver<TFieldValues>` | カスタム非同期バリデーション関数のシグネチャ |
| `FieldError` | 個別フィールドのエラー構造（`{ type, message, ref }`） |
| `FieldErrors<TFieldValues>` | 全フィールドエラーのコレクション |
| `FormStateProxy<TFieldValues>` | フォーム状態フラグ（isDirty, isValid, isValidating） |

### ユーティリティ型

| 型 | 説明 |
|----|------|
| `FieldPath<TFieldValues>` | 型安全なフィールド名パス |
| `FieldPathByValue<TFieldValues, TValue>` | 特定の値型に一致するパス |
| `PathValue<TFieldValues, TPath>` | パスから値の型を推論 |

## 基本的な使い方

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
  firstName: string
  lastName: string
  age: number
}

function App() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="number" {...register("age", { valueAsNumber: true })} />
      <input type="submit" />
    </form>
  )
}
```

## Resolver の型定義

```tsx
import { Resolver } from "react-hook-form"

const resolver: Resolver<IFormInput> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? { firstName: { type: "required", message: "This is required." } }
      : {},
  }
}
```

## FieldPath を使った型安全なフィールド名

```tsx
import { FieldPath } from "react-hook-form"

function TypedInput<T extends FieldValues>({
  name,
  control,
}: {
  name: FieldPath<T>
  control: Control<T>
}) {
  const { field } = useController({ name, control })
  return <input {...field} />
}
```
