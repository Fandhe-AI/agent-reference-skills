# Crafting Your Repository

| Name | Description | Path |
|------|-------------|------|
| キャッシュ | タスクごとに2種類のハッシュを計算し、両方が一致するときのみキャッシュヒット。 | [caching.md](./caching.md) |
| CI の構築 | 環境変数と影響パッケージフィルタリング、リモートキャッシュの設定。 | [ci.md](./ci.md) |
| 依存関係の管理 | ワークスペース内の内部パッケージ依存宣言と一括インストール手法。 | [dependencies.md](./dependencies.md) |
| アプリケーション開発 | dev タスク設定、キャッシュ無効化、ウォッチモード、UI キーバインド。 | [developing.md](./developing.md) |
| 環境変数の使用 | env、globalEnv、passThroughEnv の4種類の違いと自動推論。 | [environment-variables.md](./environment-variables.md) |
| 内部パッケージの作成 | 1パッケージ1責務設計、package.json、exports 設定。 | [internal-packages.md](./internal-packages.md) |
| タスクの実行 | package.json スクリプト、複数実行、フィルタリング、ショートハンド構文。 | [running-tasks.md](./running-tasks.md) |
| リポジトリの構造化 | ディレクトリ構成、ワークスペース定義、exports フィールド。 | [structuring.md](./structuring.md) |
| タスクの設定 | dependsOn、outputs、inputs の設定と特殊値の説明。 | [tasks.md](./tasks.md) |
| リポジトリの把握 | turbo devtools、turbo ls、turbo query GraphQL インターフェース。 | [understanding-your-repository.md](./understanding-your-repository.md) |
| アップグレード | codemod による自動移行、v2.0 での主な変更点と非推奨フラグ。 | [upgrading.md](./upgrading.md) |
