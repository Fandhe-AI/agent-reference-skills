# @label

オーバーロードされた関数シグネチャに名前を付けるインラインタグ。付けた名前は宣言リファレンス（Declaration Reference）で参照できる。TSDoc仕様（https://tsdoc.org/pages/tags/label/）に対応。

## 構文

```
{@label IDENTIFIER}
```

### 識別子の制約

`@label` に指定する識別子は以下の規則に従う必要がある：

- 大文字アルファベット（A-Z）、数字（0-9）、アンダースコア（_）のみ使用可能
- 数字で始めることはできない
- この規則に合致しない場合、TypeDocは宣言リファレンスの作成時にラベルを利用できない

## 詳細説明

### 目的

関数のオーバーロードが複数存在する場合、パラメータシグネチャではなく名前で特定のオーバーロードを参照できるようにする。`@label` で付けた名前は `@link` タグの宣言リファレンス構文で使用できる。

### 宣言リファレンスでの参照

ラベルを付けたシグネチャは、コロン（`:`）区切りで参照する：

```
{@link functionName:LABEL_NAME}
```

### TSDocとの互換性

TSDocは `@label` をコアタグとして定義しているが、TypeDocが実装している宣言リファレンスの形式（`functionName:LABEL`）はTSDoc標準では許可されていない。TypeDocは宣言リファレンスの文法を拡張してこの機能をサポートしている。

## コード例

### オーバーロード関数のラベル付け

```typescript
/** {@label BASE} */
export function round(x: number): number;

/** {@label PRECISION} */
export function round(x: number, y: number): number;

export function round(x: number, y = 0): number {
  const factor = 10 ** y;
  return Math.round(x * factor) / factor;
}
```

### ラベルを使った参照

```typescript
/**
 * 精度指定で丸めた値。
 * 丸め処理には {@link round:PRECISION} を使用。
 */
export const rounded = round(123.456, 2);
```

### 別の関数からの参照

```typescript
/**
 * {@link round:BASE} は整数への丸めを行い、
 * {@link round:PRECISION} は指定桁数での丸めを行う。
 */
export function formatNumber(value: number): string {
  return round(value, 2).toFixed(2);
}
```

## 注意点

- 識別子は大文字英字・数字・アンダースコアのみ（例: `BASE`, `PRECISION`, `WITH_OPTIONS`）
- 識別子は数字で始められない（例: `2ND` は不可、`SECOND` は可）
- TypeDocの宣言リファレンス拡張を使用しているため、標準TSDocとの完全な互換性はない
- 主にオーバーロード関数の特定シグネチャを明確に参照するために使用する

## 関連

- [@link](./link.md) — ラベルを参照するためのリンクタグ
- [Declaration References](../guides/declaration-references.md) — 宣言リファレンスの構文
