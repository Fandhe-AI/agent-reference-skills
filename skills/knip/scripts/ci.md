# ci

CI 環境での knip 実行コマンドと GitHub Actions 設定例。

## CI での基本実行

```sh
knip
```

CI 環境では `--no-progress` が自動的に適用される。exit code `1` で issue 検出を示す。

## キャッシュ有効化（高速化）

```sh
knip --cache
```

デフォルトのキャッシュ保存先: `./node_modules/.cache/knip`

## GitHub Actions アノテーション付き出力

```sh
knip --reporter github-actions
```

PR 上にインラインアノテーションを表示する。

## 本番モードとの二重実行

```sh
knip
knip --production
```

デフォルトモードと本番モードを別々に実行することを推奨する。

## 設定ヒントをエラーとして扱う

```sh
knip --treat-config-hints-as-errors
```

## GitHub Actions ワークフロー例

```yaml
name: Lint project
on: push
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm install --ignore-scripts
      - run: npm run knip
```

## GitHub Actions でキャッシュと本番モードを組み合わせた例

```yaml
name: Lint project
on: push
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npm install --ignore-scripts
      - run: npm run knip -- --cache --reporter github-actions
      - run: npm run knip -- --production --cache
```
