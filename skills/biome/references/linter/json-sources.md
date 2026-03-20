# JSON ルールのソース

## Biome 独自ルール

- noBiomeFirstException
- noQuickfixBiome
- useBiomeIgnoreFolder
- useRequiredScripts

## @eslint/json 対応

| @eslint/json ルール | Biome ルール |
|-------------------|-------------|
| no-duplicate-keys | noDuplicateObjectKeys |
| no-empty-keys | noEmptyObjectKeys |
| no-top-level-literals | noTopLevelLiterals |

## eslint-plugin-package-json / eslint-plugin-package-json-dependencies 対応

| プラグインルール | Biome ルール |
|---------------|-------------|
| valid-package-def (package-json) | noDuplicateDependencies |
| no-duplicate-dependencies (package-json-dependencies) | noDuplicateDependencies |
