# Git Hooks

## Lefthook

高速・クロスプラットフォーム・依存関係なし。

`lefthook.yml`:
```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
```

```yaml
pre-push:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {push_files}
```

セットアップ: `lefthook install`

## Husky + lint-staged

package.json:
```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

`.husky/pre-commit`:
```
lint-staged
```

package.json:
```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,json,jsonc}": [
      "biome check --files-ignore-unknown=true",
      "biome check --write --no-errors-on-unmatched"
    ]
  }
}
```

## Husky + git-format-staged

git stash を使わないため競合時に手動介入不要。

```bash
git-format-staged --formatter 'biome check --write --files-ignore-unknown=true --no-errors-on-unmatched "{}"' .
```

## pre-commit フレームワーク

`.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/biomejs/pre-commit
    rev: "v2.0.6"
    hooks:
      - id: biome-check
        additional_dependencies: ["@biomejs/biome@2.1.1"]
```

利用可能 hook: `biome-ci`, `biome-check`, `biome-format`, `biome-lint`

## シェルスクリプト

`.git/hooks/pre-commit`:
```bash
#!/bin/sh
set -eu
npx @biomejs/biome check --staged --files-ignore-unknown=true --no-errors-on-unmatched
```

## 推奨

`--no-errors-on-unmatched` でファイル未処理時のエラーを抑制。
