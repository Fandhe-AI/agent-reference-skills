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
- スナップショットのインストールには別の `registry` API キーを使う。どちらも Studio の Settings > Developer > Tokens で作成する（`KUBB_TOKEN` は type CI、インストール用は type Registry）

## Notes

- スナップショットは 7 日で失効する。push のない期間が 1 週間を超えうる場合はデフォルトブランチ実行をスケジュールする
- 結果フィールドは原文の reference/commands/studio の「CI agent identity」「Snapshot output」を参照

## Related

- [studio.md](./studio.md)
- [github-actions.md](./github-actions.md)
- [gitlab.md](./gitlab.md)
