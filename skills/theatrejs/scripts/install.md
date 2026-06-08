# Install

Theatre.js パッケージのインストールコマンド集。

## @theatre/core と @theatre/studio のインストール（npm）

```sh
npm install --save @theatre/core @theatre/studio
```

## @theatre/core と @theatre/studio のインストール（yarn）

```sh
yarn add @theatre/core @theatre/studio
```

## バージョン固定インストール — 0.5 系（npm）

```sh
npm install --save @theatre/core@0.5 @theatre/studio@0.5
```

## バージョン固定インストール — 0.5 系（yarn）

```sh
yarn add @theatre/core@0.5 @theatre/studio@0.5
```

## React Three Fiber 統合パッケージのインストール（npm）

```sh
npm install --save react three @react-three/fiber
npm install --save @theatre/core@0.5 @theatre/studio@0.5 @theatre/r3f@0.5
npm install --save-dev @types/three
```

## React Three Fiber 統合パッケージのインストール（yarn）

```sh
yarn add react three @react-three/fiber
yarn add @theatre/core@0.5 @theatre/studio@0.5 @theatre/r3f@0.5
yarn add --dev @types/three
```

## theatric（React 向けコントロール UI）のインストール

```sh
npm install theatric
```

## CDN 経由での読み込み（バンドラー不使用・開発用）

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-and-studio.js'
</script>
```

## CDN 経由での読み込み（バンドラー不使用・本番用）

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/@theatre/browser-bundles@0.5.0-insiders.88df1ef/dist/core-only.min.js'
</script>
```

`core-only.min.js` は Studio UI を含まない本番向けビルド。アニメーション再生のみ必要な場合に使用する。

## Three.js スターターリポジトリのクローンと起動

```sh
git clone https://github.com/fulopkovacs/vanilla-threejs-project
cd vanilla-threejs-project
npm install
npm run dev
```
