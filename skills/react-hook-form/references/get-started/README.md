# React Hook Form — Get Started

## インストール

```bash
npm install react-hook-form
```

## 基本例

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}
```

## フィールド登録

`register` 関数でフィールドを登録する。各フィールドには一意の `name` 属性が必要。

```tsx
<input {...register("firstName")} />
<select {...register("gender")}>
  <option value="female">female</option>
  <option value="male">male</option>
</select>
```

## バリデーションルール

HTML 標準のバリデーション属性に対応:

| ルール | 説明 |
|--------|------|
| `required` | 必須入力 |
| `min` / `max` | 数値の最小値/最大値 |
| `minLength` / `maxLength` | 文字数の最小/最大 |
| `pattern` | 正規表現パターン |
| `validate` | カスタムバリデーション関数 |

```tsx
<input {...register("firstName", { required: true, maxLength: 20 })} />
<input {...register("age", { pattern: /\d+/ })} />
```

## エラー表示

`formState.errors` オブジェクトからバリデーションエラーを取得:

```tsx
{errors.firstName?.type === "required" && <p>First name is required</p>}
{errors.firstName?.type === "maxLength" && <p>Max length exceeded</p>}
```

## UI ライブラリとの統合

外部 UI ライブラリ（MUI, React Select 等）は `Controller` で統合:

```tsx
import { useForm, Controller } from "react-hook-form"
import ReactSelect from "react-select"

function App() {
  const { control, handleSubmit } = useForm()
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="reactSelect"
        control={control}
        render={({ field }) => <ReactSelect {...field} options={options} />}
      />
      <input type="submit" />
    </form>
  )
}
```

## スキーマバリデーション

Yup, Zod, Superstruct, Joi 等の外部バリデーションライブラリと統合可能:

```bash
npm install @hookform/resolvers zod
```

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number().positive(),
})

type Schema = z.infer<typeof schema>

function App() {
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      <input type="number" {...register("age", { valueAsNumber: true })} />
      <input type="submit" />
    </form>
  )
}
```

## 設計思想

- **非制御コンポーネント**: `ref` ベースで最小限の再レンダリング
- **パフォーマンス重視**: マウント速度が速く、入力時の再レンダリングを抑制
- **HTML 標準準拠**: ネイティブフォームのバリデーション属性を活用
