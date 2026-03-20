# @throws

関数が投げる可能性のある例外を説明するブロックタグ。

## 構文

```
@throws {ErrorType} 条件の説明
```

## 使用例

```typescript
/**
 * ユーザー情報を取得する。
 *
 * @param id - ユーザー ID
 * @returns ユーザー情報
 * @throws {NotFoundError} ユーザーが存在しない場合
 * @throws {AuthenticationError} 認証トークンが無効な場合
 */
export const fetchUser = async (id: string): Promise<User> => {
  // ...
};
```

## 注意

- API 通信関数や入力バリデーション関数で使用する
- UI コンポーネントではほとんど使用しない
- 複数の例外を投げる場合は `@throws` を複数記述する
