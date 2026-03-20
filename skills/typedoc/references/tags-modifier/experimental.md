# @experimental

将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。

## 構文

```
/** @experimental */
```

## 詳細説明

`@experimental` タグは、API メンバーが実験的段階にあり、破壊的変更が行われる可能性があることを示す。TSDoc 仕様では、`@beta` と `@experimental` はセマンティック的に同等として扱われる。

プロジェクト内ではどちらか一方のみを使用し、両方を同時に使用しないことが推奨される。

TypeDoc は `--visibilityFilters` オプションを通じて、`@experimental` タグが付いたメンバーの表示/非表示を制御できる。

## コード例

```typescript
export class Visibility {
    /** @experimental */
    newBehavior(): void;
}
```

```typescript
export class DataProcessor {
    /**
     * ストリーミング処理モード。APIが変更される可能性あり。
     * @experimental
     */
    async *processStream(input: AsyncIterable<Buffer>): AsyncGenerator<Result> {
        // ...
    }
}
```

## 注意点

- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/experimental/
- `@beta` と `@experimental` はセマンティック的に同等。どちらか一方を使用すること
- `--visibilityFilters` オプションで表示/非表示を制御可能

## 関連

- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@public](./public.md)
- [@internal](./internal.md)
