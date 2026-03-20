# @alpha

将来的にサードパーティ開発者が使用することを想定しているが、セマンティックバージョニングに準拠するほど安定していないメンバーをマークするモディファイアタグ。

## 構文

```
/** @alpha */
```

## 詳細説明

`@alpha` タグは、API の成熟度レベルを示すために使用される。このタグが付与されたメンバーは、最も初期段階のリリースフェーズにあることを意味し、破壊的変更が頻繁に行われる可能性がある。

TSDoc 仕様に準拠しており、TypeDoc は `--visibilityFilters` オプションを通じて、`@alpha` タグが付いたメンバーの表示/非表示を制御できる。

リリース安定度の階層は以下の通り:
1. `@alpha` — 最も不安定。大幅な変更の可能性あり
2. `@beta` / `@experimental` — ある程度安定しているがSemVer未準拠
3. `@public` — 安定版

## コード例

```typescript
export class Visibility {
    /** @alpha */
    newBehavior(): void;
}
```

```typescript
export class ApiClient {
    /**
     * 新しい認証フロー。大幅に変更される可能性あり。
     * @alpha
     */
    authenticateV2(token: string): Promise<void> {
        // ...
    }
}
```

## 注意点

- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/alpha/
- `--visibilityFilters` オプションで `@alpha` メンバーの表示/非表示を制御可能
- `@alpha` と `@beta` / `@experimental` を同時に使用しないこと

## 関連

- [@beta](./beta.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
