# FieldArray

`useFieldArray` フックのコンポーネント版。render prop パターンを使い、JSX 内で宣言的に動的フィールド配列（追加・削除・並べ替え）を管理できる。v7.81.0 以降で利用可能。

## シグネチャ

```tsx
<FieldArray
  name={string}
  control={Control}
  shouldUnregister={boolean}
  disabled={boolean}
  keyName={string}
  rules={Object}
  render={Function}       // 必須
/>
```

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `name` | `string` | はい | - | フィールド配列の識別子。動的な名前はサポートしない |
| `control` | `Control` | いいえ | - | `useForm` の制御オブジェクト。`FormProvider` 使用時は省略可 |
| `shouldUnregister` | `boolean` | いいえ | - | 非サポート。アンマウント時の自動解除は行われない |
| `disabled` | `boolean` | いいえ | `false` | `true` にすると全ての変更操作を無効化する |
| `keyName` | `string` | いいえ | `"id"` | 自動生成される識別子の属性名 |
| `rules` | `Object` | いいえ | - | 組み込みバリデーションルール |
| `render` | `Function` | はい | - | `useFieldArray` と同じ戻り値オブジェクトを受け取り、React 要素を返す render 関数 |

## コード例

```tsx
import { useForm, FieldArray } from "react-hook-form";

export default function App() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { test: [{ value: "" }] },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <FieldArray
        control={control}
        name="test"
        render={({ fields, append, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input {...register(`test.${index}.value`)} />
                <button onClick={() => remove(index)}>削除</button>
              </div>
            ))}
            <button onClick={() => append({ value: "" })}>追加</button>
          </>
        )}
      />
      <input type="submit" />
    </form>
  );
}
```

## 重要なルール

1. **render prop は必須**: `render` 関数は必ず指定する必要があり、`useFieldArray` の戻り値と同じオブジェクト（`fields`, `append`, `prepend`, `insert`, `swap`, `move`, `update`, `replace`, `remove`）を受け取る。
2. **key には `field.id` を使用する**: 配列の `index` ではなく、`field.id` を React の `key` に使用すること。
3. **render は毎レンダリング実行される**: 副作用を持たせないこと。
4. **`shouldUnregister: true` は非サポート**: `useFieldArray` と異なり、この props は機能しない。
5. **useFieldArray との使い分け**: ロジック処理が必要な場合は `useFieldArray` フック、JSX 内で宣言的に扱いたい場合は `FieldArray` コンポーネントが適している。

## Related

- [useFieldArray](./usefieldarray.md)
- [Watch](./watch-component.md)
