# @returns

関数の戻り値を説明するブロックタグ。

## 構文

```
@returns 説明
```

**注意**: `@return` ではなく `@returns`（末尾に s）を使用する。

## 使用例

### ユーティリティ関数

```typescript
/**
 * 画像ソースから srcset 属性用の文字列を解決する。
 *
 * @param srcSet - StaticImageData または文字列の画像ソース
 * @returns srcset 属性に使用する URL 文字列
 */
const resolveSrcSet = (srcSet: StaticImageData | string): string =>
  typeof srcSet === "string" ? srcSet : srcSet.src;
```

### カスタムフック（オブジェクト戻り値）

```typescript
/**
 * デバウンスされた検索入力を管理するフック。
 *
 * @param initialQuery - 初期検索文字列
 * @param delay - デバウンス遅延時間（ミリ秒）
 * @returns `query`（現在値）、`debouncedQuery`（遅延値）、`setQuery`（更新関数）を含むオブジェクト
 */
export const useSearchInput = (initialQuery: string, delay: number) => {
  // ...
};
```

## 注意

- React コンポーネントでは通常不要（JSX.Element を返すことが自明）
- 戻り値が `void` の場合は省略可
- カスタムフックでは戻り値のプロパティを説明すると有用
