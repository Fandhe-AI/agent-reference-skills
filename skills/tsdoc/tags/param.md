# @param

関数やメソッドのパラメータを説明するブロックタグ。

## 構文

```
@param name - 説明
```

**注意**: 型は記述しない。TypeScript の型アノテーションから自動推論される。

## 使用例

### 関数

```typescript
/**
 * ブレークポイントに対応するメディアクエリ文字列を解決する。
 *
 * @param source - 画像ソースの定義
 * @param defaultBp - ソースにブレークポイントが未指定の場合のデフォルト値
 * @returns メディアクエリ文字列（例: `"(min-width: 48rem)"`）
 */
const resolveMedia = (source: PictureSource, defaultBp: Breakpoint): string => {
  // ...
};
```

### カスタムフック

```typescript
/**
 * ローカルストレージと同期する状態管理フック。
 *
 * @param key - ローカルストレージのキー
 * @param initialValue - 初期値（ストレージに値がない場合に使用）
 * @returns 現在の値と更新関数のタプル
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // ...
};
```

## 注意

- React コンポーネントの Props には `@param` を使わない — interface のプロパティに直接 `/** ... */` を記述する
- ハイフン（`-`）で名前と説明を区切る（TSDoc 標準）
- 省略可能なパラメータのデフォルト値は `@defaultValue` で別途記述する
- `@param {string} name` のように型を含めない
