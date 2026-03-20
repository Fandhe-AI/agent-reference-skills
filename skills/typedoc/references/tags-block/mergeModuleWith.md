# @mergeModuleWith

モジュールの内容を別のモジュールまたはプロジェクトルートに統合するブロックタグ。

## 構文

```
@mergeModuleWith <ターゲット>
```

ターゲットには以下を指定できる：
- ドット区切りの修飾モジュール名（ネストされたモジュール用）
- `<project>` -- メンバーをルートプロジェクトリフレクション直下に配置する特殊値

## 詳細説明

`@mergeModuleWith` タグは、モジュールまたは名前空間の子要素を別のモジュールに配置し、現在のモジュールを削除するようTypeDocに指示する。

この機能は、`packages` エントリポイント戦略を使用して複数のTypeScriptコンパイル出力を単一のエクスポートモジュールに統合するプロジェクトをサポートする。

## コード例

```typescript
// module-a.ts
/**
 * @module
 * @mergeModuleWith <project>
 */
export function fn1() {}

// module-b.ts
/**
 * @module
 * @mergeModuleWith <project>
 */
export function fn2() {}
```

上記の例では、`fn1` と `fn2` はそれぞれのモジュールではなくプロジェクトルート直下に配置される。

## 注意点

- **リンク解決への影響**: このタグを使用するとリンク解決に影響が出る。`@mergeModuleWith` を含むモジュールをターゲットにしたリンクは、モジュールが削除されるため壊れる可能性がある
- 子要素へのリンクも設定によっては曖昧に解決される可能性がある
- `packages` エントリポイント戦略と組み合わせて使用することが想定されている

## 関連

- [@module](./module.md) -- モジュールの文書化
- `@packageDocumentation` -- パッケージドキュメント
