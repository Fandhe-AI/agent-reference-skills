# Version

Three.js のバージョン確認

## インストール済みバージョンの確認

```sh
npm list three
```

## package.json に記録されているバージョンの確認

```sh
cat node_modules/three/package.json | grep '"version"'
```

## Node.js で直接バージョンを表示

```sh
node -e "const pkg = require('./node_modules/three/package.json'); console.log(pkg.version);"
```

## npm registry の最新バージョン確認

```sh
npm show three version
```

## npm registry の全バージョン一覧

```sh
npm show three versions
```
