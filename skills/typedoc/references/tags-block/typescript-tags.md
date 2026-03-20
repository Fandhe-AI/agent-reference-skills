# TypeScript Tags

TypeDocが互換性のために認識するTypeScript固有のブロックタグ群。このページでは `@type`、`@yields`、`@jsx`、`@typedef`、`@extends`、`@augments`、`@satisfies`、`@callback` を扱う。

## 構文

```
@type {型}
@yields {型} 説明
@jsx pragma
@typedef {型} 名前
@extends {型}
@augments {型}
@satisfies {型}
@callback 名前
```

## 詳細説明

TypeDocはこれらのTypeScript固有のブロックタグを互換性のために認識する。TypeDocはこれらのタグの存在に特別な動作を付与せず、生成されるドキュメントから削除する。

これらのタグはブロックタグとして解析されるが、TypeDocのドキュメント出力には一切反映されない。TypeScriptのJSDocサポートとの互換性のために認識されるのみ。

### 認識されるタグ一覧

| タグ | 説明 |
|------|------|
| `@type` | 変数やプロパティの型を指定（JSDoc） |
| `@yields` | ジェネレータ関数のyield型を文書化 |
| `@jsx` | JSXプラグマを指定 |
| `@typedef` | カスタム型を定義（JSDoc） |
| `@extends` | クラスの継承を文書化（JSDoc） |
| `@augments` | `@extends` の同義語 |
| `@satisfies` | TypeScript 5.0のsatisfies演算子に対応（JSDoc） |
| `@callback` | コールバック関数の型を定義（JSDoc） |

## コード例

```javascript
/**
 * @type {string}
 */
let name;

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {number} age
 */

/**
 * @extends {Base}
 */
class Derived extends Base {}

/**
 * @callback RequestHandler
 * @param {Request} req
 * @param {Response} res
 */

/**
 * @satisfies {Config}
 */
const config = { /* ... */ };
```

## 注意点

- これらのタグはすべてTypeDocによって生成ドキュメントから削除される
- 特別な動作や表示は付与されない
- TypeScriptのJSDocサポートとの互換性維持が目的
- `@satisfies` はTypeScript 5.0以降でサポートされる
- 主にJavaScriptプロジェクトでTypeScript型システムを利用する場合に使用される

## 関連

- [@param](./param.md) -- パラメータの文書化（JSDocプロジェクトで組み合わせて使用）
- [@template](./template.md) -- 型パラメータの文書化（JSDocプロジェクト向け）
- [@import](./import.md) -- JSDocでの型インポート
- [TypeScript JSDocリファレンス](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
