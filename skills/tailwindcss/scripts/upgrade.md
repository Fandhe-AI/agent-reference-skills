---
source: https://tailwindcss.com/docs/upgrade-guide
---

# Upgrade

v3 から v4 への移行ツール `@tailwindcss/upgrade`。

## アップグレードツールの実行

> **警告**: ファイルを書き換える。公式は「新しいブランチで実行し、差分を精査してブラウザで動作確認する」ことを推奨。使い捨てブランチ・クリーンな作業ツリーを前提にする。

```sh
npx @tailwindcss/upgrade
```

依存関係の更新・設定ファイルの CSS 移行・テンプレートファイルの変更を自動化する（公式記載）。Node.js 20 以上が必須。

## フラグ

出典: `tailwindlabs/tailwindcss@v4.3.3` `packages/@tailwindcss-upgrade/src/index.ts`（docs サイトには記載なし）

| Flag | Alias | Description |
| --- | --- | --- |
| `--config` | `-c` | Path to the configuration file |
| `--help` | `-h` | Display usage information |
| `--force` | `-f` | Force the migration |
| `--version` | `-v` | Display the version number |

```sh
npx @tailwindcss/upgrade --help
```

位置引数でファイルを渡すと対象 CSS を限定でき、省略時はカレント以下の `**/*.css` を探索する（ソース実装による）。`--force` なしでは git の作業ツリーが dirty だとエラー終了する（同ソース）。
