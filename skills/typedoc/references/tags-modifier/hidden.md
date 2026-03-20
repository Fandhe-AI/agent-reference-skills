# @hidden

リフレクションを生成されるドキュメントから完全に除去するモディファイアタグ。

## 構文

```
/** @hidden */
```

## 詳細説明

`@hidden` タグが付与されたリフレクションは、生成されるドキュメントから完全に除去される。JSDoc の `@ignore` タグと同等の機能を持ち、TypeDoc は両方を認識する。

`@internal` タグとは異なり、`@hidden` はオプション設定に関係なく常にドキュメントから除去する。`@internal` は `--excludeInternal` オプションが有効な場合にのみ除去される。

## コード例

```typescript
export class Visibility {
    /** @hidden */
    newBehavior(): void;
}
```

```typescript
export class UserService {
    /**
     * 内部キャッシュ。ドキュメントに含めない。
     * @hidden
     */
    private _cache: Map<string, User> = new Map();

    /**
     * ユーザーを取得する。
     */
    getUser(id: string): User {
        return this._cache.get(id);
    }
}
```

## 注意点

- `@ignore` と機能的に同等
- `@internal` とは異なり、常にドキュメントから除去される（オプション不要）
- アクセスレベルの指定ではなく、ドキュメントからの完全な除去を行う

## 関連

- [@ignore](./ignore.md)
- [@internal](./internal.md)
- [@hideconstructor](./hideconstructor.md)
