# @see

関連するシンボルや外部リソースへの参照を示すブロックタグ。

## 構文

```
@see {@link TargetSymbol} 説明
@see https://example.com 説明
```

## 使用例

### 関連コンポーネントへの参照

```typescript
/**
 * Radix UI Select をベースにしたセレクトボックス。
 *
 * @see {@link Option} 選択肢の型定義
 * @see https://www.radix-ui.com/docs/primitives/components/select Radix UI Select ドキュメント
 */
```

### 関連フックへの参照

```typescript
/**
 * Fieldset のルートコンポーネント。
 *
 * @see {@link useFieldset} コンテキスト値を取得するフック
 */
```

## 注意

- シンボル参照には `{@link}` インラインタグを併用する
- 外部 URL はそのまま記述可能
- 複数の `@see` を記述可能
