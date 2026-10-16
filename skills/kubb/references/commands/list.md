# kubb list

現在のプロジェクトにインストールされた Kubb extension、registry が pin するバージョン、更新の有無を表示するコマンド。引数・オプションは無い。

## Signature / Usage

```shell
kubb list
```

```text
ID                    PACKAGE                    INSTALLED  REGISTRY  UPDATE
kubb-labs/plugin-ts   @kubb/plugin-ts            5.4.2      5.4.4     yes
kubb-labs/plugin-zod  @kubb/plugin-zod           5.4.4      5.4.4     no
-                     @acme/kubb-plugin-graphql  1.0.0      -         no
```

## Columns

| Name | Description |
| --- | --- |
| `ID` | registry id。registry に載っていないパッケージは `-` |
| `PACKAGE` | npm パッケージ名 |
| `INSTALLED` | インストール済みバージョン。未インストールは `-` |
| `REGISTRY` | registry が pin するバージョン。registry に載っていなければ `-` |
| `UPDATE` | インストール済みが pin より古い、または不明なら `yes`。`kubb update` でインストールする |

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL |

## Notes

- 対象は、カレントディレクトリの `package.json` の `dependencies` / `devDependencies` にあるパッケージのうち、有効な `kubb-extension.json` を同梱するか registry に載っているもの。
- `kubb` に同梱される extension（`@kubb/adapter-oas`、`@kubb/plugin-barrel` 等）は `package.json` に直接記載されている場合のみ表示される。
- registry が読めない場合は `Showing installed extensions only: <reason>` を表示し、manifest を同梱するパッケージのみ一覧する。何も見つからなければ `No installed extensions found.`
- 終了コード 1: `KUBB_REGISTRY` が `http://` / `https://` URL でない場合。registry に到達できなくてもコマンドは失敗しない。
- 出典: https://kubb.dev/docs/5.x/reference/commands/list （kubb@5.11.0 の docs/5.x/reference/commands/list.md）

## Related

- [update](./update.md)
- [add](./add.md)
