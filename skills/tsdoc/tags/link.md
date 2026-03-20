# {@link}

他のシンボルや URL へのインラインリンクを作成するインラインタグ。

## 構文

```
{@link SymbolName}             シンボル名がリンクテキストになる
{@link SymbolName | 表示名}     カスタムリンクテキスト
{@linkcode SymbolName}         コードフォントでリンク表示
{@linkplain SymbolName}        プレーンテキストでリンク表示
```

## 使用例

### 関連型への参照

```typescript
/**
 * セレクトボックスコンポーネント。
 *
 * @remarks
 * 選択肢は {@link Option} 型の配列で指定する。
 * スタイルは {@linkcode styles} を参照。
 */
```

### @see との併用

```typescript
/**
 * Fieldset のルートコンポーネント。
 *
 * @see {@link useFieldset} コンテキスト値を取得するフック
 * @see {@link FieldsetContext | Fieldset コンテキスト} 内部コンテキスト定義
 */
```

### @deprecated との併用

```typescript
/**
 * @deprecated {@link fetchCompanyV2} を使用してください。
 */
```

## 注意

- インラインタグのため `{}` で囲む必要がある（`@link` だけでは動作しない）
- `{@linkcode}` はコードフォント（`<code>`）で表示される — 関数名や変数名に適している
- `{@linkplain}` はプレーンテキストで表示される
- `@see` や `@deprecated` の説明文内で使用することが多い
