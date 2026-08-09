# Samples

これらのサンプルは**そのまま複製されて消費側リポジトリの CI になる**前提の資材である。
複製時に危険な書き方が伝播しないよう、全サンプルは以下を満たす。

- 外部 action・別リポジトリの reusable workflow は**コミット SHA 固定**で参照する（末尾コメントでバージョンを示す）。`@v4` / `@main` などの可動 ref は付け替え可能でサプライチェーン攻撃の経路になる
- `${{ ... }}` を `run:` 本文や `actions/github-script` の `script:` 本文へ**直接展開しない**。`env:` へ渡し、シェルでは `"${VAR}"`、JavaScript では `process.env.VAR` で参照する
- ジョブの `permissions` は必要最小限を明示する。既定権限が read-only のリポジトリでも動くようにする
- 各 `run:` は複数行ブロック（`run: |`）とし、先頭に `set -euo pipefail` を置く。ワークフロー側のステップにも `shell: bash` を明示する。未定義変数やパイプ途中の失敗を見逃さないため
- `$GITHUB_OUTPUT` などの環境変数は `"${GITHUB_OUTPUT}"` とクォートして参照する
- fork PR を扱う場合、`pull_request_target` へ単純置換しない。PR のコードを実行しないジョブへ分離する（[pr-auto-comment.md](./pr-auto-comment.md) 参照）

| Name | Description | Path |
|------|-------------|------|
| Cache Dependencies | `actions/cache` を使って依存関係をキャッシュし、ワークフローの実行時間を短縮するパターン。 | [cache-dependencies.md](./cache-dependencies.md) |
| Composite Action | 複数のステップをひとつのアクションにまとめ、複数のワークフローから再利用するパターン。 | [composite-action.md](./composite-action.md) |
| Deploy on Push to Main | main ブランチへの push 時にビルドしてデプロイ環境へ自動リリースするワークフロー。 | [deploy-on-push.md](./deploy-on-push.md) |
| Manual Workflow Dispatch | `workflow_dispatch` で GitHub UI・CLI・API から手動実行できるワークフロー。入力パラメータで動作を制御する。 | [manual-dispatch.md](./manual-dispatch.md) |
| Matrix Build | 複数の OS・言語バージョンの組み合わせでジョブを並列実行するマトリクスビルド。 | [matrix-build.md](./matrix-build.md) |
| Node.js CI Workflow | Node.js プロジェクトのテスト・ビルドを push と PR で自動実行する基本的な CI ワークフロー。 | [ci-node.md](./ci-node.md) |
| PR Auto Comment and Status Check | PR 作成・更新時にテストを実行し、結果を PR にコメントするワークフロー。 | [pr-auto-comment.md](./pr-auto-comment.md) |
| REST API Call with curl and gh CLI | GitHub REST API を curl または gh CLI で呼び出す基本パターン。 | [rest-api-call.md](./rest-api-call.md) |
| Reusable Workflow for Deploy | 再利用可能ワークフローを定義し、複数のリポジトリ・環境から呼び出すデプロイパターン。 | [reusable-workflow-deploy.md](./reusable-workflow-deploy.md) |
| Scheduled Workflow | cron スケジュールで定期実行するワークフロー。依存関係の更新チェックや定期レポートなどに使用する。 | [scheduled-workflow.md](./scheduled-workflow.md) |
| Secret Usage in Workflows | シークレットをワークフローで安全に参照・管理するパターン。 | [secret-usage.md](./secret-usage.md) |
