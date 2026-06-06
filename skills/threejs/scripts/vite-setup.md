# Vite Setup

Vite を使った Three.js プロジェクトのセットアップ

## 開発サーバーの起動

```sh
npx vite
```

npm scripts に登録している場合:

```sh
npm run dev
```

## プロダクションビルド

```sh
npx vite build
```

npm scripts に登録している場合:

```sh
npm run build
```

## ローカルファイルのサーブ（ビルド結果の確認）

```sh
npx serve .
```

## package.json の scripts 設定例

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

## TypeScript 用 tsconfig.json 設定例（パス解決）

```json
{
  "compilerOptions": {
    "paths": {
      "three/webgpu": ["node_modules/three/build/three.webgpu.js"],
      "three/tsl": ["node_modules/three/build/three.tsl.js"]
    }
  }
}
```

`paths` を設定するとエディタの自動補完が有効になる。jsconfig.json でも同じ設定が使用できる。
