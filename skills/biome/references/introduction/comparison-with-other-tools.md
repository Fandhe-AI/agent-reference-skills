# Comparison with other tools

Biome を Prettier / ESLint / Oxc と、互換性・性能・言語サポートの観点で比較する。

## Usage

```shell
biome migrate prettier   # Prettier 設定 -> biome.json
biome migrate eslint     # ESLint 設定 -> biome.json
```

## Biome vs Prettier

| 観点 | 内容 |
|------|------|
| 出力 | Prettier 出力と 97% 一致（Prettier challenge に勝利）。意図的な差異は Differences with Prettier ページに記載 |
| 既定オプション | Biome はタブインデント、Prettier はスペース |
| 性能 | 公式ベンチマークで約 25 倍高速 |
| 言語 | 対応言語セットが異なる。Prettier は HTML および Vue / Angular などの HTML 系スーパー言語のサポートが安定しており、コミュニティプラグインも豊富 |

## Biome vs ESLint

| 観点 | 内容 |
|------|------|
| 位置づけ | drop-in replacement ではない |
| ルール | `eslint-plugin-react` / `jsx-a11y` / `import` / `unicorn` 等から移植。由来は Rule sources ページ。名前は `camelCase`（例: ESLint の `eqeqeq` は Biome の `noDoubleEquals`）。オプションが少ない・挙動が微妙に異なるルールがある |
| 性能 | 公式ベンチマークで約 15 倍高速 |
| 設定 | `@biomejs/biome` と任意の `biome.json` のみ（ESLint はパーサー・TypeScript プラグイン・`eslint-config-prettier` 等を組み合わせる） |
| プラグイン | ESLint の JS プラグインは実行不可。Biome のプラグインは GritQL で記述 |
| Type-aware | 独自の type-aware ルール（`typescript` パッケージ不要）。v2 で追加。ルール数は typescript-eslint より大幅に少ないが拡大中 |

## Biome vs Oxc

| 観点 | 内容 |
|------|------|
| 方針 | Oxc は各ツール（oxlint / oxfmt 等）が既存ツールの drop-in replacement で個別設定。Biome は 1 パッケージ・1 設定で、より opinionated |
| 性能 | Oxc 公式ベンチマークで Oxc パーサーは Biome の 5 倍、Oxfmt は Biome フォーマッターの 3 倍高速。いずれも Prettier / ESLint よりはるかに高速 |
| アーキテクチャ | Biome のパーサーは CST を生成し resilient / recoverable。速度を犠牲に不正コードでも format / lint 可能 |
| 言語 | Oxlint は JS / TS のみ。Biome は CSS / JSON / GraphQL / HTML の lint も対応。Oxfmt は未実装言語に Prettier を同梱するため対応言語が多い。Biome は対応言語をすべてネイティブ実装 |
| Type-aware | Oxlint は `oxlint-tsgolint`（typescript-go ベース）。Biome は自前で型推論し TypeScript 不要。ルール数は Oxlint より大幅に少ないが拡大中 |

## Notes

- 数値（25 倍 / 15 倍 / 97% / 5 倍 / 3 倍）は各公式ベンチマーク・原文記述による
- 出典: https://biomejs.dev/introduction/comparison-with-other-tools/

## Related

- [why-biome](./why-biome.md)
- [differences-with-prettier](../formatter/differences-with-prettier.md)
- [migrate-eslint-prettier](../guides/migrate-eslint-prettier.md)
- [language-support](../internals/language-support.md)
