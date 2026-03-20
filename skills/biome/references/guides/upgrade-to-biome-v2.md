# Upgrade to Biome v2

Source: https://biomejs.dev/guides/upgrade-to-biome-v2

## アップグレード手順

1. パッケージを更新する
2. `biome migrate --write` を実行して設定を自動移行する

## 破壊的変更

### 1. Rome 関連サポート終了

- `rome.json` は認識されなくなった。`biome.json` に移行すること。
- `// rome-ignore` コメントは無効。`// biome-ignore` に変更すること。

### 2. `--config-path` 廃止

CLI の `--config-path` オプションは廃止された。エディタ設定で対応する。

### 3. `ignore`/`include` が `includes` に統合

従来の `ignore` と `include` は `includes` に統合された。

### 4. パス・グロブが設定ファイル位置基準に変更

グロブパターンは設定ファイルが置かれているディレクトリを基準に解決されるようになった。

### 5. linter の `all` オプション廃止

`all` オプションは廃止された。代わりに `domains` を使用する。

### 6. `assert` から `with` 構文へ

インポートアサーションの `assert` キーワードは `with` に変更された。

### 7. ルールのデフォルト重大度が変更

一部ルールのデフォルト重大度（severity）が変更された。

### 8. `style` ルールの挙動変更

`style` ルールは明示的に設定しない限りエラーを発行しなくなった。

### 9. package.json のフォーマット変更

package.json は常に複数行でフォーマットされるようになった。

### 10. インポート整理のソート順変更

インポートのソートアルゴリズムが変更された。
