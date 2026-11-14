# kubb init

対話ウィザードで新規 Kubb プロジェクトを初期化するコマンド。プロジェクトを検出してから数問尋ね、config を確認用に表示し、選択したプラグインをインストールして `kubb.config.ts` を書き出し、最初の生成まで実行する。

## Signature / Usage

```shell
npx kubb init
```

最初の質問の前に次を検出する。

- パッケージマネージャー（`bun` / `pnpm` / `npm` / `yarn`）
- リポジトリ内の OpenAPI / Swagger ファイル（`openapi.yaml`、`api/swagger.json` など、3 階層まで）。`node_modules` / `dist` / `build` / `coverage` と隠しフォルダーは除外し、最初の 1 件の版と operation 数を表示する

ウィザードは次の 3 点を尋ねる。

- 読み込む spec（見つかったファイル・URL・別ファイル）
- 追加するプラグイン。一覧は Kubb registry から取得し、`plugin-ts` が選択済み。フレームワークやインストール済みライブラリからの推測はしない。必要な依存は manifest が宣言する
- 出力フォルダー（デフォルト `./src/gen`）

その後 `kubb.config.ts` 全体とインストールするパッケージを表示する。**Change a choice** で質問をやり直せる。確認後、パッケージをインストールし、`kubb.config.ts` を書き、`generate` スクリプトが無ければ `package.json` の scripts に `"generate": "kubb generate"` を追加する（既存のものは変更しない）。続けて最初の生成を実行し、失敗した場合はエラーを表示してセットアップを残したまま終了コード 1 で終わる。

`kubb` は実行した CLI と同一バージョンでインストールされ、各プラグインは `kubb add` と同様に registry が pin したバージョンで、実行中の Kubb と Node.js に対応する場合のみ追加される。

インストール前に各プラグインの manifest を確認する。選択したプラグインの `dependencies` が揃っていない場合、または `role: "consumer"` のプラグイン（例: `plugin-react-query`）の隣に client プラグインが無い場合、チェックに失敗し、ウィザードは不足分を表示して質問をやり直す。`--yes` または 3 つの値フラグ指定時は、不足分を表示して終了コード 1 で終わる。

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--yes`, `-y` | `false` | 全プロンプトと確認表示をスキップ。最初に見つかった spec（無ければ `./openapi.yaml`）・`plugin-ts`・`./src/gen` を使い、ステップごとに 1 行出力 |
| `--input`, `-i` | | OpenAPI spec のパス（ローカルファイルまたは URL）。spec パスのプロンプトをバイパス |
| `--output`, `-o` | | 生成ファイルの出力ディレクトリ。出力ディレクトリのプロンプトをバイパス |
| `--plugins` | | 追加するプラグインの registry id のカンマ区切り（`kubb add` と同じ id、例: `plugin-ts,plugin-zod`。`ts,zod` のような短縮名も可）。プラグイン選択プロンプトをバイパス。registry に無い id は `kubb init` を停止させる |
| `--dry-run` | `false` | パッケージのインストール・ファイル書き込み・最初の生成を行わずウィザードをプレビュー |

各フラグは自分のプロンプトだけをスキップし、`--yes` と組み合わせられる。3 つの値フラグ（`--input` / `--output` / `--plugins`）をすべて渡せば選択プロンプトと確認表示をスキップする。`kubb.config.ts` が既にある場合、`--yes` を渡さない限り上書き前に確認する。

## Examples

```shell
# デフォルトでプロンプト無し
npx kubb init --yes

# spec・出力先・プラグインを指定してプロンプト無し
npx kubb init --yes --input ./openapi.yaml --plugins ts,zod --output src/api
```

```text
✓ Installed kubb @kubb/plugin-ts @kubb/plugin-zod with npm
✓ Wrote kubb.config.ts
✓ Generated 84 files in src/api
Kubb is set up. Run npm run generate after changing the spec.
```

## Notes

- Source: https://kubb.dev/docs/5.x/reference/commands/init （kubb@5.20.0 の docs/5.x/reference/commands/init.md、取得日 2026-11-14）
- `--dry-run` は旧 `helpers/cli.md` のオプション表には無い。
- Migration (5.11 → 5.20): terminal output was reworked with previews for `kubb init` (5.11.5 changelog, @kubb/cli, #4355). The spec detection, config review, `generate` script and first generation described above are from the 5.20.0 docs; the changelog excerpt checked here does not record when they were introduced. `kubb init` edits `kubb.config.ts` without `@kubb/studio` (5.13.1, #4433).

## Related

- [add](./add.md)
- [generate](./generate.md)
