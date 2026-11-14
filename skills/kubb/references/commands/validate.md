# kubb validate

Kubb config のアダプターで spec を検証するコマンド（生成は実行しない）。CI やコミット前に spec の誤りを早期検出するために使う。config が無い場合、OpenAPI / Swagger 用に `@kubb/adapter-oas` を使う。

## Signature / Usage

```shell
kubb validate ./petStore.yaml
```

成功時の出力:

```text
✓ Validation passed  84ms

  1 specification validated
  Input    ./petStore.yaml
  Adapter  oas
```

入力は URL（例: `https://petstore3.swagger.io/api/v3/openapi.json`）や git リポジトリ内のファイル（`git+https://github.com/org/api.git#main:specs/openapi.yaml`）も可。git 入力は `git` で一時フォルダーに取得して検証後に削除する。形式は config の `input` を参照。

サマリーは結果と所要時間の後に入力とアダプター名を表示する。generator plugin は実行されず、生成ファイルも書かれない。失敗時は検証エラーを含み、デフォルトの OpenAPI アダプターが無い場合はインストールコマンドも示す。

コマンドはプロジェクトの config を探すか `--config <path>`（`-c`）を受け取る。各 config のアダプターが入力を検証し、ローカルパスはその config の `root`（無ければカレントディレクトリ）から解決する。URL と git 入力はそのまま渡される。アダプターの無い config は OpenAPI アダプターに置き換えず失敗する。

```shell
kubb validate ./schema.graphql --config ./kubb.config.ts
```

## Arguments

| Name | Required | Description |
| --- | --- | --- |
| `<input>` | `true` | 検証する spec のパス・URL・git 入力（`git+<repo>#<ref>:<path>`） |

## Notes

- spec が無効な場合は非ゼロの終了ステータスを返す。pre-commit フックや CI ステップとしてビルドを失敗させる用途に使える。
- Migration (5.11 → 5.20): `kubb validate` accepts git inputs (5.12.0 changelog, @kubb/cli, #4375). The config-adapter behaviour and `--config` option above are from the 5.20.0 docs; the changelog does not record when they were introduced.
- Source: https://kubb.dev/docs/5.x/reference/commands/validate （kubb@5.20.0 の docs/5.x/reference/commands/validate.md、取得日 2026-11-14）

## Related

- [generate](./generate.md)
- [mcp](./mcp.md)
