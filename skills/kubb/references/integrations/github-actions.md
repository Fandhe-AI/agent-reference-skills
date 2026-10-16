# GitHub Actions

GitHub Actions からインストール可能な Kubb Studio スナップショットを公開し、レビュアーがベースブランチや前回実行と生成ファイルを比較できるようにする。`KUBB_TOKEN` は Actions のリポジトリ secret に保存する。

## Signature / Usage

```yaml
# .github/workflows/kubb.yml
name: Kubb snapshot

on:
  pull_request:
    # `closed` deletes the pull request's Studio agent. GitHub leaves it out by default.
    types: [opened, synchronize, reopened, closed]
  # A snapshot of main is what pull requests compare with.
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  snapshot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: kubb-labs/action@v0
        with:
          token: ${{ secrets.KUBB_TOKEN }}
```

tarball URL を別ステップに渡すには action に `id: snapshot` を付け、`${{ steps.snapshot.outputs.tarball-url }}` を読む。

## Notes

- 前提: Kubb 5.6.2 以降の `kubb.config.ts`、Kubb Studio 組織と組織 CI API キー（`KUBB_TOKEN`）。インストール用は別の registry キー（詳細は [ci.md](./ci.md)）
- `pull-requests: write` でスナップショットコメントを投稿できる。`contents: write` は、リポジトリに Kubb 設定がない場合に action が初期化用プルリクエストを開くために必要。そのプルリクエストのため Settings > Actions > General の Allow GitHub Actions to create and approve pull requests を有効にする
- ベースブランチおよび前回実行に対する生成変更はプルリクエストコメントで確認する
- スナップショットは 7 日で失効する。デフォルトブランチ実行のスケジュールを検討する
- action の全 inputs / outputs / 実行時挙動は原文の reference/github-actions を参照（本スキルには未収録）

## Related

- [ci.md](./ci.md)
- [studio.md](./studio.md)
- [gitlab.md](./gitlab.md)
