# Lint

steiger（0.10.0）と @feature-sliced/steiger-plugin（0.8.2）を使ったアーキテクチャ準拠チェックのコマンド集。

## FSD 準拠チェックの実行

```sh
npx steiger ./src
```

`./src` 配下のファイル構造を FSD ルールで検証する。

## ウォッチモードでの継続チェック

```sh
npx steiger ./src --watch
```

```sh
npx steiger ./src -w
```

ファイルシステムの変更を監視し、変更のたびに自動で再チェックする（0.6.0 / 0.7.0 でファイル変更の監視を改善）。

## エラーのみ表示

```sh
npx steiger ./src --ignore-warnings
```

警告を非表示にしエラーのみ報告する。`--fail-on-warnings` とは併用不可。

## ルールごとの所要時間を計測

```sh
TIMING=1 npx steiger ./src
```

ルールごとの所要時間表を **stderr** に出力する（ミリ秒、遅い順。watch モードでは再実行のたびに出力）。`0` / `false` / 空値では無効。ルールは並行実行されるため、所要時間を合算して総実行時間の目安にしない。0.6.0 で追加。

## 設定ファイルを明示して実行

```sh
npx steiger ./src --config ./steiger.config.ts
```

設定ファイルを探索せず、指定したパスを使う（`--config` / `-c`、0.10.0 で追加）。設定ファイルが無く既定設定で動く場合は警告が出る（0.10.0）。

## 言語サーバー

0.7.0 で追加された言語サーバーは 0.8.0 で別パッケージ `@feature-sliced/language-server` に分離された。直接使わずエディター拡張（VS Code / VS Code 系 / JetBrains IDEs）を導入する想定。詳細は https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/packages/language-server/README.md を参照。

## steiger 設定ファイルの作成（TypeScript）

```sh
# steiger.config.ts を手動で作成する
```

```ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
])
```

設定ファイル不要の場合はゼロコンフィグで動作する（0.10.0 以降は既定設定使用の警告が出る）。設定形式は 0.5.0 で導入された `defineConfig` 配列形式（cosmiconfig 経由、`steiger.config.ts` / `steiger.config.js`）。

## 特定レイヤーのルールを無効化

```ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/shared/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])
```

`files` でファイルグロブを指定し、`rules` でルールを `'off'` にする。

## 既定で無効のルールを有効化

```ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/no-wildcard-exports': 'error',
    },
  },
])
```

`fsd/no-wildcard-exports`（plugin 0.8.0 で追加、既定で無効）は Public API の `export * from` / `export * as ns from` を禁止する。severity は `'off'` / `'warn'` / `'error'`。

## 特定ファイルをチェック対象から除外

```ts
import { defineConfig } from 'steiger'

export default defineConfig([
  { ignores: ['**/__mocks__/**'] },
])
```

## Notes

- 対象: steiger 0.10.0 / `@feature-sliced/steiger-plugin` 0.8.2。README 冒頭に「beta、一部 API が変更される可能性あり」とある
- 設定ファイルは 0.5.0 以降の `defineConfig([...])` 配列形式（0.4.0 からの移行はリポジトリの MIGRATION_GUIDE.md）
- 0.6.0: 依存抽出が tree-sitter に移行し、astro / svelte ファイルに対応（plugin 0.6.0）
- 0.7.0: `segments-by-purpose` が拡張され、本質ベースやフレームワーク固有のセグメント名をより多く禁止（plugin 0.7.0）
- 0.7.0: 最小 Node.js バージョンを更新（具体値は CHANGELOG に記載なし。`package.json` の engines を確認）
- 0.8.0: language server を `@feature-sliced/language-server` に分離し、診断の severity（1 ファイルに複数の問題がある場合）を修正
- 0.9.0: 設定ファイルの解決基準が作業ディレクトリから lint 対象パスに変更された。設定内の glob はすべて設定ファイルの位置からの相対パス
- 0.10.0: `--config` / `-c` を追加、既定設定使用時の警告を追加、不正な設定のエラー表示に Zod 標準のフォーマッターを使用（0.8.1 で zod 4 へ更新、受理される設定は従来と同じ）
- plugin 0.8.2: 依存抽出に re-export を含める。`_entities` / `1_entities` のような接頭辞付きフォルダの `@x` cross-import で `no-cross-imports` / `forbidden-imports` が誤検出する問題を修正
- 最小 Node.js バージョン: steiger 0.10.0 の `package.json` の `engines` は `>=22.18.0`
- 出典（取得日 2026-11-14）: steiger リポジトリのタグ steiger@0.10.0（コミット 4acfa4c011530d5ae9badb70577820398a8adf7b）の https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/packages/steiger/README.md 、https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/packages/steiger/CHANGELOG.md 、https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/packages/steiger-plugin-fsd/CHANGELOG.md 、https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/packages/steiger/package.json 、https://github.com/feature-sliced/steiger/blob/steiger%400.10.0/CONFIG_EXAMPLES.md 。`no-wildcard-exports` は https://github.com/feature-sliced/steiger/blob/steiger%400.7.0/packages/steiger-plugin-fsd/src/no-wildcard-exports/README.md （0.10.0 までファイル差分なし）
