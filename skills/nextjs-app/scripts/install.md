# Install

`create-next-app` CLI で Next.js App Router プロジェクトを作成するコマンド集。

## デフォルト設定で新規プロジェクトを作成する

```sh
npx create-next-app@latest
```

対話形式のプロンプトが表示される。推奨デフォルト（TypeScript, ESLint, Tailwind CSS, App Router, AGENTS.md）を選ぶとそのまま作成される。

## プロジェクト名とオプションを指定して非対話で作成する

```sh
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm --yes
```

`--app` で App Router を明示的に有効化する。`--yes` で保存済み設定またはデフォルトをすべて採用し、対話プロンプトをスキップする。

## Biome を linter として使う

```sh
npx create-next-app@latest my-app --app --biome
```

## Route Handler のみのプロジェクトを作成する

```sh
npx create-next-app@latest my-app --app --api
```

App Router の Route Handler のみで構成される空のプロジェクトを作成する。

## 公式 example から作成する

```sh
npx create-next-app@latest my-app --example [example-name]
```

`[example-name]` は https://github.com/vercel/next.js/tree/canary/examples 配下の example ディレクトリ名。

## 任意の GitHub リポジトリから作成する

```sh
npx create-next-app@latest my-app --example "https://github.com/<owner>/<repo>"
```

## パッケージマネージャーを明示指定する

```sh
npx create-next-app@latest my-app --use-pnpm
```

`--use-pnpm` の代わりに `--use-yarn` / `--use-bun` / `--use-npm` も指定できる。

## 保存済み設定をリセットする

```sh
npx create-next-app@latest --reset-preferences
```

## 依存関係のインストールをスキップする

```sh
npx create-next-app@latest my-app --skip-install
```

CI などで依存関係インストールを別途行う場合に使う。

## git 初期化をスキップする

```sh
npx create-next-app@latest my-app --disable-git
```

## 利用可能な主なオプション

| Option | Description |
| --- | --- |
| `-h` / `--help` | Show all available options |
| `-v` / `--version` | Output the version number |
| `--app` | Initialize as an App Router project |
| `--api` | Initialize a project with only route handlers |
| `--ts` / `--typescript`, `--js` / `--javascript` | TypeScript (default) / JavaScript |
| `--tailwind` | Initialize with Tailwind CSS config (default) |
| `--react-compiler` | Initialize with React Compiler enabled |
| `--eslint` / `--biome` / `--no-linter` | linter 選択 |
| `--src-dir` | `src/` ディレクトリ配下に生成 |
| `--turbopack` / `--webpack` | bundler 指定（Turbopack が default） |
| `--import-alias <alias>` | import alias（default `@/*`） |
| `--empty` | 空プロジェクトを作成 |
| `-e` / `--example [name] [github-url]`, `--example-path <path>` | example から作成 |
| `--use-npm` / `--use-pnpm` / `--use-yarn` / `--use-bun` | package manager 指定 |
| `--reset-preferences` | 保存済み設定をリセット |
| `--skip-install` | 依存インストールをスキップ |
| `--disable-git` | git 初期化をスキップ |
| `--agents-md` | `AGENTS.md` / `CLAUDE.md` を含める（default） |
| `--yes` | 前回設定またはデフォルトをすべて採用 |
| `--no-*` | default オプションの打ち消し（例: `--no-ts`） |

Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app
