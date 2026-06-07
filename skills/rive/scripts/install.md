# Install

各 Rive ランタイムパッケージのインストールコマンド。

## Web ランタイム（推奨: WebGL2）

Rive Renderer を使用するフル機能パッケージ。Vector Feathering・Rive Text・スクリプティング等の高度な機能を利用できる。

```sh
npm install @rive-app/webgl2
```

```sh
yarn add @rive-app/webgl2
```

```sh
pnpm add @rive-app/webgl2
```

```sh
bun add @rive-app/webgl2
```

## Web ランタイム（Canvas）

Rive Renderer を使わない Canvas 2D ベースのパッケージ。高度な機能は利用不可。

```sh
npm install @rive-app/canvas
```

```sh
yarn add @rive-app/canvas
```

```sh
pnpm add @rive-app/canvas
```

## Web ランタイム（Canvas Lite）

Canvas ベースの軽量パッケージ。テキスト・レイアウト・スクリプティング・オーディオ機能が不要な場合に使用する。

```sh
npm install @rive-app/canvas-lite
```

```sh
yarn add @rive-app/canvas-lite
```

```sh
pnpm add @rive-app/canvas-lite
```

## React ランタイム（推奨: WebGL2）

`@rive-app/webgl2` をラップする React 向けパッケージ。フル機能利用時に推奨。

```sh
npm install --save @rive-app/react-webgl2
```

```sh
yarn add @rive-app/react-webgl2
```

```sh
pnpm add @rive-app/react-webgl2
```

## React ランタイム（Canvas）

`@rive-app/canvas` をラップする React 向けパッケージ。

```sh
npm install --save @rive-app/react-canvas
```

```sh
yarn add @rive-app/react-canvas
```

```sh
pnpm add @rive-app/react-canvas
```

## React ランタイム（Canvas Lite）

バンドルサイズを最小化したい場合の React 向けパッケージ。Rive Text 等の高度な機能は利用不可。

```sh
npm install --save @rive-app/react-canvas-lite
```

```sh
yarn add @rive-app/react-canvas-lite
```

```sh
pnpm add @rive-app/react-canvas-lite
```

## CDN 経由での読み込み（WebGL2 — 最新版）

HTML に直接 `<script>` タグで読み込む場合。ビルドツールを使わない環境向け。

```html
<script src="https://unpkg.com/@rive-app/webgl2"></script>
```

## CDN 経由での読み込み（WebGL2 — バージョン固定）

本番環境ではバージョンを固定することを推奨する。

```html
<script src="https://unpkg.com/@rive-app/webgl2@2.36.0"></script>
```

バージョン番号は npm で最新版を確認して置き換える（`npm show @rive-app/webgl2 version`）。
