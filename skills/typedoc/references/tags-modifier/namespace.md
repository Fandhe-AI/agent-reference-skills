# @namespace

変数を名前空間（namespace）としてドキュメント化し、プロパティをエクスポートされた変数や関数として解決するモディファイアタグ。

## 構文

```
/** @namespace */
```

## 詳細説明

`@namespace` タグを変数に付与すると、TypeDoc はその変数を名前空間として変換する。オブジェクトのプロパティは、エクスポートされた変数や関数として解決・ドキュメント化される。

主に JavaScript プロジェクトで、オブジェクトリテラルを使って名前空間パターンを実現しているコードをドキュメント化する場合に有用。

## コード例

### 基本的な使用法

```javascript
const a = 1;
const b = () => 2;
const c = { a, b, c: 3 };

/** @namespace */
export const d = { ...c, d: 4 };
```

上記は以下と同等にドキュメント化される:

```typescript
export namespace d {
    export const a = 1;
    export const b = () => 2;
    export const c = 3;
    export const d = 4;
}
```

### ユーティリティ名前空間

```typescript
/**
 * 文字列操作ユーティリティ。
 * @namespace
 */
export const StringUtils = {
    /**
     * 文字列を大文字に変換する。
     */
    toUpper: (s: string) => s.toUpperCase(),

    /**
     * 文字列を小文字に変換する。
     */
    toLower: (s: string) => s.toLowerCase(),

    /**
     * 最大文字数。
     */
    MAX_LENGTH: 255,
};
```

## 注意点

- オブジェクトのプロパティがエクスポートされた変数/関数として展開される
- 関数プロパティは関数として、値プロパティは変数としてドキュメント化される
- `@property` タグと組み合わせて各メンバーにドキュメントを付けることができる

## 関連

- [@interface](./interface.md)
- [@class](./class.md)
- [@function](./function.md)
