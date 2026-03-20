# useForm — getFieldState

`getFieldState` メソッドは個別フィールドの状態（dirty, touched, エラー）を取得する。v7.25.0 以降で利用可能。

## シグネチャ

```typescript
getFieldState: (
  name: string,
  formState?: FormState
) => {
  isDirty: boolean;
  isTouched: boolean;
  invalid: boolean;
  error: FieldError | undefined;
}
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | 状態を取得するフィールド名。 |
| `formState` | `FormState` | No | `formState` オブジェクト。フォーム状態の購読が別途行われていない場合に必要。 |

## 戻り値

| Name | Type | Description |
|------|------|-------------|
| `isDirty` | `boolean` | フィールドが `defaultValues` から変更されたかどうか。`dirtyFields` の購読が前提。 |
| `isTouched` | `boolean` | フィールドがフォーカス→ブラーされたかどうか。`touchedFields` の購読が前提。 |
| `invalid` | `boolean` | フィールドが有効でないかどうか。`errors` の購読が前提。 |
| `error` | `FieldError \| undefined` | フィールドのエラーオブジェクト。`errors` の購読が前提。 |

## コード例

### useForm と組み合わせた使用

```tsx
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    getFieldState,
    formState,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { firstName: "" },
  });

  // formState を購読済みなので第2引数は不要
  const fieldState = getFieldState("firstName");

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <p>isDirty: {fieldState.isDirty ? "はい" : "いいえ"}</p>
      <p>isTouched: {fieldState.isTouched ? "はい" : "いいえ"}</p>
      <p>invalid: {fieldState.invalid ? "はい" : "いいえ"}</p>
      {fieldState.error && <p>エラー: {fieldState.error.message}</p>}
    </form>
  );
}
```

### formState を明示的に渡す

```tsx
const { getFieldState, formState } = useForm();

// formState を第2引数に渡す
const fieldState = getFieldState("firstName", formState);
```

### useFormContext と組み合わせた使用

```tsx
import { useFormContext } from "react-hook-form";

function FieldInfo({ name }: { name: string }) {
  const { getFieldState, formState } = useFormContext();
  const { isDirty, error } = getFieldState(name, formState);

  return (
    <div>
      {isDirty && <span>変更あり</span>}
      {error && <span>{error.message}</span>}
    </div>
  );
}
```

### useFormState と組み合わせた使用

```tsx
import { useForm, useFormState } from "react-hook-form";

function App() {
  const { register, control, getFieldState } = useForm();
  const formState = useFormState({ control });

  const { isDirty, isTouched } = getFieldState("firstName", formState);
}
```

## 重要なルール / 注意事項

- v7.25.0 以降で利用可能。
- フィールド名が登録済みのフィールドに一致しない場合、`isDirty: false`、`isTouched: false`、`invalid: false`、`error: undefined` が返される。
- `formState` の購読が前提条件。以下のいずれかの方法で購読が必要:
  - `useForm()` から `formState` をデストラクチャリング
  - `useFormContext()` で `formState` を取得
  - `useFormState()` で `formState` を取得
  - 第2引数に `formState` を直接渡す
- 購読されていない `formState` プロパティに対応する戻り値は正確でない場合がある。
