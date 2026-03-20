# Semver Groups

syncpack の Semver グループ設定。パッケージ・依存関係ごとに異なる semver range ルールを適用できる。各依存関係は最初にマッチしたグループのルールのみ適用される。

| ファイル | 説明 | パス |
|---------|------|------|
| ignored | 対象依存関係を semver バリデーションから完全に除外する | [./ignored.md](./ignored.md) |
| with-range | 対象依存関係に特定の semver range フォーマット（`""` / `~` / `^` 等）を強制する | [./with-range.md](./with-range.md) |
