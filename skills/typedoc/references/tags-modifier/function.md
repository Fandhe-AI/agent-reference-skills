# @function

呼び出し可能な変数宣言を関数としてドキュメント化するモディファイアタグ。

## 構文

```
/** @function */
```

## 詳細説明

変数宣言が呼び出し可能（callable）であるが、コンストラクタブル（constructable）でない場合、TypeDoc はそれを関数として変換できる。TypeDoc は、変数の初期化子が関数式であり、明示的な型注釈がない場合に自動的にこの変換を行う。

`@function` タグを使用すると、自動変換が行われないケース（明示的な型注釈がある場合など）でも、手動で呼び出し可能な変数を関数としてドキュメント化できる。

このタグは、呼び出し不可能な変数やコンストラクタブルな変数には効果がない。

## コード例

### 自動変換（タグ不要）

```typescript
// 関数式の初期化子で型注釈なし → 自動的に関数としてドキュメント化
export const Callable3 = () => "";
```

### 手動変換（@function タグ使用）

```typescript
type MultiCallSignature = {
    (value: string): string;
    (value: number): number;
};

/**
 * 複数のオーバーロードを持つ関数。
 * @function
 */
export const Callable: MultiCallSignature = () => "";
```

### 変換されないケース

```typescript
// 型注釈あり + @function タグなし → 変数としてドキュメント化
export const Callable2: MultiCallSignature = () => "";
```

## 注意点

- 呼び出し可能だがコンストラクタブルでない変数にのみ効果がある
- 関数式の初期化子 + 型注釈なしの場合は自動変換されるため、タグは不要
- 明示的な型注釈がある呼び出し可能な変数を関数としてドキュメント化したい場合に使用する

## 関連

- [@namespace](./namespace.md)
- [@interface](./interface.md)
- [@class](./class.md)
