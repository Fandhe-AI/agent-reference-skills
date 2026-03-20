# useForm — reset

`reset` メソッドはフォーム全体の状態（値、エラー、dirty 状態など）をリセットする。オプションで特定の状態のみ保持しつつリセットすることも可能。

## シグネチャ

```typescript
reset: <T extends FieldValues>(
  values?: T | ResetAction<T>,
  options?: KeepStateOptions
) => void
```

## 引数

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `values` | `T \| ResetAction<T>` | No | リセット先の値。省略時は `defaultValues` に戻る。関数を渡すと現在の値を引数に新しい値を返せる。 |
| `options` | `KeepStateOptions` | No | 状態保持オプション。 |

## オプション

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keepErrors` | `boolean` | `false` | エラーを保持する。ただし後続のユーザー操作で更新される可能性がある。 |
| `keepDirty` | `boolean` | `false` | `isDirty` と `dirtyFields` の状態を保持する。実際の入力値は反映しない。 |
| `keepDirtyValues` | `boolean` | `false` | dirty なフィールドの値を保持し、クリーンなフィールドのみ更新する。 |
| `keepValues` | `boolean` | `false` | フォーム入力値を変更しない。 |
| `keepDefaultValues` | `boolean` | `false` | 元の `defaultValues` を保持する。 |
| `keepIsSubmitted` | `boolean` | `false` | `isSubmitted` の状態を保持する。 |
| `keepTouched` | `boolean` | `false` | `touchedFields` の状態を保持する。 |
| `keepIsValid` | `boolean` | `false` | `isValid` の状態を一時的に保持する。 |
| `keepSubmitCount` | `boolean` | `false` | `submitCount` を保持する。 |

## コード例

### 基本的なリセット

```tsx
const { register, handleSubmit, reset } = useForm({
  defaultValues: { firstName: "", lastName: "" },
});

// デフォルト値にリセット
reset();

// 新しい値でリセット（defaultValues も更新）
reset({ firstName: "太郎", lastName: "山田" });
```

### 特定の状態を保持してリセット

```tsx
// dirty なフィールドの値を保持
reset(undefined, { keepDirtyValues: true });

// エラーを保持してリセット
reset(undefined, { keepErrors: true });

// 値を保持して状態のみリセット
reset(undefined, { keepValues: true });
```

### 送信成功後のリセット

```tsx
const { handleSubmit, reset, formState } = useForm();

useEffect(() => {
  if (formState.isSubmitSuccessful) {
    reset();
  }
}, [formState.isSubmitSuccessful, reset]);
```

### 関数でリセット値を計算

```tsx
reset((formValues) => ({
  ...formValues,
  firstName: "リセット済み",
}));
```

### 外部データでリセット

```tsx
useEffect(() => {
  async function fetchData() {
    const response = await fetch("/api/user");
    const data = await response.json();
    reset(data);
  }
  fetchData();
}, [reset]);
```

## 重要なルール / 注意事項

- Controller コンポーネントをリセットするには、`useForm` に `defaultValues` を提供する必要がある。
- `useForm` の `useEffect` が実行される前に `reset` を呼び出してはならない。サブスクリプションの初期化が必要。
- 送信成功後のリセットは `useEffect` 内で行い、実行順序を保証すること。
- `reset` に値を渡すと、`defaultValues` も更新される（`keepDefaultValues: true` を指定しない限り）。
- `values` を渡さず `options` のみ渡す場合は、第1引数に `undefined` を指定する。
