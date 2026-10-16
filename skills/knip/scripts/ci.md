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

設定や path alias の変更後に結果が stale になることがある。その場合は `--cache` なしで実行するか、キャッシュディレクトリ（`node_modules/.cache/knip`、`--cache-location` で変更可）を削除してから再実行する。

## GitHub Actions アノテーション付き出力

```sh
knip --reporter github-actions
```

PR 上にインラインアノテーションを表示する。

## SARIF 出力

```sh
knip --reporter sarif > knip.sarif
```

SARIF 2.1.0 を出力する。code scanning 連携用。

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

## タグヒントをエラーとして扱う

```sh
knip --treat-tag-hints-as-errors
```

タグヒントがあると exit code `1` で終了する。

## GitHub Actions ワークフロー例

```yaml
name: Lint project
on: push
jobs:
  knip:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
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
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
        with:
          node-version: 24
      - run: npm install --ignore-scripts
      - run: npm run knip -- --cache --reporter github-actions
      - run: npm run knip -- --production --cache
```
