# Submit to the registry

plugin / adapter / parser を Kubb registry に submit すると、kubb.dev/extensions と Kubb Studio に掲載され、ユーザーは `kubb add` でインストールできる。各 record は npm の 1 バージョンまたは GitHub release の 1 commit を pin し、maintainer が全バージョンをレビューしてからユーザーに届く。

`kubb.config.ts` で既に動く package に必要なのは、manifest・overview・publish 済みバージョン・submission issue。package 自体の作成は publish-a-plugin.md を参照。

### Add the manifest

package ルートに `kubb-extension.json` を作る。`$schema` 以外の下記フィールドはすべて必須。

```json
{
  "$schema": "https://kubb.dev/schemas/kubb-extension.json",
  "kind": "plugin",
  "name": "plugin-example",
  "export": "pluginExample",
  "displayName": "Example",
  "description": "Writes a comment with the HTTP method and path of every operation."
}
```

- `kind` は `plugin` / `adapter` / `parser`
- `name` は extension の `meta.name`
- `export` はユーザーが `kubb.config.ts` で呼ぶ factory で、package のエントリポイントから export する

`compatibility` / `maintainers` / Studio がフォームとして表示する `options` などの任意フィールドは Extension manifest リファレンスを参照。

### Add the overview

`docs/overview.md` を作る。kubb.dev が extension のページとして描画する。

```md
# Example

Writes a comment with the HTTP method and path of every operation.

## Setup

Runs on its own and needs no other plugin.
```

`#` タイトルと 1 段落の説明で始める。install コマンドは書かない（含む overview は validation に失敗する）。任意の `docs/options.md` と `docs/guides/` は Extension docs リファレンスを参照。

### Check `package.json`

次のエントリを追加し、既存のものは残す。

```json
{
  "files": ["dist", "kubb-extension.json", "docs"],
  "repository": { "type": "git", "url": "https://github.com/acme/kubb-plugin-example" },
  "peerDependencies": { "kubb": "^5.0.0" }
}
```

- `files` は manifest と `docs/` フォルダーを同梱する
- `repository` は自分が所有する、または所属する organization が所有する GitHub リポジトリを指す
- `kubb` または `@kubb/core` は同梱せず peer dependency にする
- `preinstall` / `install` / `postinstall` script は持たない。持つ場合は overview でその内容を説明する

### Publish a version

#### npm

npm にまだ無いバージョンを設定する。tarball に build と並んで `kubb-extension.json` と `docs/` のファイルが含まれることを確認してから publish する。

```shell
npm pack --dry-run
npm publish --access public
```

#### GitHub release

npm に載せない package は GitHub release からインストールできる。`kubb add` は `github:<owner>/<repo>#<commit>` をインストールし、ユーザーのマシンでは何もビルドされない。validation は次のルールを検査する。

- package はリポジトリのルートに置く。scoped 名は GitHub owner を使う（`github.com/acme` なら `@acme/`）。
- `dist/` を commit し、`package.json` の `files` に `dist/` と `kubb-extension.json` を列挙する。
- `main`・`module`・`exports` は commit 済みファイルを指す。
- `build`・`prepack`・`prepare`・`prepublish`・`publish`・install の各 script と `workspaces` は持たない。`build` は `compile` などへ改名する。
- release tag は `package.json` の version（例: `v1.0.0`）。

manifest・overview・build を commit し、その commit から GitHub release を作る。

## Open a submission issue

kubb-labs/registry で submission issue（`https://github.com/kubb-labs/registry/issues/new?template=submit-extension.yml`）を開く。**Source** には次のいずれかを入力する。

| You have | Enter |
| --- | --- |
| An npm package (pins `latest`) | `kubb-plugin-example` |
| A specific npm version | `kubb-plugin-example@1.0.0` |
| An npm page | `https://www.npmjs.com/package/kubb-plugin-example` |
| A package on npm, by its folder in a GitHub monorepo | `https://github.com/acme/kubb-plugins/tree/main/packages/example` |
| A GitHub release, package not on npm | `https://github.com/acme/kubb-plugin-example/tree/v1.0.0` |

**Categories** は該当するカテゴリをすべてチェックする。最初にチェックしたものが main カテゴリ。

数分以内に workflow が record 付きのレビュー pull request を作り、リンクを issue にコメントする。問題を報告した場合は修正して issue を編集すると submission がやり直される。id は `<owner>/<slug>`（例: `acme/kubb-plugin-example`）。ルールは Registry ids を参照。

### Wait for the review

maintainer が pull request を `REVIEW.md`（kubb-labs/registry の main）に照らしてレビューする。validation は npm tarball または GitHub release から `kubb-extension.json` と `docs/` を読む。GitHub release では `package.json` も読む。

pull request ができた後は、issue を編集しても submission はやり直されない。チェックが失敗した場合や maintainer が変更を求めた場合は、修正版を publish して pull request に返信する。

maintainer が pull request を merge すると、数分以内に registry へ掲載される。ユーザーは次でインストールする。

```shell
kubb add acme/kubb-plugin-example
```

## Release a new version

新バージョンを publish しても `kubb add` のインストール対象は変わらない。毎週月曜に workflow が pull request を開き、各 pin を最新の npm バージョンまたは GitHub release へ進める。maintainer がレビューして merge すると、ユーザーは `kubb update` で新バージョンを入手できる。

## Notes

- Source: https://kubb.dev/docs/5.x/how-to/submit-to-the-registry (docs/5.x/how-to/submit-to-the-registry.md of kubb@5.20.0, retrieved 2026-11-14)
- The 5.20 page is restructured into steps (manifest, overview, `package.json`, publish, issue, review). The 5.11 sentence "When the package ships no `docs/overview.md`, the reviewer writes an overview in the registry" no longer appears, and the overview is listed as a required step (docs diff 5.11 → 5.20)

## Related

- [publish-a-plugin.md](./publish-a-plugin.md)
