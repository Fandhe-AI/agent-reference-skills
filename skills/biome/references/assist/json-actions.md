# JSON アクション + ソース

## アクション一覧

| アクション | 推奨 | 説明 |
|-----------|------|------|
| useSortedKeys | — | JSON オブジェクトのキーを自然順でソート |
| useSortedPackageJson | — | package.json のフィールドを確立された慣習に従って整理（2.5.0 で追加） |

## IDE コードアクション名

| アクション | コードアクション |
|-----------|----------------|
| useSortedKeys | `source.action.useSortedKeys.biome` |
| useSortedPackageJson | `source.action.useSortedPackageJson.biome` |

## ソース

Biome 独自アクションは無し。

| ソース | ルール | Biome アクション |
|-------|-------|-----------------|
| @eslint/json | sort-keys | useSortedKeys |
| Sherif | unordered-dependencies | useSortedPackageJson (inspired) |
| eslint-plugin-package-json | sort-collections | useSortedPackageJson (inspired) |
| eslint-plugin-package-json-dependencies | alphabetically-sorted-dependencies | useSortedPackageJson (inspired) |
| sort-package-json | sort-package-json | useSortedPackageJson |
