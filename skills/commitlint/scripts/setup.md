# setup

設定ファイルと Git フックの初期設定。

## 設定ファイルの作成（Linux / macOS）

```sh
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

## 設定ファイルの作成（Windows）

```sh
node -e "fs.writeFileSync('commitlint.config.js', process.argv[1])" "export default { extends: ['@commitlint/config-conventional'] };"
```

## Node v24 対応: package.json を ES6 モジュールとして初期化

```sh
npm init es6
```

Node v24 環境で `package.json` がない場合に設定ファイルが読み込まれないエラーを回避する。代替手段として `commitlint.config.js` を `commitlint.config.mjs` にリネームすることも有効。

## Husky の初期化（npm）

```sh
npx husky init
```

## Husky の初期化（yarn）

```sh
yarn husky init
```

## Husky の初期化（pnpm）

```sh
pnpm exec husky init
```

## Husky の初期化（bun）

```sh
bunx husky init
```

## commit-msg フックの設定（Linux / macOS）

Husky の初期化後に実行する。

```sh
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

## commit-msg フックの設定（Windows PowerShell）

```sh
echo "npx --no -- commitlint --edit `$1" > .husky/commit-msg
```

## commit-msg フックの設定（npm スクリプト経由）

```sh
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

## npm スクリプトへの commit ショートカット追加

`package.json` の `scripts` に以下を追加する:

```sh
npm pkg set scripts.commit="commit"
```
