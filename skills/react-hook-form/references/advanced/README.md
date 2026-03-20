# React Hook Form — Advanced Usage

## アクセシビリティ (A11y)

スクリーンリーダー対応のフォーム:

```tsx
<input
  {...register("firstName", { required: true })}
  aria-invalid={errors.firstName ? "true" : "false"}
/>
{errors.firstName?.type === "required" && (
  <p role="alert">First name is required</p>
)}
```

- `aria-invalid` でフィールドのエラー状態を通知
- `role="alert"` でエラーメッセージをスクリーンリーダーに即座に読み上げ
- `htmlFor` でラベルと入力を関連付け

## ウィザードフォーム / ファネル

複数ステップのフォーム:

- 状態管理ライブラリ（little-state-machine, Redux 等）でステップ間のデータを保持
- 各ステップで個別のフォームを作成し、データを保存
- 最終ステップで全データを結合して送信

## スマートフォームコンポーネント

自動的にデータを収集する合成可能なフォーム:

```tsx
function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

function Input({ name, rules, ...rest }) {
  const { register } = useFormContext()
  return <input {...register(name, rules)} {...rest} />
}
```

## エラーメッセージの表示パターン

```tsx
// 1. register のメッセージ属性
<input {...register("test", { required: "This is required" })} />
<p>{errors.test?.message}</p>

// 2. オプショナルチェーン
<p>{errors?.test?.message}</p>

// 3. ErrorMessage コンポーネント
import { ErrorMessage } from "@hookform/error-message"
<ErrorMessage errors={errors} name="test" />
```

## Connect Form

render prop パターンで深くネストされた入力にアクセス:

```tsx
function ConnectForm({ children }) {
  const methods = useFormContext()
  return children({ ...methods })
}

// 使用例
<ConnectForm>
  {({ register }) => <input {...register("test")} />}
</ConnectForm>
```

## FormProvider パフォーマンス

Context ベースフォームの最適化:

- `React.memo` で不要な再レンダリングを防止
- `formState` を render 前に読み取り、Proxy 最適化を有効化
- DevTools と FormProvider の併用時は使用状況を監視

## 制御・非制御コンポーネントの混在

UI ライブラリ（MUI, Antd）との互換性:

```tsx
// アプローチ 1: Controller ラッパー
<Controller
  name="mui"
  control={control}
  render={({ field }) => <TextField {...field} />}
/>

// アプローチ 2: watch + setValue
const value = watch("custom")
<CustomInput value={value} onChange={(v) => setValue("custom", v)} />
```

## カスタムフック + Resolver

カスタムバリデーションリゾルバーの作成:

```tsx
const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, { abortEarly: false })
        return { values, errors: {} }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )
```

## 仮想リストとの連携

react-window 等の仮想化ライブラリとの併用:

- `FormProvider` + `VariableSizeList` で大量フィールドを表示
- `useFieldArray` + `FixedSizeList` で動的配列を仮想化
- DOM の再マウントを防止し、フォーム状態を保持

## テスト

### セットアップ

```bash
npm install -D @testing-library/react @testing-library/jest-dom
```

### テストパターン

```tsx
import { render, screen, fireEvent } from "@testing-library/react"

test("should display required error when value is invalid", async () => {
  render(<MyForm />)
  fireEvent.submit(screen.getByRole("button"))
  expect(await screen.findAllByRole("alert")).toHaveLength(2)
})

test("should submit when form is valid", async () => {
  render(<MyForm />)
  fireEvent.input(screen.getByRole("textbox", { name: /name/i }), {
    target: { value: "Bill" },
  })
  fireEvent.submit(screen.getByRole("button"))
  // 検証
})
```

**Act 警告の回避**: `await screen.findByText()` で非同期フォーム初期化を待つ。

## 値の変換 (Transform and Parse)

`Controller` で入力と出力の間で値を変換:

```tsx
<Controller
  name="price"
  control={control}
  render={({ field }) => (
    <input
      onChange={(e) => field.onChange(parseFloat(e.target.value))}
      value={field.value}
    />
  )}
/>
```
