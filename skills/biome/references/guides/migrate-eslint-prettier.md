# Migrate from ESLint & Prettier

Source: https://biomejs.dev/guides/migrate-eslint-prettier

## ESLint からの移行

```bash
biome migrate eslint --write
```

- レガシー設定（`.eslintrc.*`）とフラット設定（`eslint.config.*`）の両方に対応
- `extends`、共有設定、プラグインの読み込みを処理
- `.eslintignore` のパターンも移行される
- `--include-inspired` オプションで ESLint ルールに「inspired」された Biome ルールも含める
- 命名規則の違い: Biome は camelCase、ESLint は kebab-case

## Prettier からの移行

```bash
biome migrate prettier --write
```

- デフォルト値の違いに注意:
  - Prettier: スペースインデント
  - Biome: タブインデント
- JSON5、TOML、YAML 形式の Prettier 設定ファイルは非対応

## 注意事項

- VCS 統合の有効化を推奨する（`.gitignore` のパターンを尊重するため）
- 完全に同一の動作は期待できない。一部のルールオプションは Biome に実装されていない。
