# Kit API (`kubb/kit`)

カスタムプラグイン・独自ロジックを構築するためのツールキット。`kubb/kit` サブパスから追加インストール不要で利用可能。

## インポート

```typescript
import { definePlugin, defineGenerator, createResolver, createRenderer, jsxRenderer, createAdapter, defineParser, createStorage, fsStorage, memoryStorage } from 'kubb/kit'
```

## 7つのコア概念

| コンポーネント | エントリポイント | 役割 |
|-----------|------------|------|
| Plugins | `definePlugin` | 主要な拡張ポイント。ファイル命名、出力フォルダ、ライフサイクルフックを所有する |
| Generators | `defineGenerator` | AST を走査してファイルを出力する。プラグインは1つ以上を登録する |
| Resolvers | `createResolver` | ファイル名と出力パスを決定する。他のプラグインが名前で参照する |
| Renderers | `createRenderer`, `jsxRenderer` | Generator が返す要素を `FileNode` に変換する |
| Adapters | `createAdapter` | 入力仕様を、全プラグインが読み取る universal AST に変換する |
| Parsers | `defineParser` | `FileNode` をディスクに書き込むソース文字列に変換する |
| Storage | `createStorage`, `fsStorage`, `memoryStorage` | 生成ファイルの格納先を決定する |

## 補助コンポーネント

- **AST & node builders** — ファクトリユーティリティ、visitor、guard、macro、printer
- **Diagnostics** — 構造化エラーの収集とフォーマット（`Diagnostics.Error`、`Diagnostics.hasError` 等）
- **Engine & configuration** — `defineConfig`、`createKubb`
- **Lifecycle hooks** — ビルドイベントのトリガーとそのペイロード
- **Testing** — Vitest ベースのプラグイン・generator テストユーティリティ

## Notes

- Kit はビルド実行エンジンとは独立した「プラグイン作成用のレイヤー」として提供される
- Diagnostics API の詳細（`Diagnostics.Error` 等のメンバー一覧）とエラーコード一覧は別ページを参照（[diagnostics.md](./diagnostics.md)）

## Related

- [diagnostics](./diagnostics.md)
- [@kubb/core](../plugins/core.md)
