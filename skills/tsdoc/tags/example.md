# @example

使用例をコードブロックで示すブロックタグ。

## 構文

```
@example
` ` `tsx
// コード例
` ` `
```

タイトル付き:

```
@example 基本的な使用
` ` `tsx
// コード例
` ` `
```

## 使用例

### コンポーネント

```typescript
/**
 * 星アイコンと数値で評価を表示するコンポーネント。
 *
 * @example
 * ```tsx
 * <StarRating rating={4.5} />
 * ```
 *
 * @example バリアント指定
 * ```tsx
 * <StarRating rating={3.0} size="sm" fractionDigits={1} />
 * ```
 */
```

### 複数の使用例

```typescript
/**
 * クリック可能な多態コンポーネント。
 *
 * @example ボタンとして使用
 * ```tsx
 * <Clickable onClick={handleClick}>送信</Clickable>
 * ```
 *
 * @example リンクとして使用
 * ```tsx
 * <Clickable href="/search">検索ページへ</Clickable>
 * ```
 *
 * @example 外部リンクとして使用
 * ```tsx
 * <Clickable href="https://example.com" target="_blank">外部サイト</Clickable>
 * ```
 */
```

## 注意

- 必ずコードフェンス（` ```tsx ` ... ` ``` `）で囲む（TypeDoc がコードブロックとして認識するために必要）
- 言語指定は `tsx`（React コンポーネント）または `typescript`（非コンポーネント）
- `@example タイトル` でタイトルを指定可能
- 複数の `@example` を記述可能
