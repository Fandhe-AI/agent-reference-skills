# CI snapshots

`kubb studio snapshot` が CI ランナー上でパッケージを生成し、1 リクエストで Studio にアップロードして終了する。プルリクエスト / マージリクエストとデフォルトブランチで実行し、レビュアーが出力を比較できるようにする。

## Signature / Usage

ペアリング不要の自動識別がない CI では、ベースブランチで安定した `--id` を使い、プルリクエスト実行で `--base-id` に渡す:

```shell
kubb studio snapshot --id jenkins:api:main                              # on main
kubb studio snapshot --id jenkins:api:pr-12 --base-id jenkins:api:main  # on a pull request
```

tarball URL を別ステップに渡す:

```shell
kubb studio snapshot --json | jq -r '.url'
```

スナップショットのインストール:

```ini
//kubb.studio/:_authToken=${KUBB_REGISTRY_TOKEN}
```

```shell
npm i https://kubb.studio/packages/<agent>/<package>.tgz
```

pnpm と Yarn も同じ URL・同じ `.npmrc` でインストールする。Yarn 1 はパッケージのスコープ用 registry も必要で、無いと HTTP 403 でインストールに失敗する:

```ini
@<scope>:registry=https://kubb.studio/
```

## Options / Props

| Provider | Agent identity | Guide |
|----------|----------------|-------|
| GitHub Actions | Detected | [github-actions.md](./github-actions.md) |
| GitLab CI | Detected | [gitlab.md](./gitlab.md) |
| Bitbucket Pipelines, CircleCI | Detected. Pass `--base-id` to compare with a branch | Run `kubb studio snapshot` with `KUBB_TOKEN` set |
| Other | Pass `--id` and `--base-id` | 上記コード例 |

## Prerequisites

- Kubb 5.6.2 以降で動作する `kubb.config.ts` のあるリポジトリ
- Kubb Studio の組織と組織 CI API キー。信頼できるパイプラインだけが読める secret に `KUBB_TOKEN` として保存する
- スナップショットのインストールには別の `registry` API キーを使う。どちらも Studio の Settings › Developers › Tokens で作成する（`KUBB_TOKEN` は type CI、インストール用は type Registry）
- `tsdown` を `kubb` の隣に開発依存として置く（`npm i -D tsdown`）。スナップショットは `dist` を `tsdown` でビルドするが、Kubb は既定ではインストールしない

## Notes

- Source: https://kubb.dev/docs/5.x/integrations/ci （kubb@5.20.0 の docs/5.x/integrations/ci.md、取得日 2026-11-14）
- CI エージェントのエディターを開くと、最新の未失効パッケージの閲覧・ソース行へのコメント・生成 HTML のプレビューができる。Studio はランナー終了後に保存済み tarball を読む。出力を更新するにはパイプラインを再実行する
- Studio にスナップショットの diff ビューは無い。GitHub Action はプルリクエストコメントに変更された生成ファイルを列挙し、どのプロバイダーでも `kubb studio snapshot --json` が `changes` / `branchChanges` で報告する
- スナップショットは 7 日で失効する。push のない期間が 1 週間を超えうる場合はデフォルトブランチ実行をスケジュールする
- 結果フィールドは原文の reference/commands/studio の「CI agent identity」「Snapshot output」を参照

## Related

- [studio.md](./studio.md)
- [github-actions.md](./github-actions.md)
- [gitlab.md](./gitlab.md)
