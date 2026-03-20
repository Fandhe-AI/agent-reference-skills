# @hideconstructor

クラスのコンストラクタを生成されるドキュメントから隠すモディファイアタグ。TypeScript の issue #58653 の回避策として提供されている。

## 構文

```
/** @hideconstructor */
```

## 詳細説明

`@hideconstructor` タグは、クラスのコンストラクタをドキュメントから除去するために使用する。以下の2つの使い方がある:

1. **クラス宣言に付与**: クラスのコンストラクタがドキュメントに含まれなくなる
2. **コンストラクタ自体に付与**: そのコンストラクタがドキュメントから除去される

このタグは TypeScript の issue #58653 の回避策として存在しており、可能であれば `@hidden` または `@ignore` タグの使用が推奨される。

## コード例

### クラス宣言に付与

```typescript
/** @hideconstructor */
export class Visibility {
    /** ドキュメントには含まれない */
    constructor() {}
}
```

### コンストラクタに直接付与

```typescript
export class Service {
    /**
     * @hideconstructor
     */
    constructor(private config: Config) {}

    static create(config: Config): Service {
        return new Service(config);
    }
}
```

## 注意点

- TypeScript#58653 の回避策として存在する
- 可能であれば `@hidden` または `@ignore` タグの使用が推奨される
- 将来の TypeScript バージョンで不要になる可能性がある

## 関連

- [@hidden](./hidden.md)
- [@ignore](./ignore.md)
