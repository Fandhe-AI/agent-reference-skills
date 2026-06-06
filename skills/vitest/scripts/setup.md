# setup

vitest のプロジェクト初期設定コマンド。

## ブラウザモードの初期設定

```sh
npx vitest init browser
```

```sh
yarn exec vitest init browser
```

```sh
pnpx vitest init browser
```

```sh
bunx vitest init browser
```

`vitest.config.ts` にブラウザモード設定を生成する。

## package.json へのテストスクリプト追加

`package.json` の `scripts` セクションに以下を追加する:

```sh
# package.json に手動で追記する設定例（コマンドではなく設定値）
# "test": "vitest"
# "coverage": "vitest run --coverage"
```

実際の package.json 設定（コマンドで直接追加する場合は npm pkg set 等を利用）:

```sh
npm pkg set scripts.test="vitest"
npm pkg set scripts.coverage="vitest run --coverage"
```
