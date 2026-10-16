# @sealed

クラスの継承禁止、またはメンバーのオーバーライド禁止を示すモディファイアタグ。C# / Java の `sealed` キーワード相当。

## 構文

```
@sealed
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

`Child.render()` は virtual な `Base.render()` をオーバーライドするが、`Base.initialize()` は sealed のためオーバーライドしてはならない。

## 注意

- 標準化区分: Extended、構文種別: Modifier
- クラスに付けるとサブクラス化禁止、メソッド・プロパティに付けるとオーバーライド禁止
- `@virtual` / `@override` / `@sealed` の一貫適用をドキュメントツールが強制してもよいが、TSDoc 標準では必須ではない
- TypeDoc は互換性のため parse するだけで、意味は付与しない
- 出典: https://tsdoc.org/pages/tags/sealed/ （rushstack-websites 5c0c8b9）、https://typedoc.org/documents/Tags._sealed.html （TypeDoc v0.28.20）

## 関連

- [@virtual](./virtual.md)
- [@override](./override.md)
