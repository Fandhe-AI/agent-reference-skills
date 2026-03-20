# @interface

型エイリアスをインターフェースとしてドキュメント化するモディファイアタグ。「動的」プロパティを実際のプロパティに展開する。

## 構文

```
/** @interface */
```

## 詳細説明

`@interface` タグを型エイリアスに付与すると、TypeDoc はその型をインターフェースとして表示する。このとき、すべての「動的」プロパティ（computed / conditional プロパティ）が実際のプロパティとして展開される。

これにより、`Record` 型やマップ型などの複雑な型定義が、読みやすいインターフェース形式でドキュメント化される。

## コード例

### 基本的な使用法

```typescript
/**
 * 設定オブジェクトの型。
 * @interface
 */
export type Config = {
    /** ホスト名 */
    host: string;
    /** ポート番号 */
    port: number;
    /** デバッグモード */
    debug: boolean;
};
```

### Record 型の展開

```typescript
/**
 * @interface
 * @property a - 最初のプロパティ
 * @property b - 2番目のプロパティ
 * @property c - 3番目のプロパティ
 */
export type MyRecord = Record<"a" | "b" | "c", string>;
```

上記は、3つの明示的な `string` プロパティ（`a`, `b`, `c`）を持つインターフェースとしてドキュメント化される。

### 複合型

```typescript
/**
 * ユーザーの完全なプロフィール情報。
 * @interface
 */
export type UserProfile = BaseUser & {
    bio: string;
    avatar: string;
};
```

## 注意点

- 型エイリアスにのみ効果がある
- computed / conditional プロパティが実際のプロパティとして展開される
- `@property` / `@prop` タグと組み合わせて各プロパティにドキュメントを付けることができる

## 関連

- [@class](./class.md)
- [@namespace](./namespace.md)
- [@useDeclaredType](./useDeclaredType.md)
