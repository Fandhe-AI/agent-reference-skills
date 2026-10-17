# Samples

| Name | Description | Path |
|------|-------------|------|
| Cache Dependencies | `actions/cache` を使って依存関係をキャッシュし、ワークフローの実行時間を短縮するパターン。 | [cache-dependencies.md](./cache-dependencies.md) |
| Node.js CI Workflow | Node.js プロジェクトのテスト・ビルドを push と PR で自動実行する基本的な CI ワークフロー。 | [ci-node.md](./ci-node.md) |
| Composite Action | 複数のステップをひとつのアクションにまとめ、複数のワークフローから再利用するパターン。 | [composite-action.md](./composite-action.md) |
| Concurrency Deploy Queue | デプロイは `queue: max` で順番待ちにし、PR の CI は `cancel-in-progress` で古い実行を打ち切る使い分け。 | [concurrency-deploy-queue.md](./concurrency-deploy-queue.md) |
| Deploy on Push to Main | main ブランチへの push 時にビルドしてデプロイ環境へ自動リリースするワークフロー。 | [deploy-on-push.md](./deploy-on-push.md) |
| Manual Workflow Dispatch | `workflow_dispatch` で GitHub UI・CLI・API から手動実行できるワークフロー。入力パラメータで動作を制御する。 | [manual-dispatch.md](./manual-dispatch.md) |
| Matrix Build | 複数の OS・言語バージョンの組み合わせでジョブを並列実行するマトリクスビルド。 | [matrix-build.md](./matrix-build.md) |
| OIDC AWS Deploy | OIDC で長期 AWS 認証情報を GitHub secrets に保存せず、S3 へファイルをアップロードするワークフロー。 | [oidc-aws-deploy.md](./oidc-aws-deploy.md) |
| PR Auto Comment and Status Check | PR 作成・更新時にテストを実行し、結果を PR にコメントするワークフロー。 | [pr-auto-comment.md](./pr-auto-comment.md) |
| Reusable Workflow for Deploy | 再利用可能ワークフローを定義し、複数のリポジトリ・環境から呼び出すデプロイパターン。 | [reusable-workflow-deploy.md](./reusable-workflow-deploy.md) |
| REST API Call with curl and gh CLI | GitHub REST API を curl または gh CLI で呼び出す基本パターン。 | [rest-api-call.md](./rest-api-call.md) |
| Scheduled Workflow | cron スケジュールで定期実行するワークフロー。依存関係の更新チェックや定期レポートなどに使用する。 | [scheduled-workflow.md](./scheduled-workflow.md) |
| Secret Usage in Workflows | シークレットをワークフローで安全に参照・管理するパターン。 | [secret-usage.md](./secret-usage.md) |
