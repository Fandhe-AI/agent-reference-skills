# kubb init

対話ウィザードで新規 Kubb プロジェクトを初期化するコマンド。`package.json` が無ければ作成し、選択したプラグインをインストールして、すぐ使える `kubb.config.ts` を書き出す。

## Signature / Usage

```shell
npx kubb init
```

ウィザードは次の 3 点を尋ねる。

- OpenAPI/Swagger spec のパス（ローカルファイルまたは URL）
- 生成ファイルの出力ディレクトリ
- インストールするプラグイン（clients / hooks / validators / mocks など）。一覧は Kubb registry から取得

パッケージマネージャー（`bun` / `pnpm` / `npm` / `yarn`）はプロジェクトから自動検出する。`kubb` は実行した CLI と同一バージョンでインストールされ、各プラグインは `kubb add` と同様に registry が pin したバージョンで、実行中の Kubb と Node.js に対応する場合のみ追加される。

インストール前に各プラグインの manifest を確認する。選択したプラグインの `dependencies` が揃っていない場合、または `role: "consumer"` のプラグイン（例: `plugin-react-query`）の隣に client プラグインが無い場合、不足分を表示して停止する。

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--yes`, `-y` | `false` | 全プロンプトをスキップしデフォルト値を使用 |
| `--input`, `-i` | | OpenAPI spec のパス（ローカルファイルまたは URL）。spec パスのプロンプトをバイパス |
| `--output`, `-o` | | 生成ファイルの出力ディレクトリ。出力ディレクトリのプロンプトをバイパス |
| `--plugins` | | 追加するプラグインの registry id のカンマ区切り（`kubb add` と同じ id、例: `plugin-ts,plugin-zod`）。プラグイン選択プロンプトをバイパス。registry に無い id は `kubb init` を停止させる |
| `--dry-run` | `false` | パッケージのインストールと `kubb.config.ts` の書き込みを行わずウィザードをプレビュー |

各フラグは自分のプロンプトだけをスキップし、`--yes` と組み合わせられる。3 つの値フラグ（`--input` / `--output` / `--plugins`）をすべて渡せば `--yes` 無しでもプロンプト無しで実行される。

## Examples

```shell
# デフォルトでプロンプト無し
npx kubb init --yes

# spec・出力先・プラグインを指定してプロンプト無し
npx kubb init --input ./openapi.yaml --output ./src/gen --plugins plugin-ts,plugin-zod
```

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/commands/init （kubb@5.11.0 の docs/5.x/reference/commands/init.md）
- `--dry-run` は旧 `helpers/cli.md` のオプション表には無い（5.11.0 の公式ページで確認）。

## Related

- [add](./add.md)
- [generate](./generate.md)
