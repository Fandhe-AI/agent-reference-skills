# Actions

| Name | Description | Path |
|------|-------------|------|
| Artifacts API | ワークフロー実行で生成されたアーティファクトの一覧取得・ダウンロード・削除を行うエンドポイント。 | [artifacts.md](./artifacts.md) |
| Actions Secrets API | GitHub Actions のシークレットの CRUD 操作を行うエンドポイント。シークレットの値は LibSodium で暗号化して送信する必要がある。 | [secrets.md](./secrets.md) |
| Self-Hosted Runners API | セルフホストランナーの管理・トークン発行・ラベル操作を行うエンドポイント。 | [self-hosted-runners.md](./self-hosted-runners.md) |
| Actions Variables API | GitHub Actions の変数の CRUD 操作を行うエンドポイント。シークレットとは異なり、変数の値は API から取得可能。 | [variables.md](./variables.md) |
| Workflow Jobs API | ワークフロージョブの取得・一覧取得・ログダウンロードを行うエンドポイント。 | [workflow-jobs.md](./workflow-jobs.md) |
| Workflow Runs API | ワークフロー実行の一覧取得・再実行・キャンセル・ログ取得・デプロイメント承認を行うエンドポイント。 | [workflow-runs.md](./workflow-runs.md) |
| Workflows API | ワークフローの一覧取得・有効化/無効化・手動実行（dispatch）・使用状況の確認を行うエンドポイント。 | [workflows.md](./workflows.md) |
