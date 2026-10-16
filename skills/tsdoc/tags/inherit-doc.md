# {@inheritDoc}

他の API 項目のドキュメントをコピーして、自動的に説明を生成するインラインタグ。参照先は無関係なクラスや別 NPM パッケージの import でもよい。

## 構文

```
{@inheritDoc IWidget.draw}
{@inheritDoc example-library#Serializer.writeFile}
```

## 使用例

```typescript
import { Serializer } from 'example-library';

/**
 * An interface describing a widget.
 * @public
 */
export interface IWidget {
  /**
   * Draws the widget on the display surface.
   * @param x - the X position of the widget
   * @param y - the Y position of the widget
   */
  draw(x: number, y: number): void;
}

/** @public */
export class Button implements IWidget {
  /** {@inheritDoc IWidget.draw} */
  public draw(x: number, y: number): void {}

  /**
   * {@inheritDoc example-library#Serializer.writeFile}
   * @deprecated Use {@link example-library#Serializer.writeFile} instead.
   */
  public save(): void {}
}
```

## 注意

- 標準化区分: Extended、構文種別: Inline tag
- 宣言参照の記法は未確定（microsoft/tsdoc の issue #9）
- コピーされるのは summary / `@remarks` / `@param` / `@typeParam` / `@returns` のみ。`@defaultValue` や `@example` などはコピーされず、`@inheritDoc` の後に明示する
- `@inheritDoc` 指定時は、同コメントに summary・`@remarks` を書いてはならない
- TypeDoc は JSDoc 互換のため `{@inheritDoc}` と波括弧なしの `@inheritDoc` の両方を parse する。波括弧なしでは可能なら親 reflection から継承する
- 出典: https://tsdoc.org/pages/tags/inheritdoc/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags.__inheritDoc_.html （TypeDoc v0.28.20）

## 関連

- [@remarks](./remarks.md)
- [@param](./param.md)
- [@returns](./returns.md)
- [@typeParam](./type-param.md)
- [{@link}](./link.md)
