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

公式ドキュメントの記載は次のとおり。

```sh
pnpm install driver.js
```

## モジュールのインポート

インストール後、JavaScript/TypeScript ファイルにライブラリと CSS を両方インポートする。

```js
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
```

CSS を省略するとポップオーバーとオーバーレイのスタイルが適用されない。

## Hints のインポート

Hints は独立したエントリで、専用の自己完結スタイルシートを持つ。使う場合のみインポートする。

```js
import { hints } from "driver.js/hints";
import "driver.js/dist/hints.css";
```

## Checklist のインポート

Checklist も独立したエントリ。項目がツアーを実行するため `driver.css` も併せて読み込む。

```js
import { checklist } from "driver.js/checklist";
import "driver.js/dist/driver.css";
import "driver.js/dist/checklist.css";
```

## CDN による読み込み（バンドラー不要）

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1/dist/driver.css"/>
```

CDN 版では `window.driver.js.driver` でアクセスする。

```js
const driverObj = window.driver.js.driver();
```

## CDN による Hints / Checklist の読み込み

公式ドキュメントの記載。Hints を使う場合のみ hints 版、Checklist を使う場合のみ checklist 版を追加する。

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css" />

<!-- Only if you use hints -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.css" />

<!-- Only if you use checklists -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/checklist.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/checklist.css" />
```

Hints ビルドは専用のグローバルを公開する。

```js
const hints = window.driverHints.hints;
```

Checklist ビルドも専用のグローバルを公開する。ツアー実行に使うため、メインスクリプトの後に読み込む。

```js
const checklist = window.driverChecklist.checklist;
```
