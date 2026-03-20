# useForm — watch

`watch` メソッドは指定したフィールドの値の変更を監視し、条件付きレンダリングや値の表示に使用する。値が変更されると再レンダリングがトリガーされる。

## シグネチャ（オーバーロード）

### 単一フィールド監視

```typescript
watch(name: string, defaultValue?: unknown): unknown
```

### 複数フィールド監視

```typescript
watch(names: string[], defaultValue?: Record<string, unknown>): unknown[]
```

### 全フィールド監視

```typescript
watch(): Record<string, unknown>
```

### コールバック監視（非推奨）

```typescript
watch(
  callback: (data: Record<string, unknown>, info: { name?: string; type?: string }) => void,
  defaultValues?: Record<string, unknown>
): { unsubscribe: () => void }
```

> コールバック形式は非推奨。代わりに `subscribe()` メソッドを使用すること。

## 引数

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | 監視する単一フィールド名。 |
| `names` | `string[]` | 監視する複数フィールド名の配列。 |
| `defaultValue` | `unknown \| Record<string, unknown>` | `register` 前に返されるデフォルト値。 |
| `callback` | `Function` | （非推奨）値の変更時に呼ばれるコールバック関数。 |

## 戻り値

| 呼び出し方 | 戻り値 |
|------------|--------|
| `watch("name")` | フィールドの現在の値 |
| `watch(["name", "email"])` | 値の配列 `[nameValue, emailValue]` |
| `watch()` | 全フィールドのオブジェクト `{ name: value, ... }` |
| `watch(callback)` | `{ unsubscribe: () => void }` |

## コード例

### 単一フィールドの監視

```tsx
const { register, watch } = useForm({ defaultValues: { name: "" } });
const nameValue = watch("name");

return (
  <div>
    <input {...register("name")} />
    <p>入力値: {nameValue}</p>
  </div>
);
```

### 複数フィールドの監視

```tsx
const [firstName, lastName] = watch(["firstName", "lastName"]);

return (
  <p>
    フルネーム: {firstName} {lastName}
  </p>
);
```

### 条件付きレンダリング

```tsx
const { register, watch } = useForm();
const showEmail = watch("hasEmail");

return (
  <form>
    <input type="checkbox" {...register("hasEmail")} />
    {showEmail && <input {...register("email")} />}
  </form>
);
```

### 全フィールドの監視

```tsx
const formValues = watch();
console.log(formValues); // { firstName: "...", lastName: "...", ... }
```

## 重要なルール / 注意事項

- `defaultValue` を指定しない場合、`register` 前の初回レンダリングでは `undefined` が返される。`useForm` の `defaultValues` 指定を推奨。
- `defaultValue` と `useForm` の `defaultValues` の両方が設定されている場合、`defaultValue` が優先される。
- `watch` はルートレベルの再レンダリングをトリガーする。パフォーマンスが重要な場合は `useWatch` フックを検討すること。
- `watch` の結果はレンダリングフェーズ用に最適化されており、`useEffect` の依存配列には適さない。値の変更検知には外部の比較フックを使用すること。
- コールバック形式の `watch` は非推奨。代わりに `subscribe()` を使用すること。
