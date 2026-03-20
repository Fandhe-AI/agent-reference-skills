# @deprecated

非推奨であることを示すブロックタグ。TypeDoc で警告として表示される。

## 構文

```
@deprecated 代替手段の説明
```

## 使用例

### 関数の非推奨

```typescript
/**
 * 企業情報を取得する。
 *
 * @deprecated {@link fetchCompanyV2} を使用してください。v3.0 で削除予定。
 */
export const fetchCompany = async (id: string): Promise<Company> => {
  // ...
};
```

### コンポーネントの非推奨

```typescript
/**
 * 旧スタイルのボタンコンポーネント。
 *
 * @deprecated `@repo/shared-ui-partial/ui/button` の Button を使用してください。
 */
const LegacyButton = ({ ... }: Props) => {
  // ...
};

export default LegacyButton;
```

## 注意

- 代替手段を必ず説明に含める
- `{@link}` で代替シンボルへのリンクを付けるとより有用
- TypeDoc はこのタグを警告アイコン付きで表示する
