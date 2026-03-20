# @beta

将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。

## 構文

```
/** @beta */
```

## 詳細説明

`@beta` タグは、API の成熟度が `@alpha` より進んでいるが、まだ安定版とは見なせないメンバーに使用される。TSDoc 仕様では、`@beta` と `@experimental` はセマンティック的に同等として扱われると定義されている。

プロジェクト内ではどちらか一方のみを使用し、両方を同時に使用しないことが推奨される。

TypeDoc は `--visibilityFilters` オプションを通じて、`@beta` タグが付いたメンバーの表示/非表示を制御できる。

## コード例

```typescript
export class Visibility {
    /** @beta */
    newBehavior(): void;
}
```

```typescript
export class SearchEngine {
    /**
     * ファジー検索機能。APIが変更される可能性あり。
     * @beta
     */
    fuzzySearch(query: string, options?: FuzzyOptions): Result[] {
        // ...
    }
}
```

## 注意点

- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/beta/
- `@beta` と `@experimental` はセマンティック的に同等。どちらか一方を使用すること
- `--visibilityFilters` オプションで表示/非表示を制御可能

## 関連

- [@alpha](./alpha.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
