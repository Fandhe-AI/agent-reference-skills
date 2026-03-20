# @abstract

メソッドやプロパティを、TypeScript の実装状態に関係なく、ドキュメント上で抽象（abstract）としてマークするモディファイアタグ。

## 構文

```
/** @abstract */
```

## 詳細説明

`@abstract` タグは、クラスのメソッドやプロパティに付与することで、生成されるドキュメント上でそれらを抽象メンバーとして表示する。TypeScript の `abstract` キーワードとは異なり、実際にはデフォルト実装を持つメソッドに対しても使用できる。

主な用途は、JavaScript ユーザー（型情報なし）が利用するモジュールにおいて、サブクラスでオーバーライドすべきメソッドにデフォルト実装を提供しつつ、ドキュメント上では抽象として明示するケースである。デフォルト実装では、より有用なエラーメッセージを投げることで開発者体験を向上させることができる。

## コード例

```typescript
export class AbstractExample {
    /**
     * サブクラスで必ずオーバーライドすること。
     * @abstract
     */
    requiredOverride(): void {
        throw new Error(
            "requiredOverride not implemented in subclass of AbstractExample",
        );
    }
}
```

上記の例では、`requiredOverride` メソッドはデフォルト実装を持つが、ドキュメント上では抽象メソッドとして表示される。

## 注意点

- TypeScript の `abstract` キーワードとは異なり、コンパイル時の強制力はない
- 主に JavaScript プロジェクトや、型情報なしで利用するコンシューマー向けに有用
- `--visibilityFilters` オプションでドキュメント出力の表示を制御できる

## 関連

- [@public](./public.md)
- [@virtual](./virtual.md)
- [@override](./override.md)
