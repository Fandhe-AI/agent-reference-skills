# @internal

リフレクションが API コンシューマー向けではないことを示すモディファイアタグ。`--excludeInternal` オプションで除外可能。

## 構文

```
/** @internal */
```

## 詳細説明

`@internal` タグは、API メンバーが外部コンシューマー向けではないことを示す。`@hidden` や `@ignore` とは異なり、このタグだけではドキュメントからの除去は行われない。

ドキュメントから除外するには、`--excludeInternal` オプションを有効にする必要がある。これにより、内部開発者向けのドキュメントと外部公開向けのドキュメントを柔軟に切り替えることができる。

TypeScript コンパイラの `--stripInternal` オプションと連携して使用されることがある。

## コード例

```typescript
export class Visibility {
    /** @internal */
    member = 123;
}
```

```typescript
export class DatabaseConnection {
    /**
     * 接続プールの内部状態。
     * @internal
     */
    _poolState: PoolState;

    /**
     * 内部的な接続リセット処理。
     * @internal
     */
    _resetConnection(): void {
        // ...
    }

    /**
     * データベースにクエリを実行する。
     */
    query(sql: string): Promise<Result> {
        // ...
    }
}
```

## 注意点

- `@hidden` / `@ignore` とは異なり、タグ単体ではドキュメントから除去されない
- `--excludeInternal` オプションを有効にすることで除去される
- TypeScript の `--stripInternal` コンパイラオプションと関連する
- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/internal/
- 内部向けと外部向けのドキュメントを切り替えるのに有用

## 関連

- [@hidden](./hidden.md)
- [@ignore](./ignore.md)
- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@experimental](./experimental.md)
- [@private](./private.md)
