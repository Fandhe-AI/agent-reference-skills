# @useDeclaredType

型エイリアスを型ノード表現ではなく宣言された型を使用して変換するモディファイアタグ。派生型のドキュメント改善に有用。

## 構文

```
/** @useDeclaredType */
```

## 詳細説明

`@useDeclaredType` タグは、型エイリアスの変換時に型ノード表現ではなく宣言された型（declared type）を使用するよう TypeDoc に指示する。これにより、`ReturnType` や `Pick` などの派生型がより読みやすくドキュメント化される場合がある。

このタグは型エイリアスにのみ効果があり、他の要素に適用しても影響はない。

### 重要な注意事項

出力は安定しておらず、TypeScript のバージョン間で変更される可能性がある。型の小さな変更が異なる結果を生む場合があり、場合によっては劣ったドキュメントが生成されることもある。よくある失敗パターンとして、型が自身への参照としてドキュメント化されてしまうケースがある。

条件付きマップ型（conditional mapped types）は、このタグで期待通りに動作しない。

## コード例

### 基本的な使用法

```typescript
function getData() {
    return [{ abc: 123 }];
}

/** @useDeclaredType */
export type Data = ReturnType<typeof getData>;
// ドキュメント上では: export type Data = { abc: number }[];
```

### 効果的なケース

```typescript
function createConfig() {
    return {
        host: "localhost",
        port: 3000,
        debug: false,
    };
}

/** @useDeclaredType */
export type Config = ReturnType<typeof createConfig>;
// { host: string; port: number; debug: boolean } として表示される
```

### 注意が必要なケース

```typescript
// 条件付きマップ型は期待通りに動作しない可能性がある
/** @useDeclaredType */
export type ConditionalResult<T> = T extends string ? { text: T } : { value: T };
// 自身への参照としてドキュメント化される場合がある
```

## 注意点

- 型エイリアスにのみ効果がある
- 出力は安定しておらず、TypeScript バージョン間で変わる可能性がある
- 型の小さな変更が異なる結果を生む場合がある
- 条件付きマップ型では期待通りに動作しない
- 型が自身への参照としてドキュメント化される失敗パターンに注意

## 関連

- [@interface](./interface.md)
