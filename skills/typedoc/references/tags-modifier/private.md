# @private

リフレクションの可視性を private にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。

## 構文

```
/** @private */
```

## 詳細説明

`@private` タグは、リフレクションの可視性を private にオーバーライドする。TypeScript の `private` キーワードと同等のドキュメント出力を生成する。

このタグは一般的に使用すべきではなく、将来のリリースで削除される可能性がある。TypeScript の `private` キーワードを直接使用することが推奨される。

`--excludePrivate` オプションを使用すると、private メンバーをドキュメントから除外できる。

## コード例

```typescript
export class Visibility {
    /** @private */
    member = 123;
}

// 上記は以下と同等にドキュメント化される:
export class Visibility {
    private member = 123;
}
```

```typescript
export class Config {
    /**
     * 内部設定値。
     * @private
     */
    _secretKey: string;

    /**
     * 公開設定値。
     */
    appName: string;
}
```

## 注意点

- 一般的に使用は推奨されない。将来のリリースで削除される可能性がある
- TypeScript の `private` キーワードの使用を推奨
- `--excludePrivate` オプションで private メンバーを除外可能

## 関連

- [@protected](./protected.md)
- [@public](./public.md)
- [@internal](./internal.md)
- [@hidden](./hidden.md)
