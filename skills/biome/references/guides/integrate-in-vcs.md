# Integrate in VCS

Source: https://biomejs.dev/guides/integrate-in-vcs

## VCS 統合設定

VCS 統合はオプション機能であり、明示的に有効化する必要がある。

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git"
  }
}
```

## .gitignore の尊重

`vcs.useIgnoreFile` を有効にすると、`.gitignore` と `.ignore` に記載されたファイルを処理対象から除外する。Git リポジトリでは Git のローカル除外ファイル `.git/info/exclude` も同様に適用する（2.5.0。linked worktree では共通の Git ディレクトリの `.git/info/exclude` を読む）。

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  }
}
```

## 変更ファイルのみ処理

### `--changed` フラグ

デフォルトブランチからの変更ファイルのみを処理する。`vcs.defaultBranch` の設定が必要。

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "defaultBranch": "main"
  }
}
```

```bash
biome check --changed
```

### `--since=<branch>` フラグ

指定したブランチとの差分ファイルのみを処理する。

```bash
biome check --since=develop
```

### `--staged` フラグ

ステージ済み（`git add` 済み）のファイルのみを処理する。pre-commit フックでの使用に適している。

```bash
biome check --staged
```

注意: `--staged` は CI 環境では使用できない。

## Notes

- 公式の `/guides/integrate-in-vcs` は `/configuration/integrate-with-vcs` へ移動した
