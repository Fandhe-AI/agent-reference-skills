# JSON ルール

対象 Biome 2.5.15。

## nursery

| ルール | 推奨 | 説明 |
|-------|------|------|
| noEmptyObjectKeys | — | JSON オブジェクトの空キーを禁止 |
| noJsonUnsafeValues | — | 相互運用性に問題のある JSON 値を禁止 |
| noRestrictedDependencies | — | より良い代替がある依存関係を禁止 |
| noTopLevelLiterals | — | トップレベル値にオブジェクト/配列を要求 |
| noUntrustedLicenses | — | 信頼できないライセンスの依存関係を禁止 |
| useConsistentObjectKeys | — | JSON キーの Unicode 表現を統一 |

## suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
| noBiomeFirstException | ○ (error) | files.includes 内のグロブパターン誤用を防止 |
| noDuplicateDependencies | — | 依存関係の重複を禁止 |
| noDuplicateObjectKeys | ○ (error) | オブジェクト内の重複キーを禁止 |
| noQuickfixBiome | ○ (info) | エディタ設定での quickfix.biome 使用を禁止 |
| useBiomeIgnoreFolder | ○ (warn) | 設定ファイルでのフォルダ無視の正しい使い方を促進 |
| useRequiredScripts | — | package.json に必須スクリプトを強制（nursery から移動） |

## Notes

- `useRequiredScripts` は nursery から suspicious へ移動した
- ドキュメント HEAD ではさらに style / suspicious への移動が計画されているが、2.5.15 のリリース版には含まれないため本ページには反映していない
