---
source: https://vite.dev/guide/#scaffolding-your-first-vite-project
---

# Install

Vite プロジェクトの scaffold と手動インストールのコマンド集。Vite は Node.js 20.19+ / 22.12+ が必要（一部テンプレートはさらに新しい Node.js を要求）。

## プロジェクトの scaffold（対話式）

```sh
npm create vite@latest
```

```sh
yarn create vite
```

```sh
pnpm create vite
```

```sh
bun create vite
```

```sh
deno init --npm vite
```

プロンプトに従って進める。create-vite のテンプレート選択はプロンプト内で行う。

## テンプレート指定での scaffold

```sh
# npm 7+ は余分な -- が必要
npm create vite@latest my-vue-app -- --template vue
```

```sh
yarn create vite my-vue-app --template vue
```

```sh
pnpm create vite my-vue-app --template vue
```

```sh
bun create vite my-vue-app --template vue
```

```sh
deno init --npm vite my-vue-app --template vue
```

プロジェクト名に `.` を指定すると現在のディレクトリに scaffold する。対話プロンプトなしで作る場合は `--no-interactive` を付ける。

## 利用可能なテンプレート一覧

```sh
# --template に指定できる値（create-vite README 記載の 18 種）
vanilla
vanilla-ts
vue
vue-ts
react
react-compiler
react-ts
react-compiler-ts
preact
preact-ts
lit
lit-ts
svelte
svelte-ts
solid
solid-ts
qwik
qwik-ts
```

上記は `--template <name>` に渡す値の列挙であり、単体で実行するコマンドではない。

## コミュニティテンプレートの利用（tiged）

```sh
npx tiged user/project my-project
cd my-project

npm install
npm run dev
```

GitHub 上でデフォルトブランチが `main` のテンプレートが前提。tiged は外部ツールで、コミュニティ製テンプレートは Awesome Vite に一覧がある。

## 既存プロジェクトへの手動インストール

```sh
npm install -D vite
```

```sh
yarn add -D vite
```

```sh
pnpm add -D vite
```

```sh
bun add -D vite
```

```sh
deno add -D npm:vite
```

`index.html`（例: `<p>Hello Vite!</p>`）を作成してから起動する。

```sh
npx vite
```

```sh
yarn vite
```

```sh
pnpm vite
```

```sh
bunx vite
```

```sh
deno run -A npm:vite
```

`index.html` は `http://localhost:5173` で配信される。
