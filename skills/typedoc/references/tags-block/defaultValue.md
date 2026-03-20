# @defaultValue

アクセサやプロパティのデフォルト値を記録するためのブロックタグ。

## 構文

```
@defaultValue デフォルト値の説明
```

または

```
@default デフォルト値の説明
```

## 詳細説明

`@defaultValue` タグはアクセサやプロパティのデフォルト値を文書化するために使用できる。TypeDocは `@default` を一般的に使用される代替形式として認識する。

デフォルトテーマではこのタグに特別な動作を付与せず、他のブロックタグと同様に `# Default Value` ヘッダー下にその内容を表示する。

TSDocの仕様に準拠している。

## コード例

```typescript
export interface CompilerOptions {
    strict?: boolean;

    /**
     * @defaultValue `true` if `strict` is `true`, otherwise `false`
     */
    strictNullChecks?: boolean;
}
```

## 注意点

- `@defaultValue` と `@default` はどちらも同じ動作をする
- デフォルトテーマでは `# Default Value` ヘッダーの下に段落としてレンダリングされる
- アクセサおよびプロパティの文書化に適している

## 関連

- [@property](./property.md) -- プロパティの文書化
- [TSDoc @defaultValue](https://tsdoc.org/pages/tags/defaultValue/)
