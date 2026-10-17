# @override

基底クラスから継承した定義を再定義していることを明示するモディファイアタグ。C# / Java の `override` キーワード相当。基底側は通常 `@virtual` を付ける。

## 構文

```
@override
```

## 使用例

```typescript
class Base {
  /** @virtual */
  public render(): void {}

  /** @sealed */
  public initialize(): void {}
}

class Child extends Base {
  /** @override */
  public render(): void {}
}
```

## 注意

- 標準化区分: Extended、構文種別: Modifier
- 宣言ファイルからドキュメントを生成する場合を除き、TypeScript の `override` キーワードを `@override` タグより優先する
- `@virtual` / `@override` / `@sealed` の一貫適用をドキュメントツールが強制してもよいが、TSDoc 標準では必須ではない
- TypeDoc は互換性のため parse するだけで、意味は付与しない
- 出典: https://tsdoc.org/pages/tags/override/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._override.html （TypeDoc v0.28.20）

## 関連

- [@virtual](./virtual.md)
- [@sealed](./sealed.md)
