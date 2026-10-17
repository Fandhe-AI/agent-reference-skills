---
source: https://www.typescriptlang.org/docs/handbook/nightly-builds.html
---

# Nightly Builds

nightly ビルドの取得とエディター設定。nightly は `main` ブランチから PST 深夜までに npm へ公開される。

## nightly のインストール

```sh
npm install -D typescript@next
```

## VS Code で workspace の TypeScript を切り替え

```json
"typescript.tsdk": "<path to your folder>/node_modules/typescript/lib"
```

`.vscode/settings.json` に追加する。`typescript@next` が導入済みであることが前提。

## Sublime Text

```json
"typescript_tsdk": "<path to your folder>/node_modules/typescript/lib"
```

`Settings - User` ファイルに追加する。

## IntelliJ IDEA

```text
# Mac (Preferences > Languages & Frameworks > TypeScript)
/usr/local/lib/node_modules/typescript/lib

# Windows (File > Settings > Languages & Frameworks > TypeScript)
C:\Users\USERNAME\AppData\Roaming\npm\node_modules\typescript\lib
```

npm でインストールした場合の TypeScript Version に設定するパス。

> 注記: 7.0 ブログは、nightly が `typescript` パッケージの `next` タグで再開されると記載している。旧 `@typescript/native-preview` は install.md を参照。
