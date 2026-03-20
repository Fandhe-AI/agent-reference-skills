# @since

シンボルが追加されたバージョンを示すブロックタグ。

## 構文

```
@since バージョン
```

## 使用例

```typescript
/**
 * レスポンシブ対応の画像表示コンポーネント。
 *
 * @since 0.1.0
 * @category Layout
 */
const Picture = ({ ... }: Props) => { ... };
```

```typescript
/**
 * デバウンスされた検索入力を管理するフック。
 *
 * @since 0.2.0
 * @category Hooks
 */
export const useSearchInput = (initialQuery: string, delay: number) => {
  // ...
};
```

## 注意

- パッケージのバージョニングが確立された後に使用する
- 現在のプロジェクトは初期開発フェーズのため、使用は任意
- 後から一括で追加することも可能
