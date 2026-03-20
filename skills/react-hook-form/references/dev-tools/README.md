# React Hook Form — DevTools

## インストール

```bash
npm install -D @hookform/devtools
```

## 使い方

```tsx
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

export default function App() {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  })

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <label>Test</label>
        <input {...register("test")} />
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </>
  )
}
```

## Props

| Prop | 型 | 必須 | 説明 |
|------|-----|------|------|
| `control` | `Control` | Yes | `useForm` から取得した control オブジェクト |

## 機能

- **フォーム状態の確認**: 入力値とフォーム全体の状態をリアルタイムで表示
- **バリデーションフィードバック**: 各フィールドの有効性を視覚的に表示
- **入力検索**: 登録済みフィールドやカスタムコンポーネントを検索
- **ネイティブ入力確認**: 大規模フォーム内で特定入力を素早く特定

## 注意事項

- 開発依存（`-D`）としてインストールし、本番ビルドには含めない
- 非制御入力がベースのため、Update ボタンで最新状態を更新表示する
- `control` prop の受け渡しが必須
