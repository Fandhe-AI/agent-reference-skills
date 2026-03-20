# JSON ルール

## nursery

| ルール | 推奨 | 説明 |
|-------|------|------|
| noEmptyObjectKeys | — | JSON オブジェクトの空キーを禁止 |
| noTopLevelLiterals | — | トップレベル値にオブジェクト/配列を要求 |
| useRequiredScripts | — | package.json に必須スクリプトを強制 |

## suspicious

| ルール | 推奨 | 説明 |
|-------|------|------|
| noBiomeFirstException | ○ (error) | files.includes 内のグロブパターン誤用を防止 |
| noDuplicateDependencies | — | 依存関係の重複を禁止 |
| noDuplicateObjectKeys | ○ (error) | オブジェクト内の重複キーを禁止 |
| noQuickfixBiome | ○ (info) | エディタ設定での quickfix.biome 使用を禁止 |
| useBiomeIgnoreFolder | ○ (warn) | 設定ファイルでのフォルダ無視の正しい使い方を促進 |
