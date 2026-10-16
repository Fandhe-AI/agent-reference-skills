# local-dev

| Name | Description | Path |
|------|-------------|------|
| 宣言的スキーマ管理 | データベースの「あるべき姿」を定義し、現在の状態との差分からマイグレーションを自動生成する。 | [declarative-schemas.md](./declarative-schemas.md) |
| Diff engines: pg-delta and migra | pg-delta と legacy migra の違いと切り替え方法。`db diff` / `db pull` の挙動差。 | [diff-engines.md](./diff-engines.md) |
| Docker and native runtimes | experimental stack の Docker / native ランタイムの違いと対応プラットフォーム。 | [docker-and-native-runtimes.md](./docker-and-native-runtimes.md) |
| メールテンプレートカスタマイズ | Supabase Auth が送信するメールテンプレートをカスタマイズできる。 | [email-templates.md](./email-templates.md) |
| ローカル開発概要 | Supabase CLI を使用して、Docker 上で全サービスをローカルに実行できる。 | [overview.md](./overview.md) |
| Running multiple local projects (experimental supabase stack) | experimental `supabase stack` で 1 マシン上に複数のローカルプロジェクトを実行する。 | [running-multiple-local-projects.md](./running-multiple-local-projects.md) |
| シードデータ | シードデータを使用して、開発・テスト用のデータをデータベースに投入する。 | [seeding.md](./seeding.md) |
| テスト | pgTAP は PostgreSQL のテストフレームワーク。 | [testing.md](./testing.md) |
