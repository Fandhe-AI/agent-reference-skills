# @protected

リフレクションの可視性を protected にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。

## 構文

```
/** @protected */
```

## 詳細説明

`@protected` タグは、リフレクションの可視性を protected にオーバーライドする。TypeScript の `protected` キーワードと同等のドキュメント出力を生成する。

このタグは一般的に使用すべきではなく、将来のリリースで削除される可能性がある。TypeScript の `protected` キーワードを直接使用することが推奨される。

`--excludeProtected` オプションを使用すると、protected メンバーをドキュメントから除外できる。

## コード例

```typescript
export class Visibility {
    /** @protected */
    member = 123;
}

// 上記は以下と同等にドキュメント化される:
export class Visibility {
    protected member = 123;
}
```

```typescript
export class BaseComponent {
    /**
     * サブクラスからのみアクセス可能なライフサイクルメソッド。
     * @protected
     */
    onMount(): void {
        // ...
    }
}
```

## 注意点

- 一般的に使用は推奨されない。将来のリリースで削除される可能性がある
- TypeScript の `protected` キーワードの使用を推奨
- `--excludeProtected` オプションで protected メンバーを除外可能

## 関連

- [@private](./private.md)
- [@public](./public.md)
- [@internal](./internal.md)
