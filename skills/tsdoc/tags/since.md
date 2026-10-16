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
- `@since` は TSDoc 標準タグではない（TSDoc の `StandardTags.ts` に定義が無い）。TypeDoc 既定のブロックタグで、TypeDoc は特別な挙動を持たせず、生成コメント内の段落として描画するだけ
- eslint-plugin-tsdoc で `tsdoc-undefined-tag` を出さないには、`tsconfig.json` と同じ場所に置いた `tsdoc.json` で `"extends": ["typedoc/tsdoc.json"]` とする（TypeDoc の `tsdoc.json` には `@since` が含まれる）
