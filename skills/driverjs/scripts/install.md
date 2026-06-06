# Install

パッケージマネージャーまたは CDN で driver.js をプロジェクトに追加する。

## npm によるインストール

```sh
npm install driver.js
```

## yarn によるインストール

```sh
yarn add driver.js
```

## pnpm によるインストール

```sh
pnpm add driver.js
```

## モジュールのインポート

インストール後、JavaScript/TypeScript ファイルにライブラリと CSS を両方インポートする。

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
```

CSS を省略するとポップオーバーとオーバーレイのスタイルが適用されない。

## CDN による読み込み（バンドラー不要）

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.css"/>
```

CDN 版では `window.driver.js.driver` でアクセスする。

```js
const driverObj = window.driver.js.driver();
```
