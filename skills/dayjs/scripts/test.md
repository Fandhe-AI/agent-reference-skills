# Test

Day.js 本体のテスト・ビルド・コード品質チェック（コントリビューター向け）。

> **注記**: 以下のコマンドは Day.js リポジトリ自体の開発用コマンドです。Day.js を利用するプロジェクトでのテストには適用しません。

## テストの実行

```sh
npm test
```

複数タイムゾーン（Pacific/Auckland, Europe/London, America/Whitehorse）でカバレッジ 100% を検証する。

## タイムゾーン固有テストの実行

```sh
npm run test-tz
```

## ビルド

```sh
npm run build
```

Babel でコンパイルし、ファイルサイズ制限（2.99 KB）をチェックする。

## Lint の実行

```sh
npm run lint
```

src・test・build ディレクトリに ESLint を適用する。

## コードフォーマット（ドキュメント）

```sh
npm run prettier
```

ドキュメント Markdown ファイルを Prettier でフォーマットする。

## バンドルサイズの確認

```sh
npm run size
```

minified バンドルが 2.99 KB 以下であることを検証する。
