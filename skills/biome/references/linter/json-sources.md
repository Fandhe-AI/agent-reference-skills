# JSON ルールのソース

対象 Biome 2.5.15。

## Biome 独自ルール

- noBiomeFirstException
- noQuickfixBiome
- noUntrustedLicenses
- useBiomeIgnoreFolder
- useRequiredScripts

## @e18e/eslint-plugin 対応

| @e18e/eslint-plugin ルール | Biome ルール |
|---------------------------|-------------|
| ban-dependencies | noRestrictedDependencies |

## @eslint/json 対応

| @eslint/json ルール | Biome ルール |
|-------------------|-------------|
| no-duplicate-keys | noDuplicateObjectKeys |
| no-empty-keys | noEmptyObjectKeys |
| no-unnormalized-keys | useConsistentObjectKeys |
| no-unsafe-values | noJsonUnsafeValues |
| top-level-interop | noTopLevelLiterals |

## eslint-plugin-package-json / eslint-plugin-package-json-dependencies 対応

| プラグインルール | Biome ルール |
|---------------|-------------|
| unique-dependencies (package-json) | noDuplicateDependencies |
| duplicate-dependencies (package-json-dependencies) | noDuplicateDependencies |

注意: 一部のルールは元のルールと比べてオプションを持たない場合がある。
