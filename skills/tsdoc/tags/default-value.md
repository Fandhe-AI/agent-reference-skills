# @defaultValue

プロパティやパラメータのデフォルト値を明示するブロックタグ。

## 構文

```
@defaultValue 値
```

## 使用例

### Props interface のプロパティ

```typescript
interface Props extends ComponentProps<"div">, VariantProps<typeof styles> {
  /** 評価値（0〜5 の数値） */
  rating: number;
  /**
   * 小数点以下の桁数。
   *
   * @defaultValue 2
   */
  fractionDigits?: number;
}
```

### tailwind-variants の defaultVariants 対応

```typescript
interface Props extends ComponentProps<"button">, VariantProps<typeof styles> {
  /**
   * ボタンの視覚スタイル。
   *
   * @defaultValue "primary"
   */
  variant?: "primary" | "secondary" | "outline";
  /**
   * ボタンのサイズ。
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md" | "lg";
}
```

## 注意

- バッククォートで値を囲まない（`@defaultValue 2` が正しく、`` @defaultValue `2` `` は不正）
- `tailwind-variants` の `defaultVariants` で設定される値と一致させる
- TypeDoc はこの値をプロパティの説明に表示する
