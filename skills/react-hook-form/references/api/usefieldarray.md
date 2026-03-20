# useFieldArray

動的なフォームフィールド（追加・削除・並べ替え）を管理するためのカスタムフック。パフォーマンスとユーザー体験を最適化した配列操作を提供する。

## シグネチャ

```typescript
useFieldArray(props: UseFieldArrayProps): UseFieldArrayReturn
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | はい | - | フィールド配列の識別子。動的な名前はサポートしない |
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `shouldUnregister` | `boolean` | いいえ | - | アンマウント時にフィールド配列の登録を解除する |
| `keyName` | `string` | いいえ | `"id"` | 自動生成される識別子の属性名（非推奨） |
| `rules` | `Object` | いいえ | - | 組み込みバリデーションルール: `required`, `minLength`, `maxLength`, `validate` |

## Return

| Name | Type | Description |
|------|------|-------------|
| `fields` | `object[] & { id: string }` | defaultValue と一意な `id` を含むフィールド配列 |
| `append` | `(obj: object \| object[], focusOptions?) => void` | 配列の末尾にフィールドを追加する |
| `prepend` | `(obj: object \| object[], focusOptions?) => void` | 配列の先頭にフィールドを追加する |
| `insert` | `(index: number, value: object \| object[], focusOptions?) => void` | 指定位置にフィールドを挿入する |
| `swap` | `(from: number, to: number) => void` | 2 つのフィールドの位置を入れ替える |
| `move` | `(from: number, to: number) => void` | フィールドを別の位置に移動する |
| `update` | `(index: number, obj: object) => void` | 指定位置のフィールドを置き換える。コンポーネントが再マウントされる |
| `replace` | `(obj: object[]) => void` | フィールド配列全体を置き換える |
| `remove` | `(index?: number \| number[]) => void` | 指定位置のフィールドを削除する。引数なしで全削除 |

## コード例

### 基本的な使い方

```tsx
import { useForm, useFieldArray } from "react-hook-form";

function App() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} />
          <button type="button" onClick={() => remove(index)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "" })}>
        追加
      </button>
      <button type="submit">送信</button>
    </form>
  );
}
```

### ネストされたフィールド配列

```tsx
function NestedFieldArray({ nestIndex, control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items.${nestIndex}.subItems`,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`items.${nestIndex}.subItems.${index}.value`)}
          />
          <button type="button" onClick={() => remove(index)}>
            削除
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ value: "" })}>
        サブアイテム追加
      </button>
    </div>
  );
}
```

### バリデーション付き

```tsx
const { fields, append } = useFieldArray({
  control,
  name: "items",
  rules: {
    required: "最低1つのアイテムが必要です",
    minLength: {
      value: 1,
      message: "最低1つのアイテムが必要です",
    },
    maxLength: {
      value: 10,
      message: "アイテムは10個までです",
    },
  },
});
```

### 操作の組み合わせ

```tsx
// 複数のフィールドを一括追加
append([{ name: "アイテム1" }, { name: "アイテム2" }]);

// フィールドの入れ替え
swap(0, 1);

// フィールドの移動
move(2, 0); // index 2 を index 0 に移動

// 指定位置に挿入
insert(1, { name: "挿入アイテム" });

// 特定のフィールドを更新
update(0, { name: "更新された値" });

// フィールド配列全体を置き換え
replace([{ name: "新アイテム1" }, { name: "新アイテム2" }]);

// 複数のフィールドを削除
remove([0, 2]); // index 0 と 2 を削除

// 全フィールドを削除
remove();
```

## 重要なルール

1. **key には `field.id` を使用する**: 配列の `index` ではなく、`field.id` を React の `key` に使用すること。

```tsx
// OK
{fields.map((field, index) => (
  <div key={field.id}>...</div>
))}

// NG: index を key に使わない
{fields.map((field, index) => (
  <div key={index}>...</div>
))}
```

2. **defaultValues の設定が必須**: `useForm` で配列フィールドの `defaultValues` を設定する必要がある。

```tsx
const { control } = useForm({
  defaultValues: {
    items: [{ name: "" }], // 必須
  },
});
```

3. **append/prepend/insert/update には完全なオブジェクトを渡す**: 全てのプロパティを含むオブジェクトを渡すこと。空オブジェクトや部分的なデータは不可。

```tsx
// OK
append({ name: "", email: "" });

// NG: 空オブジェクト
append({});
```

4. **複数操作は useEffect 内で**: `remove` などのアクションは 2 回目のレンダリング後に実行されるため、複数の操作を順次実行する場合は `useEffect` 内で行う。

```tsx
// NG: onClick 内で複数操作をスタックしない
onClick={() => {
  remove(0);
  remove(1); // 意図通りに動作しない
}}

// OK: useEffect 内で
useEffect(() => {
  remove(0);
}, [condition]);
```

5. **1 つの名前に 1 つの useFieldArray**: 同じフィールド名に対して複数の `useFieldArray` を使用しないこと。

6. **フラット配列と循環参照は非サポート**: フィールド配列はオブジェクトの配列である必要がある。フラットな値の配列（`string[]` など）や循環参照はサポートされない。

7. **TypeScript での型アサーション**: ネストされた配列のパスは `as const` でキャストする。

```typescript
{...register(`items.${index}.name` as const)}
```
