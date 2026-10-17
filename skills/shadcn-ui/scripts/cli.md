---
source: https://ui.shadcn.com/docs/cli
---

# CLI

`shadcn` CLI（4.22.0）の主要サブコマンド集。出典は公式 cli ページ（取得日 2026-10-16）。変更を伴うコマンドは使い捨て環境か Git 管理下のクリーンなワークツリーで実行する。

## プロジェクトの初期化（init）

```sh
npx shadcn@latest init
```

`create` は `init` のエイリアス。

```sh
npx shadcn@latest create
```

## init のオプション一覧

```sh
npx shadcn@latest init --help
```

主なオプション: `-t, --template <template>`（next / vite / start / react-router / laravel / astro）、`-b, --base <base>`（base / radix / aria）、`-p, --preset [name]`、`-d, --defaults`（`--template=next --preset=nova`）、`-n, --name <name>`、`--monorepo` / `--no-monorepo`、`--rtl` / `--no-rtl`、`--css-variables` / `--no-css-variables`、`--pointer` / `--no-pointer`、`--reinstall` / `--no-reinstall`、`-c, --cwd <cwd>`。

## base を指定した初期化

```sh
npx shadcn@latest init --base radix
npx shadcn@latest init --base aria
```

## 既存設定を上書きする初期化

> **警告**: `-f, --force` は既存の設定を強制上書きする。使い捨て環境、または Git でコミット済みの状態で実行する。

```sh
npx shadcn@latest init --force
```

## コンポーネントの追加（add）

```sh
npx shadcn@latest add [component]
```

`components` には名前・URL・ローカルパスを指定できる。

## add のオプション一覧

```sh
npx shadcn@latest add --help
```

主なオプション: `-y, --yes`、`-o, --overwrite`、`-c, --cwd <cwd>`、`-a, --all`、`-p, --path <path>`、`-s, --silent`、`--dry-run`、`--diff [path]`、`--view [path]`。

## 書き込み前のプレビューと差分確認

```sh
npx shadcn@latest add button --dry-run
npx shadcn@latest add button --diff
npx shadcn@latest add button --view
```

`--dry-run` はファイルを書かずに変更内容を表示。`--diff [path]` は差分、`--view [path]` はファイル内容を表示する（cli の Options 記載）。

## 既存ファイルを上書きして追加

> **警告**: `-o, --overwrite` は `components/ui/` 内の既存ファイルを上書きし、ローカルの変更が失われる。使い捨て環境、または Git でコミット済みの状態で実行する。

```sh
npx shadcn@latest add button --overwrite
```

## 全コンポーネントの追加

> **警告**: `-a, --all` は利用可能な全コンポーネントを追加する。大量のファイルと依存が増えるため、使い捨て環境か Git クリーン状態で実行する。

```sh
npx shadcn@latest add --all
```

## preset の適用（apply）

```sh
npx shadcn@latest apply a2r6bw
```

既存プロジェクトに preset を適用する。`a2r6bw` は公式例の preset コード。

## テーマまたはフォントのみ適用

```sh
npx shadcn@latest apply a2r6bw --only theme
```

`--only` に指定できる値は `theme` と `font`。UI コンポーネントは再インストールされない。

## preset コードのデコード（preset decode）

```sh
npx shadcn@latest preset decode a2r6bw
```

`--json` で JSON 出力。

## 現在のプロジェクトの preset 解決（preset resolve / info）

```sh
npx shadcn@latest preset resolve
npx shadcn@latest preset info
```

`preset info` は `preset resolve` のエイリアス。`--json` / `-c, --cwd <cwd>` に対応。

## preset の create URL 取得・ブラウザで開く（preset url / open）

```sh
npx shadcn@latest preset url a2r6bw
npx shadcn@latest preset open a2r6bw
```

## レジストリ項目の閲覧（view）

```sh
npx shadcn@latest view button card dialog
npx shadcn@latest view @acme/auth @v0/dashboard
```

インストール前に項目の内容を確認する。名前空間付きレジストリも指定できる。

## レジストリの検索（search / list）

```sh
npx shadcn@latest search @shadcn -q "button"
npx shadcn@latest search @shadcn @v0 @acme
npx shadcn@latest list @acme
```

`list` は `search` のエイリアス。レジストリ名は `@` 始まりで指定する。`-l, --limit <number>`（既定 100）・`-o, --offset <number>`（既定 0）で件数を制御する。

## レジストリ JSON のビルド（build）

```sh
npx shadcn@latest build
npx shadcn@latest build --output ./public/registry
```

`registry.json` を読み、既定で `public/r` に JSON を生成する。`-o, --output <path>` で出力先を変更する。

## ドキュメントの取得（docs）

```sh
npx shadcn@latest docs [component]
```

`-b, --base <base>`（base / radix / aria。既定はプロジェクトの base）と `--json` に対応する。

## プロジェクト情報の取得（info）

```sh
npx shadcn@latest info
```

`--json` / `-c, --cwd <cwd>` に対応する。

## マイグレーション一覧（migrate）

```sh
npx shadcn@latest migrate --list
```

> **警告**: `migrate` 系は既存ソースを書き換える。使い捨て環境、または Git でコミット済みの状態で実行する。

利用可能なマイグレーション: `cn` / `icons` / `base-color` / `radix` / `rtl`。共通オプション: `-c, --cwd <cwd>`、`-l, --list`、`-y, --yes`、`-f, --from <name>`、`-t, --to <name>`。

## migrate cn

```sh
npx shadcn@latest migrate cn
npx shadcn@latest migrate cn src/lib/utils.ts
npx shadcn@latest migrate cn "src/**/*.{ts,tsx}"
```

`clsx` / `tailwind-merge` / `cnfast` を `cn` に置き換える。`components.json` は不要で、Tailwind CSS v4 のプロジェクト向け。

## migrate icons

```sh
npx shadcn@latest migrate icons
npx shadcn@latest migrate icons --from lucide --to phosphor --yes
npx shadcn@latest migrate icons src/components/ui/button.tsx --from lucide --to tabler
npx shadcn@latest migrate icons "src/components/**" --from lucide --to tabler
```

対応ライブラリ: `lucide` / `tabler` / `hugeicons` / `phosphor` / `remixicon` / `radix`（legacy）。パス指定の実行では `components.json` は更新されない。

## migrate base-color

```sh
npx shadcn@latest migrate base-color
npx shadcn@latest migrate base-color --to zinc --yes
```

対応 base color: `neutral` / `zinc` / `stone` / `mauve` / `olive` / `mist` / `taupe`。

## migrate rtl

```sh
npx shadcn@latest migrate rtl
npx shadcn@latest migrate rtl src/components/ui/button.tsx
npx shadcn@latest migrate rtl "src/components/ui/**"
```

`components.json` に `rtl: true` を設定し、物理 CSS プロパティを論理プロパティへ変換する。パス省略時は `ui` ディレクトリ全体が対象。

## migrate radix

```sh
npx shadcn@latest migrate radix
npx shadcn@latest migrate radix src/components/ui/dialog.tsx
npx shadcn@latest migrate radix "src/components/ui/**"
```

`@radix-ui/react-*` の import を統合パッケージ `radix-ui` に変換する。

## shadcn/tailwind.css のインライン化（eject）

> **警告**: 公式ドキュメントに「この操作は元に戻せない」と明記されている。eject 後は `shadcn/tailwind.css` への CLI アップデートが自動では反映されない。使い捨て環境、または Git でコミット済みの状態で実行する。

```sh
npx shadcn@latest eject
```

モノレポでは `components.json` とグローバル CSS を持つワークスペースを指定する。

```sh
npx shadcn@latest eject -c packages/ui
```

`-y, --yes` / `-s, --silent` に対応する。
