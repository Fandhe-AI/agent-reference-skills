# @category

関連するAPI項目を共通のヘッダー下に整理するためのブロックタグ。このページでは `@category`、`@categoryDescription`、`@showCategories`、`@hideCategories` を扱う。

## 構文

```
@category カテゴリ名
```

```
@categoryDescription カテゴリ名
カテゴリの説明文
```

## 詳細説明

### @category（ブロックタグ）

API項目をページのインデックス内で論理的なグループに配置する。複数回指定することで、1つのリフレクションを複数のカテゴリ見出し下に表示できる。

### @categoryDescription（ブロックタグ）

カテゴリに補足的なコンテキストを提供する。`@categoryDescription` の最初の行がカテゴリ名として使用され、続く行が説明として使用される。このタグは、カテゴリ化された子要素を含む親リフレクションのコメントブロックに配置する必要がある。

### @showCategories / @hideCategories（モディファイアタグ）

ナビゲーションツリーにおけるカテゴリの表示・非表示を選択的にカスタマイズするモディファイアタグ。`navigation.includeCategories` オプションと連携して動作する。

## コード例

```typescript
/**
 * @categoryDescription Advanced Use
 * These functions are intended for advanced users who need fine-grained control.
 */

/**
 * @category General Use
 */
export function basicFunction(): void;

/**
 * @category General Use
 * @category Advanced Use
 */
export function dualPurposeFunction(): void;

/**
 * @category Advanced Use
 */
export function advancedFunction(): void;
```

## 注意点

- 1つのリフレクションに複数の `@category` を指定可能
- `@categoryDescription` は子要素の親コメントに配置する
- `@showCategories` と `@hideCategories` はナビゲーションツリーのみに影響する

## 関連

- [@group](./group.md) -- 代替のグルーピングメカニズム
- `--categorizeByGroup` オプション
- `--defaultCategory` オプション
- `--categoryOrder` オプション
- `--searchCategoryBoosts` オプション
- `--navigation.includeCategories` オプション
