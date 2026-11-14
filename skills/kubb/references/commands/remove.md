# kubb remove

`kubb.config.ts` から plugin または parser を削除し、そのパッケージをアンインストールするコマンド。削除する行を表示し、変更前に確認する。

## Signature / Usage

```shell
kubb remove plugin-zod
```

```text
◇  Plugin plugin-zod v5.13.0
│  Config    kubb.config.ts
│    - import { pluginZod } from '@kubb/plugin-zod'
│    - pluginZod({ output: { path: 'zod' } }),
│  Uninstalls @kubb/plugin-zod
│
◆  Remove it?
│  Yes
│
◇  pluginZod() removed from kubb.config.ts

✓ Plugin removed  3.42s

  Packages  @kubb/plugin-zod uninstalled with pnpm

Next     kubb generate
```

plugin が生成したファイルは次の `kubb generate` までディスクに残る。パッケージを残す場合:

```shell
kubb remove plugin-zod --no-uninstall
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--config=<path>`, `-c <path>` | | 編集する Kubb config のパス。省略時は `kubb generate` と同じ config ファイルをカレントディレクトリ、次に各親ディレクトリで探す |
| `--yes`, `-y` | `false` | 確認無しで削除 |
| `--no-uninstall` | | config のみ編集し、パッケージはインストールしたままにする |
| `--dry-run` | `false` | 削除する config 行とパッケージを表示して終了。アンインストールも書き込みも行わない |

## Notes

- 終了コード 1: id が不正または未登録、extension を削除できない、アンインストール失敗。終了コード 0: 削除成功、プロジェクトに無かった、またはキャンセル。
- Studio から使うには `--allow-remove` 権限（`--allow-config-edit` も必要）が要る。`studio.md` を参照。
- Migration (5.11 → 5.20): `kubb remove <id>` and the Studio `--allow-remove` permission were added in 5.13.1 (@kubb/cli, #4431); `kubb remove` ignores plugins Studio switched off (#4435).
- Source: https://kubb.dev/docs/5.x/reference/commands/remove （kubb@5.20.0 の docs/5.x/reference/commands/remove.md、取得日 2026-11-14）

### Arguments

| Name | Required | Description |
| --- | --- | --- |
| `<id>` | `true` | registry id（`<owner>/<slug>`、または `kubb-labs/<slug>` を意味する bare `<slug>`） |

### What it removes

plugin または parser を config から削除し、未使用になった import も削除する。Kubb Studio がオフにした plugin も対象。config に複数のエントリがある場合は最初の 1 つを編集する。

次は削除しない。

- adapter（config に必須）
- 最後の parser（config に最低 1 つ必要）
- 他の extension が依存している extension（先に依存元を削除する）

`@kubb/adapter-oas` / `@kubb/parser-ts` / `@kubb/parser-md` / `@kubb/plugin-barrel` は `kubb` に同梱されており、config からは外れるがインストールされたまま残る。

### Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL |

## Related

- [add](./add.md)
- [list](./list.md)
- [studio](./studio.md)
