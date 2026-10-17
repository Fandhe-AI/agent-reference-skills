# Submit to the registry

extension を Kubb registry に submit すると、kubb.dev/extensions と Kubb Studio に掲載され、`kubb add` でインストールできる。各 record は npm の 1 バージョンまたは GitHub release の 1 commit を pin し、maintainer が全バージョンをレビューしてからユーザーに届く。

## Before you submit

package は、ルートに `kubb-extension.json` と `docs/` フォルダーを持つこと。npm へのビルドと publish は publish-a-plugin.md を参照。

### Publish from a GitHub release instead

npm に載せない package は GitHub release からインストールできる。`kubb add` は `github:<owner>/<repo>#<commit>` をインストールし、ユーザーのマシンでは何もビルドされない。validation は次のルールを検査する。

- package はリポジトリのルートに置く。scoped 名は GitHub owner を使う（`github.com/acme` なら `@acme/`）。
- `dist/` を commit し、`package.json` の `files` に `dist/` と `kubb-extension.json` を列挙する。
- `main`・`module`・`exports` は commit 済みファイルを指す。
- `build`・`prepack`・`prepare`・`prepublish`・`publish`・install の各 script と `workspaces` は持たない。`build` は `compile` などへ改名する。
- release tag は `package.json` の version（例: `v1.0.0`）。

## Open a submission issue

kubb-labs/registry で submission issue（`https://github.com/kubb-labs/registry/issues/new?template=submit-extension.yml`）を開く。

- **Source**: npm package 名を貼る（`kubb-plugin-example@1.0.0` のようにバージョン指定も可）。バージョンなしなら registry は npm `latest` を pin する。GitHub release なら repository URL（tag 指定も可）: `https://github.com/acme/kubb-plugin-example/tree/v1.0.0`。tag なしなら最新 release を pin する。
- **Categories**: 該当するカテゴリをすべてチェックする。最初にチェックしたものが main カテゴリ。

workflow が record 付きのレビュー pull request を作り、リンクを issue にコメントする。id は `<owner>/<slug>`（例: `acme/kubb-plugin-example`）。ルールは Registry ids を参照。レビュー pull request ができるまでは、issue を編集すると submission がやり直される。

## Review

maintainer が pull request を `REVIEW.md`（kubb-labs/registry の main）に照らしてレビューする。validation は npm tarball または GitHub release から `package.json`・`kubb-extension.json`・`docs/` を読み、extension のインストールや実行は行わない。`docs/overview.md` が無い場合は、レビュアーが registry に overview を書く。maintainer が pull request を merge すると、数分以内に registry へ掲載される。ユーザーは次でインストールする。

```shell
kubb add acme/kubb-plugin-example
```

## Release a new version

新バージョンを publish しても `kubb add` のインストール対象は変わらない。毎週月曜に workflow が pull request を開き、各 pin を最新の npm バージョンまたは GitHub release へ進める。maintainer がレビューして merge すると、ユーザーは `kubb update` で新バージョンを入手できる。

## Notes

- 出典: https://kubb.dev/docs/5.x/how-to/submit-to-the-registry（kubb@5.11.0）

## Related

- [publish-a-plugin.md](./publish-a-plugin.md)
