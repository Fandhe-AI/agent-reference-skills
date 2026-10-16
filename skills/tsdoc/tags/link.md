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
- `{@linkcode}` / `{@linkplain}` は TSDoc 標準外の JSDoc タグ。TypeDoc が認識し、`@link` と同じ方式で解決する。eslint-plugin-tsdoc で使うには `tsdoc.json` で `typedoc/tsdoc.json` を `extends` する
- パイプ無しの `{@link Foo.Bar click here}` は TSDoc 非準拠（TypeDoc だけが受け付ける）。表示名は必ず `|` で区切る
- TypeDoc は既定（`--useTsLinkResolution`）で TypeScript のスコープ解決を使い、解決できない場合は declaration references にフォールバックする
