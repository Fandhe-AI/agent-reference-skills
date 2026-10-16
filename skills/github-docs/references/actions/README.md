# GitHub Actions

| Name | Description | Path |
|------|-------------|------|
| GitHub Actions -- アーティファクト証明 (artifact attestations) | `actions/attest` によるビルド provenance / SBOM 証明の生成と、`gh attestation verify` による検証のリファレンス。 | [artifact-attestations.md](./artifact-attestations.md) |
| GitHub Actions -- アーティファクト | ワークフロー内でのデータ保存・共有のリファレンス。 | [artifacts.md](./artifacts.md) |
| GitHub Actions -- キャッシュ | 依存関係キャッシュによるワークフロー高速化のリファレンス。 | [caching.md](./caching.md) |
| GitHub Actions -- 複合アクション | 複合アクション（Composite Actions）のリファレンス。 | [composite-actions.md](./composite-actions.md) |
| GitHub Actions -- 同時実行制御 (concurrency) | `concurrency` によるワークフロー / ジョブの同時実行制御のリファレンス。 | [concurrency.md](./concurrency.md) |
| GitHub Actions -- コンテキスト | ワークフロー実行に関するコンテキスト情報のリファレンス。 | [contexts.md](./contexts.md) |
| GitHub Actions -- 環境変数 | デフォルト環境変数とカスタム環境変数のリファレンス。 | [environment-variables.md](./environment-variables.md) |
| GitHub Actions -- イベントとトリガー | ワークフローをトリガーする全イベントのリファレンス。 | [events-triggers.md](./events-triggers.md) |
| GitHub Actions -- 式と関数 | ワークフローで使用できる式、演算子、組み込み関数のリファレンス。 | [expressions.md](./expressions.md) |
| GitHub Actions -- 制限 (limits) | GitHub Actions のシステム制限・ストレージ・ジョブ同時実行数・レート制限のリファレンス。 | [limits.md](./limits.md) |
| GitHub Actions -- ワークフロー依存 lockfile (gh actions-lock) | ワークフローが依存する全アクションを検証済みコミットに固定する lockfile（`.github/workflows/actions.lock`）のリファレンス。 | [lockfiles.md](./lockfiles.md) |
| GitHub Actions -- OpenID Connect (OIDC) | OIDC により、長期クレデンシャルを GitHub secret に保存せず、クラウドプロバイダーから短命のアクセストークンを直接取得するためのリファレンス。 | [oidc.md](./oidc.md) |
| GitHub Actions -- GITHUB_TOKEN パーミッション | GITHUB_TOKEN の自動認証とパーミッションスコープのリファレンス。 | [permissions.md](./permissions.md) |
| GitHub Actions -- 再利用可能ワークフロー | ワークフローの再利用（workflow_call）のリファレンス。 | [reusable-workflows.md](./reusable-workflows.md) |
| GitHub Actions -- ランナー | GitHub ホステッドランナーとセルフホステッドランナーのリファレンス。 | [runners.md](./runners.md) |
| GitHub Actions -- シークレット管理 | ワークフローでのシークレット管理のリファレンス。 | [secrets.md](./secrets.md) |
| GitHub Actions -- ワークフローコマンド | ワークフローコマンド（`::command::` 構文）と環境ファイル（`GITHUB_ENV` 等）のリファレンス。 | [workflow-commands.md](./workflow-commands.md) |
| GitHub Actions -- ワークフロー構文リファレンス | ワークフローファイル (`.github/workflows/*.yml`) で使用可能な全キーの網羅的リファレンス。 | [workflow-syntax.md](./workflow-syntax.md) |
