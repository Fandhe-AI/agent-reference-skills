# @virtual

サブクラスがオーバーライドしてよいメンバーであることを明示するモディファイアタグ。C# / Java の `virtual` キーワード相当。

## 構文

```
@virtual
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

`Child.render()` は virtual な `Base.render()` をオーバーライドする。

## 注意

- 標準化区分: Extended、構文種別: Modifier
- メソッド・プロパティが対象
- `@virtual` / `@override` / `@sealed` の一貫適用をドキュメントツールが強制してもよいが、TSDoc 標準では必須ではない
- TypeDoc は互換性のため parse するだけで、意味は付与しない
- 出典: https://tsdoc.org/pages/tags/virtual/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._virtual.html （TypeDoc v0.28.20）

## 関連

- [@override](./override.md)
- [@sealed](./sealed.md)
