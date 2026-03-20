# @inline / @inlineType / @preventInline

型エイリアスやインターフェースの変換時のインライン化を制御するタグ群。このページではブロックタグの `@inlineType`、`@preventInline` およびモディファイアタグの `@inline` を扱う。

## 構文

```
@inline
```

```
@inlineType 型名
```

```
@preventInline 型名
```

## 詳細説明

### @inline（モディファイアタグ）

型エイリアスやインターフェースに適用すると、参照される場所でTypeDocが型を展開してインライン表示する（型への参照を作成する代わりに）。

**制限事項**:
- 型パラメータを持つ型参照など、特定のケースではインライン化できない場合がある
- オブジェクトリテラル、ユニオン型、インターセクション型、リテラル型以外の型では正しくない結果を生成する可能性がある
- 一般的に使用される型にこのタグを使用すると、ドキュメントサイズが大幅に増加する可能性がある

### @inlineType（ブロックタグ）

特定の参照に対して選択的にインライン化を提供する。グローバルにインライン化を適用せずに、特定の場所で型をインライン化できる。タグには型引数なしの型名を指定する。

### @preventInline（ブロックタグ）

`@inline` でマークされた型のインライン化を防止し、代わりに名前付き参照を作成する。

**重要な注意**: TypeScript自体が基盤となる型構造で名前付き参照を生成しない場合、このタグは展開を防止できない。

## コード例

### @inline の使用

```typescript
/**
 * @inline
 */
export type HelloProps = {
    name: string;
    greeting?: string;
};

/** Renders a greeting */
export function Hello(props: HelloProps): JSX.Element;
```

### @inlineType の使用

```typescript
/**
 * @inlineType HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

### @preventInline の使用

```typescript
/**
 * @preventInline HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

## 注意点

- `@inline` はモディファイアタグ、`@inlineType` と `@preventInline` はブロックタグ
- `@inline` を頻繁に使用される型に適用するとドキュメントサイズが大幅に増加する
- TypeScriptが名前付き参照を生成しない場合、`@preventInline` は効果がない
- オブジェクトリテラル、ユニオン型、インターセクション型、リテラル型以外では不正確な結果になる可能性がある

## 関連

- [@expand](./expand.md) -- 型の展開制御（@expand, @expandType, @preventExpand）
