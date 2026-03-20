# useForm — control

`control` はフォームの内部制御を管理するオブジェクトで、`Controller`、`useWatch`、`useFormState`、`useFieldArray` などのコンポーネントやフックに渡して使用する。

## 取得方法

```typescript
const { control } = useForm();
```

## 用途

| 渡し先 | 説明 |
|--------|------|
| `Controller` | 外部の制御コンポーネント（MUI, Ant Design など）を React Hook Form と統合する |
| `useWatch` | 特定フィールドの値をリアクティブに監視する |
| `useFormState` | フォーム状態を部分的に購読する |
| `useFieldArray` | 動的なフィールド配列を管理する |
| `useController` | Controller のフック版 |

## コード例

### Controller での使用

```tsx
import { useForm, Controller } from "react-hook-form";

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: { firstName: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: "名前は必須です" }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input {...field} />
            {error && <span>{error.message}</span>}
          </div>
        )}
      />
      <input type="submit" />
    </form>
  );
}
```

### useWatch での使用

```tsx
import { useForm, useWatch } from "react-hook-form";

function WatchedField({ control }: { control: Control }) {
  const firstName = useWatch({ control, name: "firstName" });
  return <p>現在の値: {firstName}</p>;
}

function App() {
  const { control, register } = useForm({
    defaultValues: { firstName: "" },
  });

  return (
    <form>
      <input {...register("firstName")} />
      <WatchedField control={control} />
    </form>
  );
}
```

### useFieldArray での使用

```tsx
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { control, register } = useForm({
    defaultValues: { items: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form>
      {fields.map((field, index) => (
        <input key={field.id} {...register(`items.${index}.name`)} />
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        追加
      </button>
    </form>
  );
}
```

## 重要なルール / 注意事項

- `control` オブジェクトの内部プロパティに直接アクセスしてはならない。内部実装用であり、APIが変更される可能性がある。
- `control` は `useForm` から取得し、必要なコンポーネントやフックに prop として渡す。
- `useFormContext` を使用すると、`control` を prop として渡す代わりにコンテキスト経由で取得できる。
