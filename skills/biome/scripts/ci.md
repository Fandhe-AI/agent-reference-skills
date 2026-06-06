# ci

CI 環境でのコード品質検証コマンド。`biome ci` はファイルへの書き込みを行わない読み取り専用モードで動作する。

## CI 基本チェック

```sh
biome ci .
```

フォーマット・リント・インポート整理をまとめて実行し、問題があればエラーで終了する。

## GitHub Actions 向け

```sh
biome ci --reporter=github .
```

GitHub Actions のアノテーション形式で診断を出力する。

## GitLab CI 向け

```sh
biome ci --reporter=gitlab --colors=off > /tmp/code-quality.json
```

## 警告をエラーとして扱う

```sh
biome ci --error-on-warnings .
```

## 変更ファイルのみ CI チェック

```sh
biome ci --changed
```

デフォルトブランチとの差分ファイルのみを対象とする。

## スレッド数を指定して実行

```sh
biome ci --threads=4 .
```

## 特定ルールのみ実行

```sh
biome ci --only=lint/suspicious .
```

## 特定ルールをスキップ

```sh
biome ci --skip=lint/style .
```

## JSON 形式で出力

```sh
biome ci --reporter=json .
```

## JUnit 形式で出力

```sh
biome ci --reporter=junit .
```

## SARIF 形式で出力

```sh
biome ci --reporter=sarif .
```

## git hook（pre-commit）でステージング済みファイルをチェック

```sh
npx @biomejs/biome check --staged --files-ignore-unknown=true --no-errors-on-unmatched
```

pre-commit hook スクリプト内での使用例。

## git hook（pre-commit）でフォーマット + 修正後に再ステージング

```sh
npx @biomejs/biome check --write --staged --files-ignore-unknown=true --no-errors-on-unmatched
git update-index --again
```
