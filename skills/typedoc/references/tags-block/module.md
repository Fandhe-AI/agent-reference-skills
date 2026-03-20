# @module

コメントがファイル全体を参照することを示し、オプションでモジュール名を変更するブロックタグ。

## 構文

```
@module
```

または

```
@module モジュール名
```

## 詳細説明

`@module` タグはコメントが特定の宣言ではなくファイル全体を参照するものとしてマークする。オプションでモジュール名を指定して、TypeDocの自動命名が不正確な場合にリネームできる。

**配置ルール**: `@module` タグを使用するコメントブロックはファイルの最初のコメントでなければならない。できれば `import` 文の前に配置する。

TSDocの `@packageDocumentation` タグも同様の機能を持つが、モジュールのリネームはできない。

`@module` または `@packageDocumentation` のいずれかを含めないと、ファイルレベルのコメントが次の `import` 文のドキュメントとして誤って解釈される可能性がある。

## コード例

### モジュール名を変更する場合

```typescript
/**
 * This is the doc comment for the module
 * @module my-module
 */

import { something } from "somewhere";
```

### モジュール名を変更しない場合

```typescript
/**
 * This is the doc comment for the module
 * @module
 */

import { something } from "somewhere";
```

### 間違った使用例

```typescript
// @module タグなし -- このコメントはimport文のドキュメントとして扱われる
/**
 * This comment will be associated with the import below, not the module
 */
import { something } from "somewhere";
```

## 注意点

- ファイルの最初のコメントブロックに配置しなければならない
- `import` 文の前に配置することを推奨
- `@module` なしのファイルレベルコメントは次の宣言のドキュメントとして解釈される
- `@packageDocumentation` はリネーム機能がない代替手段

## 関連

- [@mergeModuleWith](./mergeModuleWith.md) -- モジュールの統合
- `@packageDocumentation` -- TSDoc標準のファイルレベルドキュメント
