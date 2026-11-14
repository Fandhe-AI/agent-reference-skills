# kubb update

インストール済み extension を Kubb registry が pin するバージョンへ更新するコマンド。各 extension のバージョン変化と bump 種別（minor / major 等）を一覧表示し、インストールするものを選ばせ、プロジェクトのパッケージマネージャーでインストールする。その後、新バージョンで `kubb.config.ts` から再生成するか尋ね、変更されたファイルをサマリー表示する。`--yes` は、名前を指定しない限り major を除く全更新をインストールし、再生成しない。`kubb.config.ts` は変更しない。

## Signature / Usage

```shell
# registry に載る全インストール済み extension を更新
kubb update

# 更新を一覧表示のみ
kubb update --dry-run

# 2 つの extension をプロンプト無しで更新
kubb update plugin-zod plugin-ts --yes
```

出力例:

```text
◇  Checked 3 extensions against the registry
│  Extension         Current  Latest
│  @kubb/plugin-ts   5.0.0    5.2.0       minor
│  @kubb/plugin-zod  5.2.0    6.0.0       major · breaking
│  @kubb/plugin-msw  5.4.2    up to date
│
◆  Select the updates to install
│  ◼ @kubb/plugin-ts (5.0.0 → 5.2.0)
│  ◻ @kubb/plugin-zod (5.2.0 → 6.0.0)
│  ↑/↓ to navigate • Space: select • Enter: confirm
```

minor / patch の更新は選択済みで始まり、major は壊れる可能性があるため未選択で始まる。インストール後、サマリーは結果と所要時間から始まり、パッケージ・スキップした更新・ファイル変更を列挙する。

```text
✓ Update complete  2.16s

  Packages  1 installed with pnpm · 1 skipped
  Skipped   Plugin @kubb/plugin-zod 6.0.0  run kubb update plugin-zod later
  Files     1 added · 1 modified · 0 deleted
```

`--dry-run` の出力:

```text
◇ Checked 2 extensions against the registry
│  Extension         Current  Latest
│  @kubb/plugin-ts   5.0.0    5.2.0   minor
│  @kubb/plugin-zod  5.2.0    6.0.0   major · breaking
│
◇ Updates available  138ms

Dry run: nothing was installed. Run kubb update to install them.
```

確認が成功すれば更新があっても終了コード 0。パッケージのインストールも再生成も行わない。

## Arguments

| Name | Required | Description |
| --- | --- | --- |
| `[ids...]` | `false` | 更新する registry id（`<owner>/<slug>`、または `kubb-labs/<slug>` を意味する bare `<slug>`）。省略時は registry に載る全インストール済み extension を確認 |

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--dry-run` | `false` | インストールせず利用可能な更新を一覧表示 |
| `--yes`, `-y` | `false` | 確認無しで更新をインストール。major は id を名前指定した場合のみインストール |

## Environment variables

| Name | Default | Description |
| --- | --- | --- |
| `KUBB_REGISTRY` | `https://kubb.dev/registry` | 読み込む registry のベース URL |

## Notes

- 対象は、カレントディレクトリの `package.json` の `dependencies` / `devDependencies` にある registry 掲載の extension。インストール済みバージョンが pin より古い、または未インストールの場合に更新対象となる。pin より新しいバージョンは放置され、ダウングレードはしない。
- 使用中の Kubb / Node.js に非対応の更新は `Skipped <id>: <reason>` でスキップ。GitHub release に pin された extension は `github:<owner>/<repo>#<commit>` でインストールされる。
- インストール済みでない id は `<id> is not installed, or not in the registry.` と表示され、終了コード 1 で終わるが、他の id は更新される。何も古くなければサマリーは `Already up to date`。非互換の更新はスキップとして報告される。
- 終了コード 1: id が不正またはインストールされていない、名前指定した extension の更新が非互換、registry index が読めない／不正、インストール失敗。終了コード 0: 更新対象無し、プロンプトでキャンセル。インストール後の生成が失敗した場合、サマリーは `Extensions updated; generation failed` となり終了コードは変わらない。
- Migration (5.11 → 5.20): `--check` was replaced by `--dry-run` (5.11.5 changelog, @kubb/cli, #4355). `kubb update <id>` exits with code 1 when the id is not installed (5.13.1, #4431) and when it skips a named extension that needs a newer Kubb or Node.js (5.14.1, #4440).
- Source: https://kubb.dev/docs/5.x/reference/commands/update （kubb@5.20.0 の docs/5.x/reference/commands/update.md、取得日 2026-11-14）

## Related

- [list](./list.md)
- [add](./add.md)
