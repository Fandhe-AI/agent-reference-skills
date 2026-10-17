# Configure Biome

Source: https://biomejs.dev/guides/configure-biome

## 設定ファイル

- ファイル名: `biome.json` または `biome.jsonc`
- 配置場所: プロジェクトルート（package.json の隣）

## 3つのツール

Biome は以下の3つのツールを中心に構成される:

1. **Formatter** -- コードフォーマッター
2. **Linter** -- 静的解析
3. **Assist** -- インポート整理などの補助機能

## 基本構造

```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.15/schema.json",
  "formatter": { "enabled": true },
  "linter": { "enabled": true }
}
```

## 言語別設定

`<language>.<tool>` パターンで言語ごとにツールの挙動を制御できる。

```json
{
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  }
}
```

3 ツールは既定で全て有効。`<tool>.enabled` で個別に無効化できる。複数言語共通のオプションはツール直下、言語固有は `<language>.<tool>` に置き、言語側で共通オプションを上書きできる（TypeScript / JSX / TSX も `javascript`）。

## ファイル探索順序

サポートする設定ファイル名（優先順）: `biome.json` → `biome.jsonc` → `.biome.json` → `.biome.jsonc`

Biome は設定ファイルを以下の順序で探索する:

1. カレントディレクトリ（CLI は実行ディレクトリ、エディタはプロジェクトルート）
2. 親フォルダ（再帰的に上方向へ）
3. ホームディレクトリ（Linux: `$XDG_CONFIG_HOME` または `$HOME/.config/biome`、macOS: `/Users/$USER/Library/Application Support/biome`、Windows: `C:\Users\$USER\AppData\Roaming\biome\config`）

見つからなければ既定設定を使う。ネストした `biome.json` もサポート（`big-projects.md` 参照）。設定内のパス・グロブは設定ファイルのあるフォルダ基準（`extends` された場合を除く）。

## ファイル処理の制御

- `files.includes` -- 処理対象ファイルの指定
- `<tool>.includes` -- ツールごとの対象ファイル指定
- `!` プレフィックス -- ファイルを除外
- `!!` プレフィックス -- ファイルを完全除外（オーバーライド不可。モジュールグラフ構築・型推論などプロジェクト関連処理からも除外され、index されない）
- 否定グロブの前には `**` パターンが必要（例: `["**", "!**/*.generated.js", "!!**/dist"]`）
- `files.includes` はグローバルで、これに一致しないファイルは全ツールで対象外。ツール別 `<tool>.includes` は絞り込みのみ可能
- protected files（常に無視。診断は出ない）: `composer.lock` / `npm-shrinkwrap.json` / `package-lock.json` / `yarn.lock`
- CLI のグロブは Biome ではなく shell が展開する

## Well-known files

拡張子ではなくファイル名で扱いを決める JSON 系ファイル:

- コメント・末尾カンマとも不可: `.all-contributorsrc`, `.arcconfig`, `.bowerrc`, `.c8rc`, `.nycrc`, `.vuerc`, `.watchmanconfig` 等
- コメントのみ可: `.ember-cli`, `.eslintrc.json`, `.jscsrc`, `.jshintrc`, `tslint.json`, `turbo.json`
- コメント・末尾カンマとも可: `.babelrc`, `.swcrc`, `deno.json`, `jsconfig.json`, `tsconfig.json`, `nx.json`, `project.json`, `typedoc.json`, `.vscode/*` / `.zed/*` / `.cursor/*` 配下の `.json` 等

## Notes

- 公式の `/guides/configure-biome` は `/configuration/configure-biome` へ移動した（ページは再構成済み）
