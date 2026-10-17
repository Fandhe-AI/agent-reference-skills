# kubb update

インストール済み extension を Kubb registry が pin するバージョンへ更新するコマンド。種別とバージョン変化を一覧表示し、インストールするものを選ばせ、プロジェクトのパッケージマネージャーでインストールする。`--yes` で全件インストール。`kubb.config.ts` は変更しない。

## Signature / Usage

```shell
# registry に載る全インストール済み extension を更新
kubb update

# 更新を一覧表示のみ
kubb update --check

# 2 つの extension をプロンプト無しで更新
kubb update plugin-zod plugin-ts --yes
```

出力例:

```text
@kubb/plugin-ts  plugin  5.0.0 -> 5.2.0
@kubb/plugin-zod  plugin  5.1.0 -> 5.2.0
◆  Select the updates to install:
│  ◼ @kubb/plugin-ts (plugin  5.0.0 -> 5.2.0)
│  ◼ @kubb/plugin-zod (plugin  5.1.0 -> 5.2.0)
```

全更新は選択済みで始まる。Space で除外、Enter で残りをインストール。

## Arguments

| Name | Required | Description |
| --- | --- | --- |
| `[ids...]` | `false` | 更新する registry id（`<owner>/<slug>`、または `kubb-labs/<slug>` を意味する bare `<slug>`）。省略時は registry に載る全インストール済み extension を確認 |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--check` | `false` | インストールせず利用可能な更新を一覧表示 |
| `--yes`, `-y` | `false` | 確認無しで全更新をインストール |

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL |

## Notes

- 対象は、カレントディレクトリの `package.json` の `dependencies` / `devDependencies` にある registry 掲載の extension。インストール済みバージョンが pin より古い、または未インストールの場合に更新対象となる。pin より新しいバージョンは放置され、ダウングレードはしない。
- 使用中の Kubb / Node.js に非対応の更新は `Skipped <id>: <reason>` でスキップ。GitHub release に pin された extension は `github:<owner>/<repo>#<commit>` でインストールされる。
- インストール済みでない id は `<id> is not installed, or not in the registry.` と表示され、他の id は更新される。何も古くなければ `Every installed extension is up to date.`
- 終了コード 1: id が不正、registry index が読めない／不正、インストール失敗。終了コード 0: 更新対象無し、`--check`、プロンプトでキャンセル。
- 出典: https://kubb.dev/docs/5.x/reference/commands/update （kubb@5.11.0 の docs/5.x/reference/commands/update.md）

## Related

- [list](./list.md)
- [add](./add.md)
