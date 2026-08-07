# Plugins（概念）

Plugin は Kubb に新しい生成対象を教える拡張ポイント。ファイル命名・出力フォルダ・ライフサイクルフック・AST を走査してファイルを出力する [Generators](./generators.md) を所有する。

具体的な API シグネチャは Kit API を、実装手順は [creating-plugins.md](./creating-plugins.md) を参照。

## Plugin とは何か

Plugin はファクトリ関数。`kubb.config.ts` 内で呼び出すと `name` と `hooks` マップを持つオブジェクトを返す。`name` が Plugin を識別し、`hooks` がビルドのどのタイミングに関与するかを決める。

各 Plugin は次の責務のみを持つ:

- AST を走査する Generator を登録する
- ファイルの命名・配置を行う Resolver を宣言する
- 自身に渡されたオプションのみを読む

この分離により、TypeScript プラグインは Zod プラグインの状態に一切触れず、一方が入っても抜けても他方に影響しない。

## ライフサイクルの流れ

ビルドは固定順のフェーズを進み、各 Plugin は関心のあるタイミングのみを購読する。

1. Setup — Plugin ごとに 1 度、コード生成前に実行。オプション検証をここで行い早期に失敗させる
2. AST 走査 — Kubb が AST を走査し、schema・operation ノードごとに Generator ハンドラーを呼ぶ。ほとんどの `FileNode` はここで生成される
3. クロージングイベント — 各 Plugin が生成した内容のスナップショットを受け取る
4. ディスク書き込み直前のイベント — barrel のような集約ファイルを追加する場所
5. 書き込み・フォーマット・lint が続く

各フックの詳細はライフサイクルフックのリファレンスに記載される。

## Plugin 間の連携

Plugin 同士は単独で動くことは稀。クライアントプラグインは TypeScript プラグインが既に生成した型に依存し、モックプラグインは同じ schema を再利用する。Kubb は 2 つの連携手段を提供する:

- **Dependencies** — Plugin が依存する他の Plugin 名を宣言する。Kubb はそれらを先に実行し、欠けている場合は明確なエラーでビルドを失敗させる。`plugins` 配列の順序を手動管理する必要がない
- **[Resolvers](./resolvers.md)** — Plugin 名で他の Plugin のファイル名・パスを読み取れる。命名規則が変わっても import が壊れない

## Post-enforced プラグイン

ほとんどの Plugin は 1 回の通常パスで完結するが、一部は他の Plugin が何を生成したかを先に見る必要がある。barrel generator は他の Plugin が出力を終えて初めて index ファイルを書ける。Plugin の `enforce` フィールドを設定すると、それが購読する全イベントの先頭または末尾に移動する（宣言された dependency は `enforce` に関わらず常に先に実行される）。

## 標準搭載プラグイン

| Plugin | 生成対象 |
|---|---|
| `@kubb/plugin-ts` | 仕様から TypeScript の型 |
| `@kubb/plugin-zod` | Zod schema |
| `@kubb/plugin-axios` | 型安全な axios クライアント関数 |
| `@kubb/plugin-fetch` | 型安全な Fetch クライアント関数 |
| `@kubb/plugin-react-query` | React Query (TanStack) フック |
| `@kubb/plugin-vue-query` | Vue Query (TanStack) フック |
| `@kubb/plugin-msw` | MSW リクエストハンドラー |
| `@kubb/plugin-faker` | Faker ベースのモックデータ |
| `@kubb/plugin-cypress` | Cypress リクエストヘルパー |
| `@kubb/plugin-mcp` | MCP ツール定義 |
| `@kubb/plugin-redoc` | Redoc API ドキュメント |

## Notes

- 各 Plugin の設定オプションは `references/plugins/` 配下の個別ページを参照（例: [plugin-ts.md](../plugins/plugin-ts.md)）
- `definePlugin` 等の正確なシグネチャは Kit API リファレンス（[kit-api.md](../reference/kit-api.md)）を参照
- Plugin の命名・ファイル配置を変更するだけなら独自 Plugin を書かず [resolver-customization.md](./resolver-customization.md) を参照

## Related

- [architecture](./architecture.md)
- [generators](./generators.md)
- [resolvers](./resolvers.md)
- [creating-plugins](./creating-plugins.md)
