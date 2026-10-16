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

```powershell
echo "npx --no -- commitlint --edit `$1" > .husky/commit-msg
```

## commit-msg フックの設定（npm スクリプト経由）

```sh
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

## npm スクリプトへの commit ショートカット追加

`@commitlint/prompt-cli` のインストールが前提（use-prompt ガイド）。`package.json` に以下を追加する。

```json
{
  "scripts": {
    "commit": "commit"
  }
}
```
