# Dev Server

開発サーバーの起動と簡易 HTTP サーバーの代替手段

## Vite 開発サーバーの起動

```sh
npx vite
```

## http-server による静的ファイルのサーブ

```sh
npx http-server
```

## five-server による静的ファイルのサーブ（ライブリロード対応）

```sh
npx five-server
```

## Python 3 による簡易サーバー

```sh
python -m http.server
```

## PHP による簡易サーバー（PHP 5.4 以降）

```sh
php -S localhost:8000
```

## バージョン確認

```sh
node -e "const pkg = require('./node_modules/three/package.json'); console.log(pkg.version);"
```

npm でインストールした Three.js のバージョンを確認する。`node_modules/three` がプロジェクトに存在している必要がある。
