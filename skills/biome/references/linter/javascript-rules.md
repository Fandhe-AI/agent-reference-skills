# JavaScript/TypeScript ルール

Biome は JS/TS 向けに 300 以上のルールを 8 カテゴリで提供。

## カテゴリ概要

| カテゴリ | ルール数 | 説明 |
|---------|---------|------|
| a11y (accessibility) | ~37 | アクセシビリティ問題防止 |
| complexity | ~45 | 複雑なコード検出・単純化 |
| correctness | ~79 | 不正確・無用なコード検出 |
| nursery | ~101 | 開発中の実験的ルール |
| performance | ~13 | パフォーマンス最適化 |
| security | ~5 | セキュリティリスク検出 |
| style | ~82 | コード一貫性の維持 |
| suspicious | ~107 | 疑わしいパターン検出 |

## a11y（アクセシビリティ）— 代表的ルール

- `noAccessKey` — accesskey 属性の使用禁止
- `noAriaHiddenOnFocusable` — フォーカス可能要素の aria-hidden 禁止
- `noAutofocus` — autofocus 属性の使用禁止
- `useAltText` — img 等に代替テキスト必須
- `useButtonType` — button に type 属性必須
- `useHtmlLang` — html 要素に lang 属性必須
- `useValidAriaRole` — 有効な ARIA ロールを強制

## complexity — 代表的ルール

- `noBannedTypes` — 禁止された型の使用検出
- `noExcessiveCognitiveComplexity` — 認知複雑性の制限
- `noForEach` — forEach の代わりに for...of を推奨
- `noStaticOnlyClass` — 静的メンバーのみのクラスを検出
- `noUselessTypeConstraint` — 無用な型制約を検出
- `useFlatMap` — map + flat の代わりに flatMap を推奨
- `useSimplifiedLogicExpression` — 論理式の単純化

## correctness — 代表的ルール

- `noConstAssign` — const への再代入を禁止
- `noConstructorReturn` — コンストラクタの return を禁止
- `noGlobalObjectCalls` — グローバルオブジェクトの呼び出し禁止
- `noInvalidNewBuiltin` — 無効な new 演算子の使用禁止
- `noUndeclaredVariables` — 未宣言変数の使用検出
- `noUnusedImports` — 未使用インポートの検出
- `noUnusedVariables` — 未使用変数の検出
- `useExhaustiveDependencies` — useEffect 依存配列の網羅性
- `useIsNan` — NaN 比較に isNaN() を強制

## performance — 代表的ルール

- `noBarrelFile` — バレルファイルの使用禁止
- `noReExportAll` — `export * from` の禁止
- `noDelete` — delete 演算子の使用禁止
- `useTopLevelRegex` — 正規表現のトップレベル定義を推奨

## security — 代表的ルール

- `noDangerouslySetInnerHtml` — dangerouslySetInnerHTML の使用禁止
- `noGlobalEval` — eval() の使用禁止
- `useAnchorContent` — アンカー要素にコンテンツを必須

## style — 代表的ルール

- `noCommaOperator` — カンマ演算子の使用禁止
- `noDefaultExport` — デフォルトエクスポートの禁止
- `noEnum` — enum の使用禁止
- `noNonNullAssertion` — 非 null アサーション (!) の禁止
- `useConst` — 再代入のない変数に const を強制
- `useExportType` — 型のみのエクスポートに export type を強制
- `useImportType` — 型のみのインポートに import type を強制
- `useNamingConvention` — 命名規則の強制
- `useTemplate` — 文字列連結の代わりにテンプレートリテラルを推奨

## suspicious — 代表的ルール

- `noArrayIndexKey` — 配列インデックスを key に使用禁止
- `noConsole` — console の使用禁止
- `noDebugger` — debugger の使用禁止
- `noDoubleEquals` — == の代わりに === を強制
- `noExplicitAny` — any 型の使用禁止
- `noMisleadingInstantiator` — 誤解を招くコンストラクタを検出
- `noShadowRestrictedNames` — 組み込み名のシャドウイングを禁止
- `useAwait` — async 関数内で await を使用

## nursery — 注意事項

- 開発中ルール。安定版では明示的オプトインが必要
- Playwright、Drizzle ORM 対応ルール等を含む
