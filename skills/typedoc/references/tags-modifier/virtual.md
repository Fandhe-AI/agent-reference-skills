# @virtual

TSDoc 互換のために解析されるが、TypeDoc では特定の意味を持たないモディファイアタグ。

## 構文

```
/** @virtual */
```

## 詳細説明

TypeDoc は TSDoc 仕様との互換性のために `@virtual` タグを解析するが、このタグに特定の機能を割り当てていない。セマンティック的には、メソッドがサブクラスでオーバーライドされることを想定していることを示す規約として使用される。

`--visibilityFilters` オプションで、このタグが付いたメンバーの表示を制御できる。

## コード例

```typescript
export class Visibility {
    /** @virtual */
    intendedForOverrideByChildren(): void;
}
```

```typescript
export class BasePlugin {
    /**
     * プラグインの初期化処理。
     * サブクラスでオーバーライドしてカスタマイズ可能。
     * @virtual
     */
    initialize(): void {
        // デフォルトの初期化処理
    }

    /**
     * プラグインの破棄処理。
     * サブクラスでオーバーライドしてリソースを解放可能。
     * @virtual
     */
    dispose(): void {
        // デフォルトの破棄処理
    }
}
```

## 注意点

- TSDoc 互換のために解析されるが、TypeDoc 固有の機能は付与されない
- ドキュメントの規約としてオーバーライド可能を示す用途に使用可能
- `--visibilityFilters` オプションで表示制御可能
- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/virtual/

## 関連

- [@sealed](./sealed.md)
- [@override](./override.md)
- [@abstract](./abstract.md)
