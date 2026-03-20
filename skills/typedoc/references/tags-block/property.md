# @property / @prop

リフレクションの子要素にドキュメントコメントを追加するブロックタグ。

## 構文

```
@property プロパティ名 プロパティの説明
```

または

```
@prop プロパティ名 プロパティの説明
```

## 詳細説明

`@property` タグ（エイリアス: `@prop`）は、インラインコメントを配置するのが不便な場合にリフレクションの子要素にドキュメントコメントを追加するために使用される。

このタグは主に `@namespace` タグや `@interface` タグと組み合わせて使用することが想定されている。これらのタグで変換された型では、各メンバーにコメントを配置する便利な場所がない場合がある。

## コード例

### @interface との組み合わせ

```typescript
/**
 * This will be displayed as an interface
 * @property a comment for a
 * @prop b comment for b
 * @interface
 */
export type Resolved = Record<"a" | "b" | "c", string>;
```

上記は以下のように処理される：

```typescript
export interface Resolved {
    /** comment for a */
    a: string;
    /** comment for b */
    b: string;
    c: string;
}
```

## 注意点

- `@property` と `@prop` は同一の動作をする
- 主に `@namespace` や `@interface` タグと組み合わせて使用される
- 各プロパティに個別のJSDocコメントを記述しにくい場面で有用
- 文書化されないプロパティ（上記の例の `c`）はコメントなしで表示される

## 関連

- `@namespace` タグ -- 名前空間としての変換
- `@interface` タグ -- インターフェースとしての変換
- [@defaultValue](./defaultValue.md) -- プロパティのデフォルト値の文書化
