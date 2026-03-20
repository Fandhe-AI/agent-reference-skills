# @import

JavaScriptプロジェクトで型インポートを宣言するためのブロックタグ。

## 構文

```
@import { 型名 } from "モジュール名"
```

## 詳細説明

`@import` タグはJavaScriptプロジェクトで使用するために認識される。TypeScript 5.5以降の機能を利用して、JavaScriptファイル内でJSDocコメントを通じて型インポートを宣言できる。

`@import` を含むコメントはTypeDocによって無視される。つまり、このタグはTypeScriptコンパイラのための型情報提供が目的であり、生成されるドキュメントには影響しない。

## コード例

```javascript
/** @import { SomeType } from "some-module" */

/**
 * @param {SomeType} myValue
 */
function doSomething(myValue) {
    // ...
}
```

## 注意点

- JavaScriptプロジェクト専用のタグ
- TypeScript 5.5以降で導入された機能に対応
- `@import` を含むコメントブロック全体がTypeDocによって無視される
- 生成されるドキュメントには一切表示されない
- TypeScriptプロジェクトでは通常の `import` 文を使用するべき

## 関連

- [TypeScript 5.5リリースノート - @import JSDocタグ](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag)
