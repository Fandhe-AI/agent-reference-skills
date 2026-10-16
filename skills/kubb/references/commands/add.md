# kubb add

Kubb registry が pin したバージョンで extension（plugin / adapter / parser）をインストールするコマンド。id 省略時は選択プロンプトが出る。Kubb と Node.js のバージョン対応を確認し、確認プロンプトの後に devDependency としてインストールする。plugin は `kubb.config.ts` にも追加し、adapter / parser は追加すべきコードを表示する。

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
| `--config=<path>`, `-c <path>` | | 編集する Kubb config のパス。plugin のみ対象。省略時は `kubb generate` と同じ config ファイルをカレントディレクトリ、次に各親ディレクトリで探す |
| `--yes`, `-y` | `false` | 確認をスキップ。id が必要 |
| `--no-install` | | パッケージをインストールしない。plugin は config に追加される |

## Config changes

plugin の場合、import と `plugins` 配列末尾への呼び出しを追加する。既に配列にある plugin は変更しない。config を編集できない場合（`plugins` が配列リテラルでない、export 名が別パッケージから import 済み等）は `Could not edit <file>: <reason>` と手動追加用スニペットを表示する。

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL。`http://` または `https://` で始まる必要がある。末尾スラッシュは除去される |

## Notes

- スクリプトや CI では `--yes` を付ける（プロンプトに答えられないため）。
- 終了コード 1: id が不正または `--yes` で id 欠落、registry が読めない／不正なエントリ、extension が非互換、plugin の config が見つからない、インストール失敗。終了コード 0: プロンプトでキャンセル、config が編集できずスニペットを表示した場合。
- 出典: https://kubb.dev/docs/5.x/reference/commands/add （kubb@5.11.0 の docs/5.x/reference/commands/add.md）

## Related

- [update](./update.md)
- [list](./list.md)
- [init](./init.md)
