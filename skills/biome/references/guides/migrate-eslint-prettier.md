# Migrate from ESLint & Prettier

Source: https://biomejs.dev/installation/migrate-eslint-prettier

ESLint / Prettier の設定を、それぞれ 1 コマンドで同等の `biome.json` に変換する。両方を使っていれば両方実行する:

```bash
biome migrate eslint --write
biome migrate prettier --write
```

## ESLint からの移行

`biome migrate eslint` は ESLint 設定のルール・globals・overrides・ignore パターンを移行する。

- レガシー設定（`.eslintrc.*`）とフラット設定（`eslint.config.*`）の両方に対応
- `extends`、共有設定、プラグインの読み込みを処理
- `.eslintignore` のパターンも移行される
- 命名規則の違い: Biome は camelCase、ESLint は kebab-case
- 既存 `biome.json` の linter 設定を置換する。`linter.rules.preset` を `"none"` にし、移行したルールのみ有効化する（結果を確認してから使うこと）

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "preset": "none",
      "suspicious": { "noDoubleEquals": "error", "noVar": "error" }
    }
  }
}
```

### Inspired rules

Biome ルールは ESLint ルールと同一か、inspired（着想）のみ。既定では同一ルールのみ移行する。`--include-inspired` で inspired も移行（`--include-nursery` で nursery も）:

```bash
biome migrate eslint --write --include-inspired
```

inspired を含めても ESLint と完全に同じ挙動にはならない（一部オプション未実装、意図的な差異あり）。

### Cyclic references

プラグインや共有設定が循環参照を持つオブジェクトをエクスポートすると Biome は読み込めない。その場合はプラグインと共有設定をコメントアウトして移行し、1 つずつ戻して原因を特定する。移行後、それらのプラグインのルールは `biome.json` に手で設定する。

## Prettier からの移行

```bash
biome migrate prettier --write
```

- Prettier 設定のオプションと `.prettierignore` のパターンを移行
- Biome の既定値は Prettier と異なる（Prettier はスペースインデント、Biome はタブ）ため、現在の出力を保つよう全オプションを明示的に書き出す
- JSON5、TOML、YAML 形式の Prettier 設定ファイルは非対応（旧ページの記載。2.5.15 時点の公式ページには記載なし）

## After migrating

- ESLint / Prettier は `.gitignore` のファイルを既定でスキップするが、Biome は VCS 統合が有効なときのみ。同じファイル集合を無視するため VCS 統合を有効化する（`integrate-in-vcs.md`）
- 結果に満足したら ESLint・Prettier とそのプラグインを依存から削除し、エディタ拡張を Biome のものに置き換える
- 完全に同一の動作は期待できない。一部のルールオプションは Biome に実装されていない

## Notes

- 公式 URL は `/guides/migrate-eslint-prettier` から `/installation/migrate-eslint-prettier` へ移動した（ページは 2026-10 に再構成）
