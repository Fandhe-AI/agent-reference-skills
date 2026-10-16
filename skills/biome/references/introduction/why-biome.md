# Why Biome?

Biome は Web プロジェクト向けの高速・簡単セットアップなツールチェーン。2023 年 8 月に Rome の fork として開始。

## Usage

```shell
biome check --write   # format + lint + assist をまとめて実行
biome ci              # CI 用。修正が必要ならビルド失敗
biome init            # biome.json を生成
biome migrate eslint
biome migrate prettier
```

## 標準で得られるもの

- Prettier 互換のフォーマッター（不正なコードでも整形可能）
- リンター（Biome 独自ルール + ESLint とその主要プラグインからの移植）
- assist actions（import ソート、オブジェクトキー並べ替え、重複 CSS クラス削除など）

## 設計原則

| 原則 | 内容 |
|------|------|
| One package | `@biomejs/biome` 1 つのみ。設定・ignore も共通。ファイルを 1 回だけパースし formatter / linter / assist に共有するため、lint fix と format が互いに矛盾しない |
| Fast by default | Rust 製（Node.js 非依存）。公式ベンチマークで Prettier の約 25 倍、ESLint の約 15 倍高速 |
| Zero configuration to start | インストール後すぐ使用可。細かい制御は `biome init` で `biome.json` を作成。formatter は Prettier と同じ option philosophy、linter はルール単位・グループ・domain で個別に有効/無効化 |
| Informative and actionable | 各ルールは「エラーの説明」「問題である理由」「対処方法」の 3 pillars に基づく |
| Built for the editor | first-party の language server。VS Code / IntelliJ / Zed の公式拡張。入力中・不正コードでも動作 |
| Compatible with what you already use | Prettier 出力と 97% 一致。`biome migrate eslint` / `biome migrate prettier` で既存設定から `biome.json` を生成 |

## Notes

- ルール数は公式ページでは生成コンポーネントにより表示される（本ページには数値を記載しない）
- ベンチマーク値は公式 benchmark リポジトリ（biomejs/benchmark）の結果に基づく
- 出典: https://biomejs.dev/introduction/why-biome/

## Related

- [comparison-with-other-tools](./comparison-with-other-tools.md)
- [option-philosophy](../formatter/option-philosophy.md)
- [migrate-eslint-prettier](../guides/migrate-eslint-prettier.md)
