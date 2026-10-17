# Getting Started

Source: https://biomejs.dev/installation/quick-start

`package.json` と、npm / pnpm / Yarn / Bun / Deno 等のパッケージマネージャーを持つプロジェクトで、3 ステップで最初の `biome check` まで進む。Node.js を使わない場合や全インストール方法は `manual-installation.md` を参照。

## 1. インストール

Biome はプロジェクトの開発依存としてインストールする。`-E` フラグでバージョンを固定することを推奨（全コントリビューターと CI が同じ版を使うため）。

```bash
# npm
npm install -D -E @biomejs/biome

# pnpm
pnpm add -D -E @biomejs/biome

# yarn
yarn add -D -E @biomejs/biome

# bun
bun add -D -E @biomejs/biome

# deno
deno add -D npm:@biomejs/biome
```

## 2. 設定ファイルの作成

設定ファイルなしでも動作するが、`biome.json` でチームとエディタに設定を共有できる:

```bash
npx @biomejs/biome init
```

生成されるファイルは formatter・linter・assist を推奨設定で有効化し、`$schema` を参照する（`linter.rules.preset: "recommended"`、vcs 既定値、assist の `organizeImports` on）:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.15/schema.json",
  "vcs": { "enabled": false, "clientKind": "git", "useIgnoreFile": false },
  "files": { "ignoreUnknown": false },
  "formatter": { "enabled": true, "indentStyle": "tab" },
  "linter": { "enabled": true, "rules": { "preset": "recommended" } },
  "javascript": { "formatter": { "quoteStyle": "double" } },
  "assist": { "enabled": true, "actions": { "source": { "organizeImports": "on" } } }
}
```

## 3. チェック

formatter・linter・assist を 1 回で実行。未整形のファイルと診断が列挙される。`--write` で整形・安全な lint 修正・assist を適用（残る診断は修正なし、または unsafe な修正のため要対応）。

```bash
npx @biomejs/biome check
npx @biomejs/biome check --write
```

## 基本コマンド

| コマンド | 説明 |
|---|---|
| `biome format --write` | フォーマットを実行し、ファイルに書き込む |
| `biome lint --write` | リントを実行し、安全な修正を適用する |
| `biome check --write` | フォーマット + リント + インポート整理をまとめて実行 |

## CI 環境

CI では `biome ci` を使用する。読み取り専用モードで動作し、ファイルへの修正は行わない。フォーマットやリントの問題があればエラーとして報告される。

```bash
biome ci
```

## Next steps

- エディタ設定 → `reference/vscode.md` / `reference/zed.md`
- 設定の変更 → `configure-biome.md`
- VCS 連携 → `integrate-in-vcs.md`
- CI → `recipes/continuous-integration.md`

## Notes

- 公式の `/guides/getting-started` は `/installation/quick-start` へリダイレクトされる
