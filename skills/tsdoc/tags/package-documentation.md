# @packageDocumentation

個別の API 項目ではなく、NPM パッケージ全体を説明する doc コメントであることを示すモディファイアタグ。

## 構文

```
@packageDocumentation
```

## 使用例

```typescript
// Copyright (c) Example Company. All rights reserved. Licensed under the MIT license.

/**
 * A library for building widgets.
 *
 * @remarks
 * The `widget-lib` defines the {@link IWidget} interface and {@link Widget} class,
 * which are used to build widgets.
 *
 * @packageDocumentation
 */

/**
 * Interface implemented by all widgets.
 * @public
 */
export interface IWidget {
  /**
   * Draws the widget on the screen.
   */
  render(): void;
}
```

## 注意

- 標準化区分: Core、構文種別: Modifier
- パッケージのエントリポイントとなる `*.d.ts` 内で、最初に現れる `/**` コメントに置く
- 個別 API 項目の説明に使わない
- TypeDoc ではコメントが直後の宣言ではなくファイルを指すことを示す。TypeDoc 固有の `@module` で代替できる
- TypeDoc ではこのタグを含むコメントはファイル内の最初のコメントである必要があり、import 文より前に置くことが推奨される
- 出典: https://tsdoc.org/pages/tags/packagedocumentation/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._packageDocumentation.html （TypeDoc v0.28.20）

## 関連

- [@remarks](./remarks.md)
- [@public](./public.md)
- [@beta](./beta.md)
- [@alpha](./alpha.md)
- [@experimental](./experimental.md)
