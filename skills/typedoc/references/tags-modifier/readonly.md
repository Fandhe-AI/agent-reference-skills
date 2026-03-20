# @readonly

TypeScript の書き込み可能性に関わらず、リフレクションを読み取り専用としてドキュメント化するモディファイアタグ。

## 構文

```
/** @readonly */
```

## 詳細説明

`@readonly` タグは、TypeScript の実際の書き込み可能性ルールに関係なく、リフレクションを読み取り専用としてドキュメント化することを指示する。

このタグが適用されると、プロパティに関連付けられた setter メソッドがドキュメント出力から除去される。これにより、コード上は setter が存在していても、ドキュメント上ではプロパティが読み取り専用として提示される。

## コード例

```typescript
export class Config {
    private _name: string = "";

    /**
     * 設定名。読み取り専用として公開する。
     * @readonly
     */
    get name(): string {
        return this._name;
    }

    // この setter はドキュメントに含まれない
    set name(value: string) {
        this._name = value;
    }
}
```

```typescript
export class Counter {
    private _count = 0;

    /**
     * 現在のカウント値。
     * @readonly
     */
    get count(): number {
        return this._count;
    }

    set count(value: number) {
        if (value >= 0) {
            this._count = value;
        }
    }

    increment(): void {
        this._count++;
    }
}
```

## 注意点

- setter メソッドがドキュメントから除去される
- TypeScript の `readonly` キーワードとは独立して動作する
- getter/setter ペアにおいて、ドキュメント上で setter を隠したい場合に有用
- TSDoc 仕様に準拠: https://tsdoc.org/pages/tags/readonly/

## 関連

- [@sealed](./sealed.md)
- [@virtual](./virtual.md)
