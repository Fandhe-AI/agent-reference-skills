# kubb add

Kubb registry が pin したバージョンで extension（plugin / adapter / parser）をインストールするコマンド。id 省略時は registry を検索して選ぶ。Kubb と Node.js のバージョン対応を確認し、インストールするパッケージと config に追加する行を表示して、確認後に devDependency としてインストールする。plugin と parser は `kubb.config.ts` に書き込み、adapter は追加すべきコードを表示する。config に `parsers` が無い状態で parser を追加すると、デフォルトの `parserTs()` / `parserTsx()` / `parserMd()` も書き込む。

## Signature / Usage

```shell
# registry を検索して選択
kubb add

# 公式プラグインを slug で追加
kubb add plugin-zod

# コミュニティプラグインを完全な id で、確認無しで追加
kubb add acme/plugin-graphql --yes

# パッケージはインストールせず config のみ編集
kubb add plugin-zod --no-install

# 追加されるパッケージと config 行を表示するだけ（インストール・書き込みなし）
kubb add plugin-zod --dry-run
```

パッケージマネージャー（`npm` / `pnpm` / `yarn` / `bun`）はプロジェクトから自動検出する。npm 上の extension は `<package>@<version>`、GitHub release に pin された extension は `github:<owner>/<repo>#<commit>` としてインストールされる。

```shell
npx kubb add plugin-zod                 # @kubb/plugin-zod@<version>
npx kubb add acme/kubb-plugin-example   # github:acme/kubb-plugin-example#<commit>
```

## Arguments

| Name | Required | Description |
| --- | --- | --- |
| `<id>` | `false` | registry id（`<owner>/<slug>`、例: `kubb-labs/plugin-react-query`）。bare な `<slug>` は `kubb-labs/<slug>` の意味。両部とも小文字と数字を単一ハイフンで連結。省略時は CLI が選択を尋ねる |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--config=<path>`, `-c <path>` | | 編集する Kubb config のパス。plugin と parser が対象。省略時は `kubb generate` と同じ config ファイルをカレントディレクトリ、次に各親ディレクトリで探す |
| `--yes`, `-y` | `false` | 確認をスキップ。id が必要 |
| `--no-install` | | パッケージをインストールしない。plugin / parser は config に追加される |
| `--dry-run` | `false` | 追加されるパッケージと config 行を表示して終了。インストールも書き込みも行わない |

## Config changes

plugin の場合、import と `plugins` 配列末尾への呼び出しを追加する。parser は `parsers` 配列に同様に追加する。既に配列にある extension は変更しない。config を編集できない場合（`plugins` が配列リテラルでない、export 名が別モジュールから import 済み等）は `Could not edit <file>: <reason>` と手動追加用スニペットを表示し、終了コード 1 で終わる。

### Required plugins

manifest の `dependencies` が `kubb.config.ts` に無い場合、CLI は一緒に追加するか尋ねる。`Yes, add both` は extension と並べてインストール・追加し、`Only <id>` は extension のみ追加する（残りを足すまで `kubb generate` は失敗する）。`--yes` では依存も追加する。

### Unknown ids

registry に無い id は `No extension named <id>`、近い id の `kubb add <id>` コマンド、https://kubb.dev/extensions へのリンクを表示する。

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL。`http://` または `https://` で始まる必要がある。末尾スラッシュは除去される |

## Notes

- スクリプトや CI では `--yes` を付ける（プロンプトに答えられないため）。
- 終了コード 1: id が不正・未登録、または `--yes` で id 欠落、registry が読めない／不正な index、extension が実行中の Kubb / Node.js に非対応、plugin / parser の config が見つからない、インストール失敗、plugin / parser を config に書き込めずスニペットを表示した場合。終了コード 0: プロンプトでキャンセル、および config に書き込まれない adapter。
- 完了サマリーのタイトルは `Plugin ready` / `Plugin configured`（`--no-install`）/ `Plugin already configured` / `Plugin needs configuration`（config を手動変更する必要あり）で、adapter・parser では `Adapter` / `Parser` になる。
- Migration (5.11 → 5.20): `kubb add` writes parsers into `kubb.config.ts` (5.13.1 changelog, @kubb/cli, #4431) and gains `--dry-run`; since 5.13.1 it stops before installing a parser when there is no config (#4435). The registry-search prompt now shows the id and filters on id, display name and description.
- Source: https://kubb.dev/docs/5.x/reference/commands/add （kubb@5.20.0 の docs/5.x/reference/commands/add.md、取得日 2026-11-14）

## Related

- [update](./update.md)
- [list](./list.md)
- [init](./init.md)
