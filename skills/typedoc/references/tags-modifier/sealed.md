# @sealed

TSDoc 互換のために解析されるが、TypeDoc では特定の意味を持たないモディファイアタグ。

## 構文

```
/** @sealed */
```

## 詳細説明

TypeDoc は TSDoc 仕様との互換性のために `@sealed` タグを解析するが、このタグに特定の機能を割り当てていない。セマンティック的には、クラスやメソッドがサブクラスでオーバーライドされるべきでないことを示す規約として使用される。

`--visibilityFilters` オプションで、このタグが付いたメンバーの表示を制御できる。

## コード例

```typescript
export class Visibility {
    /** @sealed */
    newBehavior(): void;
}
```

```typescript
export class SecurityManager {
    /**
     * 認証ロジック。サブクラスでオーバーライドしないこと。
     * @sealed
     */
    authenticate(token: string): boolean {
        // セキュリティ上の理由でオーバーライド禁止
        return this.validateToken(token);
    }
}
```

## 注意点

- TSDoc 互換のために解析されるが、TypeDoc 固有の機能は付与されない
- ドキュメントの規約としてオーバーライド禁止を示す用途に使用可能
- `--visibilityFilters` オプションで表示制御可能
- TSDoc 仕様に準拠

## 関連

- [@virtual](./virtual.md)
- [@override](./override.md)
- [@abstract](./abstract.md)
