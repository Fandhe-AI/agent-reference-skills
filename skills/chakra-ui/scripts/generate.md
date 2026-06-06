# Generate

コード生成・スニペット初期化・テーマ型生成のコマンド。

## スニペットの初期追加（セットアップ時）

インストール直後にプロジェクトへスニペットを追加する（`@chakra-ui/cli` 不要でそのまま実行可能）:

```sh
npx @chakra-ui/cli snippet add
```

全スニペットを一括追加:

```sh
npx @chakra-ui/cli snippet add --all
```

特定コンポーネントのスニペットを追加:

```sh
npx @chakra-ui/cli snippet add button
```

```sh
npx @chakra-ui/cli snippet add dialog
```

カスタム出力ディレクトリを指定:

```sh
npx @chakra-ui/cli snippet add dialog --outdir ./components/custom
```

利用可能なスニペット一覧の確認:

```sh
npx @chakra-ui/cli snippet list
```

## テーマ型の生成

カスタムテーマからトークン・レシピの TypeScript 型定義を生成する:

```sh
npx @chakra-ui/cli typegen src/theme.ts
```

ファイル変更を監視して自動再生成:

```sh
npx @chakra-ui/cli typegen src/theme.ts --watch
```

`variant` / `size` props に厳密な型を生成:

```sh
npx @chakra-ui/cli typegen src/theme.ts --strict
```

## デフォルトテーマの取り出し（eject）

デフォルトのテーマトークンとレシピをプロジェクトにコピーし、フルカスタマイズを可能にする:

```sh
npx @chakra-ui/cli eject --outdir src/theme
```

## CI/CD 用スクリプト設定（package.json）

`postinstall` に登録して型を常に最新に保つ:

```json
{
  "scripts": {
    "postinstall": "chakra typegen src/theme.ts"
  }
}
```

型チェックとビルド前に型生成を実行:

```json
{
  "scripts": {
    "typegen": "chakra typegen src/theme.ts",
    "typecheck": "npm run typegen && tsc --noEmit",
    "build": "npm run typegen && your-build-command"
  }
}
```
