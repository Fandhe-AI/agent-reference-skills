# @ignore

リフレクションを生成されるドキュメントから完全に除去するモディファイアタグ。`@hidden` と同等。

## 構文

```
/** @ignore */
```

## 詳細説明

`@ignore` タグが付与されたリフレクションは、生成されるドキュメントから完全に除去される。`@hidden` タグと機能的に同等であり、TypeDoc は両方を認識する。

JSDoc との互換性のためにサポートされている。`@internal` タグとは異なり、`@ignore` はオプション設定に関係なく常にドキュメントから除去する。

## コード例

```typescript
export class Visibility {
    /** @ignore */
    newBehavior(): void;
}
```

```typescript
export class Logger {
    /**
     * デバッグ用の内部メソッド。
     * @ignore
     */
    _debugInternal(msg: string): void {
        console.debug(`[DEBUG] ${msg}`);
    }

    /**
     * メッセージをログに出力する。
     */
    log(msg: string): void {
        this._debugInternal(msg);
    }
}
```

## 注意点

- `@hidden` と機能的に同等
- `@internal` とは異なり、常にドキュメントから除去される（オプション不要）
- JSDoc との互換性のためにサポートされている

## 関連

- [@hidden](./hidden.md)
- [@internal](./internal.md)
- [@hideconstructor](./hideconstructor.md)
