# watch

TypeDoc のファイル監視モードのコマンド集。開発中のドキュメント自動再生成に使用する。

## ウォッチモードで起動

```sh
npx typedoc --entryPoints src/index.ts --out docs --watch
```

ソースファイルの変更を監視し、変更時に自動でドキュメントをビルドする。TypeScript のインクリメンタルコンパイラを使用する。

監視対象:
- ソースファイル
- プロジェクトドキュメント
- README
- カスタムアセット
- 設定ファイル
- `@include` / `@includeCode` でインポートされたファイル

> **警告**: `entryPointStrategy` が `packages` または `merge` に設定されている場合、`--watch` は互換性がない。

## ウォッチモードで画面クリアを無効化

```sh
npx typedoc --entryPoints src/index.ts --out docs --watch --preserveWatchOutput
```

デフォルトではビルドステップ間で画面がクリアされるが、`--preserveWatchOutput` を指定すると出力が保持される。
