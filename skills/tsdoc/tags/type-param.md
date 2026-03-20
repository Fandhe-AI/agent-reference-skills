# @typeParam

ジェネリック型パラメータを説明するブロックタグ。

## 構文

```
@typeParam T - 説明
```

## 使用例

### ジェネリック関数

```typescript
/**
 * ローカルストレージと同期する状態管理フック。
 *
 * @typeParam T - ストレージに保存する値の型
 * @param key - ローカルストレージのキー
 * @param initialValue - 初期値
 * @returns 現在の値と更新関数のタプル
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // ...
};
```

### ジェネリック型

```typescript
/**
 * API レスポンスのラッパー型。
 *
 * @typeParam T - レスポンスデータの型
 *
 * @category Model
 */
export interface ApiResponse<T> {
  /** レスポンスデータ */
  data: T;
  /** HTTP ステータスコード */
  status: number;
}
```

## 注意

- `@param` と同じくハイフン（`-`）で名前と説明を区切る
- ジェネリック型パラメータが自明な場合（`T` が唯一のパラメータで用途が明確）は省略可
