# @enum

文字列または数値リテラル値を持つ変数を、通常の変数ではなく列挙型（enum）としてドキュメント化するモディファイアタグ。

## 構文

```
/** @enum */
```

## 詳細説明

`@enum` タグを変数に付与すると、TypeDoc はその変数を通常の変数ではなく列挙型として変換する。対象の変数は、文字列または数値のリテラル値を持つオブジェクトである必要がある。

列挙メンバーには個別のドキュメントコメントを記述できる。

## コード例

### `as const` を使用する方法（推奨）

```typescript
/**
 * 方向を表す列挙型。
 * @enum
 */
export const Direction = {
    /** 上方向 */
    Up: "UP",
    /** 下方向 */
    Down: "DOWN",
    /** 左方向 */
    Left: "LEFT",
    /** 右方向 */
    Right: "RIGHT",
} as const;
```

### 明示的な型注釈を使用する方法

```typescript
/**
 * ステータスコード。
 * @enum
 */
export const Status: {
    /** 成功 */
    Ok: 200;
    /** 未検出 */
    NotFound: 404;
    /** サーバーエラー */
    Error: 500;
} = {
    Ok: 200,
    NotFound: 404,
    Error: 500,
};
```

### 宣言ファイル（.d.ts）での使用

```typescript
/**
 * ログレベル。
 * @enum
 */
declare const LogLevel: {
    Debug: 0;
    Info: 1;
    Warn: 2;
    Error: 3;
};
```

## 注意点

- 文字列リテラルまたは数値リテラルのプロパティを持つオブジェクトに対して使用する
- 各列挙メンバーに個別のドキュメントコメントを付けることができる
- `as const` を使用する方法が最もシンプルで推奨される
- 宣言ファイル（`.d.ts`）内で `declare` キーワードと共に使用可能

## 関連

- [@namespace](./namespace.md)
- [@interface](./interface.md)
