# @internal

パッケージ外に公開しない内部シンボルを示すモディファイアタグ。

## 構文

```
@internal
```

## 使用例

```typescript
/**
 * 画像ソースから srcset 属性用の文字列を解決する。
 *
 * @param srcSet - StaticImageData または文字列の画像ソース
 * @returns srcset 属性に使用する URL 文字列
 *
 * @internal
 */
const resolveSrcSet = (srcSet: StaticImageData | string): string =>
  typeof srcSet === "string" ? srcSet : srcSet.src;
```

```typescript
/**
 * Fieldset のコンテキスト。
 *
 * @internal
 */
const FieldsetContext = createContext<FieldsetContextValue | null>(null);
```

## 注意

- TypeDoc の `--excludeInternal` オプションでドキュメントから除外できる
- エクスポートされていない関数は TypeDoc の対象外のため `@internal` は不要
- パッケージの subpath exports に含まれないがエクスポートされるヘルパーに有用
- モディファイアタグのため、説明テキストは付かない
- TSDoc では Discretionary のモディファイアで、リリースステージ系（`@public` / `@beta` / `@alpha` / `@experimental` / `@internal`）の 1 つ。suggested meaning は「サードパーティ開発者の利用を想定しない。公開リリースからツールが宣言を trim してよい」。メンバーはリリースステージを親クラスから継承する
- TypeDoc 側では `--visibilityFilters` と `--excludeInternal` が効き、TypeScript の `--stripInternal` とも対応する
- 出典: https://tsdoc.org/pages/tags/internal/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._internal.html （TypeDoc v0.28.20）

## 関連

- [@public](./public.md)
- [@beta](./beta.md)
- [@alpha](./alpha.md)
- [@experimental](./experimental.md)
