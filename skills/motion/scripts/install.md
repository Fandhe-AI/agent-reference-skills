# Install

Motion パッケージのインストールと import 方法。

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

## TypeScript 環境での使用

```sh
npm install motion
```

`motion` パッケージをインストールするだけで TypeScript からそのまま利用できる。`@types/motion` 等の追加インストールは不要。

> **要確認**: 型定義がパッケージに同梱されている旨は公式インストールページ (https://motion.dev/docs/react-installation) には明記されていない。追加の型パッケージが不要であることは利用上の前提として記載しているが、公式記載の確認を推奨する。
