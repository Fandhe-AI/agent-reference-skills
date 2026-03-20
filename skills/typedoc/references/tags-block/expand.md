# @expand / @expandType / @preventExpand

型エイリアスやインターフェースのドキュメントでの表示方法を制御するタグ群。このページではブロックタグの `@expandType`、`@preventExpand` およびモディファイアタグの `@expand` を扱う。

## 構文

```
@expand
```

```
@expandType 型名
```

```
@preventExpand 型名
```

## 詳細説明

### @expand（モディファイアタグ）

型エイリアスやインターフェースに配置すると、その型が参照されるすべての場所でTypeDocが型宣言をインライン展開する。

**注意**: このタグを一般的に使用される型に適用すると、生成されるドキュメントのサイズが大幅に増加する可能性がある。

Reactコンポーネントに特に有用で、コンポーネント関数自体を閲覧する際にプロパティのドキュメントが表示されるようになる。

### @expandType（ブロックタグ）

任意のリフレクションに配置して、レンダリング時に特定の型参照を展開する。タグには型引数なしの型名を指定する。

このタグは名前空間やモジュール全体で継承されるため、単一の宣言でスコープ全体の型を展開できる。

### @preventExpand（ブロックタグ）

`@expand`、`@expandType`、または `@param` ドキュメントを介して展開される型の展開を明示的に防止する。選択的に展開を無効化するための細かい制御を提供する。

## コード例

### @expand の使用

```typescript
/**
 * @expand
 */
export type HelloProps = {
    name: string;
    greeting?: string;
};

/** Renders a greeting */
export function Hello(props: HelloProps): JSX.Element;
```

### @expandType の使用

```typescript
/**
 * @expandType HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

### @preventExpand の使用

```typescript
/**
 * @preventExpand HelloProps
 */
export function Hello(props: HelloProps): JSX.Element;
```

## 注意点

- `@expand` はモディファイアタグ、`@expandType` と `@preventExpand` はブロックタグ
- `@expand` を頻繁に使用される型に適用するとドキュメントサイズが大幅に増加する
- `@expandType` は名前空間/モジュール間で継承される
- `@preventExpand` は `@expand` や `@expandType` による展開をオーバーライドできる

## 関連

- [inline-type](./inline-type.md) -- 型のインライン化制御（@inline, @inlineType, @preventInline）
- [@param](./param.md) -- パラメータの型展開との関連
