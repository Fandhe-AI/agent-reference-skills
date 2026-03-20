# @public

リフレクションの可視性を public にオーバーライドするモディファイアタグ。一般的に使用は推奨されない。

## 構文

```
/** @public */
```

## 詳細説明

`@public` タグは、リフレクションの可視性を public にオーバーライドする。例えば、`protected` で宣言されたメンバーに `@public` を付与すると、ドキュメント上では public として表示される。

このタグは一般的に使用すべきではない。TypeDoc は、`@alpha`、`@beta`、`@experimental`、`@internal` のいずれかで明示的にアノテーションされていないすべてのエクスポートメンバーを public として扱うことを推奨している。

### TSDoc 仕様との差異

TypeDoc の実装は TSDoc 標準とは異なる。TSDoc ではメンバーの可視性とリリースの可視性を別々に区別するが、TypeDoc は後方互換性のために実効的な可視性を変更する。`@public` バッジは、直接アノテーションされたメンバーにのみ表示され、含まれるメンバーには継承されない。

## コード例

```typescript
export class Visibility {
    /** @public */
    protected member = 123;
}

// ドキュメント上では member は public として表示される
```

```typescript
export class EventBus {
    /**
     * イベントの発火。サブクラス向けだがドキュメントでは公開。
     * @public
     */
    protected emit(event: string, data: unknown): void {
        // ...
    }
}
```

## 注意点

- 一般的に使用は推奨されない
- TSDoc 仕様との実装の差異がある（メンバー可視性 vs リリース可視性）
- `@public` バッジは直接アノテーションされたメンバーにのみ表示される
- エクスポートされたメンバーは `@alpha` / `@beta` / `@experimental` / `@internal` がない場合、暗黙的に public

## 関連

- [@private](./private.md)
- [@protected](./protected.md)
- [@internal](./internal.md)
- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@experimental](./experimental.md)
