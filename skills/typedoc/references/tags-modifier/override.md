# @override

メンバーが親クラスの実装をオーバーライドしていることを示すモディファイアタグ。TSDoc 互換のために解析される。

## 構文

```
/** @override */
```

## 詳細説明

TypeDoc は TSDoc 仕様との互換性のために `@override` タグを解析するが、このタグに特定の機能を割り当てていない。ドキュメント上でオーバーライドされたメンバーをマークするために使用できる。

`--visibilityFilters` オプションで、このタグが付いたメンバーの表示を制御できる。

## コード例

```typescript
export class Visibility {
    /** @override */
    newBehavior(): void;
}
```

```typescript
class BaseRenderer {
    render(): void {
        // デフォルトの描画処理
    }
}

export class CustomRenderer extends BaseRenderer {
    /**
     * カスタム描画処理。
     * @override
     */
    render(): void {
        // カスタムの描画処理
    }
}
```

## 注意点

- TSDoc 互換のために解析されるが、TypeDoc 固有の機能は付与されない
- `--visibilityFilters` オプションで表示制御可能
- TSDoc 仕様に準拠

## 関連

- [@sealed](./sealed.md)
- [@virtual](./virtual.md)
- [@abstract](./abstract.md)
