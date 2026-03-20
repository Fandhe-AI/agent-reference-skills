# useForm — getValues

`getValues` メソッドはフォームの値を取得する。`watch` と異なり、再レンダリングをトリガーせず、入力変更の購読も行わない。

## シグネチャ

```typescript
getValues: (payload?: string | string[]) => Object
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `string \| string[] \| undefined` | No | 取得対象の指定。 |

## 引数パターン

| パターン | 戻り値 | 説明 |
|----------|--------|------|
| 引数なし | `Record<string, unknown>` | 全フォーム値をオブジェクトで返す |
| `string` | `unknown` | 指定フィールドの値を返す |
| `string[]` | `unknown[]` | 指定フィールドの値を配列で返す |

## コード例

### 全フォーム値の取得

```tsx
import { useForm } from "react-hook-form";

function App() {
  const { register, getValues } = useForm({
    defaultValues: { firstName: "太郎", lastName: "山田" },
  });

  const handleClick = () => {
    const values = getValues();
    console.log(values);
    // { firstName: "太郎", lastName: "山田" }
  };

  return (
    <form>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="button" onClick={handleClick}>
        値を取得
      </button>
    </form>
  );
}
```

### 単一フィールドの取得

```tsx
const firstName = getValues("firstName");
// "太郎"
```

### 複数フィールドの取得

```tsx
const [firstName, lastName] = getValues(["firstName", "lastName"]);
// ["太郎", "山田"]
```

### ネストフィールドの取得

```tsx
const email = getValues("user.email");
const firstItem = getValues("items.0.title");
```

### dirty フィールドのみ取得

```tsx
const dirtyValues = getValues(undefined, { dirtyFields: true });
```

### touched フィールドのみ取得

```tsx
const touchedValues = getValues(undefined, { touchedFields: true });
```

### 条件分岐での使用

```tsx
const onSubmit = () => {
  const type = getValues("type");
  if (type === "premium") {
    // プレミアム向け処理
  }
};
```

## 重要なルール / 注意事項

- 再レンダリングをトリガーしない。また、入力変更を購読しない。値の変更に応じて UI を更新する場合は `watch` または `useWatch` を使用すること。
- 初回レンダリング前（`register` の前）は `useForm` の `defaultValues` を返す。
- イベントハンドラやコールバック内で現在のフォーム値を取得する場合に最適。
- リアクティブな値の監視には適さない。
