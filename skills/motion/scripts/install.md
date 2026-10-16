# Install

Motion パッケージのインストールと import 方法。React / vanilla JS に加え、AnimateView・Vue・Motion UI（Motion+）の導入手順を含む。

## React 向けインストール

```sh
npm install motion
```

```sh
yarn add motion
```

```sh
pnpm add motion
```

React 18.2 以上が前提。Vite は追加設定不要。

## React の import

```js
import { motion } from "motion/react"
```

Next.js App Router では `"use client"` ディレクティブを付けるか、後述の `motion/react-client` を import する。

## クライアント JS を減らす React import

```js
import * as motion from "motion/react-client"
```

`"use client"` を付けずに利用でき、Server Component 構成でクライアント側 JS を削減できる。

## CDN 経由の React import

```js
import motion from "https://cdn.jsdelivr.net/npm/motion@latest/react/+esm"
```

ビルドツールなしの環境向け。

> 公式推奨: URL の `latest` は固定版に置き換える（公式 quick-start の例は `11.11.13`。最新の公開版はサイトのフッターで確認する）。上記コマンドの `@latest` は例示であり、本番では `motion@<固定版>` を使う。

## vanilla JS 向けインストール

```sh
npm install motion
```

React と同じ `motion` パッケージを使用する。

## vanilla JS の import

```js
import { animate, scroll } from "motion"
```

`animate` などの命令的 API を直接 import する。

## CDN 経由の vanilla JS import

```html
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"
</script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/motion@latest/dist/motion.js"></script>
<script>
  const { animate, scroll } = Motion
</script>
```

> 公式推奨: `latest` は固定版（例: `11.11.13`）に置き換える。2 つ目はグローバル変数 `Motion` を追加する legacy include。

## TypeScript 環境での使用

```sh
npm install motion
```

`motion` パッケージをインストールするだけで TypeScript からそのまま利用できる。`@types/motion` 等の追加インストールは不要。

> **要確認**: 型定義がパッケージに同梱されている旨は公式インストールページ (https://motion.dev/docs/react-installation) には明記されていない。追加の型パッケージが不要であることは利用上の前提として記載しているが、公式記載の確認を推奨する。

## AnimateView 用のインストール

```sh
npm install motion
```

```sh
npm install react@^19.3.0 react-dom@^19.3.0
```

```js
import { AnimateView } from "motion/react-animate-view"
```

`AnimateView` は React / React DOM 19.3 以上が必須（両パッケージを同時に更新する）。`"motion/react"` からは export されず、別エントリポイント `"motion/react-animate-view"` から import する。他の Motion for React API は引き続き React 18 に対応。Motion+ early access 版の `"motion-plus/animate-view"` からの移行は import を置き換えるだけで、Motion+ 会員資格・アクセストークンは不要。出典: docs/react-animate-view.md。

## Vue 向けインストール（motion-v）

```sh
npm install motion-v
```

### Nuxt モジュール

```ts
export default defineNuxtConfig({
  modules: ['motion-v/nuxt'],
})
```

`nuxt.config.ts` に `motion-v/nuxt` を追加すると全コンポーネントが auto-import される。

### unplugin-vue-components

```ts
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'
```

`Components({ dts: true, resolvers: [MotionResolver()] })` を Vite の `plugins` に渡して使う（`resolvers` 周辺の完全な設定は公式 docs/vue.md 参照）。auto-import は `<motion />` コンポーネントに未対応のため手動 import が必要。出典: docs/vue.md。

## Motion UI（Motion+）のインストール

> **警告**: アクセストークンは秘密情報。`package.json`・lockfile・コミット対象ファイルに実値を書かない。`.npmrc` には `${MOTION_TOKEN}` の環境変数参照のみを書く（このファイルはコミットしてよい）。Motion+ 会員資格が必要で、トークンは Motion+ の tokens ページで確認する。

プロジェクトルートの `.npmrc`（npm / pnpm / Bun）:

```ini
@motionplus:registry=https://api.motion.dev/npm/
//api.motion.dev/npm/:_authToken=${MOTION_TOKEN}
```

`package.json` の依存:

```json
{
  "dependencies": {
    "motion-plus": "npm:@motionplus/core@^2.12.0"
  }
}
```

トークンを環境変数で渡してインストール:

```sh
export MOTION_TOKEN=your-token-here
npm install   # or pnpm install / bun install
```

- `@motionplus/core` が `motion-plus` の名前でインストールされ、import は `motion-plus/react` 等のまま使える（`@motionplus/core` を直接依存にして `@motionplus/core/react` から import も可）
- Bun は `.env` を自動で読む。npm / pnpm は `.env` を読まないため、シェルで export するか direnv / dotenv-cli（`npx dotenv-cli -- npm install`）を使う
- `MOTION_TOKEN` が未設定だと、npm はネットワークに触れないコマンドを含む全コマンドで `Failed to replace env in config` により失敗する。チーム全員と CI で設定が必要
- Yarn 1 は `.yarnrc`、Yarn 2+ は `.yarnrc.yml` に別途設定が必要（公式 docs/react-motion-ui-installation.md の Yarn 節参照）
- CI では `MOTION_TOKEN` をシークレットとして環境変数に公開する

出典: docs/react-motion-ui-installation.md、docs/motion-ui-installation.md。
