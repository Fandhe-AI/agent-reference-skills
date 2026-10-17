# JavaScript/TypeScript ルール

Biome は JS/TS 向けに 8 グループ・469 ルールを提供する（Biome 2.5.15 時点）。

## Signature / Usage

このページはルール一覧のため関数シグネチャは無い。ルールは `biome.json` の `linter.rules.<group>.<rule>` で有効化・設定する:

```json
{
  "linter": {
    "rules": {
      "suspicious": { "noConsole": "warn" },
      "nursery": { "noFloatingPromises": "error" }
    }
  }
}
```

## カテゴリ概要

| カテゴリ | ルール数 | 説明 |
|---------|---------|------|
| a11y (accessibility) | 37 | アクセシビリティ問題を防止 |
| complexity | 49 | 複雑なコードを検出・単純化 |
| correctness | 67 | 不正確または無用なコードを検出 |
| nursery | 107 | 開発中の実験的ルール |
| performance | 14 | パフォーマンス最適化 |
| security | 6 | セキュリティリスクを検出 |
| style | 87 | 一貫したスタイルを維持 |
| suspicious | 102 | 疑わしいパターンを検出 |

## a11y (accessibility) - 代表的なルール

- `noAccessKey` - accesskey 属性を禁止
- `noAriaHiddenOnFocusable` - フォーカス可能要素への aria-hidden を禁止
- `noAutofocus` - autofocus 属性を禁止
- `useAltText` - img などに代替テキストを必須化
- `useAnchorContent` - アンカー要素に内容を必須化
- `useButtonType` - button に type 属性を必須化
- `useHtmlLang` - html 要素に lang 属性を必須化
- `useValidAriaRole` - 有効な ARIA ロールを強制

## complexity - 代表的なルール

- `noBannedTypes` - 禁止された型の使用を検出
- `noCommaOperator` - カンマ演算子を禁止
- `noExcessiveCognitiveComplexity` - 認知的複雑度を制限
- `noForEach` - forEach より for...of を推奨
- `noStaticOnlyClass` - static メンバーのみのクラスを検出
- `noUselessTypeConstraint` - 無用な型制約を検出
- `useFlatMap` - map + flat より flatMap を推奨
- `useSimplifiedLogicExpression` - 論理式を単純化

## correctness - 代表的なルール

- `noConstAssign` - const の再代入を禁止
- `noConstructorReturn` - コンストラクター内の return を禁止
- `noGlobalObjectCalls` - グローバルオブジェクトの呼び出しを禁止
- `noInvalidBuiltinInstantiation` - 組み込みの不正な new / 呼び出しを禁止
- `noUndeclaredVariables` - 未宣言変数の使用を検出
- `noUnusedImports` - 未使用のインポートを検出
- `noUnusedVariables` - 未使用の変数を検出
- `useExhaustiveDependencies` - useEffect 依存配列の網羅性
- `useIsNan` - NaN 比較に isNaN() を強制

## performance - 代表的なルール

- `noBarrelFile` - バレルファイルを禁止
- `noReExportAll` - `export * from` を禁止
- `noDelete` - delete 演算子を禁止
- `useTopLevelRegex` - 正規表現をトップレベルで定義することを推奨

## security - 代表的なルール

- `noBlankTarget` - rel なしの `target="_blank"` を検出
- `noDangerouslySetInnerHtml` - dangerouslySetInnerHTML を禁止
- `noGlobalEval` - eval() を禁止
- `noScriptUrl` - `javascript:` URL を禁止
- `noSecrets` - 秘密情報らしき文字列を検出

## style - 代表的なルール

- `noDefaultExport` - デフォルトエクスポートを禁止
- `noEnum` - enum を禁止
- `noNonNullAssertion` - non-null アサーション (!) を禁止
- `useConst` - 再代入されない変数に const を強制
- `useExportType` - 型のみのエクスポートに export type を強制
- `useImportType` - 型のみのインポートに import type を強制
- `useNamingConvention` - 命名規則を強制
- `useTemplate` - 文字列連結よりテンプレートリテラルを推奨

## suspicious - 代表的なルール

- `noArrayIndexKey` - 配列インデックスを key に使うことを禁止
- `noConsole` - console を禁止
- `noDebugger` - debugger を禁止
- `noDoubleEquals` - == より === を強制
- `noExplicitAny` - any 型を禁止
- `noMisleadingInstantiator` - 紛らわしいコンストラクターを検出
- `noShadowRestrictedNames` - 組み込み名のシャドーイングを禁止
- `useAwait` - async 関数内の await を必須化

## nursery - 代表的なルール

- 開発中のルール。stable リリースでは明示的な opt-in が必要（`recommended` に含まれない）
- 2.5.x 時点の代表例:
  - 型認識: `noFloatingPromises` / `noMisusedPromises` / `useExhaustiveSwitchCases` / `useStrictBooleanExpressions` / `useAwaitThenable` / `useNullishCoalescing` / `noUnsafeTypeAssertion`
  - 汎用: `noReturnInFinally` / `noXorAsExponentiation` / `noImpliedEval` / `useExplicitReturnType`
  - React: `useReactCompiler` / `useReactFunctionComponentDefinition` / `useReactAsyncServerFunction`
  - Playwright: `noPlaywrightWaitForTimeout` / `noPlaywrightMissingAwait` など
  - Drizzle: `noDrizzleDeleteWithoutWhere` / `noDrizzleUpdateWithoutWhere`
  - Tailwind: `noTailwindArbitraryValue` / `noTailwindRawColors` / `useSortedClasses` / `useTailwindShorthandClasses`
  - Svelte / Astro / Vue: `noSvelteExportLet` / `noAstroSetHtmlDirective` / `noVueRefAsOperand` / `useVueBaseImport` など

## Notes

- 2.5.0 で nursery の 73 ルールが stable グループ（correctness / suspicious / style / complexity / performance / security / a11y）へ昇格した。上記のルール数は昇格後の値
- 配置の訂正: `useAnchorContent` は a11y、`noCommaOperator` は complexity に属する（security / style ではない）
- `noInvalidNewBuiltin` は 2.0.0 で削除された（非推奨ルールの一括削除）。`noInvalidBuiltinInstantiation` は correctness に属する
- ドキュメント HEAD では次のリリースでグループ間のさらなる移動が予定されている（2.5.15 の一覧には未反映）

## Related

- [introduction.md](./introduction.md)
- [domains.md](./domains.md)
- [javascript-sources.md](./javascript-sources.md)
