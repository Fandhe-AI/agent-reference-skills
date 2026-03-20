# @deprecated

宣言が非推奨であり、将来のリリースで削除される可能性があることを示すブロックタグ。

## 構文

```
@deprecated 代替手段の説明
```

## 詳細説明

`@deprecated` タグは宣言が今後使用すべきでないことを示す。TypeDocは非推奨メンバーを取り消し線の書式で表示する（VSCodeの表示と同様）。

TSDocの仕様に準拠している。

タグには説明メッセージを含めることができ、`{@link}` 構文を使用して代替APIへの参照を追加できる。個別の関数シグネチャを非推奨としてマークし、他のシグネチャはアクティブなまま保持することも可能。

## コード例

```typescript
/**
 * @deprecated Use {@link NewWidget} instead.
 */
export class Widget {}

export class NewWidget {
    /**
     * @deprecated a single signature may be deprecated
     */
    work(): void;

    /**
     * This signature is not deprecated
     */
    work(token: CancellationToken): void;

    work(token?: CancellationToken) {
        // ...
    }
}
```

## 注意点

- 非推奨メンバーは取り消し線で表示される
- `{@link}` 構文で代替APIへのクロスリファレンスを追加できる
- 個別のオーバーロードシグネチャを選択的に非推奨としてマーク可能
- 説明なしで `@deprecated` のみ記述しても機能する

## 関連

- [TSDoc @deprecated](https://tsdoc.org/pages/tags/deprecated/)
